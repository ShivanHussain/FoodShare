/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Heart, Utensils, Users, MapPin, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser, clearError } from '../redux/slices/authSlice';
import TermsAndCondition from '../components/TermsAndCondition';
import PrivacyAndPolicy from '../components/PrivacyAndPolicy';

// components
import RoleSelection from '../components/signup/RoleSelection';
import BasicInformation from '../components/signup/BasicInformation';
import SecurityAndLocation from '../components/signup/SecurityAndLocation';
import SideInfoBrand from '../components/signup/SideInfoBrand';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    role: '',
    // NGO specific fields
    registrationNumber: '',
    organizationName: '',
    // User specific fields
    avatar: null
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarUpload = (file) => {
    setFormData({
      ...formData,
      avatar: file
    });
  };

  const handleRemoveAvatar = () => {
    setFormData({
      ...formData,
      avatar: null
    });
  };

  const handleRoleSelect = (role) => {
    setFormData({
      ...formData,
      role: role
    });
    setCurrentStep(2);
  };

  const handleTermsChange = (checked) => {
    setAgreeToTerms(checked);
  };

  useEffect(() => {
    if (success) {
      navigate("/login");
    }
    if (error) {
      dispatch(clearError());
    }
  }, [success, error, navigate, dispatch]);

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!agreeToTerms) {
      toast.error("Please agree to the Terms and Conditions to continue.");
      return;
    }

    try {
      // Create FormData object for file upload
      const submitData = new FormData();
      // Common fields for both user and NGO
      const commonFields = ['name', 'email', 'password', 'phone', 'address'];
      commonFields.forEach(field => {
        if (formData[field]) {
          submitData.append(field, formData[field]);
        }
      });

      if (formData.role === 'ngo') {
        // NGO specific fields
        submitData.append('role', 'ngo');
        submitData.append('registrationNumber', formData.registrationNumber);
        submitData.append('organizationName', formData.organizationName);

        // Add avatar for NGO if uploaded
        if (formData.avatar) {
          submitData.append('avatar', formData.avatar);
        }
      } else {
        // User specific fields
        submitData.append('role', formData.role);
        if (formData.avatar) {
          submitData.append('avatar', formData.avatar);
        }
      }
      // Pass submitData (FormData) instead of formData
      dispatch(registerUser(submitData));

    } catch (err) {
      toast.error('Registration failed. Please try again.');
      dispatch(clearError());
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Modal Component
  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-white bg-opacity-10 flex items-center justify-center z-50 p-4 ">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {children}
          </div>
          <div className="p-6 border-t bg-gray-50">
            <button
              onClick={onClose}
              className="w-full py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold "
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-400 rounded-full"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-emerald-400 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-teal-400 rounded-full"></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-green-400 rounded-full"></div>
      </div>

      <div className="relative w-full max-w-4xl">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          <div className="flex flex-col lg:flex-row">

            {/* Left Side - Brand & Info */}
            <SideInfoBrand/>

            {/* Right Side - Signup Form */}
            <div className="lg:w-3/5 p-8 lg:p-12">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${currentStep >= step
                          ? 'bg-green-600 border-green-600 text-white'
                          : 'border-gray-300 text-gray-400'
                        }`}
                    >
                      {step}
                    </div>
                  ))}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-600 to-emerald-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  ></div>
                </div>
              </div>

              {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-6">
                {/* Step 1: Role Selection */}
                {currentStep === 1 && (
                  <RoleSelection onRoleSelect={handleRoleSelect} />
                )}

                {/* Step 2: Basic Information */}
                {currentStep === 2 && (
                  <BasicInformation
                    formData={formData}
                    onInputChange={handleInputChange}
                    onNext={nextStep}
                    onPrev={prevStep}
                    onAvatarUpload={handleAvatarUpload}
                    onRemoveAvatar={handleRemoveAvatar}
                  />
                )}

                {/* Step 3: Security & Location */}
                {currentStep === 3 && (
                  <SecurityAndLocation
                    formData={formData}
                    onInputChange={handleInputChange}
                    onPrev={prevStep}
                    onSubmit={handleSubmit}
                    loading={loading}
                    agreeToTerms={agreeToTerms}
                    onTermsChange={handleTermsChange}
                    onShowTerms={() => setShowTermsModal(true)}
                    onShowPrivacy={() => setShowPrivacyModal(true)}
                  />
                )}
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Already have an account?
                  <a href="/login" className="text-green-600 hover:underline cursor-pointer font-semibold ml-1">
                    Sign In
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Conditions Modal */}
      <Modal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        title="Terms and Conditions"
      >
        <TermsAndCondition />
      </Modal>
      <Modal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
        title="Privacy Policy"
      >
        <PrivacyAndPolicy />
      </Modal>
    </div>
  );
}