import React, { useEffect, useState } from 'react';
import { Heart, Users, Building2, ArrowRight, CheckCircle, Clock, Camera, Bell, Route, Smartphone, Brain, Cloud, Shield, Star, Award, TrendingUp, Zap } from 'lucide-react';
import { workflowSteps } from '../constants/HowItWorks/workflowSteps';
import { features } from '../constants/HowItWorks/features'
import { donorFlow } from '../constants/HowItWorks/donorFlow';
import { ngoFlow } from '../constants/HowItWorks/ngoFlow';
import { stats } from '../constants/HowItWorks/Stats';
import Loader from '../components/Loader';


const HowItWorksPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeUserType, setActiveUserType] = useState('donor');
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
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-40 sm:w-72 h-40 sm:h-72 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-48 sm:w-80 h-48 sm:h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center items-center mb-4 sm:mb-6">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 sm:p-3 md:p-4 rounded-full shadow-lg animate-bounce">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
              How It <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Works</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-2">
              Our smart platform seamlessly connects food donors with NGOs through AI-powered matching, real-time notifications, and intelligent route optimization.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-8 sm:mt-12">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex flex-col items-center">
                      <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 sm:p-3 rounded-full mb-2 sm:mb-3">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                      <div className="text-xs sm:text-sm text-gray-600 text-center">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Workflow  */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 px-2">
              Complete <span className="text-green-600">Workflow</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-2">
              Click on each step to learn more about our intelligent food donation process
            </p>
          </div>
          
          {/* Workflow Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
            {workflowSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  className={`bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                    activeStep === index ? 'ring-2 sm:ring-4 ring-green-500 shadow-2xl' : 'hover:shadow-xl'
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className={`bg-gradient-to-r ${step.color} w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-3 sm:mb-4`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex items-center mb-2">
                    <div className="bg-gray-200 text-gray-700 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mr-2 sm:mr-3">
                      {step.id}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{step.description}</p>
                  {activeStep === index && (
                    <div className="border-t pt-3 sm:pt-4 animate-fadeIn">
                      <p className="text-xs sm:text-sm text-gray-500">{step.details}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section  */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 px-2">
              Key <span className="text-green-600">Features</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-2">
              Advanced technology meets social impact
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`bg-gradient-to-r ${feature.color} w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6`}>
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* User Type Flows */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 px-2">
              User <span className="text-green-600">Journeys</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-2">
              Different pathways for donors and NGOs to maximize impact
            </p>
          </div>
          
          {/* User Type Selector  */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="bg-white rounded-full p-1 sm:p-2 shadow-lg">
              <button
                onClick={() => setActiveUserType('donor')}
                className={`px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
                  activeUserType === 'donor'
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                For Donors
              </button>
              <button
                onClick={() => setActiveUserType('ngo')}
                className={`px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
                  activeUserType === 'ngo'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                For NGOs
              </button>
            </div>
          </div>
          
          {/* Flow Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {(activeUserType === 'donor' ? donorFlow : ngoFlow).map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className={`${
                      activeUserType === 'donor' ? 'bg-green-500' : 'bg-blue-500'
                    } w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-3 sm:mb-4`}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex items-center mb-2">
                      <div className={`${
                        activeUserType === 'donor' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      } w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mr-2 sm:mr-3`}>
                        {step.step}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900">{step.title}</h3>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600">{step.description}</p>
                  </div>
                  {index < (activeUserType === 'donor' ? donorFlow : ngoFlow).length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                      <div className={`${
                        activeUserType === 'donor' ? 'bg-green-500' : 'bg-blue-500'
                      } w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-lg`}>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                    </div>
                  )}
                  {/* Mobile Arrow */}
                  {index < (activeUserType === 'donor' ? donorFlow : ngoFlow).length - 1 && (
                    <div className="lg:hidden flex justify-center my-2">
                      <div className={`${
                        activeUserType === 'donor' ? 'bg-green-500' : 'bg-blue-500'
                      } w-6 h-6 rounded-full flex items-center justify-center shadow-lg transform rotate-90`}>
                        <ArrowRight className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-6 px-2">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg sm:text-xl text-green-100  sm:mb-8 px-2">
              Join thousands of donors and NGOs already using our platform to fight food waste and hunger.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;