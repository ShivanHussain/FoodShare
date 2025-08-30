import React from 'react';
import { MessageSquare} from 'lucide-react';
import FeedbackShow from '../FeedbackShow';

function ShowFeedbackAndHeader({ feedbacksReceived }) {
    return (
        <>
            {feedbacksReceived.length > 0 && (
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/20">

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl">
                                    <MessageSquare className="w-8 h-8 text-white" />
                                </div>
                                Feedback Messages
                            </h1>
                            <p className="text-gray-600 mt-2">View and respond to feedback from your community</p>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-teal-100 shadow-md">
                                <div className="text-2xl font-bold text-teal-700">{feedbacksReceived.length}</div>
                                <div className="text-sm text-gray-600">Total Messages</div>
                            </div>
                        </div>
                    </div>
                    {/* show Feedback */}
                    <FeedbackShow feedbacks={feedbacksReceived} showActions={false} showDelete={false} />
                </div>
            )

            }
        </>
    )
}

export default ShowFeedbackAndHeader;
