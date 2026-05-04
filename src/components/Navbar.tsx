import React, {useEffect, useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/') {
            setSearchQuery('');
        }
    }, [location.pathname])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Otsime filmi:", searchQuery)
        if (searchQuery.trim()) {
            navigate(`/search?q=${searchQuery}`);
        }
    }

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="logo">
                    <img
                        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                        alt="TMDB Logo"
                    />
                </div>

                <form className="search-form" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Otsi filme..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit">Otsi</button>
                </form>

                <div className="nav-links">
                    <span>Minu lemmikud</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;