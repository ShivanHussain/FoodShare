import { HelpCircle, Building2, Users,Shield, Settings,FileText } from "lucide-react";
export const faqCategories = [
    {
        title: "General Questions",
        icon: HelpCircle,
        color: "from-green-500 to-emerald-500",
        questions: [
            {
                question: "What is this platform about?",
                answer: "It's an AI-powered food donation system that connects surplus food from restaurants, households, and supermarkets to NGOs in real time. Our platform uses machine learning to predict food freshness and optimize pickup timing to reduce waste and feed communities efficiently."
            },
            {
                question: "How does it work?",
                answer: "Donors post available food with details and photos, NGOs get instant notifications via Firebase, and the first NGO to accept receives the donation. Our AI analyzes food freshness using image classification and metadata to optimize pickup timing and prevent spoilage."
            },
            {
                question: "What makes this platform different?",
                answer: "We combine real-time notifications, AI-powered freshness prediction, smart routing with Maps API, and automated matching between donors and NGOs. This ensures maximum efficiency and minimal food waste."
            }
        ]
    },
    {
        title: "For Donors",
        icon: Building2,
        color: "from-blue-500 to-cyan-500",
        questions: [
            {
                question: "How can I donate food?",
                answer: "Simply sign up as a donor (restaurant, household, or supermarket), add details about your surplus food, upload a picture for AI analysis, set pickup preferences, and post the donation. Nearby NGOs will be notified instantly through our real-time system."
            },
            {
                question: "What type of food can I donate?",
                answer: "Fresh, hygienic, and safe-to-consume food including cooked meals, packaged items, fruits, vegetables, and baked goods. Our AI system helps determine if food is suitable for donation. Expired or spoiled food is not allowed."
            },
            {
                question: "Is there a cost for donating food?",
                answer: "No, donating food is completely free. Our platform is designed to encourage food donations and reduce waste at no cost to donors."
            },
            {
                question: "Can I track my donations?",
                answer: "Yes! Your donor dashboard provides complete donation history, pickup tracking, impact analytics, and shows how many people you've helped feed through your contributions."
            },
            {
                question: "How quickly do NGOs respond?",
                answer: "Thanks to our Firebase real-time notification system, NGOs typically respond within minutes. Our AI prioritizes donations based on freshness predictions to ensure quick pickups."
            }
        ]
    },
    {
        title: "For NGOs",
        icon: Users,
        color: "from-purple-500 to-pink-500",
        questions: [
            {
                question: "How do NGOs register?",
                answer: "NGOs can sign up on the platform, provide verification documents including registration certificates, get approved by our admin team, and start receiving donation alerts in their area."
            },
            {
                question: "What happens if multiple NGOs accept a donation?",
                answer: "The donation is given to the first NGO that accepts through our real-time system. Other NGOs are instantly notified that it's already claimed to prevent conflicts."
            },
            {
                question: "How does route optimization work?",
                answer: "Our platform integrates with Google Maps/Mapbox to suggest optimal pickup routes, show donor locations, estimate travel times, and help NGOs plan efficient collection rounds."
            },
            {
                question: "Can we set our availability hours?",
                answer: "Yes, NGOs can set their operational hours, coverage areas, and capacity limits. You'll only receive notifications when you're available and within your service area."
            }
        ]
    },
    {
        title: "Safety & Quality",
        icon: Shield,
        color: "from-orange-500 to-red-500",
        questions: [
            {
                question: "How do you ensure food safety?",
                answer: "Donors must follow hygiene standards, our AI-powered freshness predictor analyzes food quality using image classification and metadata, and we provide safety guidelines. NGOs can also flag unsafe donations."
            },
            {
                question: "Can I report unsafe food donations?",
                answer: "Yes, NGOs can flag donations through the platform. Our admin team reviews reports immediately and takes appropriate action including donor education or account restrictions."
            },
            {
                question: "How does the AI freshness prediction work?",
                answer: "Our machine learning models use pretrained CNNs (ResNet/MobileNet) for image analysis and regression models to predict remaining shelf-life based on food type, storage conditions, and visual indicators."
            },
            {
                question: "What if food spoils during pickup?",
                answer: "Our AI system prioritizes pickups based on freshness predictions. If spoilage occurs, NGOs can report it, and we continuously improve our prediction algorithms based on this feedback."
            }
        ]
    },
    {
        title: "Technical & Account",
        icon: Settings,
        color: "from-indigo-500 to-purple-500",
        questions: [
            {
                question: "I forgot my password, what should I do?",
                answer: "Click 'Forgot Password' on the login page, enter your email, and follow the instructions sent to your email to reset your password securely."
            },
            {
                question: "Can I delete my account?",
                answer: "Yes, you can request account deletion from your profile settings. All your data will be permanently removed within 30 days as per our privacy policy."
            },
            {
                question: "Why am I not receiving notifications?",
                answer: "Check your notification settings in your profile, ensure Firebase notifications are enabled in your browser/app, and verify your location settings for nearby donation alerts."
            },
            {
                question: "Is there a mobile app?",
                answer: "Currently, we offer a responsive web application that works perfectly on mobile devices. A dedicated mobile app with enhanced features is planned for future release."
            }
        ]
    },
    {
        title: "Policies & Privacy",
        icon: FileText,
        color: "from-teal-500 to-green-500",
        questions: [
            {
                question: "Is my personal data secure?",
                answer: "Yes, we use secure authentication, end-to-end encryption, PostgreSQL/MongoDB for secure data storage, and never share personal data without explicit consent. All data is protected as per GDPR standards."
            },
            {
                question: "Where can I read your Terms & Privacy Policy?",
                answer: "You can find our comprehensive Terms of Service and Privacy Policy in the footer links: '/terms' and '/privacy-policy'. We believe in complete transparency about data usage."
            },
            {
                question: "How do you use AI and what data is collected?",
                answer: "We use AI for freshness prediction and route optimization. We collect food images (for quality analysis), location data (for matching), and usage analytics (for improvement). All data is anonymized and secure."
            },
            {
                question: "Can I opt out of data collection?",
                answer: "You can control your data preferences in settings, though some data is essential for core functionality like location for nearby matching and images for AI analysis."
            }
        ]
    }
];