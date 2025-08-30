import React, { useEffect, useState } from 'react';
import { Users , MessageSquare} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersFeedback } from '../redux/slices/userSlice';
import Loader from '../components/Loader';
import { createFeedback, fetchFeedbacksGiven } from '../redux/slices/feedbackSlice';
import { toast } from 'react-toastify';
import FeedbackCard from '../subComponents/FeedbackCard';
import UsersList from '../components/NGOFeedbackPage/UsersList';
import FeedbackPanel from '../components/NGOFeedbackPage/FeedbackPannel';
import ShowFeedbackAndHeader from '../components/profile/ShowFeedbackAndHeader';
import FeedbackShow from '../components/FeedbackShow';

const NGOFeedbackPage = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const dispatch = useDispatch();

    const { allUsersFeedback, loading } = useSelector((state) => state.user);
    
    const { feedbacksGiven } = useSelector((state) => state.feedback);

    useEffect(() => {
        dispatch(getAllUsersFeedback());
    }, [dispatch]);

    useEffect(() => {
        if (selectedUser) {
            dispatch(fetchFeedbacksGiven({ toUserId: selectedUser._id }));
        }
    }, [dispatch, selectedUser]);

    const handleSelectUser = (user) => {
        setSelectedUser(user);
    };

    const handleSendFeedback = (feedbackData) => {
        dispatch(createFeedback(feedbackData))
            .unwrap()
            .then(() => {
                dispatch(getAllUsersFeedback());
            })
            .catch((err) => {
                toast.error("Failed to create feedback:", err);
            });
    };

    if (loading) return <><Loader /></>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4">
            <div className="max-w-7xl mx-auto py-8">
                {/* Header */}
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/20">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                Users & Feedback
                            </h1>
                            <p className="text-gray-600 mt-2">Connect with donors and provide valuable feedback</p>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                    <UsersList 
                        allUsersFeedback={allUsersFeedback}
                        selectedUser={selectedUser}
                        onSelectUser={handleSelectUser}
                    />
                     
                     {/* Feedback Pannel Components */}
                    <FeedbackPanel 
                        selectedUser={selectedUser}
                        onSendFeedback={handleSendFeedback}
                    />
                </div>

                  <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/20 mt-8">

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl">
                                    <MessageSquare className="w-8 h-8 text-white" />
                                </div>
                                Feedback Messages
                            </h1>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-teal-100 shadow-md">
                                <div className="text-2xl font-bold text-teal-700">{feedbacksGiven.length}</div>
                                <div className="text-sm text-gray-600">Total Messages</div>
                            </div>
                        </div>
                    </div>
                    {/* show Feedback  Components*/}
                    <FeedbackShow feedbacks={feedbacksGiven} showActions={false} showDelete={true}/>
                </div>
                
            </div>
        </div>
    );
};

export default NGOFeedbackPage;