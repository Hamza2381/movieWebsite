import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';
import Button from './Button';

const Hero = ({ movies, isLoggedIn }) => {
  const [randomMovie, setRandomMovie] = useState(null);
  
  useEffect(() => {
    if (movies && movies.length > 0) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      setRandomMovie(movies[randomIndex]);
    }
  }, [movies]);
  
  if (!randomMovie) return null;
  
  return (
    <div 
      className="hero-section relative"
      style={{
        backgroundImage: `url(${randomMovie.backdropImage})`,
      }}
    >
      <div className="container relative z-10 h-full flex flex-col justify-end pb-16 pt-40">
        <div className="max-w-2xl animate-slide-up">
          <h1 className="text-3xl md:text-5xl font-bold text-white text-shadow mb-4">{randomMovie.title}</h1>
          
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-green-500 font-medium">{randomMovie.rating} Rating</span>
            <span className="text-gray-300">{randomMovie.year}</span>
            <span className="text-gray-300">{randomMovie.maturityRating}</span>
            <span className="text-gray-300">{randomMovie.duration}</span>
          </div>
          
          <p className="text-gray-200 text-shadow mb-6 line-clamp-3">{randomMovie.description}</p>
          
          <div className="flex flex-wrap gap-3">
            {isLoggedIn ? (
              <>
                <Link to={`/watch/${randomMovie.id}`}>
                  <Button variant="primary" size="lg" className="flex items-center gap-2">
                    <FaPlay /> Play
                  </Button>
                </Link>
                <Link to={`/movie/${randomMovie.id}`}>
                  <Button variant="ghost" size="lg" className="flex items-center gap-2">
                    <FaInfoCircle /> More Info
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/signup">
                  <Button variant="primary" size="lg">
                    Sign Up to Watch
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="ghost" size="lg">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;