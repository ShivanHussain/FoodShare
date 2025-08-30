import {
  TrendingUp,
  Users,
  Package,
  Leaf,
} from 'lucide-react';

// Enhanced Impact Summary Component
export const EnhancedImpactSummary = ({  totalMeals, totalPickups, wasteReduced, co2Saved, }) => {
  const impactMetrics = [
    {
      title: 'Meals Distributed',
      value: totalMeals || 0,
      icon: Package,
      gradient: 'from-blue-500 to-blue-600',
      change: '+12%',
      description: 'Nutritious meals for the needy'
    },
    {
      title: 'Total Pickups',
      value: totalPickups || 0,
      icon: Users,
      gradient: 'from-green-500 to-green-600',
      change: '+8%',
      description: 'Food pickup operations completed '
    },
    {
      title: 'Waste Reduced',
      value: wasteReduced ? `${wasteReduced} kg` : '0 kg',
      icon: Leaf,
      gradient: 'from-emerald-500 to-emerald-600',
      change: '+15%',
      description: 'Food waste prevented from landfills'
    },
    {
      title: 'CO₂ Saved',
      value: co2Saved ? `${co2Saved} kg` : '0 kg',
      icon: TrendingUp,
      gradient: 'from-purple-500 to-purple-600',
      change: '+18%',
      description: 'Carbon footprint reduction achieved'
    }
  ];

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {impactMetrics.map((metric, index) => (
          <div key={index} className={`group bg-gradient-to-br ${metric.gradient} rounded-2xl p-6 shadow-xl border-2 border-white/20 hover:shadow-2xl hover:scale-105 transition-all duration-300`}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <metric.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-white/80 text-sm font-medium">
                <span className="bg-white/20 px-2 py-1 rounded-full">{metric.change}</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">{metric.value}</div>
              <div className="text-white/90 font-medium">{metric.title}</div>
              <div className="text-white/70 text-sm mt-2">{metric.description}</div>
            </div>
            <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white/40 rounded-full animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};