// components/Navbar/components/Logo.jsx
import { Heart } from 'lucide-react';

export default function Logo() {
    return (
        <div className="flex items-center">
            <a href="/" className="bg-gradient-to-r from-green-600 to-emerald-600 p-2 rounded-xl">
                <Heart className="w-8 h-8 text-white" />
            </a>
            <div className="ml-3 hidden sm:block">
                <h1 className="text-xl font-bold text-gray-800">FoodShare</h1>
                <p className="text-xs text-gray-500">Waste Less, Share More</p>
            </div>
        </div>
    );
}