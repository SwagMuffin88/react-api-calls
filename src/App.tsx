import './App.css'
import {useEffect, useState} from "react"
import axios from 'axios'
import Navbar from './components/Navbar'
import MovieRow from './components/MovieRow'

interface Movies {
    id: number
    title: string
    poster_path: string
    release_date: string
}

function App() {
    const [movies, setMovies] = useState<Movies[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [title, setTitle] = useState("Populaarsed hetkel")

    // From YT tutorial: https://www.youtube.com/watch?v=PRUTl0ihzHg
    const apiKey = "a2006311928939b35613c28405038c87"
    const popularMoviesUrl = "https://api.themoviedb.org/3/movie/popular"

    const fetchPopularMovies = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${popularMoviesUrl}?api_key=${apiKey}`)

            const result = response.data.results
            setMovies(result)
        } catch (error: any) {
            console.error("Viga andmete laadimisel:", error.response?.data || error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = async (query: string) => {
        if(!query) {
            fetchPopularMovies()
            return
        }

        try {
            setLoading(true)
            setTitle(`Otsingu tulemused: ${query}`)
            const searchUrl = `https://api.themoviedb.org/3/search/movie`
            const response = await axios.get(`${searchUrl}?api_key=${apiKey}&query=${query}`);
            setMovies(response.data.results)
        } catch (error: any) {
            console.error("Otsingu viga: ", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPopularMovies()
    }, [])

    return (
        <div className="app-container p-0">
            <Navbar onSearch={handleSearch} />

            <main className="p-5 max-w-300 mx-auto">
                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Laadin filme...</p>
                    </div>
                ) : (
                <MovieRow title={title} movies={movies}/>
                )}
            </main>
        </div>
    );
}

export default App
