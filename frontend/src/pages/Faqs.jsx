import React, { useEffect, useState } from 'react';
import {
    ChevronDown,
    ChevronUp,
    Heart,
    HelpCircle,
    Users,
    Building2,
    Shield,
    Settings,
    FileText,
    Utensils,
    Clock,
    MapPin,
    AlertTriangle,
    CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import HeaderSection from '../components/Faq/HeaderSection';
import QucikState from '../components/Faq/QucikState';
import FaqCategory from '../components/Faq/FaqCategory';
import { faqCategories } from '../constants/Faq/FaqCategories';


const FAQPage = () => {
    const [activeAccordion, setActiveAccordion] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

   


    if(isLoading){
        return<Loader/>
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
            {/* Hero Section */}
            <HeaderSection/>

            {/* Quick Stats */}
            <QucikState/>

            {/* FAQ Categories */}
           <FaqCategory faqCategories={faqCategories} activeAccordion={activeAccordion} toggleAccordion={toggleAccordion}/>

            {/* Contact Support Section */}
            <section className="py-16 bg-gradient-to-r from-green-900 to-blue-900 text-white">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                        <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">
                            Still Have Questions?
                        </h2>
                        <p className="text-lg text-green-100 mb-6">
                            Can't find what you're looking for? Our support team is here to help you make the most impact.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to='/contact' className="bg-white text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300">
                                Contact Support
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FAQPage;