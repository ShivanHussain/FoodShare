import React from 'react';

// Stats Card Component
function SchedulePickupStatsCard({ stat }) {
    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                </div>
            </div>
        </div>
    )
}

export default SchedulePickupStatsCard
