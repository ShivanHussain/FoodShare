
// sections (Privacy and Policy page)
import { Shield, Eye, Users, Lock, Bell, FileText, Mail, ArrowLeft } from 'lucide-react';
export const sections = [
    {
        icon: <Eye className="w-6 h-6" />,
        title: "Information We Collect",
        content: "We collect personal details (e.g., name, email, location) when you register as a Donor, NGO, or Admin. We also log food donation data, pickup details, and system usage patterns to improve our ML prediction models for freshness analysis.",
        color: "from-blue-500 to-cyan-500"
    },
    {
        icon: <Users className="w-6 h-6" />,
        title: "Use of Information",
        content: "Collected data is used to match donations with nearby NGOs, send real-time notifications via Firebase, generate analytics and impact reports, ensure food traceability and safety, and train our ML models for better freshness prediction.",
        color: "from-green-500 to-emerald-500"
    },
    {
        icon: <FileText className="w-6 h-6" />,
        title: "Data Sharing",
        content: "We do not sell or share your personal data with third parties except to authorized NGOs or Donors for logistics coordination, when legally required, or for anonymous analytics to improve our platform.",
        color: "from-purple-500 to-pink-500"
    },
    {
        icon: <Lock className="w-6 h-6" />,
        title: "Security & Storage",
        content: "We use PostgreSQL/MongoDB with encryption for secure data storage, implement role-based access control, secure API endpoints with authentication, and regularly backup data. However, no internet transmission method is 100% secure.",
        color: "from-orange-500 to-red-500"
    },
    {
        icon: <Bell className="w-6 h-6" />,
        title: "Notifications & Tracking",
        content: "FoodShare uses Firebase Cloud Messaging for real-time notifications, Google Maps/Mapbox for location services, cookies to enhance user experience, and analytics to track platform usage and donation success rates.",
        color: "from-indigo-500 to-purple-500"
    },
    {
        icon: <Shield className="w-6 h-6" />,
        title: "Your Rights & Control",
        content: "You can request access, correction, or deletion of your data, opt-out of notifications, download your donation history, and update your privacy preferences anytime through your dashboard or by contacting support@foodshare.com.",
        color: "from-teal-500 to-cyan-500"
    }
];
