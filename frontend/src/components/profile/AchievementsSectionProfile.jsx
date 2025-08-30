import { Target, CheckCircle } from 'lucide-react';

export const AchievementsSection = ({ achievements }) => (
    <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-4 xl:p-7 shadow-sm border border-gray-100">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-3 sm:mb-2 md:mb-5 lg:mb-2">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 flex items-center gap-2">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-600 flex-shrink-0" />
                <span className="truncate">Achievements</span>
            </h2>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
            {achievements.map((achievement, index) => (
                <div
                    key={index}
                    className={`
                        p-3 sm:p-4 md:p-5 lg:p-6 
                        rounded-lg sm:rounded-xl md:rounded-2xl 
                        border-2 transition-all duration-300 
                        hover:shadow-md active:scale-95
                        ${achievement.earned
                            ? 'border-transparent bg-gradient-to-r ' + achievement.color + ' text-white shadow-lg hover:shadow-xl'
                            : 'border-gray-200 bg-gray-50 text-gray-400 hover:border-gray-300 hover:bg-gray-100'
                        }
                    `}
                >
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                        {/* Icon Container */}
                        <div
                            className={`
                                w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12
                                rounded-md sm:rounded-lg md:rounded-xl 
                                flex items-center justify-center 
                                flex-shrink-0
                                ${achievement.earned ? 'bg-white/20 backdrop-blur-sm' : 'bg-white shadow-sm'}
                            `}
                        >
                            <achievement.icon 
                                className={`
                                    w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6
                                    ${achievement.earned ? 'text-white' : 'text-gray-400'}
                                `} 
                            />
                        </div>

                        {/* Text Content */}
                        <div className="flex-1 min-w-0">
                            <h3 className={`
                                text-xs sm:text-sm md:text-base lg:text-lg font-semibold 
                                truncate
                                ${achievement.earned ? 'text-white' : 'text-gray-600 group-hover:text-gray-700'}
                            `}>
                                {achievement.name}
                            </h3>
                            <p className={`
                                text-xs sm:text-sm md:text-base 
                                leading-tight sm:leading-normal
                                ${achievement.earned ? 'text-white/90' : 'text-gray-500'}
                            `}>
                                {achievement.description}
                            </p>
                        </div>

                        {/* Check Icon */}
                        {achievement.earned && (
                            <div className="flex-shrink-0">
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white drop-shadow-sm" />
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </div>
);