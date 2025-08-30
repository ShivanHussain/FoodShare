import React from 'react';
import { Utensils, Clock, MapPin, Shield} from 'lucide-react'

function QucikState() {
    return (
        <section className="py-12 bg-white/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Utensils className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Smart Logging</h3>
                        <p className="text-sm text-gray-600">AI-powered food tracking</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Clock className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Real-time</h3>
                        <p className="text-sm text-gray-600">Instant notifications</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                            <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Smart Routes</h3>
                        <p className="text-sm text-gray-600">Optimized pickups</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Safe & Secure</h3>
                        <p className="text-sm text-gray-600">Quality assured</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default QucikState;
