import { useState, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import MovieCard from './MovieCard';

const MovieRow = ({ title, movies }) => {
  const rowRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  
  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      
      rowRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
      
      // Update arrow visibility after scrolling
      setTimeout(() => {
        if (rowRef.current) {
          setShowLeftArrow(rowRef.current.scrollLeft > 0);
          setShowRightArrow(rowRef.current.scrollLeft + rowRef.current.clientWidth < rowRef.current.scrollWidth - 10);
        }
      }, 300);
    }
  };
  
  const handleScroll = () => {
    if (rowRef.current) {
      setShowLeftArrow(rowRef.current.scrollLeft > 0);
      setShowRightArrow(rowRef.current.scrollLeft + rowRef.current.clientWidth < rowRef.current.scrollWidth - 10);
    }
  };
  
  return (
    <div className="my-8">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4">{title}</h2>
      
      <div className="relative group">
        {movies.length > 0 && showLeftArrow && (
          <button
            className="absolute left-0 top-0 bottom-0 z-10 bg-black/70 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <FaChevronLeft className="text-white text-2xl" />
          </button>
        )}
        
        <div
          className="flex gap-2 overflow-x-auto scrollbar-hide py-2 pl-2 pr-4"
          ref={rowRef}
          onScroll={handleScroll}
        >
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} className="flex-none w-[160px] md:w-[200px] lg:w-[240px]">
                <MovieCard movie={movie} />
              </div>
            ))
          ) : (
            <p className="text-gray-400">No movies available in this category</p>
          )}
        </div>
        
        {movies.length > 0 && showRightArrow && (
          <button
            className="absolute right-0 top-0 bottom-0 z-10 bg-black/70 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <FaChevronRight className="text-white text-2xl" />
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieRow;