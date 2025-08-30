import {
  TrendingUp,
  Users,
  Package,
  Clock,
  Award,
  Leaf,
} from 'lucide-react';

// Impact Metrics Grid Component
export const ImpactMetricsGrid = ({ totalMeals, totalPickups, wasteReduced, co2Saved, moneySaved, avgResponseTime }) => {
  const impactMetrics = [
    {
      title: 'Meals Distributed',
      value: totalMeals || 0,
      icon: Package,
      color: 'text-blue-600 bg-blue-100',
      gradient: 'from-blue-500 to-blue-600',
      change: '+12%',
      description: 'Nutritious meals provided to those in need'
    },
    {
      title: 'Total Pickups',
      value: totalPickups || 0,
      icon: Users,
      color: 'text-green-600 bg-green-100',
      gradient: 'from-green-500 to-green-600',
      change: '+8%',
      description: 'Food pickup operations completed'
    },
    {
      title: 'Waste Reduced',
      value: wasteReduced ? `${wasteReduced} kg` : '0 kg',
      icon: Leaf,
      color: 'text-emerald-600 bg-emerald-100',
      gradient: 'from-emerald-500 to-emerald-600',
      change: '+15%',
      description: 'Food waste prevented from landfills'
    },
    {
      title: 'CO₂ Saved',
      value: co2Saved ? `${co2Saved} kg` : '0 kg',
      icon: TrendingUp,
      color: 'text-purple-600 bg-purple-100',
      gradient: 'from-purple-500 to-purple-600',
      change: '+18%',
      description: 'Carbon footprint reduction achieved'
    },
    {
      title: 'Money Value Saved',
      value: moneySaved ? `₹${moneySaved.toLocaleString()}` : '₹0',
      icon: Award,
      color: 'text-orange-600 bg-orange-100',
      gradient: 'from-orange-500 to-orange-600',
      change: '+10%',
      description: 'Economic value of food rescued'
    },
    {
      title: 'Avg Response Time',
      value: avgResponseTime ? `${avgResponseTime} min` : '0 min',
      icon: Clock,
      color: 'text-red-600 bg-red-100',
      gradient: 'from-red-500 to-red-600',
      change: '-5%',
      description: 'Average pickup response time'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {impactMetrics.map((metric, index) => (
        <div key={index} className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl ${metric.color}`}>
              <metric.icon className="w-6 h-6" />
            </div>
            <span className={`text-sm font-medium px-2 py-1 rounded-full ${
              metric.change.includes('+') ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
            }`}>
              {metric.change}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">{metric.title}</h3>
          <p className="text-2xl font-bold text-gray-800 mb-2">{metric.value}</p>
          <p className="text-xs text-gray-500">{metric.description}</p>
        </div>
      ))}
    </div>
  );
};