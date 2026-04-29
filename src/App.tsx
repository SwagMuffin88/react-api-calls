import './App.css'
import {useEffect, useState} from "react";
import axios from 'axios'

function App() {
  const [movies, setMovies] = useState([])

  const apiKey =  "a2006311928939b35613c28405038c87"
  const popularMoviesUrl = "https://api.themoviedb.org/3/movie/popular"

  const fetchMovies = async () => {
    axios.get(`${popularMoviesUrl}?api_key=${apiKey}`).then((response: { data: any; }) => {
      const result = response.data
      console.log(result)
    })
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <div>Hello from React API calls</div>
  )
}

export default App
