import React from 'react';
import { HelpCircle} from 'lucide-react'

function HeaderSection() {
    return (
        <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10"></div>
            <div className="relative max-w-4xl mx-auto text-center">
                <div className="flex justify-center items-center mb-6">
                    <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-full shadow-lg">
                        <HelpCircle className="w-12 h-12 text-white" />
                    </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Frequently Asked
                    <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> Questions</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Find answers to common questions about our Smart Food Waste & Donation Tracker platform
                </p>
            </div>
        </section>
    )
}

export default HeaderSection;
