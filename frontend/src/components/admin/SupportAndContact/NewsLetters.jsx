import React from 'react';
import { Mail, MoreVertical } from 'lucide-react';

function NewsLetters({ newsletters }) {
    return (
        <div className="space-y-4">
            {newsletters.map((subscriber) => (
                <div key={subscriber._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Mail className="w-8 h-8 text-gray-400" />
                            <div>
                                <h3 className="font-medium text-gray-900">{subscriber.email}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                    <span>Subscribed: {new Date(subscriber.subscribedAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="p-1 text-gray-400 hover:text-gray-600">
                                <MoreVertical className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default NewsLetters;
