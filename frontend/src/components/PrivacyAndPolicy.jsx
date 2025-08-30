import React from 'react'

function PrivacyAndPolicy() {
    return (
        <>
            <div className="space-y-4 text-sm text-gray-700">
                <h3 className="font-semibold">1. Information We Collect</h3>
                <p>
                    We collect personal details (e.g., name, email, location) when you register as a Donor, NGO, or Admin. We also log food donation data, pickup details, and system usage patterns.
                </p>

                <h3 className="font-semibold">2. Use of Information</h3>
                <p>
                    Collected data is used to:
                    <ul className="list-disc ml-5">
                        <li>Match donations with nearby NGOs</li>
                        <li>Send notifications via Firebase</li>
                        <li>Generate analytics and impact reports</li>
                        <li>Ensure food traceability and safety</li>
                    </ul>
                </p>

                <h3 className="font-semibold">3. Data Sharing</h3>
                <p>
                    We do not sell or share your personal data with third parties except:
                    <ul className="list-disc ml-5">
                        <li>To authorized NGOs or Donors for logistics</li>
                        <li>When legally required</li>
                    </ul>
                </p>

                <h3 className="font-semibold">4. Security</h3>
                <p>
                    We use secure storage practices and encrypt sensitive information. However, no method of transmission over the internet is 100% secure.
                </p>

                <h3 className="font-semibold">5. Cookies & Tracking</h3>
                <p>
                    FoodShare may use cookies to enhance user experience and track usage metrics.
                </p>

                <h3 className="font-semibold">6. Your Rights</h3>
                <p>
                    You can request access, correction, or deletion of your data at any time by contacting support@foodshare.com.
                </p>

                <h3 className="font-semibold">7. Changes to This Policy</h3>
                <p>
                    We may update this Privacy Policy from time to time. Continued use of the platform implies your agreement to any modifications.
                </p>

                <h3 className="font-semibold">8. Contact</h3>
                <p>
                    For any questions, please contact us at <a href="mailto:support@foodshare.com" className="text-blue-500 underline">support@foodshare.com</a>.
                </p>
            </div>
        </>
    )
}

export default PrivacyAndPolicy