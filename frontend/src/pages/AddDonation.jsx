// AddDonationPage.js
import { useEffect, useState } from 'react';
import { ChefHat, CheckCircle, LoaderCircle } from 'lucide-react';
import { clearDonationError, createDonation } from '../redux/slices/donationSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import ReviewYourDonation from '../components/addDonation/ReviewYourDonation';
import FoodDetailsForm from '../components/addDonation/FoodDetailsForm';
import ContactLocationForm from '../components/addDonation/ContactLocationForm';

const AddDonationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success, error } = useSelector((state) => state.donation);
  const { userInfo } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    foodType: '',
    category: '',
    foodPreference: '', // Veg/Non-Veg
    quantity: '',
    unit: 'kg',
    description: '',
    servings: '',
    pickupAddress: '',
    contactPerson: userInfo?.name || '',
    contactPhone: userInfo?.phone || '',
    email: userInfo?.email || '',
    alternateContactNumber: '',
    expiryDate: '',
    expiryTime: '',
    foodCondition: '',
    images: []
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // Initialize page loading
  useEffect(() => {
    const initializePage = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (userInfo) {
          setFormData(prev => ({
            ...prev,
            contactPerson: userInfo.name || '',
            contactPhone: userInfo.phone || '',
            email: userInfo.email || ''
          }));
        }

        setPageLoading(false);
      } catch (error) {
        console.error('Error initializing page:', error);
        setPageLoading(false);
      }
    };

    initializePage();
  }, [userInfo]);

  // Handle success and error states
  useEffect(() => {
    if (success) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/my-donations");
        setFormData({
          foodType: '',
          category: '',
          foodPreference: '',
          quantity: '',
          unit: 'kg',
          description: '',
          servings: '',
          pickupAddress: '',
          contactPerson: userInfo?.name || '',
          contactPhone: userInfo?.phone || '',
          email: userInfo?.email || '',
          alternateContactNumber: '',
          expiryDate: '',
          expiryTime: '',
          foodCondition: '',
          images: []
        });
      }, 3000);
    }

    if (error) {
      dispatch(clearDonationError());
    }
  }, [success, error, dispatch, navigate, userInfo]);

  // Show loader while page is loading or submitting
  if (pageLoading) {
    return <Loader />;
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = new FormData();
    for (let key in formData) {
      if (key === 'images') {
        formData.images.forEach((file) => submissionData.append('images', file));
      } else {
        submissionData.append(key, formData[key]);
      }
    }

    dispatch(createDonation(submissionData));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-8">
      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-xs sm:max-w-md w-full text-center shadow-2xl transform animate-pulse">
            <div className="bg-green-500 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2">Donation Added Successfully!</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4">Nearby NGOs will be notified immediately.</p>
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-green-500 text-white px-4 sm:px-6 py-2 rounded-full hover:bg-green-600 transition-colors text-sm sm:text-base"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 shadow-lg">
            <ChefHat className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Add Food Donation</h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 px-4">Help reduce waste and feed communities by sharing your leftover food</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          {/* Desktop & Tablet Progress */}
          <div className="hidden sm:block">
            <div className="flex justify-between items-center mb-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${currentStep >= step
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-500'
                    }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`flex-1 h-2 mx-2 lg:mx-4 rounded-full transition-all duration-300 ${currentStep > step ? 'bg-gradient-to-r from-green-500 to-blue-500' : 'bg-gray-200'
                      }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs sm:text-sm font-medium text-gray-600">
              <span>Food Details</span>
              <span>Location & Contact</span>
              <span>Review & Submit</span>
            </div>
          </div>

          {/* Mobile Progress */}
          <div className="block sm:hidden">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${currentStep >= 1 ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>1</div>
                <div className={`w-8 h-1 rounded ${currentStep > 1 ? 'bg-gradient-to-r from-green-500 to-blue-500' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${currentStep >= 2 ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>2</div>
                <div className={`w-8 h-1 rounded ${currentStep > 2 ? 'bg-gradient-to-r from-green-500 to-blue-500' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${currentStep >= 3 ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>3</div>
              </div>
            </div>
            <div className="text-center">
              <span className="text-xs font-medium text-gray-600">
                {currentStep === 1 && "Food Details"}
                {currentStep === 2 && "Location & Contact"}
                {currentStep === 3 && "Review & Submit"}
              </span>
            </div>
          </div>
        </div>

        {/* Form  */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8">
          {/* Step 1: Food Details */}
          {currentStep === 1 && (
            // Food Details Components
            <FoodDetailsForm
              formData={formData}
              onInputChange={handleInputChange}
            />
          )}

          {/* Step 2: Location & Contact */}
          {currentStep === 2 && (
            // Contact And Location Form components
            <ContactLocationForm
              formData={formData}
              onInputChange={handleInputChange}
            />
          )}

          {/* Step 3: Review & Submit */}
          {currentStep === 3 && (
            // Review your Donation COmponents
            <ReviewYourDonation formData={formData} />
          )}

          {/* Navigation Buttons*/}
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-stretch pt-6 sm:pt-8 border-t border-gray-200 space-y-3 sm:space-y-0">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base ${currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              Previous
            </button>

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                Next Step →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center justify-center w-full sm:w-auto py-2 sm:py-3 px-6 sm:px-8 rounded-full font-semibold transition-all duration-300 bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-green-600 disabled:hover:to-emerald-600 disabled:transform-none text-sm sm:text-base"
              >
                {loading ? (
                  <>
                    <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Donation'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDonationPage;