import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaBell, FaUser } from 'react-icons/fa';

const Navbar = ({ isLoggedIn }) => {
  const [scrolled, setScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'navbar-blur py-2' : 'bg-gradient-to-b from-black/80 to-transparent py-4 mb-2'}`}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-8">
            <h1 className="text-primary font-bold text-2xl">CineFusion</h1>
          </Link>
          
          {isLoggedIn && (
            <div className="hidden md:flex space-x-6">
              <Link to="/browse" className="text-white hover:text-gray-300 transition-colors">Home</Link>
              <Link to="/browse/movies" className="text-white hover:text-gray-300 transition-colors">Movies</Link>
              <Link to="/browse/tv" className="text-white hover:text-gray-300 transition-colors">TV Shows</Link>
              <Link to="/browse/new" className="text-white hover:text-gray-300 transition-colors">New & Popular</Link>
              <Link to="/browse/mylist" className="text-white hover:text-gray-300 transition-colors">My List</Link>
            </div>
          )}
        </div>

        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <input
                type="text"
                placeholder="Titles, people, genres"
                className="bg-black/60 text-white border border-gray-600 rounded-full py-1 px-4 pl-10 focus:outline-none focus:border-white transition-all w-32 focus:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
            </form>
            
            <div className="relative">
              <button
                className="flex items-center space-x-1 focus:outline-none"
                onClick={() => setShowMenu(!showMenu)}
              >
                <img
                  src="https://i.pravatar.cc/150?img=1"
                  alt="Profile"
                  className="w-8 h-8 rounded-md"
                />
              </button>
              
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-dark border border-gray-700 rounded-md shadow-lg py-1 animate-fade-in">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors"
                  >
                    Account
                  </Link>
                  <Link
                    to="/help"
                    className="block px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors"
                  >
                    Help Center
                  </Link>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors"
                    onClick={() => {
                      localStorage.removeItem('user');
                      window.location.href = '/login';
                    }}
                  >
                    Sign Out
                  </Link>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="px-4 py-1 text-white hover:text-gray-300 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-1 bg-primary text-white rounded hover:bg-red-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;