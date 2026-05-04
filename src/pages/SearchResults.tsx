import { useEffect, useState } from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import './SearchResults.css'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const SearchResults = () => {
    const [searchParams] = useSearchParams()
    const query = searchParams.get('q')
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchSearch = async () => {
            if (!query) return

            if (!API_KEY) {
                console.error("VIGA: API võti puudub .env failist!")
                return;
            }

            try {
                setLoading(true)
                const response = await axios.get(
                    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
                );
                setMovies(response.data.results)
            } catch (error) {
                console.error("Otsingu viga:", error)
            } finally {
                setLoading(false)
            }
        };

        fetchSearch()
    }, [query])

    return (
        <div className="p-8 max-w-[1200px] mx-auto text-white">
            <h2 className="text-2xl font-bold mb-6 pb-4">Otsingu tulemused: "{query}"</h2>

            {loading ? (
                <div className="text-[#01b4e4]">Laadin...</div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {movies.map((movie: any) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                    {movies.length === 0 && <p>Filme ei leitud.</p>}

                    <button
                        onClick={() => navigate('/')}
                        className="back-button"
                    >
                        <span className="arrow">←</span>
                        Tagasi avalehele
                    </button>

                </div>
            )}
        </div>
    )
};

export default SearchResults;