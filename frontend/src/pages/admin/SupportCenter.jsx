import React, { useEffect, useState } from 'react';
import { MessageSquare, Mail, Search } from 'lucide-react';
import StatsCards from '../../components/admin/SupportAndContact/StatsCards';
import { fetchAllContacts, fetchAllNewsletters } from '../../redux/slices/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import NewsLetters from '../../components/admin/SupportAndContact/NewsLetters';
import Contacts from '../../components/admin/SupportAndContact/Contacts';

const AdminSupportDashboard = () => {
    const [activeTab, setActiveTab] = useState('contact');
    const [searchTerm, setSearchTerm] = useState('');
    const { contacts, newsletters } = useSelector((state) => state.admin);
    const dispatch = useDispatch();

    useEffect(() => {
        if(activeTab === 'contact'){
        dispatch(fetchAllContacts());
        }
        if(activeTab === 'newsletter'){
            dispatch(fetchAllNewsletters());
        }
    }, [dispatch, activeTab]);
    

    const filteredMessages = contacts.filter(msg => {
        const matchesSearch = msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            msg.subject.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch ;
    });

    return (
        <div className="min-h-screen ">

            <div className=" mx-auto py-8">
                {/* Stats Cards */}
                <StatsCards contacts={contacts} newsletters={newsletters}/>

                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-sm mb-6 border border-gray-200">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            <button
                                onClick={() => setActiveTab('contact')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'contact'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4" />
                                    Contact Messages
                                </div>
                            </button>
                            <button
                                onClick={() => setActiveTab('newsletter')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'newsletter'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    Newsletter Subscribers
                                </div>
                            </button>
                        </nav>
                    </div>

                    {/* Search and Filters */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder={activeTab === 'contact' ? 'Search messages...' : 'Search subscribers...'}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {activeTab === 'contact' ? (
                           <Contacts filteredMessages={filteredMessages}/>
                        ) : (
                           <NewsLetters newsletters={newsletters}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSupportDashboard;