import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { FaPlay, FaPlus, FaThumbsUp, FaShare } from 'react-icons/fa';
import Navbar from '../components/common/Navbar';
import Button from '../components/common/Button';
import MovieRow from '../components/common/MovieRow';
import Footer from '../components/common/Footer';
import { getMovieById, filterMoviesByGenre } from '../utils/mockData';
import { motion } from 'framer-motion';

const MoviePage = ({ isLoggedIn }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);
  
  useEffect(() => {
    const movieData = getMovieById(parseInt(id));
    if (movieData) {
      setMovie(movieData);
      
      // Get movies with similar genres
      if (movieData.genre && movieData.genre.length > 0) {
        const mainGenre = movieData.genre[0];
        const similar = filterMoviesByGenre(mainGenre).filter(m => m.id !== movieData.id);
        setSimilarMovies(similar);
      }
    }
  }, [id]);
  
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  
  if (!movie) {
    return (
      <div className="min-h-screen bg-dark flex justify-center items-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-dark">
      <Navbar isLoggedIn={isLoggedIn} />
      
      <div 
        className="relative min-h-[70vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${movie.backdropImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/70 to-transparent"></div>
        
        {showTrailer && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl">
              <button 
                className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
                onClick={() => setShowTrailer(false)}
              >
                Close
              </button>
              <div className="relative pb-[56.25%] h-0">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src={movie.trailerUrl}
                  title={`${movie.title} trailer`}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}
        
        <div className="container relative z-10 py-32 flex flex-col justify-end h-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl font-bold text-white mb-4">{movie.title}</h1>
            
            <div className="flex items-center flex-wrap gap-3 mb-4">
              <span className="text-green-500 font-medium">{movie.rating} Rating</span>
              <span className="text-gray-300">{movie.year}</span>
              <span className="text-gray-300">{movie.maturityRating}</span>
              <span className="text-gray-300">{movie.duration}</span>
              <div className="flex flex-wrap gap-2 ml-2">
                {movie.genre.map((genre, index) => (
                  <Link 
                    key={index} 
                    to={`/browse/${genre.toLowerCase()}`}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {index > 0 && '•'} {genre}
                  </Link>
                ))}
              </div>
            </div>
            
            <p className="text-gray-200 mb-6">{movie.description}</p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              <Link to={`/watch/${movie.id}`}>
                <Button variant="primary" className="flex items-center gap-2">
                  <FaPlay /> Play
                </Button>
              </Link>
              <Button variant="ghost" className="flex items-center gap-2" onClick={() => setShowTrailer(true)}>
                Watch Trailer
              </Button>
              <Button variant="transparent" className="flex items-center gap-2">
                <FaPlus /> My List
              </Button>
              <Button variant="transparent" className="flex items-center gap-2">
                <FaThumbsUp /> Rate
              </Button>
              <Button variant="transparent" className="flex items-center gap-2">
                <FaShare /> Share
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-400 mb-1">Director: <span className="text-white">{movie.director}</span></p>
                <p className="text-gray-400">
                  Cast: {movie.cast.map((actor, index) => (
                    <span key={index} className="text-white">
                      {index > 0 && ', '}{actor}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="container py-12">
        {similarMovies.length > 0 && (
          <MovieRow title={`More Like ${movie.title}`} movies={similarMovies} />
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default MoviePage;