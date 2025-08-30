import { Zap, Gift, Activity, Bell, Users, Package, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';


export const QuickActions = ({ user }) => {
    return (<>

        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {user?.role === 'donor' ? (
                    <>
                        {/* <Link
                            to="/add-donation"
                            className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                        >
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 group-hover:bg-blue-200 rounded-lg flex items-center justify-center transition-colors">
                                <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">Donate Now</span>
                        </Link> */}
                        <Link
                            to="/my-donations"
                            className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-lg sm:rounded-xl 
                            border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all group"
                        >
                            <div className="w-6 h-6 sm:w-10 sm:h-10 bg-green-100 group-hover:bg-green-200 rounded-lg flex items-center justify-center transition-colors">
                                <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">View History</span>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            to="/collections"
                            className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all group"
                        >
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 group-hover:bg-purple-200 rounded-lg flex items-center justify-center transition-colors">
                                <Package className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">Collections</span>
                        </Link>
                        {/* <Link
                            to="/distribute"
                            className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all group"
                        >
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 group-hover:bg-orange-200 rounded-lg flex items-center justify-center transition-colors">
                                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">Distribute</span>
                        </Link> */}
                    </>
                )}
                {/* <Link className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all group">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 group-hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors">
                        <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">Notifications</span>
                </Link> */}
                <Link to="/contact" className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all group">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 group-hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors">
                        <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">Reports</span>
                </Link>
            </div>
        </div>
    </>);
}