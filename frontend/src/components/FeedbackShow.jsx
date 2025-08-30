import React from 'react'
import FeedbackCard from '../subComponents/FeedbackCard'

function FeedbackShow({ feedbacks, showActions, showDelete }) {
    return (
        <div
            className={`mt-8 mb-8 ${feedbacks.length > 4
                ? 'max-h-80 overflow-y-auto pr-2 custom-scrollbar'
                : ''
                }`}
            style={{
                scrollbarWidth: 'none', /* Firefox */
                msOverflowStyle: 'none', /* Internet Explorer 10+ */
            }}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {feedbacks.map((feedback, index) => (
                    <FeedbackCard
                        key={index}
                        feedback={feedback}
                        showActions={showActions}
                        showDelete={showDelete}
                    />
                ))}
            </div>
        </div>
    )
}

export default FeedbackShow;
