import React from 'react';
import { Award } from 'lucide-react';

function ImpactSection({ claimedDetails }) {
    const estimateBeneficiaries = (quantity, servings) => {
        const amount = quantity || servings || 0;
        if (amount <= 10) return `${amount * 1}-${amount * 2}`;
        if (amount <= 30) return `${amount * 1}-${amount * 3}`;
        return `${amount}+`;
    };

    // Add safety check for claimedDetails
    if (!claimedDetails) {
        return null;
    }

    return (
        <>
            <section className="py-8 bg-gradient-to-r from-green-600 to-blue-600 text-white">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center mb-6">
                        <div className="bg-white/20 p-4 rounded-full">
                            <Award className="w-12 h-12 text-yellow-300" />
                        </div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Making an Impact Together
                    </h2>
                    <p className="text-xl text-green-100 mb-6">
                        This donation will help feed {estimateBeneficiaries(claimedDetails.quantity, claimedDetails.servings)} people in our community through {claimedDetails.claimedBy?.name || 'an organization'}.
                    </p>
                </div>
            </section>
        </>
    );
}

export default ImpactSection;