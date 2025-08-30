import React from 'react';
import { Star, StarHalf } from 'lucide-react';

function Rating({ rating }) {
    return (
        <div className="flex items-center gap-1">
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => {
                    if (i < Math.floor(rating)) {
                        // Full Star
                        return (
                            <Star
                                key={i}
                                className="w-3 h-3 text-yellow-400 fill-current"
                            />
                        );
                    } else if (i < rating) {
                        // Half Star
                        return (
                            <StarHalf
                                key={i}
                                className="w-3 h-3 text-yellow-400 fill-current"
                            />
                        );
                    } else {
                        // Empty Star
                        return (
                            <Star
                                key={i}
                                className="w-3 h-3 text-white/40"
                            />
                        );
                    }
                })}
            </div>
            <span className="text-xs text-white/80">{rating?.toFixed(1)}</span>
        </div>
    )
}

export default Rating
