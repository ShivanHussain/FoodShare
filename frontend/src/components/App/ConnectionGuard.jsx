// src/components/ConnectionGuard.jsx
import React, { useEffect, useState } from "react";

const ConnectionGuard = ({ children }) => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [isWeakConnection, setIsWeakConnection] = useState(false);


    const checkConnection = () => {
        //main object connection info is stored  ----->navigator.connection
        if (navigator.connection) {
            const { effectiveType, downlink } = navigator.connection;

            // Weak connection criteria 
            if (
                effectiveType === "2g" ||
                effectiveType === "slow-2g" ||
                downlink < 0.5 // Mbps
            ) {
                setIsWeakConnection(true);
            } else {
                setIsWeakConnection(false);
            }
        }
    };

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            checkConnection();
        };
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        if (navigator.connection) {
            navigator.connection.addEventListener("change", checkConnection);
            checkConnection();
        }

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
            if (navigator.connection) {
                navigator.connection.removeEventListener("change", checkConnection);
            }
        };
    }, []);

    if (!isOnline || isWeakConnection) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-gray-50">
                <div className="max-w-md mx-auto">
                    <img
                        src="/no-connection1.png"
                        alt="No Connection"
                        className="w-100 h-100 object-contain mx-auto mb-6 opacity-80"
                    />
                </div>
            </div>
        );
    }

    return children;
};

export default ConnectionGuard;
