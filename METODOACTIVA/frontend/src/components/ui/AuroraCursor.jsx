import React, { useEffect, useRef, useState } from 'react';

/**
 * AuroraCursor (Optimized)
 * Uses direct DOM manipulation to avoid React Render Cycles on every mousemove.
 */
const AuroraCursor = () => {
    const cursorRef = useRef(null);
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        // Detect touch device (kill switch)
        const onTouchStart = () => setIsTouch(true);
        window.addEventListener('touchstart', onTouchStart);

        const cursor = cursorRef.current;
        let animationFrameId;

        const onMouseMove = (e) => {
            if (!cursor) return;

            // Direct DOM update (Zero React Re-renders)
            cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;

            // Optional: Hover detection check throttled (?)
            // For now, simpler is faster. We removed the "scale" on hover for raw performance.
            // If hover effect is needed, use standard CSS :hover on elements instead.
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });

        return () => {
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('mousemove', onMouseMove);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, []);

    if (isTouch) return null;

    return (
        <div
            ref={cursorRef}
            className="fixed pointer-events-none z-[100] top-0 left-0 transition-none will-change-transform mix-blend-multiply dark:mix-blend-screen"
        >
            <div className="w-8 h-8 bg-black/10 rounded-full blur-[2px]"></div>
        </div>
    );
};

export default AuroraCursor;
