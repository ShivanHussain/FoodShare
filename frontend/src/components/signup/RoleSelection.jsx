import React from 'react';
import { Utensils, Users } from 'lucide-react';

const RoleSelection = ({ onRoleSelect }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Role</h3>
        <p className="text-gray-600">How would you like to contribute?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onRoleSelect('donor')}
          className="group p-6 border-2 border-gray-200 rounded-2xl hover:border-green-500 hover:bg-green-50 transition-all duration-300 text-left"
        >
          <div className="flex items-center mb-4">
            <div className="bg-green-100 group-hover:bg-green-200 p-3 rounded-xl transition-colors">
              <Utensils className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="ml-3 font-semibold text-gray-800">Food Donor</h4>
          </div>
          <p className="text-gray-600 text-sm">
            Restaurant, grocery store, or household wanting to donate excess food
          </p>
        </button>

        <button
          type="button"
          onClick={() => onRoleSelect('ngo')}
          className="group p-6 border-2 border-gray-200 rounded-2xl hover:border-green-500 hover:bg-green-50 transition-all duration-300 text-left"
        >
          <div className="flex items-center mb-4">
            <div className="bg-emerald-100 group-hover:bg-emerald-200 p-3 rounded-xl transition-colors">
              <Users className="w-6 h-6 text-emerald-600" />
            </div>
            <h4 className="ml-3 font-semibold text-gray-800">NGO / Food Bank</h4>
          </div>
          <p className="text-gray-600 text-sm">
            Organization working to distribute food to those in need
          </p>
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;