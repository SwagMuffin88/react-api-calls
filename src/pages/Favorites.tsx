import {useEffect, useState} from 'react'
import MovieCard from '../components/MovieCard'

const Favorites = () => {
    const [ favoriteMovies, setFavoriteMovies ] = useState([])

    useEffect(() => {
        const favs = JSON.parse(localStorage.getItem('favorites') || '[]')
        setFavoriteMovies(favs)
    }, [])

    return (
        <main className="container-center py-10 min-h-16">
            <h2 className="text-3xl font-bold pb-8 pt-6 text-white">Minu lemmikud</h2>

            {favoriteMovies.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    <p className="text-xl">Sa pole veel ühtegi lemmikut lisanud.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-8">
                    {favoriteMovies.map((movie: any) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </main>
    )
}

export default Favorites;