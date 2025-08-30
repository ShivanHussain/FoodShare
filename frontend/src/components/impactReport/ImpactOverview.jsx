

import {
  TrendingUp,
  Users,
  Package,
  Clock,
  Award,
  Heart,
  Leaf,
  Activity
} from 'lucide-react';
// Impact Overview Component
export const ImpactOverview = ({ totalMeals, totalPickups, wasteReduced, co2Saved, moneySaved }) => {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
            <Activity className="w-5 h-5 text-white" />
          </div>
          Impact Overview
        </h3>
      </div>
      
      <div className="space-y-6">
        {/* Meals Impact */}
        <div className="group bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 hover:from-blue-100 hover:to-blue-150 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800">Meals Distributed</h4>
                <span className="text-2xl font-bold text-blue-700">
                  {totalMeals ? totalMeals.toLocaleString() : '0'}
                </span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: '85%' }}
                ></div>
              </div>
              <p className="text-sm text-blue-700 mt-1">Feeding families across the community</p>
            </div>
          </div>
        </div>

        {/* Pickups Impact */}
        <div className="group bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 hover:from-green-100 hover:to-green-150 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800">Food Pickups</h4>
                <span className="text-2xl font-bold text-green-700">
                  {totalPickups || '0'}
                </span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: '70%' }}
                ></div>
              </div>
              <p className="text-sm text-green-700 mt-1">Successful food rescue operations</p>
            </div>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="group bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl p-4 hover:from-emerald-100 hover:to-emerald-150 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800">Waste Prevented</h4>
                <span className="text-2xl font-bold text-emerald-700">
                  {wasteReduced ? `${wasteReduced} kg` : '0 kg'}
                </span>
              </div>
              <div className="w-full bg-emerald-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: '92%' }}
                ></div>
              </div>
              <p className="text-sm text-emerald-700 mt-1">Protecting our environment together</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Stats Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-sm text-gray-600">CO₂ Saved</div>
            <div className="text-lg font-bold text-purple-700">
              {co2Saved ? `${co2Saved} kg` : '0 kg'}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-600">Value Rescued</div>
            <div className="text-lg font-bold text-orange-700">
              ₹{moneySaved ? moneySaved.toLocaleString() : '0'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};