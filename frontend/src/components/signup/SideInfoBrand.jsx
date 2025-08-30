import React from 'react';
import { Heart, Utensils, Users, MapPin } from 'lucide-react';

function SideInfoBrand() {
    return (
        <div className="lg:w-2/5 bg-gradient-to-br from-green-600 to-emerald-700 p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
                <div className="flex items-center mb-8">
                    <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                        <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="ml-4 text-2xl font-bold">FoodShare</h1>
                </div>

                <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                    Join the Fight Against Food Waste
                </h2>

                <p className="text-green-100 mb-8 text-lg leading-relaxed">
                    Connect donors with those in need. Track donations, reduce waste, and make a real impact in your community.
                </p>

                <div className="space-y-4">
                    <div className="flex items-center">
                        <div className="bg-white/20 p-2 rounded-lg">
                            <Utensils className="w-5 h-5" />
                        </div>
                        <span className="ml-3">Track food donations in real-time</span>
                    </div>
                    <div className="flex items-center">
                        <div className="bg-white/20 p-2 rounded-lg">
                            <Users className="w-5 h-5" />
                        </div>
                        <span className="ml-3">Connect with local NGOs instantly</span>
                    </div>
                    <div className="flex items-center">
                        <div className="bg-white/20 p-2 rounded-lg">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <span className="ml-3">Smart routing for efficient pickup</span>
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
            <div className="absolute -top-5 -left-5 w-32 h-32 bg-white/10 rounded-full"></div>
        </div>
    )
}

export default SideInfoBrand;
