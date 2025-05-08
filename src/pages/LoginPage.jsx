import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';

const LoginPage = ({ login, isLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Demo login functionality
      login();
    }
  };
  
  if (isLoggedIn) {
    return <Navigate to="/browse" />;
  }
  
  return (
    <div className="min-h-screen bg-dark">
      <div className="absolute top-0 w-full">
        <Navbar isLoggedIn={isLoggedIn} />
      </div>
      
      <div 
        className="min-h-screen flex items-center justify-center py-20 bg-cover bg-center relative"
        style={{
          backgroundImage: "url(https://assets.nflxext.com/ffe/siteui/vlv3/f85718e8-fc6d-4954-bca0-f5eaf78e0842/ea44b42b-ba19-4f35-ad27-45090e34a897/US-en-20230918-popsignuptwoweeks-perspective_alpha_website_large.jpg)"
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 bg-black/75 p-8 rounded-md w-full max-w-md"
        >
          <h1 className="text-3xl font-bold text-white mb-8">Sign In</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className={`relative border-b-2 ${errors.email ? 'border-red-500' : 'border-gray-600'} focus-within:border-primary`}>
                <input
                  type="text"
                  id="email"
                  className="block w-full appearance-none bg-transparent border-none px-3 py-2.5 text-white focus:outline-none"
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label
                  htmlFor="email"
                  className="absolute top-3 left-3 duration-300 origin-0 text-gray-500 pointer-events-none transform -translate-y-5 scale-75"
                >
                  Email or phone number
                </label>
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            
            <div className="mb-6">
              <div className={`relative border-b-2 ${errors.password ? 'border-red-500' : 'border-gray-600'} focus-within:border-primary`}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="block w-full appearance-none bg-transparent border-none px-3 py-2.5 text-white focus:outline-none"
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label
                  htmlFor="password"
                  className="absolute top-3 left-3 duration-300 origin-0 text-gray-500 pointer-events-none transform -translate-y-5 scale-75"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="absolute right-2 top-2.5 text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            
            <Button variant="primary" className="w-full py-3 mb-4" type="submit">
              Sign In
            </Button>
            
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center text-gray-400 text-sm">
                <input
                  type="checkbox"
                  className="mr-2 h-4 w-4 bg-gray-700 border-gray-600 focus:ring-primary"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember me
              </label>
              
              <a href="#" className="text-gray-400 text-sm hover:underline">
                Need help?
              </a>
            </div>
            
            <div className="mt-6">
              <p className="text-gray-400">
                New to CineFusion? <Link to="/signup" className="text-white hover:underline">Sign up now</Link>.
              </p>
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                This page is protected by Google reCAPTCHA to ensure you're not a bot. 
              </p>
            </div>
          </form>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default LoginPage;