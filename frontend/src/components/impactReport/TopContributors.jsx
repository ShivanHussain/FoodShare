
import {
  Users,
  Heart
} from 'lucide-react';

// Top Contributors Component
export const TopContributors = () => {
  const topDonors = [
    { name: 'Green Garden Restaurant', meals: 456, pickups: 23 },
    { name: 'Fresh Mart Supermarket', meals: 387, pickups: 19 },
    { name: 'Pizza Corner', meals: 298, pickups: 15 },
    { name: 'Sharma Family', meals: 234, pickups: 28 },
    { name: 'Cafe Coffee Day', meals: 198, pickups: 12 }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20">
      <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
          <Heart className="w-5 h-5 text-white" />
        </div>
        Top Contributors
      </h3>
      <div className="space-y-4">
        {topDonors.map((donor, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                {index + 1}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{donor.name}</p>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {donor.pickups} pickups
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-purple-700 text-lg">{donor.meals}</p>
              <p className="text-sm text-gray-600">meals</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};