import './App.css'
import {useEffect, useState} from "react";
import axios from 'axios'

interface Movies {
  id: number
  title: string
  poster_path: string
  release_date: string
}

function App() {
  const [movies, setMovies] = useState<Movies[]>([])

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
    <div>
      {movies.map((m) => (
          <div>
            <h1>{m.title}</h1>
          </div>
      ))}
    </div>
  )
}

export default App
