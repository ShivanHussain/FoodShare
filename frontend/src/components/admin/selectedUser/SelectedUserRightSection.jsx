import React from 'react';
import { Star, MessageCircle, Calendar, Loader2 } from 'lucide-react';

function SelectedUserRightSection({ feedbacks }) {
    
    const renderStars = (rating) => {
        // Ensure rating is a number and within valid range
        const validRating = Math.max(0, Math.min(5, Number(rating) || 0));
        return [...Array(5)].map((_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < validRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
        ));
    };

    // Loading state when feedbacks is undefined
    if (feedbacks === undefined) {
        return (
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-full">
                        <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Feedback Received</h2>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        Loading...
                    </span>
                </div>
                <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400 mb-4" />
                    <p className="text-gray-500">Loading feedback...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-full">
                    <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Feedback Received</h2>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {feedbacks?.length || 0} Reviews
                </span>
            </div>

            <div className="space-y-4">
                {feedbacks && feedbacks.length > 0 ? (
                    feedbacks.map((feedback) => (
                        <div key={feedback?._id || feedback?.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="flex items-start gap-4 mb-4">
                                <img 
                                    src={feedback?.fromUser?.avatar?.url || `/api/placeholder/40/40`} 
                                    alt={feedback?.fromUser?.name || 'User avatar'}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md" 
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/api/placeholder/40/40';
                                    }}
                                />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {feedback?.fromUser?.name || 'Anonymous User'}
                                        </h3>
                                        <div className="flex items-center gap-1">
                                            {renderStars(feedback?.rating || 0)}
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mb-3 leading-relaxed">
                                        {feedback?.message || 'No message provided'}
                                    </p>
                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                        <Calendar className="w-4 h-4" />
                                        {feedback?.createdAt
                                            ? new Date(feedback.createdAt).toLocaleDateString("en-GB")
                                            : feedback?.date || 'Date not available'
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12">
                        <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Feedback Yet</h3>
                        <p className="text-gray-500">This user hasn't received any feedback yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SelectedUserRightSection;