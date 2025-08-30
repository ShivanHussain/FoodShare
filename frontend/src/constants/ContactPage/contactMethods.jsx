// contactMethods (Contact page )
import { Phone, Mail, MessageCircle, AlertCircle } from "lucide-react";

export const contactMethods = [
  {
    icon: <Phone className="w-8 h-8 text-white" />,
    title: "Phone Support",
    description: "Speak directly with our support team",
    contact: "+91-1800-FOOD-HELP",
    availability: "24/7 Available",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: <Mail className="w-8 h-8 text-white" />,
    title: "Email Support",
    description: "Send us detailed queries and feedback",
    contact: "support@foodshare.com",
    availability: "Response within 2 hours",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: <MessageCircle className="w-8 h-8 text-white" />,
    title: "Live Chat",
    description: "Instant messaging with support agents",
    contact: "Available on dashboard",
    availability: "Mon-Fri, 9 AM - 6 PM",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: <AlertCircle className="w-8 h-8 text-white" />,
    title: "Emergency Line",
    description: "For urgent food safety concerns",
    contact: "+91-1800-EMERGENCY",
    availability: "24/7 Emergency Response",
    color: "from-red-500 to-orange-500"
  }
];
