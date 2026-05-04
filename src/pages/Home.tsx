import {useEffect, useState} from "react"
import axios from 'axios'
import MovieRow from '../components/MovieRow'
import '../App.css'

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
        <main className="container-center py-10">
            {loading ? (
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p className="text-[#01b4e4] mt-4 font-semibold">Laadin filme...</p>
                </div>
            ) : (
                <div className="fade-in mt-4">
                    <MovieRow title="Populaarsed hetkel" movies={movies}/>
                </div>
            )}
        </main>
    )
}

export default Home;

