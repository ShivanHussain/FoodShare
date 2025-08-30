import React, { useEffect, useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Users, Clock, Thermometer, Eye, Heart, Truck, MapPin, Phone, FileText } from 'lucide-react';
import Loader from '../components/Loader';
import { guidelines } from '../constants/SafetyGuideline/guidelines';
import { emergencyContacts } from '../constants/SafetyGuideline/emergencyContacts';

const SafetyGuidelines = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
 


  if (isLoading) {
    return <Loader />
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
                <Shield className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 text-white" />
              </div>
            </div>
            
            {/* Typography */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Food Safety
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent block sm:inline"> Guidelines</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto px-2 sm:px-0 leading-relaxed">
              Ensuring safe and nutritious food reaches those in need. Follow these essential guidelines to maintain food quality and safety throughout the donation process.
            </p>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto shadow-xl">
              <div className="flex items-center justify-center mb-3 sm:mb-4">
                <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-orange-500 mr-2 sm:mr-3" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Important Notice</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Food safety is our top priority. All donors and NGOs must follow these guidelines to ensure the health and safety of recipients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Guidelines Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Essential <span className="text-green-600">Safety Guidelines</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-2 sm:px-0 leading-relaxed">
              Follow these comprehensive guidelines to ensure food safety from donation to distribution
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {guidelines.map((guideline, index) => (
              <div key={index} className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl lg:shadow-2xl overflow-hidden hover:shadow-2xl lg:hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2">
                <div className={`bg-gradient-to-r ${guideline.color} p-4 sm:p-5 md:p-6`}>
                  <div className="flex items-center">
                    <div className="bg-white/20 backdrop-blur-sm p-2 sm:p-2.5 md:p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                      {React.cloneElement(guideline.icon, { 
                        className: "w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" 
                      })}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight">{guideline.title}</h3>
                      <p className="text-sm sm:text-base text-white/90 leading-relaxed mt-1">{guideline.description}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-5 md:p-6">
                  <ul className="space-y-2 sm:space-y-3">
                    {guideline.points.map((point, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Flow Section  */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-r from-green-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Safe Donation Process
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-green-100 max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-2 sm:px-0 leading-relaxed">
              Step-by-step process to ensure safe food donation from start to finish
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 hover:bg-white/30 transition-all duration-300">
                <FileText className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-green-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">1. Inspect & Log</h3>
              <p className="text-sm sm:text-base text-green-100 leading-relaxed">Thoroughly inspect food quality and log with detailed information</p>
            </div>

            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 hover:bg-white/30 transition-all duration-300">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-blue-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">2. Package Safely</h3>
              <p className="text-sm sm:text-base text-green-100 leading-relaxed">Use proper containers and maintain temperature control</p>
            </div>

            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 hover:bg-white/30 transition-all duration-300">
                <Truck className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-purple-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">3. Quick Transport</h3>
              <p className="text-sm sm:text-base text-green-100 leading-relaxed">Ensure rapid pickup and delivery to maintain freshness</p>
            </div>

            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="bg-white/20 backdrop-blur-sm w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 hover:bg-white/30 transition-all duration-300">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-pink-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">4. Safe Distribution</h3>
              <p className="text-sm sm:text-base text-green-100 leading-relaxed">Final quality check before serving to recipients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contacts Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl lg:shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-4 sm:p-6 md:p-8 text-white">
              <div className="flex flex-col sm:flex-row items-center justify-center mb-3 sm:mb-4">
                <Phone className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-2 sm:mb-0 sm:mr-4" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center sm:text-left">Emergency Contacts</h2>
              </div>
              <p className="text-center text-base sm:text-lg md:text-xl text-red-100 leading-relaxed">
                In case of food safety concerns or emergencies, contact these numbers immediately
              </p>
            </div>

            <div className="p-4 sm:p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover:shadow-lg transition-all duration-300">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 leading-tight">{contact.type}</h3>
                    <p className={`text-xl sm:text-2xl font-bold ${contact.color} break-all`}>{contact.number}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Tips Section Grid */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Additional <span className="text-green-600">Safety Tips</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300">
              <Users className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Training</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Ensure all staff handling food donations are properly trained in food safety protocols.</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300">
              <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Location Tracking</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Use GPS tracking to monitor food location and ensure timely delivery to recipients.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-1">
              <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Report Issues</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">Immediately report any food safety concerns through our platform or emergency contacts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-3 sm:px-4 md:px-6 lg:px-8">
          <Shield className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-4 sm:mb-6 md:mb-8 text-green-200" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
            Safety First, Always
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-green-100 max-w-2xl mx-auto leading-relaxed">
            By following these guidelines, we ensure that every donation is safe, nutritious, and reaches those who need it most.
          </p>
        </div>
      </section>
    </div>
  );
};

export default SafetyGuidelines;