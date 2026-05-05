import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {FaHeart, FaRegHeart} from "react-icons/fa";

interface MovieProps {
    movie: {
        id: number;
        title: string;
        poster_path: string;
        release_date: string;
    }
}

const MovieCard: React.FC<MovieProps> = ({ movie }) => {
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    useEffect(() => {
        // @ts-ignore
        const favorites = JSON.parse(localStorage.getItem("favorites") || '[]')
        const exists = favorites.some((fav: any) => fav.id === movie.id)
        setIsFavorite(exists)
    }, [movie.id])

const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')

    if (isFavorite) { // Eemaldab lemmikutest
        const newFavorites = favorites.filter((fav: any) => fav.id !== movie.id)
        localStorage.setItem('favorites', JSON.stringify(newFavorites))
        setIsFavorite(false)
    } else {
        favorites.push(movie) // Lisab lemmikutesse
        localStorage.setItem('favorites', JSON.stringify(favorites))
        setIsFavorite(true)
    }
}

    return (

        <div className="movie-card">


            <Link to={`/movie/${movie.id}`}>
                <div className="poster-container">
                    {movie.poster_path ? (
                        <img src={imageUrl} alt={movie.title} />
                    ) : (
                        <div className="no-poster">Pilt puudub</div>
                    )}
                </div>
                <div className="movie-info flex items-start justify-between gap-2 p-3">
                    <div className="flex-1 min-w-0">
                        <h3>{movie.title}</h3>
                        <p>{movie.release_date.split('-')[0]}</p> {/* Ainult aastaarv */}
                    </div>

                    <button
                        onClick={toggleFavorite}
                        className="focus:outline-none p-1 transition-transform active:scale-95
                            flex items-center justify-center"
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: isFavorite ? '#ff4b4b' : 'rgba(255,255,255,0.4)'
                        }}
                    >
                        {isFavorite ? <FaHeart size={20}/> : <FaRegHeart size={20}/>}
                    </button>
                </div>
            </Link>
        </div>
    );
};

export default MovieCard