import React from 'react';

interface MovieProps {
    movie: {
        id: number;
        title: string;
        poster_path: string;
        release_date: string;
    }
}

const MovieCard: React.FC<MovieProps> = ({ movie }) => {
    const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    return (
        <div className="movie-card">
            <div className="poster-container">
                {movie.poster_path ? (
                    <img src={imageUrl} alt={movie.title} />
                ) : (
                    <div className="no-poster">Pilt puudub</div>
                )}
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date.split('-')[0]}</p> {/* Ainult aastaarv */}
            </div>
        </div>
    );
};

export default MovieCard