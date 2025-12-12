import React, { useEffect, useState } from 'react';

/**
 * AuroraCursor
 * A subtle, premium cursor follower that creates an "organic light" feel.
 * Optimized to detect touch devices and disable itself to save battery.
 */
const AuroraCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isTouch, setIsTouch] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        // Detect touch device
        const onTouchStart = () => setIsTouch(true);
        window.addEventListener('touchstart', onTouchStart);

        const onMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });

            // Check if hovering over a clickable element for magnetic scaling
            const target = e.target;
            if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', onMouseMove);

        return () => {
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    if (isTouch) return null;

    return (
        <>
            {/* Primary Glow (The core) */}
            <div
                className="fixed pointer-events-none z-[100] transition-transform duration-100 ease-out mix-blend-multiply dark:mix-blend-screen"
                style={{
                    left: 0,
                    top: 0,
                    transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
                }}
            >
                <div className="w-8 h-8 bg-black/10 rounded-full blur-[2px]"></div>
            </div>

            {/* Secondary Aurora (The trailing light) */}
            <div
                className="fixed pointer-events-none z-[90] transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1) mix-blend-multiply"
                style={{
                    left: 0,
                    top: 0,
                    transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
                }}
            >
                <div className="w-[400px] h-[400px] bg-gradient-to-r from-[#EC008C]/10 via-[#F7941D]/10 to-[#00AEEF]/10 rounded-full blur-[80px] opacity-60"></div>
            </div>
        </>
    );
};

export default AuroraCursor;
