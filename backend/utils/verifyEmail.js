// utils/emailVerification.js
import axios from "axios";

// Basic email validation with comprehensive regex
export const isValidEmail = (email) => {
    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    return emailRegex.test(cleanEmail) &&
        cleanEmail.length >= 5 &&
        cleanEmail.length <= 254 &&
        !cleanEmail.includes('..') &&
        !cleanEmail.endsWith('.');
};

// @desc Main email verification with fallback
export const verifyEmail = async (email) => {
    const cleanEmail = email.trim().toLowerCase();

    // Always validate format first
    const isBasicValid = isValidEmail(cleanEmail);

    // Try API verification if configured
    if (process.env.ABSTRACT_EMAIL_API_KEY) {
        try {
            const { data } = await axios.get("https://emailreputation.abstractapi.com/v1/", {
                params: { api_key: process.env.ABSTRACT_EMAIL_API_KEY, email: cleanEmail },
                timeout: 15000
            });

            const deliverability = data.email_deliverability || {};
            const quality = data.email_quality || {};

            return {
                email: cleanEmail,
                isValid: deliverability.is_format_valid ?? isBasicValid,
                deliverability: deliverability.status || (isBasicValid ? 'DELIVERABLE' : 'UNDELIVERABLE'),
                qualityScore: quality.score ? quality.score / 100 : (isBasicValid ? 0.8 : 0.3),
                isDisposable: quality.is_disposable || false,
                method: 'api'
            };
        } catch (error) {
            console.warn('Email API failed:', error.message);
        }
    }

    // Fallback to basic validation
    return {
        email: cleanEmail,
        isValid: isBasicValid,
        deliverability: isBasicValid ? 'DELIVERABLE' : 'UNDELIVERABLE',
        qualityScore: isBasicValid ? 0.7 : 0.1,
        isDisposable: false,
        method: 'basic'
    };
};