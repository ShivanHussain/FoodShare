import React, { useState, useEffect } from 'react';
import { Heart, Users, MapPin, Truck, ChefHat, Building2, ArrowRight, CheckCircle, Clock, Globe, Target, Eye, Award, Zap } from 'lucide-react';
import Loader from '../components/Loader'

const AboutUsPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center items-center mb-4 sm:mb-6">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 sm:p-3 md:p-4 rounded-full shadow-lg">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
              About <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Our Mission</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-2">
              We're revolutionizing food donation by connecting surplus food with those in need through intelligent technology, real-time matching, and community-driven solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 px-2">
              The Challenge We're <span className="text-red-600">Solving</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">The Global Food Waste Crisis</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start">
                    <div className="bg-red-500 w-2 h-2 sm:w-3 sm:h-3 rounded-full mt-2 mr-3 sm:mr-4 flex-shrink-0"></div>
                    <p className="text-sm sm:text-base text-gray-700">Every day, tons of food are wasted in restaurants, supermarkets, and households worldwide</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-red-500 w-2 h-2 sm:w-3 sm:h-3 rounded-full mt-2 mr-3 sm:mr-4 flex-shrink-0"></div>
                    <p className="text-sm sm:text-base text-gray-700">Meanwhile, millions of people go to bed hungry every night</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-red-500 w-2 h-2 sm:w-3 sm:h-3 rounded-full mt-2 mr-3 sm:mr-4 flex-shrink-0"></div>
                    <p className="text-sm sm:text-base text-gray-700">Traditional donation systems are slow, disconnected, and prone to spoilage</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Our Solution</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start">
                    <div className="bg-green-500 w-2 h-2 sm:w-3 sm:h-3 rounded-full mt-2 mr-3 sm:mr-4 flex-shrink-0"></div>
                    <p className="text-sm sm:text-base text-gray-700">Real-time matching between food donors and NGOs using smart algorithms</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-500 w-2 h-2 sm:w-3 sm:h-3 rounded-full mt-2 mr-3 sm:mr-4 flex-shrink-0"></div>
                    <p className="text-sm sm:text-base text-gray-700">AI-powered freshness prediction to optimize pickup timing</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-500 w-2 h-2 sm:w-3 sm:h-3 rounded-full mt-2 mr-3 sm:mr-4 flex-shrink-0"></div>
                    <p className="text-sm sm:text-base text-gray-700">Automated notifications and route optimization for efficient distribution</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 sm:p-3 rounded-full mb-3 sm:mb-0 sm:mr-4">
                  <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                To create a world where no food goes to waste while people go hungry. We envision a future where technology seamlessly connects surplus food with those who need it most, creating sustainable communities and eliminating food insecurity.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 sm:p-3 rounded-full mb-3 sm:mb-0 sm:mr-4">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                To automate, track, and optimize food donation processes using cutting-edge technology. We empower restaurants, households, and NGOs with tools to reduce waste, feed communities, and create measurable social impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values  */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-green-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 px-2">
              Our Core Values
            </h2>
            <p className="text-lg sm:text-xl text-green-100 max-w-2xl mx-auto px-2">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Innovation</h3>
              <p className="text-sm sm:text-base text-green-100 px-2">Leveraging AI and technology to solve complex social problems</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Users className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Community</h3>
              <p className="text-sm sm:text-base text-green-100 px-2">Building bridges between donors and receivers</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-green-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Sustainability</h3>
              <p className="text-sm sm:text-base text-green-100 px-2">Promoting environmental responsibility through waste reduction</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-red-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Compassion</h3>
              <p className="text-sm sm:text-base text-green-100 px-2">Driven by empathy for those facing food insecurity</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack  */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 px-2">
              Powered by <span className="text-green-600">Advanced Technology</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-2">
              Our robust tech stack ensures reliability, scalability, and intelligent automation
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Frontend</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">React.js with Tailwind CSS for responsive, modern user interfaces</p>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                <span className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">React.js</span>
                <span className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">Tailwind</span>
                <span className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">Firebase</span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Backend</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">FastAPI for high-performance APIs with async support</p>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                <span className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">FastAPI</span>
                <span className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">PostgreSQL</span>
                <span className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">MongoDB</span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 sm:col-span-2 lg:col-span-1">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">AI & ML</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Machine learning for freshness prediction and optimization</p>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                <span className="bg-purple-100 text-purple-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">TensorFlow</span>
                <span className="bg-purple-100 text-purple-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">PyTorch</span>
                <span className="bg-purple-100 text-purple-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">OpenCV</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 px-2">
              Making a Real <span className="text-green-600">Impact</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 px-2">
              Our platform is designed to create measurable change in communities worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg lg:col-span-1">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Reduced Waste</h3>
              <p className="text-sm sm:text-base text-gray-600 px-2">Minimizing food wastage through intelligent matching</p>
            </div>
            
            <div className="text-center bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Real-time Response</h3>
              <p className="text-sm sm:text-base text-gray-600 px-2">Instant notifications for faster food distribution</p>
            </div>
            
            <div className="text-center bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg sm:col-span-2 lg:col-span-1">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Community Impact</h3>
              <p className="text-sm sm:text-base text-gray-600 px-2">Empowering NGOs and strengthening communities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 px-2">
            Join Our Mission
          </h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-green-100 px-2">
            Be part of the solution. Together, we can create a world without food waste and hunger.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href='/how-it-works' 
              className="inline-block border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-white hover:text-green-600 transition-all duration-300 mx-4"
            >
              Learn How It Works
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;