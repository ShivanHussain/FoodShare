
// components/schedulePickups/SchedulePickupHeader.jsx
import React from 'react'
import { Calendar } from 'lucide-react';

function SchedulePickupHeader() {
    return (
        <div className="bg-gradient-to-r from-white to-blue-50/80 backdrop-blur-xl rounded-xl lg:rounded-2xl 
                      p-4 sm:p-5 lg:p-6 shadow-lg border border-blue-100/50">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                <div className="flex-1">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3">
                        <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg lg:rounded-xl shadow-md">
                            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <span className="leading-tight">
                            <span className="block sm:inline">Scheduled</span>
                            <span className="block sm:inline sm:ml-2">Pickups</span>
                        </span>
                    </h1>
                    <p className="text-gray-600 mt-2 text-sm sm:text-base lg:text-lg">
                        Manage and track your food collection schedule
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SchedulePickupHeader;