import React, { useEffect } from 'react';
import { Heart, Users, MapPin, Truck, ChefHat, Building2, ArrowRight, CheckCircle, Clock, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

const HomePage = () => {
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleRegister = () => {
    navigate("/signup")
  }

  useEffect(() => {
    if (userInfo) {
      dispatch(getCurrentUser());
    }

  }, [userInfo, dispatch]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center items-center mb-6">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-full shadow-lg">
                <Heart className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Bridge the Gap Between
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> Waste & Need</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform leftover food into hope. Connect restaurants and households with NGOs in real-time to reduce waste and feed communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!userInfo && (
                <>
                  <button onClick={handleRegister} className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Start Donating <ArrowRight className="inline ml-2 w-5 h-5" />
                  </button>
                  <button onClick={handleRegister} className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold text-lg border-2 border-green-500 hover:bg-green-50 transition-all duration-300">
                    Join as NGO
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">1.3B</h3>
              <p className="text-gray-600">Tons of food wasted globally</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">828M</h3>
              <p className="text-gray-600">People facing hunger</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Real-time</h3>
              <p className="text-gray-600">Food donation matching</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It <span className="text-green-600">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our smart platform makes food donation simple, efficient, and impactful
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <ChefHat className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">1. Log Food</h3>
                <p className="text-gray-600">Restaurants and households log leftover food with photos & details</p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">2. AI Analysis</h3>
                <p className="text-gray-600">ML models predict freshness and optimize pickup timing</p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">3. Match & Alert</h3>
                <p className="text-gray-600">Nearby NGOs receive instant notifications with location details</p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">4. Quick Pickup</h3>
                <p className="text-gray-600">Efficient route planning ensures fresh food reaches those in need</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-green-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Smart Features for Maximum Impact
            </h2>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Cutting-edge technology meets social responsibility
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
              <CheckCircle className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Real-time Notifications</h3>
              <p className="text-green-100">Instant alerts via Firebase ensure quick response times</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
              <MapPin className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Smart Routing</h3>
              <p className="text-green-100">AI-powered route optimization for efficient pickups</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
              <Globe className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Freshness Prediction</h3>
              <p className="text-green-100">ML models analyze food quality and shelf-life</p>
            </div>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Join Our <span className="text-green-600">Community</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you're a donor or receiver, become part of the solution
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-green-500 p-3 rounded-full mr-4">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">For Donors</h3>
              </div>
              <p className="text-gray-600 mb-6">Restaurants, supermarkets, and households can easily log surplus food and track donations.</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Simple food logging with photos
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Real-time pickup tracking
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Impact analytics dashboard
                </li>
              </ul>
              {!userInfo && (
                <button onClick={handleRegister} className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors">
                  Register as Donor
                </button>
              )}
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-blue-500 p-3 rounded-full mr-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">For NGOs</h3>
              </div>
              <p className="text-gray-600 mb-6">Food banks and charitable organizations can receive instant alerts and coordinate pickups.</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                  Instant donation alerts
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                  Optimized pickup routes
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                  Donation history tracking
                </li>
              </ul>
              {!userInfo && (
                <button onClick={handleRegister} className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors">
                  Join as NGO
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Join thousands of donors and NGOs already making an impact. Together, we can eliminate food waste and hunger.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!userInfo && (
              <button onClick={handleRegister} className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg">
                Get Started Today
              </button>
            )}
            <a href='/aboutus' className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-green-600 transition-all duration-300">
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;