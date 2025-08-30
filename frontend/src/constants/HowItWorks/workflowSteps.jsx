
//work Flow Steps (How it works page)

import { MapPin, Truck, ChefHat, Bell, Route, Brain } from 'lucide-react';
import Loader from '../../components/Loader';
export const workflowSteps = [
    {
      id: 1,
      title: "Food Logging",
      description: "Restaurants and households log leftover food with photos and details",
      icon: ChefHat,
      color: "from-green-500 to-emerald-500",
      details: "Users capture photos of surplus food, add quantity, expiry details, and location information through our intuitive mobile-first interface."
    },
    {
      id: 2,
      title: "AI Analysis",
      description: "ML models predict freshness and optimize pickup timing",
      icon: Brain,
      color: "from-blue-500 to-cyan-500",
      details: "Our computer vision algorithms analyze food images to determine freshness levels and predict optimal pickup windows for maximum food safety."
    },
    {
      id: 3,
      title: "Smart Matching",
      description: "System matches donations with nearby NGOs based on capacity and location",
      icon: MapPin,
      color: "from-purple-500 to-pink-500",
      details: "Intelligent algorithms consider NGO capacity, location proximity, food type preferences, and availability to ensure optimal matches."
    },
    {
      id: 4,
      title: "Instant Notifications",
      description: "Real-time alerts sent to qualified NGOs via Socket.io",
      icon: Bell,
      color: "from-orange-500 to-red-500",
      details: "Push notifications with detailed pickup information, including location, food type, quantity, and estimated pickup window are sent instantly."
    },
    {
      id: 5,
      title: "Route Optimization",
      description: "AI-powered route planning for efficient pickups",
      icon: Route,
      color: "from-indigo-500 to-purple-500",
      details: "Google Maps integration provides optimal routing, considering traffic conditions, multiple pickup points, and delivery destinations."
    },
    {
      id: 6,
      title: "Quick Pickup",
      description: "NGOs collect food and update pickup status in real-time",
      icon: Truck,
      color: "from-green-600 to-blue-600",
      details: "Real-time tracking allows all parties to monitor pickup progress, with automatic status updates and completion confirmations."
    }
  ];