import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Button from '../components/common/Button';
import Footer from '../components/common/Footer';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <div className="container flex flex-col items-center justify-center min-h-screen py-20 text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Page Not Found</h2>
        <p className="text-gray-400 max-w-md mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <Link to="/">
          <Button variant="primary" size="lg">
            Back to Home
          </Button>
        </Link>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFoundPage;