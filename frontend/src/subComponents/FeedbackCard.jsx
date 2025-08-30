import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, ThumbsDown, MessageCircle, Calendar, User, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { deleteFeedback, likeFeedback, dislikeFeedback } from '../redux/slices/feedbackSlice';

const FeedbackCard = ({ feedback, showActions, showDelete }) => {
    // Track user's current action (like/dislike/null)
    const [userAction, setUserAction] = useState(null);
    
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.feedback);

    useEffect(() => {
       
    }, [feedback]);

    const handleLike = async () => {
        if (loading) return;

        try {
            await dispatch(likeFeedback(feedback._id)).unwrap();
            
            // Update local state based on current action
            if (userAction === 'like') {
                setUserAction(null); // Unlike
            } else {
                setUserAction('like'); // Like (or switch from dislike to like)
            }
        } catch (error) {
            console.error('Error liking feedback:', error);
        }
    };

    const handleDislike = async () => {
        if (loading) return; // Prevent multiple requests

        try {
            await dispatch(dislikeFeedback(feedback._id)).unwrap();
            
            // Update local state based on current action
            if (userAction === 'dislike') {
                setUserAction(null); // Un-dislike
            } else {
                setUserAction('dislike'); // Dislike (or switch from like to dislike)
            }
        } catch (error) {
            console.error('Error disliking feedback:', error);
        }
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                    }`}
            />
        ));
    };

    const handleDelete = (id) => {
        dispatch(deleteFeedback(id));
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {feedback?.fromUser?.avatar?.url ? (
                            <img src={feedback?.fromUser?.avatar?.url} alt={feedback?.fromUser?.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                            <User className="w-5 h-5" />
                        )}
                    </div>
                    <div>
                        <div className="flex items-center space-x-1">
                            <h3 className="font-semibold text-gray-900 text-sm">{feedback?.fromUser?.name}</h3>
                        </div>
                        <div className="flex items-center space-x-1 mt-1">
                            <div className="flex space-x-0.5">
                                {renderStars(feedback?.rating)}
                            </div>
                            <span className="text-xs text-gray-600">({feedback?.rating})</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Date and Feedback Type*/}
            <div className="flex items-center justify-between border-t text-gray-500 text-xs mb-2 mt-2">
                <span className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(feedback?.createdAt).toLocaleDateString()}
                </span>
                <h4 className="text-medium text-gray-900 font-semibold">{feedback?.type}</h4>
            </div>

            {/* Feedback Content */}
            <div className="mb-2 flex-grow mt-2">
                <p className="text-gray-700 leading-relaxed text-sm">{feedback?.message}</p>
            </div>

            {/* Actions */}
            {showActions && (
                <div className="pt-3 border-t border-gray-300">
                    {/* Top row - Like and Dislike buttons */}
                    <div className="flex items-center justify-between mb-1">
                        {/* Left side - Like button */}
                        <button
                            onClick={handleLike}
                            disabled={loading}
                            className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-colors text-xs ${userAction === 'like'
                                ? 'bg-green-100 text-green-700'
                                : 'hover:bg-gray-100 text-gray-600'
                                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <ThumbsUp className="w-3 h-3" />
                            <span className="font-medium">{feedback?.likes || 0}</span>
                        </button>

                        {/* Right side - Dislike button */}
                        <button
                            onClick={handleDislike}
                            disabled={loading}
                            className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-colors text-xs ${userAction === 'dislike'
                                ? 'bg-red-100 text-red-700'
                                : 'hover:bg-gray-100 text-gray-600'
                                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <ThumbsDown className="w-3 h-3" />
                            <span className="font-medium">{feedback?.dislikes || 0}</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Bottom row */}
            {showDelete && (
                <div className='mt-4'>
                    <button
                        onClick={() => handleDelete(feedback?._id)}
                        disabled={loading}
                        className={`w-full flex items-center justify-center space-x-1 px-3 py-2 rounded-md transition-colors text-xs bg-red-500 text-white hover:bg-red-600 active:bg-red-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <Trash2 className="w-3 h-3" />
                        <span className="font-medium">Delete</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default FeedbackCard;