import React from 'react'
import { Mail, Lock, Eye, EyeOff, Heart, Utensils, Users, MapPin, ArrowRight, Leaf, Sparkles } from 'lucide-react';
// Left Side 
function LoginData() {
    return (
        <>
            <div className="lg:w-2/5 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 p-8 lg:p-12 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>

                {/* Animated Background Patterns */}
                <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

                <div className="relative z-10 h-full flex flex-col justify-center">
                    <div className="flex items-center mb-8">
                        <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                            <Heart className="w-10 h-10 text-white" />
                        </div>
                        <div className="ml-4">
                            <h1 className="text-3xl font-bold">FoodShare</h1>
                            <p className="text-green-100 text-sm">Waste Less, Share More</p>
                        </div>
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                        Welcome Back!
                    </h2>

                    <p className="text-green-100 mb-8 text-lg leading-relaxed">
                        Continue your journey to reduce food waste and make a positive impact in your community.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                            <div className="text-2xl font-bold">2.5K+</div>
                            <div className="text-green-100 text-sm">Meals Donated</div>
                        </div>
                        <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                            <div className="text-2xl font-bold">150+</div>
                            <div className="text-green-100 text-sm">Active Partners</div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center">
                            <div className="bg-white/20 p-2 rounded-lg">
                                <Utensils className="w-5 h-5" />
                            </div>
                            <span className="ml-3">Real-time donation tracking</span>
                        </div>
                        <div className="flex items-center">
                            <div className="bg-white/20 p-2 rounded-lg">
                                <Users className="w-5 h-5" />
                            </div>
                            <span className="ml-3">Instant NGO connections</span>
                        </div>
                        <div className="flex items-center">
                            <div className="bg-white/20 p-2 rounded-lg">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <span className="ml-3">Smart pickup routing</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginData;
