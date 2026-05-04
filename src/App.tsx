// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import MovieDetails from './pages/MovieDetails';

function App() {
    return (
        <Router>
            <div className="min-h-screen">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App