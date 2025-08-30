import React from 'react';
import {Star,MapPin,Phone,Mail,Hash,} from 'lucide-react';

const UsersList = ({ allUsersFeedback, selectedUser, onSelectUser }) => {
    return (
        <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Users Grid */}
                <div className="p-6">
                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${allUsersFeedback.length > 4 ? 'overflow-y-auto' : ''}`}
                        style={{
                            ...(allUsersFeedback.length > 4 ? { maxHeight: 'calc(100vh - 180px)' } : {}),
                            msOverflowStyle: 'none',
                            scrollbarWidth: 'none'
                        }}
                        onScroll={(e) => {
                            e.target.style.webkitScrollbar = 'none';
                        }}
                    >
                        {allUsersFeedback.map((user) => (
                            <div
                                key={user._id}
                                className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${selectedUser?.id === user.id
                                    ? 'border-blue-500 bg-transparent'
                                    : 'border-gray-200 hover:border-blue-300'
                                    }`}
                                onClick={() => onSelectUser(user)}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center">
                                        <img
                                            src={user.avatar.url}
                                            alt={user.name}
                                            className="w-12 h-12 rounded-full mr-3"
                                        />
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-900">{user.name}</h3>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Hash className="w-5 h-4 text-gray-600" />
                                                <span className="">{user._id.toString().slice(-9)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-yellow-500">
                                        <Star className="w-4 h-4 fill-current" />
                                        <span className="ml-1 text-sm font-semibold">{user.averageRating}</span>
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm text-gray-600 mb-4">
                                    <div className="flex items-center">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        {user.address}
                                    </div>
                                    <div className="flex items-center">
                                        <Mail className="w-4 h-4 mr-2" />
                                        {user.email}
                                    </div>
                                    <div className="flex items-center">
                                        <Phone className="w-4 h-4 mr-2" />
                                        {user.phone}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-4 border-t">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-blue-600">{user.totalDonation}</p>
                                        <p className="text-xs text-gray-500">Total Donations</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-semibold text-gray-700">{new Date(user.createdAt).toLocaleDateString() }</p>
                                        <p className="text-xs text-gray-500">Last Donation</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersList;