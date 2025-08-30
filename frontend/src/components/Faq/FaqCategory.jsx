import React from 'react';
import { ChevronDown, ChevronUp, } from 'lucide-react'

function FaqCategory({ faqCategories, activeAccordion, toggleAccordion}) {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="space-y-8">
                    {faqCategories.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            {/* Category Header */}
                            <div className={`bg-gradient-to-r ${category.color} p-6`}>
                                <div className="flex items-center text-white">
                                    <category.icon className="w-8 h-8 mr-4" />
                                    <h2 className="text-2xl font-bold">{category.title}</h2>
                                </div>
                            </div>

                            {/* Questions */}
                            <div className="divide-y divide-gray-200">
                                {category.questions.map((faq, questionIndex) => {
                                    const accordionIndex = `${categoryIndex}-${questionIndex}`;
                                    const isActive = activeAccordion === accordionIndex;

                                    return (
                                        <div key={questionIndex} className="overflow-hidden">
                                            <button
                                                onClick={() => toggleAccordion(accordionIndex)}
                                                className="w-full px-6 py-5 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors duration-200"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                                                        {faq.question}
                                                    </h3>
                                                    {isActive ? (
                                                        <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                                    ) : (
                                                        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                                    )}
                                                </div>
                                            </button>

                                            <div className={`transition-all duration-300 ease-in-out ${isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                                }`}>
                                                <div className="px-6 pb-5">
                                                    <p className="text-gray-600 leading-relaxed">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FaqCategory
