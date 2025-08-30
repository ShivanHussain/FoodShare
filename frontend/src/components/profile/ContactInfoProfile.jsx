import React from 'react';
import { Mail, Phone, MapPin, FileText, Gift, UserCheck , IdCard} from 'lucide-react';

const ContactInfo = ({ user }) => {
    return (
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-blue-600" />
                    Contact Information
                </h2>
            </div>
            <div className="space-y-3 sm:space-y-3">


                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <IdCard className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-gray-500">User ID</p>
                        <p className="text-sm sm:text-base font-medium text-gray-900 truncate"> #{user?.id?.slice(-11)}</p>
                    </div>
                </div>


                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-gray-500">Email</p>
                        <p className="text-sm sm:text-base font-medium text-gray-900 truncate">{user?.email}</p>
                    </div>
                </div>


                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-gray-500">Phone</p>
                        <p className="text-sm sm:text-base font-medium text-gray-900">{user?.phone}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-gray-500">Address</p>
                        <p className="text-sm sm:text-base font-medium text-gray-900">{user?.address}</p>
                    </div>
                </div>
                {user?.role === 'ngo' && (
                    <>
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs sm:text-sm text-gray-500">Registration Number</p>
                                <p className="text-sm sm:text-base font-medium text-gray-900">{user?.registrationNumber || 'Not Provided'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs sm:text-sm text-gray-500">Organization Name</p>
                                <p className="text-sm sm:text-base font-medium text-gray-900">{user?.organizationName || 'Not Provided'}</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ContactInfo;