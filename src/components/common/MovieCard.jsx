import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaPlus, FaThumbsUp, FaChevronDown } from 'react-icons/fa';

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative group card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/movie/${movie.id}`}>
        <img 
          src={movie.thumbnail} 
          alt={movie.title} 
          className="w-full h-auto rounded-md object-cover transition-all duration-300"
          loading="lazy"
        />
      </Link>
      
      {isHovered && (
        <div className="absolute inset-0 bg-dark/80 rounded-md p-3 flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-fade-in">
          <h3 className="text-white font-medium text-sm md:text-base mb-1">{movie.title}</h3>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-green-500 text-xs">{movie.rating} Rating</span>
            <span className="text-xs text-gray-400">{movie.year}</span>
            <span className="text-xs text-gray-400">{movie.maturityRating}</span>
          </div>
          
          <p className="text-xs text-gray-300 line-clamp-3 mb-auto">{movie.description}</p>
          
          <div className="mt-2 flex justify-between items-center">
            <div className="flex space-x-2">
              <Link to={`/watch/${movie.id}`} className="p-1.5 bg-white rounded-full text-dark hover:bg-gray-300 transition-colors">
                <FaPlay />
              </Link>
              <button className="p-1.5 bg-dark border border-gray-400 rounded-full text-white hover:border-white transition-colors">
                <FaPlus />
              </button>
              <button className="p-1.5 bg-dark border border-gray-400 rounded-full text-white hover:border-white transition-colors">
                <FaThumbsUp />
              </button>
            </div>
            
            <Link to={`/movie/${movie.id}`} className="p-1.5 bg-dark border border-gray-400 rounded-full text-white hover:border-white transition-colors">
              <FaChevronDown />
            </Link>
          </div>
          
          <div className="mt-2 flex flex-wrap gap-1">
            {movie.genre.map((genre, index) => (
              <span key={index} className="text-xs text-gray-300">
                {index > 0 && '•'} {genre}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;