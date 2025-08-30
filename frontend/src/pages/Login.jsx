import { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, Heart, Utensils, Users, MapPin, ArrowRight, Leaf, Sparkles } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoginData from '../components/LoginContent';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, success, userInfo, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (success && userInfo) {
      navigate('/');
    }

    if (error) {
      dispatch(clearError());
    }
  }, [error, success, userInfo, navigate, dispatch]);


  const handleLogin = () => {
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    dispatch(loginUser({ email: formData.email, password: formData.password }));
  };


  const handleForgetPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4 relative overflow-hidden">

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-emerald-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-teal-400/20 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-10 w-28 h-28 bg-green-400/20 rounded-full blur-xl animate-pulse delay-500"></div>

        {/* Floating Icons */}
        <div className="absolute top-1/4 left-1/4 animate-float">
          <Leaf className="w-8 h-8 text-green-300/40" />
        </div>
        <div className="absolute top-1/3 right-1/3 animate-float delay-1000">
          <Sparkles className="w-6 h-6 text-emerald-300/40" />
        </div>
        <div className="absolute bottom-1/4 right-1/4 animate-float delay-2000">
          <Heart className="w-7 h-7 text-teal-300/40" />
        </div>
      </div>

      <div className="relative w-full max-w-5xl">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/30">
          <div className="flex flex-col lg:flex-row min-h-[600px]">

            {/* Left Side - Welcome Back */}
            <LoginData />


            {/* Right Side - Login Form */}
            <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full">

                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h3>
                  <p className="text-gray-600">Access your dashboard and continue helping</p>
                </div>



                {/* Login Form */}
                <div className="space-y-6">

                  {/* Email Field */}
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-700 w-6 h-6 transition-colors group-focus-within:text-green-600 stroke-2" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                      required
                    />
                  </div>

                  {/* Password Field */}
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-700 w-6 h-6 transition-colors group-focus-within:text-green-600 stroke-2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        id="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                      />
                      <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    <button onClick={handleForgetPassword} className="text-sm text-green-600 hover:text-green-700 font-medium">
                      Forgot Password?
                    </button>
                  </div>

                  {/* Login Button */}
                  <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 font-semibold text-lg shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Signing In...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  {/* Social Login Options */}
                  <div className="space-y-3">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or sign in with</span>
                      </div>
                    </div>

                    {/*<div className="flex justify-center">
                      <button className="flex items-center justify-center gap-2 py-3 px-6 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                      </button>
                    </div>*/}
                  </div>
                </div>

                {/* Sign Up Link */}
                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    Don't have an account?
                    <a href='/signup' className="text-green-600 hover:text-green-700 font-semibold ml-1 hover:underline transition-colors">
                      Sign Up
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
        50% {
          transform: translateY(-20px);
        }
      }

      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
      `}</style>

    </div>
  );
}