import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Heart,
    Mail,
    Phone,
    Send,
    Loader
} from 'lucide-react';
import { quickLinks } from '../constants/Footer/quickLinksFooter';
import { supportLinks } from '../constants/Footer/supportLinksFooter';
import { socialLinks } from '../constants/Footer/socialLinksFooter';
import { stats } from '../constants/Footer/statsFooter';
import { subscribeNewsletter } from '../redux/slices/newsletterSlice';

export default function Footer() {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.newsletter);

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        // Basic email validation
        if (!email) {
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return;
        }

        try {
            await dispatch(subscribeNewsletter(email)).unwrap();
            setEmail(''); // Clear the input on successful subscription
        } catch (error) {
            console.error('Newsletter subscription failed:', error);
        }
    };

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 text-white">
            {/* Stats Section */}
            <div className="border-b border-gray-700/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300">
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-2xl font-bold text-green-400 mb-1">{stat.value}</div>
                                <div className="text-gray-300 text-xs">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Mobile and Desktop Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center mb-4">
                            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-xl">
                                <Heart className="w-6 h-6 text-white" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-xl font-bold">FoodShare</h3>
                                <p className="text-green-400 text-xs">Waste Less, Share More</p>
                            </div>
                        </div>
                        <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                            Connecting food donors with NGOs to reduce waste and fight hunger.
                        </p>

                        {/* Social Links */}
                        <div className="flex space-x-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className={`w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 transition-all duration-300 hover:bg-gray-700 hover:scale-110 ${social.color}`}
                                    aria-label={social.name}
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links & Support */}
                    <div className="md:col-span-1 lg:col-span-2">
                        <div className="grid grid-cols-2 gap-6 md:gap-8">
                            {/* Quick Links */}
                            <div>
                                <h4 className="text-base font-semibold mb-4 text-white">Quick Links</h4>
                                <ul className="space-y-2">
                                    {quickLinks.slice(0, 3).map((link) => (
                                        <li key={link.name}>
                                            <a
                                                href={link.href}
                                                className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm block"
                                            >
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Support Links */}
                            <div>
                                <h4 className="text-base font-semibold mb-4 text-white">Support</h4>
                                <ul className="space-y-2">
                                    {supportLinks.slice(0, 3).map((link) => (
                                        <li key={link.name}>
                                            <a
                                                href={link.href}
                                                className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm block"
                                            >
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Contact & Newsletter */}
                    <div className="lg:col-span-1">
                        <h4 className="text-base font-semibold mb-4 text-white">Contact</h4>

                        {/* Contact Info */}
                        <div className="space-y-2 mb-4">
                            <div className="flex items-center text-gray-300 text-sm">
                                <Phone className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                                <span>+91 XXXXXXXXXX</span>
                            </div>
                            <div className="flex items-center text-gray-300 text-sm">
                                <Mail className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                                <span>support@foodshare.org</span>
                            </div>
                        </div>

                        {/* Newsletter Signup */}
                        <div>
                            <h5 className="text-sm font-medium mb-2 text-green-400">Newsletter</h5>
                            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                                <div className="flex">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Your email"
                                        className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
                                        disabled={loading}
                                        required
                                    />
                                    <button 
                                        type="submit"
                                        disabled={loading || !email}
                                        className="px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-r-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <Loader className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Send className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                                {error && (
                                    <p className="text-red-400 text-xs mt-1">{error}</p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700/50 bg-gray-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                        <p className="text-gray-400 text-xs">
                            © 2025 FoodShare. All rights reserved.
                        </p>
                        <p className="text-gray-400 text-xs">
                            Made with <Heart className="w-3 h-3 inline text-red-500 mx-1" /> for a better world
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}