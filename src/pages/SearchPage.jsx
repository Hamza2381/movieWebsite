import { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import MovieCard from '../components/common/MovieCard';
import Footer from '../components/common/Footer';
import { searchMovies } from '../utils/mockData';

const SearchPage = ({ isLoggedIn }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q');
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const searchResults = searchMovies(searchQuery);
        setResults(searchResults);
        setLoading(false);
      }, 500);
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [searchQuery]);
  
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="min-h-screen bg-dark">
      <Navbar isLoggedIn={isLoggedIn} />
      
      <div className="container py-32">
        <h1 className="text-3xl font-bold text-white mb-2">
          {searchQuery ? `Search results for "${searchQuery}"` : 'Search Movies'}
        </h1>
        
        {loading ? (
          <div className="flex justify-center items-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="mt-8">
            {results.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {results.map(movie => (
                  <div key={movie.id}>
                    <MovieCard movie={movie} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center my-12">
                <p className="text-gray-400 text-lg">
                  {searchQuery 
                    ? `No results found for "${searchQuery}". Try different keywords.` 
                    : 'Enter a search term to find movies.'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default SearchPage;