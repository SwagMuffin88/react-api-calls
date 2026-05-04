import './App.css'
import {useEffect, useState} from "react"
import axios from 'axios'
// import MovieCard from "./components/MovieCard"
import MovieRow from './components/MovieRow'

interface Movies {
  id: number
  title: string
  poster_path: string
  release_date: string
}

function App() {
  const [movies, setMovies] = useState<Movies[]>([])

  // From YT tutorial: https://www.youtube.com/watch?v=PRUTl0ihzHg
  const apiKey =  "a2006311928939b35613c28405038c87"
  const popularMoviesUrl = "https://api.themoviedb.org/3/movie/popular"

  const fetchMovies = async () => {
    axios.get(`${popularMoviesUrl}?api_key=${apiKey}`).then((response: { data: any; }) => {
      const result = response.data.results
      console.log(result)
      setMovies(result)
    });
  }

  useEffect(() => {
    fetchMovies()
  }, [])

    return (
        <div className="app-container">
            <header>
                <img
                    src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                    alt="TMDB Logo"
                    style={{ width: '150px', marginBottom: '20px' }}
                />
            </header>

            <main>
                <MovieRow title="Populaarsed hetkel" movies={movies} />
            </main>
        </div>
    );
}

export default App
