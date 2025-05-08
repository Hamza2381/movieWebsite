import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { FaArrowLeft, FaPause, FaPlay, FaVolumeUp, FaVolumeMute, FaExpand, FaClosedCaptioning } from 'react-icons/fa';
import { getMovieById } from '../utils/mockData';

const WatchPage = ({ isLoggedIn }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState(null);
  
  useEffect(() => {
    const movieData = getMovieById(parseInt(id));
    if (movieData) {
      setMovie(movieData);
    }
    
    // Hide controls after 3 seconds
    const timeout = setTimeout(() => {
      setShowControls(false);
    }, 3000);
    setControlsTimeout(timeout);
    
    return () => {
      if (controlsTimeout) clearTimeout(controlsTimeout);
    };
  }, [id]);
  
  const handleMouseMove = () => {
    setShowControls(true);
    
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
    }
    
    const timeout = setTimeout(() => {
      setShowControls(false);
    }, 3000);
    setControlsTimeout(timeout);
  };
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    
    const video = document.getElementById('movie-player');
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
    }
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    
    const video = document.getElementById('movie-player');
    if (video) {
      video.muted = !isMuted;
    }
  };
  
  const handleProgress = (e) => {
    const video = e.target;
    if (video) {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
    }
  };
  
  const handleSeek = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    
    const video = document.getElementById('movie-player');
    if (video) {
      video.currentTime = pos * video.duration;
    }
  };
  
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  
  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }
  
  return (
    <div 
      className="min-h-screen bg-black relative"
      onMouseMove={handleMouseMove}
    >
      <div className={`fixed top-0 left-0 p-4 z-20 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <Link to={`/movie/${movie.id}`} className="text-white hover:text-gray-300 transition-colors flex items-center gap-2">
          <FaArrowLeft /> Back to details
        </Link>
      </div>
      
      <video
        id="movie-player"
        className="w-full h-screen object-contain"
        src={movie.videoUrl}
        poster={movie.backdropImage}
        autoPlay
        onClick={togglePlay}
        onTimeUpdate={handleProgress}
      ></video>
      
      <div className={`fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto">
          <div 
            className="h-2 bg-gray-600 rounded-full mb-4 cursor-pointer relative"
            onClick={handleSeek}
          >
            <div 
              className="h-full bg-primary rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                className="text-white hover:text-gray-300 transition-colors text-xl"
                onClick={togglePlay}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              
              <button 
                className="text-white hover:text-gray-300 transition-colors text-xl"
                onClick={toggleMute}
              >
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
              
              <span className="text-white text-sm">
                {movie.title}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="text-white hover:text-gray-300 transition-colors text-xl">
                <FaClosedCaptioning />
              </button>
              
              <button className="text-white hover:text-gray-300 transition-colors text-xl">
                <FaExpand />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;