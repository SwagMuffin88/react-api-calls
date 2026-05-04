import {useEffect, useState} from "react"
import axios from 'axios'
import MovieRow from '../components/MovieRow'

interface Movies {
    id: number
    title: string
    poster_path: string
    release_date: string
}

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Home = () => {
    const [movies, setMovies] = useState<Movies[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const fetchPopularMovies = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)

            const result = response.data.results
            setMovies(result)
        } catch (error: any) {
            console.error("Viga andmete laadimisel:", error.response?.data || error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPopularMovies()
    }, [])

    return (
        <div className="app-container p-0">
            <main className="p-5 max-w-300 mx-auto">
                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Laadin filme...</p>
                    </div>
                ) : (
                    <MovieRow title="Populaarsed hetkel" movies={movies}/>
                )}
            </main>
        </div>
    )
}

export default Home;

