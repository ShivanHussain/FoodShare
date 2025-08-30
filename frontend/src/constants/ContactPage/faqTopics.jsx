
//faqTopics.jsx  (contact page)
import { Mail, MapPin, Clock, Send, User, Building2, Heart,Headphones,Globe,Shield,Loader2, } from 'lucide-react';
export  const faqTopics = [
    {
      icon: <User className="w-6 h-6" />,
      title: "Account & Registration",
      description: "Help with signup, login, and profile management",
      color: "text-green-600"
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Food Donation Process",
      description: "Questions about logging and donating food",
      color: "text-blue-600"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Pickup & Delivery",
      description: "Issues with location, routing, and timing",
      color: "text-purple-600"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safety & Quality",
      description: "Food safety guidelines and quality concerns",
      color: "text-red-600"
    }
  ];