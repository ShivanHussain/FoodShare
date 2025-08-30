import React, { useEffect, useState } from 'react';
import { Shield, Eye, Users, Lock, Bell, FileText, Mail, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { sections } from '../constants/PrivacyAndPolicy/sections';

const PrivacyAndPolicy = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleContact = () => {
    navigate('/contact');
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header Section */}
      <section className="relative overflow-hidden py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center items-center mb-4 sm:mb-6">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 sm:p-3 md:p-4 rounded-full shadow-2xl">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white" />
              </div>
            </div>
            
            {/* Typography */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 leading-tight">
              Privacy &
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent block sm:inline"> Policy</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto px-2 sm:px-0 leading-relaxed">
              Your trust is essential to our mission. Learn how we protect your data while connecting food donors with those in need.
            </p>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto shadow-xl">
              <p className="text-xs sm:text-sm md:text-base text-gray-700">
                <strong>Last Updated:</strong> January 2025 | <strong className="block sm:inline">Effective Date:</strong> Upon registration
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {sections.map((section, index) => (
              <div key={index} className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl lg:shadow-2xl overflow-hidden hover:shadow-2xl lg:hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2">
                <div className={`bg-gradient-to-r ${section.color} p-4 sm:p-5 md:p-6`}>
                  <div className="flex items-center">
                    <div className="bg-white/20 backdrop-blur-sm p-2 sm:p-2.5 md:p-3 rounded-full mr-3 sm:mr-4 text-white flex-shrink-0">
                      {React.cloneElement(section.icon, { 
                        className: "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" 
                      })}
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight">{section.title}</h3>
                  </div>
                </div>
                <div className="p-4 sm:p-5 md:p-6">
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{section.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-r from-green-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
              Additional Information
            </h2>
          </div>

          {/* Grid for Additional Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 order-2 lg:order-1">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-green-400">Changes to This Policy</h3>
              <p className="text-sm sm:text-base text-green-100 mb-3 sm:mb-4 leading-relaxed">
                We may update this Privacy Policy to reflect changes in our practices or legal requirements.
                We'll notify users of significant changes via:
              </p>
              <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base text-green-100">
                <li>• Email notifications to registered users</li>
                <li>• In-app notifications on your dashboard</li>
                <li>• Updates on our website homepage</li>
              </ul>
              <p className="text-sm sm:text-base text-green-100 mt-3 sm:mt-4 leading-relaxed">
                Continued use of the platform after changes implies acceptance of the updated policy.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 order-1 lg:order-2">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-blue-400">Contact & Support</h3>
              <p className="text-sm sm:text-base text-green-100 mb-4 sm:mb-6 leading-relaxed">
                Have questions about your privacy or data? Our support team is here to help.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white mr-2 sm:mr-3 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-white break-all">support@foodshare.com</span>
                </div>
                <div className="flex items-start">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-white">
                    <span className="block sm:inline">Data Protection Officer:</span>
                    <span className="block sm:inline break-all"> privacy@foodshare.com</span>
                  </span>
                </div>
              </div>
              <button 
                onClick={handleContact} 
                className="mt-4 sm:mt-6 bg-white text-green-600 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-semibold hover:bg-gray-100 transition-colors w-full sm:w-auto"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Privacy Note */}
      <section className="py-8 sm:py-12 md:py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Technology & Privacy</h3>
              <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed">
                Our platform uses modern technologies including React.js, FastAPI, PostgreSQL, Firebase, and ML models (TensorFlow/PyTorch)
                to provide secure, efficient food donation services while maintaining your privacy.
              </p>
              
              {/* Grid for Tech Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="text-center p-3 sm:p-0">
                  <div className="bg-green-500 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <Lock className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 sm:mb-0">Encrypted Storage</h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">All data encrypted at rest and in transit</p>
                </div>
                
                <div className="text-center p-3 sm:p-0">
                  <div className="bg-blue-500 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 sm:mb-0">Role-Based Access</h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">Strict access controls for different user types</p>
                </div>
                
                <div className="text-center p-3 sm:p-0 sm:col-span-2 lg:col-span-1">
                  <div className="bg-purple-500 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <Bell className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 sm:mb-0">Secure Notifications</h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">Firebase messaging with privacy controls</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-3 sm:px-4 md:px-6 lg:px-8">
          <Shield className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-4 sm:mb-6 md:mb-8 text-green-200" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
            Privacy-First Food Donation
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-green-100 max-w-2xl mx-auto leading-relaxed">
            Your data is protected while you help reduce food waste and feed communities. Join our secure platform today.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyAndPolicy;