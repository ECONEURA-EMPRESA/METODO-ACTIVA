import React, { useEffect, useRef } from 'react';

const ScrollProgressBar = () => {
    const barRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!barRef.current) return;

            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;

            // Direct DOM update ensures NO React Re-renders
            barRef.current.style.width = `${Math.min(progress, 100)}%`;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-gray-200/50 pointer-events-none">
            <div
                ref={barRef}
                className="h-full bg-gradient-to-r from-[#EC008C] via-[#F7941D] to-[#00AEEF] transition-none ease-out will-change-[width]"
                style={{ width: '0%' }}
            />
        </div>
    );
};

export default ScrollProgressBar;
