
// guidelines (Safety & Guideline)
import { Shield, Clock, Thermometer, Eye } from 'lucide-react';
export const guidelines = [
    {
        icon: <Thermometer className="w-8 h-8 text-white" />,
        title: "Food Temperature Control",
        description: "Maintain proper temperature during storage and transport",
        color: "from-red-500 to-pink-500",
        points: [
            "Keep hot foods above 140°F (60°C)",
            "Keep cold foods below 40°F (4°C)",
            "Use insulated containers for transport",
            "Monitor temperature with thermometers"
        ]
    },
    {
        icon: <Clock className="w-8 h-8 text-white" />,
        title: "Timing & Freshness",
        description: "Ensure food is donated within safe timeframes",
        color: "from-blue-500 to-cyan-500",
        points: [
            "Log food immediately after preparation",
            "Donate within 2 hours of preparation",
            "Check expiry dates before donation",
            "Use our ML freshness prediction"
        ]
    },
    {
        icon: <Eye className="w-8 h-8 text-white" />,
        title: "Visual Inspection",
        description: "Perform thorough visual checks before donation",
        color: "from-green-500 to-emerald-500",
        points: [
            "Check for signs of spoilage",
            "Ensure proper food appearance",
            "Take clear photos when logging",
            "Report any concerns immediately"
        ]
    },
    {
        icon: <Shield className="w-8 h-8 text-white" />,
        title: "Packaging & Hygiene",
        description: "Maintain cleanliness and proper packaging standards",
        color: "from-purple-500 to-pink-500",
        points: [
            "Use clean, food-grade containers",
            "Label all donated items clearly",
            "Maintain hand hygiene",
            "Use gloves when handling food"
        ]
    }
];