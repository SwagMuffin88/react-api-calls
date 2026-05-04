import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import MovieCard from "./MovieCard"
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface Movie {
    id: number
    title: string
    poster_path: string
    release_date: string
}

interface MovieRowProps {
    title: string
    movies: Movie[]
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies }) => {
    return (
        <div className="movie-row">
            <h2 style={{ padding: '20px 0 10px 0' }}>{title}</h2>

            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={2}
                navigation
                breakpoints={{
                    640: { slidesPerView: 3 },
                    1024: { slidesPerView: 5 },
                    1440: { slidesPerView: 6 },
                }}
            >
                {movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <MovieCard movie={movie} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default MovieRow