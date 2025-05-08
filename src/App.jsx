import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Pages
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import MoviePage from './pages/MoviePage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import WatchPage from './pages/WatchPage';
import SearchPage from './pages/SearchPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    const userStatus = localStorage.getItem('user');
    if (userStatus) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = () => {
    localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Demo User' }));
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
        <Route path="/browse" element={<BrowsePage isLoggedIn={isLoggedIn} />} />
        <Route path="/browse/:category" element={<BrowsePage isLoggedIn={isLoggedIn} />} />
        <Route path="/movie/:id" element={<MoviePage isLoggedIn={isLoggedIn} />} />
        <Route path="/profile" element={<ProfilePage isLoggedIn={isLoggedIn} logout={logout} />} />
        <Route path="/login" element={<LoginPage login={login} isLoggedIn={isLoggedIn} />} />
        <Route path="/signup" element={<SignupPage login={login} isLoggedIn={isLoggedIn} />} />
        <Route path="/watch/:id" element={<WatchPage isLoggedIn={isLoggedIn} />} />
        <Route path="/search" element={<SearchPage isLoggedIn={isLoggedIn} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;