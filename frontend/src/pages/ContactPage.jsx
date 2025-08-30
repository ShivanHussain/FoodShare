import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, MapPin, Clock, Send, User, Building2, Heart, Headphones, Globe, Shield, Loader2 } from 'lucide-react';
import { submitContactForm, clearContactState } from '../redux/slices/contactSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { contactMethods } from '../constants/ContactPage/contactMethods';
import { faqTopics } from '../constants/ContactPage/faqTopics';
import SupportAndLocation from '../components/contactPage/SupportAndLocation';

const ContactSupport = () => {
  const dispatch = useDispatch();
  const { loading, successMessage, error } = useSelector(state => state.contactSupport);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Show toast when success or error message changes
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage)
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      // Auto hide toast after 3 seconds
      setTimeout(() => {
        dispatch(clearContactState());
      }, 3000);
    }
  }, [successMessage, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      // Auto hide toast after 3 seconds
      setTimeout(() => {
        dispatch(clearContactState());
      }, 3000);
    }
  }, [error, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(submitContactForm(formData));
    dispatch(clearContactState());
  };

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
                <Headphones className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white" />
              </div>
            </div>
            
            {/* Typography */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Contact
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent block sm:inline"> Support</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto px-2 sm:px-0 leading-relaxed">
              We're here to help! Whether you need technical assistance, have questions about food donation, or want to report an issue - our support team is ready to assist you 24/7.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Multiple Ways to <span className="text-green-600">Reach Us</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-2 sm:px-0 leading-relaxed">
              Choose the support method that works best for you
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl lg:shadow-2xl overflow-hidden hover:shadow-2xl lg:hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2">
                <div className={`bg-gradient-to-r ${method.color} p-4 sm:p-5 md:p-6 text-center`}>
                  <div className="bg-white/20 backdrop-blur-sm p-2 sm:p-2.5 md:p-3 rounded-full w-fit mx-auto mb-3 sm:mb-4">
                    {React.cloneElement(method.icon, { 
                      className: "w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" 
                    })}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">{method.title}</h3>
                </div>
                <div className="p-4 sm:p-5 md:p-6 text-center">
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">{method.description}</p>
                  <p className="font-bold text-gray-900 mb-2 text-sm sm:text-base break-all">{method.contact}</p>
                  <p className="text-xs sm:text-sm text-green-600 font-medium">{method.availability}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form*/}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-r from-green-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Send Us a Message
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-green-100 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto px-2 sm:px-0 leading-relaxed">
              Fill out the form below and we'll get back to you as soon as possible
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-white font-semibold mb-2 text-sm sm:text-base">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/30 focus:border-green-400 focus:outline-none disabled:opacity-50 text-sm sm:text-base"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2 text-sm sm:text-base">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/30 focus:border-green-400 focus:outline-none disabled:opacity-50 text-sm sm:text-base"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2 text-sm sm:text-base">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/30 focus:border-green-400 focus:outline-none disabled:opacity-50 text-sm sm:text-base"
                    placeholder="Brief description of your issue"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2 text-sm sm:text-base">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/30 focus:border-green-400 focus:outline-none resize-none disabled:opacity-50 text-sm sm:text-base sm:rows-6"
                    placeholder="Please provide detailed information about your inquiry or issue..."
                  />
                </div>
                
                <div className="text-center pt-2 sm:pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-white text-green-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Topics */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Common <span className="text-green-600">Help Topics</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-2 sm:px-0 leading-relaxed">
              Find quick answers to frequently asked questions
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {faqTopics.map((topic, index) => (
              <div key={index} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg sm:shadow-xl hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 cursor-pointer">
                <div className={`${topic.color} mb-3 sm:mb-4`}>
                  {React.cloneElement(topic.icon, { 
                    className: "w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" 
                  })}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">{topic.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{topic.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Hours & Location */}
      <div className="px-3 sm:px-4 md:px-6 lg:px-8">
        <SupportAndLocation />
      </div>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-3 sm:px-4 md:px-6 lg:px-8">
          <Heart className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-4 sm:mb-6 md:mb-8 text-green-200" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
            We're Here to Help You Make a Difference
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-green-100 max-w-2xl mx-auto leading-relaxed">
            Your success in reducing food waste and feeding communities is our priority. Don't hesitate to reach out whenever you need support.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ContactSupport;