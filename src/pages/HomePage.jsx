import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Hero from '../components/common/Hero';
import FeaturedCategories from '../components/common/FeaturedCategories';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import { movies } from '../utils/mockData';
import { FaPlay, FaInfoCircle, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const HomePage = ({ isLoggedIn }) => {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar isLoggedIn={isLoggedIn} />
      
      {isLoggedIn ? (
        <>
          <Hero movies={movies} isLoggedIn={isLoggedIn} />
          <div className="container py-12">
            <FeaturedCategories />
          </div>
        </>
      ) : (
        <>
          <div 
            className="relative min-h-screen bg-cover bg-center"
            style={{
              backgroundImage: "url(https://assets.nflxext.com/ffe/siteui/vlv3/f85718e8-fc6d-4954-bca0-f5eaf78e0842/ea44b42b-ba19-4f35-ad27-45090e34a897/US-en-20230918-popsignuptwoweeks-perspective_alpha_website_large.jpg)"
            }}
          >
            <div className="absolute inset-0 bg-black/70"></div>
            
            <div className="relative z-10 container flex flex-col items-center justify-center min-h-screen text-center py-20">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  Unlimited movies, TV shows, and more
                </h1>
                <p className="text-xl md:text-2xl text-white mb-8">
                  Watch anywhere. Cancel anytime.
                </p>
                <p className="text-lg text-white mb-8">
                  Ready to watch? Create an account to start your membership.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/signup">
                    <Button variant="primary" size="lg" className="w-full sm:w-auto flex items-center gap-2">
                      Get Started <FaChevronRight />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
          
          <section className="py-16 bg-black">
            <div className="container">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="md:w-1/2"
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Enjoy on your TV
                  </h2>
                  <p className="text-lg text-gray-300">
                    Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.
                  </p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="md:w-1/2"
                >
                  <img 
                    src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png" 
                    alt="TV" 
                    className="w-full h-auto"
                  />
                </motion.div>
              </div>
            </div>
          </section>
          
          <section className="py-16 bg-dark">
            <div className="container">
              <div className="flex flex-col-reverse md:flex-row items-center gap-8">
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="md:w-1/2"
                >
                  <img 
                    src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg" 
                    alt="Mobile" 
                    className="w-full h-auto"
                  />
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="md:w-1/2"
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Download your shows to watch offline
                  </h2>
                  <p className="text-lg text-gray-300">
                    Save your favorites easily and always have something to watch.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>
          
          <section className="py-16 bg-black">
            <div className="container">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center max-w-3xl mx-auto"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                  Frequently Asked Questions
                </h2>
                
                <div className="space-y-4 mb-8">
                  <div className="bg-gray-800 rounded">
                    <button className="flex justify-between items-center w-full p-4 text-white text-left font-medium">
                      <span>What is CineFusion?</span>
                      <span>+</span>
                    </button>
                  </div>
                  <div className="bg-gray-800 rounded">
                    <button className="flex justify-between items-center w-full p-4 text-white text-left font-medium">
                      <span>How much does it cost?</span>
                      <span>+</span>
                    </button>
                  </div>
                  <div className="bg-gray-800 rounded">
                    <button className="flex justify-between items-center w-full p-4 text-white text-left font-medium">
                      <span>Where can I watch?</span>
                      <span>+</span>
                    </button>
                  </div>
                  <div className="bg-gray-800 rounded">
                    <button className="flex justify-between items-center w-full p-4 text-white text-left font-medium">
                      <span>How do I cancel?</span>
                      <span>+</span>
                    </button>
                  </div>
                </div>
                
                <p className="text-lg text-white mb-6">
                  Ready to watch? Create an account to start your membership.
                </p>
                
                <Link to="/signup">
                  <Button variant="primary" size="lg" className="flex items-center gap-2 mx-auto">
                    Get Started <FaChevronRight />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </section>
        </>
      )}
      
      <Footer />
    </div>
  );
};

export default HomePage;