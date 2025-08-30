import React, { useState } from 'react';
import { MessageSquare, Star, Send, ThumbsUp, Hash,} from 'lucide-react';

const FeedbackPanel = ({ selectedUser, onSendFeedback }) => {
    const [feedbackText, setFeedbackText] = useState('');
    const [rating, setRating] = useState(5);
    const [feedbackType, setFeedbackType] = useState('positive');

    const handleSendFeedback = () => {
        if (selectedUser && feedbackText.trim()) {
            onSendFeedback({
                toUserId: selectedUser._id,
                message: feedbackText,
                rating: rating,
                type: feedbackType,
            });

            // Reset form
            setFeedbackText('');
            setRating(5);
            setFeedbackType('positive');
        }
    };

    return (
        <div className="lg:col-span-1">
            {selectedUser ? (
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* User Details Header */}
                    <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                        <div className="flex items-center mb-4">
                            <img
                                src={selectedUser.avatar.url}
                                alt={selectedUser.name}
                                className="w-16 h-16 rounded-full mr-4 border-4 border-white/30"
                            />
                            <div>
                                <h2 className="text-xl font-bold">{selectedUser.name}</h2>
                                <div className="flex items-center text-indigo-200">
                                    <Hash className="w-5 h-4 text-gray-300" />
                                    <span className="">{selectedUser._id.toString().slice(-9)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between text-sm">
                            <div className="text-center">
                                <p className="text-2xl font-bold">{selectedUser.totalDonation}</p>
                                <p className="text-indigo-200">{selectedUser?.role === 'ngo' ? 'ClaimedDonations': 'Donations'}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold">{selectedUser.averageRating}</p>
                                <p className="text-indigo-200">Rating</p>
                            </div>
                        </div>
                    </div>

                    {/* Feedback Form */}
                    <div className="p-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Send Feedback</h3>

                        {/* Feedback Type */}
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Feedback Type</label>
                            <div className="flex gap-2">
                                <button
                                    className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-colors ${feedbackType === 'positive'
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    onClick={() => setFeedbackType('positive')}
                                >
                                    <ThumbsUp className="w-4 h-4 inline mr-1" />
                                    Positive
                                </button>
                                <button
                                    className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-colors ${feedbackType === 'suggestion'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    onClick={() => setFeedbackType('suggestion')}
                                >
                                    <MessageSquare className="w-4 h-4 inline mr-1" />
                                    Suggestion
                                </button>
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setRating(star)}
                                        className={`w-8 h-8 ${star <= rating ? 'text-yellow-500' : 'text-gray-300'
                                            } hover:text-yellow-400 transition-colors`}
                                    >
                                        <Star className="w-full h-full fill-current" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Feedback Text */}
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                            <textarea
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                rows="4"
                                placeholder="Write your feedback or suggestions..."
                                value={feedbackText}
                                onChange={(e) => setFeedbackText(e.target.value)}
                            />
                        </div>

                        {/* Send Button */}
                        <button
                            onClick={handleSendFeedback}
                            disabled={!feedbackText.trim()}
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-full font-semibold hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
                        >
                            <Send className="w-5 h-5 mr-2" />
                            Send Feedback
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="w-12 h-12 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Select a Donor</h3>
                    <p className="text-gray-600">Choose a donor from the list to view details and send feedback</p>
                </div>
            )}
        </div>
    );
};

export default FeedbackPanel;