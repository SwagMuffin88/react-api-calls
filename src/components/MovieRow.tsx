import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import MovieCard from "./MovieCard"
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './MovieRow.css'

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
        <div className="movie-row mb-10">
            <h2 className="text-2xl font-bold py-4 pb-10">{title}</h2>

            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={2}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    640: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                    1440: { slidesPerView: 5 },
                    1800: {slidesPerView: 6 },
                }}
                className="pb-10"
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