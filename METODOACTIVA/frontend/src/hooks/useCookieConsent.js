import { useState, useEffect } from 'react';

export const useCookieConsent = () => {
    const [showCookieBanner, setShowCookieBanner] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) setShowCookieBanner(true);
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookieConsent', 'true');
        setShowCookieBanner(false);
    };

    const declineCookies = () => {
        setShowCookieBanner(false);
    }

    return {
        showCookieBanner,
        acceptCookies,
        declineCookies
    };
};
