import React, { useState, useEffect, useRef } from 'react';

const FadeIn = ({ children, delay = 0, direction = 'up' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setIsVisible(true);
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        if (domRef.current) observer.observe(domRef.current);
        return () => observer.disconnect();
    }, []);

    const directionClasses = {
        up: isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0',
        down: isVisible ? 'translate-y-0 opacity-100' : '-translate-y-16 opacity-0',
        left: isVisible ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0',
        right: isVisible ? 'translate-x-0 opacity-100' : '-translate-x-16 opacity-0',
    };

    return (
        <div
            ref={domRef}
            style={{ transitionDelay: `${delay}ms` }}
            className={`transition-all duration-1000 ease-out transform ${directionClasses[direction]}`}
        >
            {children}
        </div>
    );
};

export default FadeIn;
