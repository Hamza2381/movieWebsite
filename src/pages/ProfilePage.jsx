import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import { profiles, plans } from '../utils/mockData';
import { FaUser, FaCreditCard, FaBell, FaLock, FaSignOutAlt } from 'react-icons/fa';

const ProfilePage = ({ isLoggedIn, logout }) => {
  const [activeTab, setActiveTab] = useState('account');
  
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="min-h-screen bg-dark">
      <Navbar isLoggedIn={isLoggedIn} />
      
      <div className="container py-32">
        <h1 className="text-3xl font-bold text-white mb-8">Account</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="bg-gray-900 rounded-lg p-4 sticky top-32">
              <ul className="space-y-2">
                <li>
                  <button
                    className={`w-full text-left px-4 py-2 rounded flex items-center gap-3 ${activeTab === 'account' ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-800'}`}
                    onClick={() => setActiveTab('account')}
                  >
                    <FaUser /> Account
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left px-4 py-2 rounded flex items-center gap-3 ${activeTab === 'plan' ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-800'}`}
                    onClick={() => setActiveTab('plan')}
                  >
                    <FaCreditCard /> Plan Details
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left px-4 py-2 rounded flex items-center gap-3 ${activeTab === 'profiles' ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-800'}`}
                    onClick={() => setActiveTab('profiles')}
                  >
                    <FaUser /> Profiles
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left px-4 py-2 rounded flex items-center gap-3 ${activeTab === 'settings' ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-800'}`}
                    onClick={() => setActiveTab('settings')}
                  >
                    <FaBell /> Settings
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left px-4 py-2 rounded flex items-center gap-3 ${activeTab === 'security' ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-800'}`}
                    onClick={() => setActiveTab('security')}
                  >
                    <FaLock /> Security
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-2 rounded flex items-center gap-3 text-gray-300 hover:bg-gray-800"
                    onClick={logout}
                  >
                    <FaSignOutAlt /> Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="lg:w-3/4">
            {activeTab === 'account' && (
              <div className="bg-gray-900 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">Account Information</h2>
                
                <div className="mb-6 pb-6 border-b border-gray-800">
                  <p className="text-gray-400 mb-1">Email</p>
                  <p className="text-white">user@example.com</p>
                </div>
                
                <div className="mb-6 pb-6 border-b border-gray-800">
                  <p className="text-gray-400 mb-1">Password</p>
                  <p className="text-white">••••••••</p>
                  <Button variant="secondary" size="sm" className="mt-2">
                    Change Password
                  </Button>
                </div>
                
                <div className="mb-6 pb-6 border-b border-gray-800">
                  <p className="text-gray-400 mb-1">Phone</p>
                  <p className="text-white">+1 (555) 123-4567</p>
                  <Button variant="secondary" size="sm" className="mt-2">
                    Update Phone
                  </Button>
                </div>
                
                <div>
                  <p className="text-gray-400 mb-1">Membership</p>
                  <p className="text-white">Active since January 2023</p>
                </div>
              </div>
            )}
            
            {activeTab === 'plan' && (
              <div className="bg-gray-900 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">Plan Details</h2>
                
                <div className="mb-6 pb-6 border-b border-gray-800">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-medium">Premium Plan</p>
                      <p className="text-gray-400">4K + HDR</p>
                    </div>
                    <Button variant="secondary" size="sm">
                      Change Plan
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {plans.map(plan => (
                    <div 
                      key={plan.id} 
                      className={`border rounded-lg p-4 ${plan.name === 'Premium' ? 'border-primary bg-gray-800' : 'border-gray-700'}`}
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
                
                <div>
                  <p className="text-gray-400 mb-1">Billing Information</p>
                  <p className="text-white">Next billing date: June 15, 2023</p>
                  <Button variant="secondary" size="sm" className="mt-2">
                    Update Payment Info
                  </Button>
                </div>
              </div>
            )}
            
            {activeTab === 'profiles' && (
              <div className="bg-gray-900 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-6">Manage Profiles</h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  {profiles.map(profile => (
                    <div key={profile.id} className="text-center">
                      <div className="mb-2 relative group">
                        <img 
                          src={profile.avatar} 
                          alt={profile.name} 
                          className="w-24 h-24 rounded-md object-cover mx-auto"
                        />
                        <div className="absolute inset-0 bg-black/50 rounded-md opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                      <p className="text-white">{profile.name}</p>
                    </div>
                  ))}
                  
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-md bg-gray-800 mx-auto flex items-center justify-center border-2 border-dashed border-gray-600 cursor-pointer hover:border-gray-400 transition-colors">
                      <span className="text-3xl text-gray-400">+</span>
                    </div>
                    <p className="text-gray-400 mt-2">Add Profile</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div className="bg-gray-900 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">Settings</h2>
                
                <div className="space-y-6">
                  <div className="pb-4 border-b border-gray-800">
                    <h3 className="text-white font-medium mb-2">Notifications</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-300">Email notifications</p>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="pb-4 border-b border-gray-800">
                    <h3 className="text-white font-medium mb-2">Playback Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-gray-300">Autoplay next episode</p>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-gray-300">Autoplay previews</p>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" checked />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pb-4 border-b border-gray-800">
                    <h3 className="text-white font-medium mb-2">Language Settings</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-300">Display language</p>
                      <select className="bg-gray-800 text-white rounded border border-gray-700 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                        <option>Japanese</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-white font-medium mb-2">Download Settings</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-300">Video download quality</p>
                      <select className="bg-gray-800 text-white rounded border border-gray-700 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>Standard</option>
                        <option>High</option>
                        <option>Best</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div className="bg-gray-900 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">Security Settings</h2>
                
                <div className="space-y-6">
                  <div className="pb-4 border-b border-gray-800">
                    <h3 className="text-white font-medium mb-2">Two-Factor Authentication</h3>
                    <p className="text-gray-400 mb-2">Add an extra layer of security to your account</p>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-300">Enable 2FA</p>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="pb-4 border-b border-gray-800">
                    <h3 className="text-white font-medium mb-2">Recent Account Access</h3>
                    <div className="space-y-3 mt-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-white">Mac OS X - Chrome</p>
                          <p className="text-gray-400 text-sm">New York, USA - Today, 10:30 AM</p>
                        </div>
                        <span className="text-green-500 text-sm">This Device</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-white">Windows 10 - Firefox</p>
                          <p className="text-gray-400 text-sm">Chicago, USA - Yesterday, 7:42 PM</p>
                        </div>
                        <button className="text-primary text-sm">Sign Out</button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-white">iOS - Safari</p>
                          <p className="text-gray-400 text-sm">Boston, USA - May 4, 2025, 3:15 PM</p>
                        </div>
                        <button className="text-primary text-sm">Sign Out</button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-white font-medium mb-2">Account Security</h3>
                    <Button variant="secondary" size="sm" className="mb-2">
                      Change Password
                    </Button>
                    <p className="text-gray-400 text-sm">Last password change: 45 days ago</p>
                    
                    <Button variant="secondary" size="sm" className="mt-4 mb-2">
                      Sign out of all devices
                    </Button>
                    <p className="text-gray-400 text-sm">This will sign you out from all devices except this one.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;