import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
import MovieCard from "./componets/MovieCard";

function App() {
    const IMAGE_PATH = "https://image.tmdb.org/t/p/original/"
    const API_URL = "https://api.themoviedb.org/3/"
    const [movies, setMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState({})
    const [searchKey, setSearchKey] = useState("")

    const fetchMovies = async (searchKey) => {
        const type = searchKey ? "search" : "discover"
        const {data: {results}} = await axios.get(`${API_URL}/${type}/movie`, {
            params: {
                api_key: process.env.REACT_APP_API,
                query: searchKey
            }
        })
        setSelectedMovie(results[0])
        setMovies(results)
    }



    useEffect(() => {
        fetchMovies()
    }, [])

    const renderMovies = () => (
        movies.map(movie => (
            <MovieCard
                key={movie.id}
                movie={movie}
            />
        ))
    )

    const searchMovies = (e) => {
        e.preventDefault()
        fetchMovies(searchKey)

    }

    return (
        <div className="App">
            <header className={"header"}>
                <div className={"header-content max-center"}>
                    <span>Movie Trailer App</span>
                    <form onSubmit={searchMovies}>
                        <input type="text" onChange={e => setSearchKey(e.target.value)}/>
                        <button type={"submit"}>Пошук</button>
                    </form>
                </div>
            </header>

            <div className={"hero"} style={{backgroundImage:`url('${IMAGE_PATH}${selectedMovie.backdrop_path}')`}}>
                <div className={"hero-content max-center"}>
                    <button className={"button"}>Play Trailer</button>
                    <h1 className={"hero-title"}>{selectedMovie.title}</h1>
                    {selectedMovie.overview ?<p className={"hero-overview"}> {selectedMovie.overview}</p>: null}
                </div>
            </div>

            <div className="container max-center">
                {renderMovies()}
            </div>
        </div>
    );
}

export default App;
