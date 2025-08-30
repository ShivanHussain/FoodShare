import React from 'react';
import { Settings, Construction, Clock, Mail, Phone, Bell } from 'lucide-react';

const SettingsPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-2 sm:px-6">
                {/* Under Development Banner */}
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-400 p-6 mb-8 rounded-lg shadow-sm">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Construction className="h-8 w-8 text-orange-400" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-medium text-orange-800">
                                Under Development
                            </h3>
                            <p className="mt-1 text-sm text-orange-700">
                                This page is currently being developed. New features and settings will be available soon!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Preview Cards - What's Coming */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {/* Account Settings Preview */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 opacity-60">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Settings className="w-5 h-5 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Account Settings</h3>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">
                            Manage your personal information, password, and account preferences.
                        </p>
                        <div className="space-y-2">
                            <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-2 bg-gray-200 rounded animate-pulse w-3/4"></div>
                            <div className="h-2 bg-gray-200 rounded animate-pulse w-1/2"></div>
                        </div>
                    </div>

                    {/* Notification Settings Preview */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 opacity-60">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <Bell className="w-5 h-5 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">Notifications</h3>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">
                            Configure email, push, and in-app notification preferences.
                        </p>
                        <div className="space-y-2">
                            <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-2 bg-gray-200 rounded animate-pulse w-2/3"></div>
                            <div className="h-2 bg-gray-200 rounded animate-pulse w-4/5"></div>
                        </div>
                    </div>

                    {/* System Settings Preview */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 opacity-60">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Settings className="w-5 h-5 text-purple-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">System Settings</h3>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">
                            Configure system-wide preferences and administrative settings.
                        </p>
                        <div className="space-y-2">
                            <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-2 bg-gray-200 rounded animate-pulse w-3/5"></div>
                            <div className="h-2 bg-gray-200 rounded animate-pulse w-4/5"></div>
                        </div>
                    </div>
                </div>

                {/* Development Status */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <Clock className="h-6 w-6 text-teal-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Development Timeline</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                            <div>
                                <p className="font-medium text-gray-900">Phase 1: Account Management</p>
                                <p className="text-sm text-gray-500">Profile settings, password management, and basic preferences</p>
                                <span className="inline-block mt-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                    In Progress
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                            <div>
                                <p className="font-medium text-gray-900">Phase 2: Notification System</p>
                                <p className="text-sm text-gray-500">Email alerts, push notifications, and communication preferences</p>
                                <span className="inline-block mt-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                    Planned
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                            <div>
                                <p className="font-medium text-gray-900">Phase 3: Advanced Configuration</p>
                                <p className="text-sm text-gray-500">System-wide settings, integrations, and advanced features</p>
                                <span className="inline-block mt-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                    Future
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="mt-8 bg-teal-50 rounded-lg border border-teal-200 p-6">
                    <h3 className="text-lg font-semibold text-teal-900 mb-4">Need Help?</h3>
                    <p className="text-teal-700 mb-4">
                        If you have any questions or need assistance, feel free to reach out to our support team.
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                        <div className="flex items-center space-x-2 text-teal-700">
                            <Mail className="w-4 h-4" />
                            <span className="text-sm">support@foodshare.com</span>
                        </div>
                        <div className="flex items-center space-x-2 text-teal-700">
                            <Phone className="w-4 h-4" />
                            <span className="text-sm">+1 (555) 123-4567</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;