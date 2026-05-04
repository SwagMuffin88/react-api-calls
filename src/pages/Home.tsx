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

interface Genre {
    id: number;
    name: string;
}

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Home = () => {
    const [movies, setMovies] = useState<Movies[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null)

    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);

                setGenres(res.data.genres || []);
            } catch (error) {
                console.error("Žanreid ei saanud kätte:", error);
            }
        };
        fetchGenres();
    }, [])

    const fetchMovies = async () => {
        setLoading(true);
        try {
            const endpoint = selectedGenre
                ? `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}&language=et-EE`
                : `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=et-EE`;

            const response = await axios.get(endpoint);
            setMovies(response.data.results);
        } catch (error) {
            console.error("Viga laadimisel:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMovies()
    }, [selectedGenre])

    return (
        <main className="container-center py-10">
            <h2 className="text-3xl font-bold mb-6 pb-5 pt-5">Avasta filme</h2>

            <div className="flex flex-wrap gap-3 mb-10">
                <button
                    onClick={() => setSelectedGenre(null)}
                    className={`px-4 py-2 rounded-full border transition-all ${
                        !selectedGenre ? 'bg-[#01b4e4] border-[#01b4e4] text-white' : 'border-gray-600 text-gray-300 hover:border-[#01b4e4]'
                    }`}
                >
                    Kõik
                </button>

                {genres && genres.length > 0 ? (
                    genres.map((genre) => (
                        <button
                            key={genre.id}
                            onClick={() => setSelectedGenre(genre.id)}
                            className={`px-4 py-2 rounded-full border transition-all ${
                                selectedGenre === genre.id
                                    ? 'bg-[#01b4e4] border-[#01b4e4] text-white'
                                    : 'border-gray-600 text-gray-300 hover:border-[#01b4e4]'
                            }`}
                        >
                            {genre.name || "Nimetu žanr"}
                        </button>
                    ))
                ) : (
                    <p className="text-gray-500">Laadin žanreid...</p>
                )}
            </div>

            {loading ? (
                <div className="loading-container"><div className="spinner"></div></div>
            ) : (
                <MovieRow title={selectedGenre ? "Tulemused" : "Populaarsed hetkel"} movies={movies} />
            )}
        </main>
    )
}

export default Home;

