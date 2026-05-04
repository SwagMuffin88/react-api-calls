import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MovieDetails.css';

interface Genre {
    id: number;
    name: string;
}

interface MovieDetails {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    vote_average: number;
    genres: Genre[];
    runtime: number;
    tagline: string;
}

const MovieDetail = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [movie, setMovie] = useState<MovieDetails | null>(null)
    const [loading, setLoading] = useState(true)

    const API_KEY = import.meta.env.VITE_TMDB_API_KEY
    const BASE_URL = import.meta.env.VITE_BASE_URL

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                const etResponse = await axios.get(
                    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=et-EE`
                )

                let movieData = etResponse.data

                if (!movieData.overview || movieData.overview.trim() === "") {
                    const enResponse = await axios.get(
                        `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
                    )
                    movieData.overview = enResponse.data.overview
                    if (!movieData.tagline) movieData.tagline = enResponse.data.tagline
                }

                setMovie(movieData)
            } catch (error) {
                console.error("Viga filmi andmete laadimisel:", error)
            } finally {
                setLoading(false)
            }
        };

        fetchMovieDetails();
    }, [id, API_KEY, BASE_URL])

    if (loading) return <div className="loading-container"><div className="spinner"></div></div>
    if (!movie) return <div className="container-center py-20 text-center">Filmi ei leitud.</div>

    return (
        <div className="movie-detail-page">
            <div
                className="detail-hero"
                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
            >
                <div className="hero-overlay">
                    <div className="container-center hero-content">
                        <button onClick={() => navigate(-1)} className="back-button mb-6">
                            ← Tagasi
                        </button>

                        <div className="flex flex-col md:flex-row gap-10">
                            {/* Poster */}
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="detail-poster"
                            />

                            <div className="detail-text text-white">
                                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                                    {movie.title} <span className="font-light text-gray-400">({movie.release_date.split('-')[0]})</span>
                                </h1>

                                {movie.tagline && <p className="text-xl italic text-[#01b4e4] mb-6">"{movie.tagline}"</p>}

                                <div className="flex flex-wrap items-center gap-4 mb-6">
                                    <div className="rating-badge">
                                        ★ {movie.vote_average.toFixed(1)}
                                    </div>
                                    <span className="text-gray-300">|</span>
                                    <span>{movie.runtime} min</span>
                                    <span className="text-gray-300">|</span>
                                    <div className="flex gap-2">
                                        {movie.genres.map(genre => (
                                            <span key={genre.id} className="genre-tag">{genre.name}</span>
                                        ))}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-semibold mb-3">Sünopsis</h3>
                                <p className="text-lg text-gray-200 leading-relaxed max-w-3xl">
                                    {movie.overview || "Selle filmi kohta kirjeldus eesti keeles puudub."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetail