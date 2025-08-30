// components/schedulePickups/SchedulePickupStatsGrid.jsx
import React from 'react';
import { Calendar, Truck, CheckCircle, AlertCircle } from 'lucide-react';
import SchedulePickupStatsCard from './SchedulePickupStatsCard';

function SchedulePickupStatsGrid({ pickups = [] }) {
  const stats = [
    { 
      label: 'Total Claimed', 
      value: pickups.length, 
      icon: Calendar, 
      color: 'text-blue-600 bg-blue-100' 
    },
    { 
      label: 'In Progress', 
      value: pickups.filter(p => p?.status === 'claimed').length, 
      icon: Truck, 
      color: 'text-orange-600 bg-orange-100' 
    },
    { 
      label: 'Completed', 
      value: pickups.filter(p => p?.status === 'picked-up').length, 
      icon: CheckCircle, 
      color: 'text-green-600 bg-green-100' 
    },
    { 
      label: 'Cancelled', 
      value: pickups.filter(p => p?.status === 'cancelled').length, 
      icon: AlertCircle, 
      color: 'text-red-600 bg-red-100' 
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat, index) => (
        <SchedulePickupStatsCard key={index} stat={stat} />
      ))}
    </div>
  );
}

export default SchedulePickupStatsGrid;
export { SchedulePickupStatsCard };