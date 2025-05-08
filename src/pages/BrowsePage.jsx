import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Hero from '../components/common/Hero';
import MovieRow from '../components/common/MovieRow';
import Footer from '../components/common/Footer';
import { 
  movies, 
  filterMoviesByGenre, 
  filterTrendingMovies, 
  filterNewReleases,
  categories
} from '../utils/mockData';

const BrowsePage = ({ isLoggedIn }) => {
  const { category } = useParams();
  const [categoryMovies, setCategoryMovies] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  
  useEffect(() => {
    if (category) {
      // Find the category object to get the proper name
      const categoryObj = categories.find(cat => cat.slug === category);
      if (categoryObj) {
        setCategoryName(categoryObj.name);
        setCategoryMovies(filterMoviesByGenre(categoryObj.name));
      } else if (category === 'trending') {
        setCategoryName('Trending Now');
        setCategoryMovies(filterTrendingMovies());
      } else if (category === 'new') {
        setCategoryName('New Releases');
        setCategoryMovies(filterNewReleases());
      } else {
        setCategoryName('All Movies');
        setCategoryMovies(movies);
      }
    } else {
      setCategoryName('');
      setCategoryMovies([]);
    }
  }, [category]);
  
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="min-h-screen bg-dark">
      <Navbar isLoggedIn={isLoggedIn} />
      
      {!category && <Hero movies={movies} isLoggedIn={isLoggedIn} />}
      
      <div className="container py-12">
        {category && categoryName && (
          <div className="mb-8 mt-10">
            <h1 className="text-3xl font-bold text-white">{categoryName}</h1>
            <p className="text-gray-400 mt-2">Browse our selection of {categoryName.toLowerCase()} content</p>
          </div>
        )}
        
        {category ? (
          <MovieRow title={`${categoryName} Movies`} movies={categoryMovies} />
        ) : (
          <>
            <MovieRow title="Trending Now" movies={filterTrendingMovies()} />
            <MovieRow title="New Releases" movies={filterNewReleases()} />
            <MovieRow title="Action Movies" movies={filterMoviesByGenre('Action')} />
            <MovieRow title="Sci-Fi Movies" movies={filterMoviesByGenre('Sci-Fi')} />
            <MovieRow title="Drama Movies" movies={filterMoviesByGenre('Drama')} />
            <MovieRow title="Thriller Movies" movies={filterMoviesByGenre('Thriller')} />
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default BrowsePage;