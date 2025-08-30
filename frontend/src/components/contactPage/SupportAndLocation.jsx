// Support Hours & Location  (contact page)

import React from 'react'
import { Mail, MapPin, Clock, Globe } from 'lucide-react';
function SupportAndLocation() {
    return (
        <section className="py-20 bg-white/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8">
                        <div className="flex items-center mb-6">
                            <div className="bg-green-500 p-3 rounded-full mr-4">
                                <Clock className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">Support Hours</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-gray-700">Phone Support:</span>
                                <span className="font-semibold text-gray-900">24/7 Hrs</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-700">Email Support:</span>
                                <span className="font-semibold text-gray-900">24/7 Hrs</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-700">Live Chat:</span>
                                <span className="font-semibold text-gray-900">9 AM - 6 PM</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-700">Emergency Line:</span>
                                <span className="font-semibold text-red-600">24/7 Hrs</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8">
                        <div className="flex items-center mb-6">
                            <div className="bg-blue-500 p-3 rounded-full mr-4">
                                <MapPin className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">Office Location</h3>
                        </div>
                        <div className="space-y-4">
                            <p className="text-gray-700">
                                <strong>FoodShare Technologies</strong><br />
                                Tech Park, Civil Lines<br />
                                Bareilly, Uttar Pradesh 243001<br />
                                India

                            </p>
                            <div className="flex items-center text-gray-700">
                                <Globe className="w-5 h-5 mr-2" />
                                <span>www.foodshare.com</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                                <Mail className="w-5 h-5 mr-2" />
                                <span>hello@foodshare.com</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SupportAndLocation;
