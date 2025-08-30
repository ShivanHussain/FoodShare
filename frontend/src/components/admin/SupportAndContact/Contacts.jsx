import React from 'react';
import { Mail, Calendar, User } from 'lucide-react';

function Contacts({ filteredMessages }) {
    return (
        <div className="space-y-4">
            {filteredMessages.map((message) => (
                <div key={message._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                                <h3 className="font-semibold text-gray-900 truncate">{message.subject}</h3>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-3">
                                <span className="flex items-center gap-1">
                                    <User className="w-4 h-4 flex-shrink-0" />
                                    <span className="truncate">{message.name}</span>
                                </span>
                                <span className="flex items-center gap-1">
                                    <Mail className="w-4 h-4 flex-shrink-0" />
                                    <span className="truncate">{message.email}</span>
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4 flex-shrink-0" />
                                    <span className="whitespace-nowrap">{new Date(message.createdAt).toLocaleDateString()}</span>
                                </span>
                            </div>
                            <p className="text-gray-700 text-sm break-words">{message.message}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Contacts;
