import React from 'react';
import {  MapPin, Clock,Heart, } from 'lucide-react';

function QuickInsights({loading, performanceMetrics}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                <div className="flex items-center mb-4">
                    <Clock className="w-8 h-8 mr-3" />
                    <h4 className="text-lg font-bold">Avg Response Time</h4>
                </div>
                {loading.performance ? (
                    <div className="animate-pulse">
                        <div className="h-8 bg-blue-400 rounded mb-2 w-16"></div>
                        <div className="h-4 bg-blue-400 rounded w-32"></div>
                    </div>
                ) : (
                    <>
                        <p className="text-3xl font-bold mb-2">{performanceMetrics.avgResponseTime} min</p>
                        <p className="text-blue-100">From listing to pickup</p>
                    </>
                )}
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
                <div className="flex items-center mb-4">
                    <MapPin className="w-8 h-8 mr-3" />
                    <h4 className="text-lg font-bold">Coverage Area</h4>
                </div>
                {loading.performance ? (
                    <div className="animate-pulse">
                        <div className="h-8 bg-green-400 rounded mb-2 w-16"></div>
                        <div className="h-4 bg-green-400 rounded w-32"></div>
                    </div>
                ) : (
                    <>
                        <p className="text-3xl font-bold mb-2">{performanceMetrics.coverageArea} km²</p>
                        <p className="text-green-100">Active service zones</p>
                    </>
                )}
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
                <div className="flex items-center mb-4">
                    <Heart className="w-8 h-8 mr-3" />
                    <h4 className="text-lg font-bold">Success Rate</h4>
                </div>
                {loading.performance ? (
                    <div className="animate-pulse">
                        <div className="h-8 bg-purple-400 rounded mb-2 w-16"></div>
                        <div className="h-4 bg-purple-400 rounded w-32"></div>
                    </div>
                ) : (
                    <>
                        <p className="text-3xl font-bold mb-2">{performanceMetrics.successRate}%</p>
                        <p className="text-purple-100">Successful donations</p>
                    </>
                )}
            </div>
        </div>
    )
}

export default QuickInsights;
