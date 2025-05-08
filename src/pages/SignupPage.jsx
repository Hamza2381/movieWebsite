import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import { plans } from '../utils/mockData';
import { FaCheck, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SignupPage = ({ login, isLoggedIn }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [errors, setErrors] = useState({});
  
  const validateStep1 = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateStep2 = () => {
    const newErrors = {};
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    } else if (step === 3 && selectedPlan) {
      setStep(4);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (step === 4) {
      // Demo signup/login functionality
      login();
    } else {
      handleNextStep();
    }
  };
  
  if (isLoggedIn) {
    return <Navigate to="/browse" />;
  }
  
  return (
    <div className="min-h-screen bg-dark">
      <div className="absolute top-0 w-full z-10">
        <Navbar isLoggedIn={isLoggedIn} />
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen pt-20"
      >
        {step === 1 && (
          <div className="container max-w-3xl mx-auto py-16 px-4">
            <div className="text-center mb-8">
              <p className="text-gray-400 mb-2">STEP 1 OF 4</p>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Create a password to start your membership</h1>
              <p className="text-xl text-white">Just a few more steps and you're done!</p>
              <p className="text-white">We hate paperwork, too.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  className={`w-full p-4 bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded text-white focus:outline-none focus:border-primary`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <Button variant="primary" className="w-full py-4 text-lg" type="submit">
                Next
              </Button>
            </form>
          </div>
        )}
        
        {step === 2 && (
          <div className="container max-w-3xl mx-auto py-16 px-4">
            <div className="text-center mb-8">
              <p className="text-gray-400 mb-2">STEP 2 OF 4</p>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Create a password to secure your account</h1>
              <p className="text-white">Your password must be at least 6 characters.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full p-4 bg-gray-800 border border-gray-700 rounded text-white opacity-70"
                />
              </div>
              
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Add a password"
                  className={`w-full p-4 bg-gray-800 border ${errors.password ? 'border-red-500' : 'border-gray-700'} rounded text-white focus:outline-none focus:border-primary`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
              
              <Button variant="primary" className="w-full py-4 text-lg" type="submit">
                Next
              </Button>
            </form>
          </div>
        )}
        
        {step === 3 && (
          <div className="container max-w-4xl mx-auto py-16 px-4">
            <div className="text-center mb-8">
              <p className="text-gray-400 mb-2">STEP 3 OF 4</p>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Choose your plan</h1>
              
              <ul className="text-left max-w-lg mx-auto space-y-3 mb-8">
                <li className="flex items-start">
                  <FaCheck className="text-primary mt-1 mr-2" />
                  <span className="text-white">Watch all you want. Ad-free.</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-primary mt-1 mr-2" />
                  <span className="text-white">Recommendations just for you.</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="text-primary mt-1 mr-2" />
                  <span className="text-white">Change or cancel your plan anytime.</span>
                </li>
              </ul>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {plans.map(plan => (
                  <div 
                    key={plan.id} 
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPlan === plan.id 
                        ? 'border-primary bg-gray-800 scale-105' 
                        : 'border-gray-700 hover:border-gray-500'
                    }`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    <h3 className="text-lg font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-primary font-bold text-2xl mb-4">{plan.price}</p>
                    <p className="text-gray-400 mb-2">Video quality: <span className="text-white">{plan.quality}</span></p>
                    <p className="text-gray-400 mb-4">Resolution: <span className="text-white">{plan.resolution}</span></p>
                    <ul className="space-y-1 text-sm">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="text-gray-300">✓ {feature}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <Button 
                  variant="primary" 
                  className="px-8 py-4 text-lg" 
                  type="submit"
                  disabled={!selectedPlan}
                >
                  Next
                </Button>
              </div>
            </form>
          </div>
        )}
        
        {step === 4 && (
          <div className="container max-w-3xl mx-auto py-16 px-4">
            <div className="text-center mb-8">
              <p className="text-gray-400 mb-2">STEP 4 OF 4</p>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Set up your payment</h1>
              <p className="text-white mb-4">Your membership starts as soon as you set up payment.</p>
              <p className="text-xl font-medium text-white mb-2">No commitments, cancel anytime.</p>
            </div>
            
            <div className="max-w-lg mx-auto bg-gray-900 rounded-lg p-6 mb-8">
              <h3 className="text-white font-medium mb-4">Credit or Debit Card</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Card number"
                    className="w-full p-4 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-primary"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Expiration date (MM/YY)"
                    className="p-4 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-primary"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="p-4 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-primary"
                  />
                </div>
                
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Name on card"
                    className="w-full p-4 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-primary"
                  />
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-white font-medium">
                      {plans.find(p => p.id === selectedPlan)?.name || 'Premium'} Plan
                    </p>
                    <p className="text-white">
                      {plans.find(p => p.id === selectedPlan)?.price || '$17.99'}/month
                    </p>
                  </div>
                  <Link to="#" className="text-blue-400 hover:underline">
                    Change
                  </Link>
                </div>
                
                <p className="text-sm text-gray-400 mb-4">
                  By clicking the "Start Membership" button below, you agree to our Terms of Use and Privacy Statement, and that you are over 18. CineFusion will automatically continue your membership and charge the membership fee (currently $17.99/month) to your payment method until you cancel.
                </p>
                
                <Button variant="primary" className="w-full py-4 text-lg" type="submit">
                  Start Membership
                </Button>
              </form>
            </div>
          </div>
        )}
      </motion.div>
      
      <Footer />
    </div>
  );
};

export default SignupPage;