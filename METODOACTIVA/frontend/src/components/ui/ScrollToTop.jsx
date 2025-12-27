import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let ticking = false;
        const toggleVisibility = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsVisible(window.scrollY > 300);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', toggleVisibility, { passive: true });
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            aria-label="Volver arriba"
            className="fixed bottom-24 right-6 md:bottom-24 md:right-8 z-40 p-3 bg-white border border-gray-200 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
        >
            <svg className="w-5 h-5 text-gray-600 group-hover:text-[#EC008C] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
        </button>
    );
};

export default ScrollToTop;
