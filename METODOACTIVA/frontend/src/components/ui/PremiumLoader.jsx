import React, { useEffect, useRef } from 'react';
import './PremiumLoader.css';

const PremiumLoader = () => {
    const containerRef = useRef(null);

    // Particle System Effect
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const colors = ['#F7941D', '#EC008C', '#2DD6F5']; // Brand Colors

        const createParticle = () => {
            if (!container) return; // Cleanup check
            const particle = document.createElement('div');

            // Randomize properties
            const size = Math.random() * 6 + 2; // 2px to 8px
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 300 - 150; // Random X within center range
            const moveX = (Math.random() - 0.5) * 50; // Lateral drift
            const delay = Math.random() * 2;

            // Apply styles programmatically to avoid complex dynamic CSS
            particle.style.position = 'absolute';
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = color;
            particle.style.borderRadius = '50%';
            particle.style.left = `calc(50% + ${left}px)`;
            particle.style.top = '60%';
            particle.style.opacity = '0';
            particle.style.pointerEvents = 'none';
            particle.style.animation = `particleFloat 4s ease-out forwards`;
            particle.style.setProperty('--move-x', `${moveX}px`);
            particle.style.animationDelay = `${delay}s`;

            container.appendChild(particle);

            // Cleanup particle
            setTimeout(() => {
                if (particle.parentNode) particle.remove();
            }, 4000);
        };

        const interval = setInterval(createParticle, 200);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[radial-gradient(circle_at_center,_#fdfbf7_0%,_#f3f4f6_100%)] overflow-hidden font-sans">


            <div ref={containerRef} className="relative w-[400px] h-[400px] flex justify-center items-center perspective-[1200px]">

                {/* RINGS SYSTEM */}
                <div className="absolute w-full h-full animate-[systemFloat_6s_ease-in-out_infinite] preserve-3d">
                    {/* Ring 1 (Orange) */}
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#F7941D]/60 border-b-[#F7941D]/20 shadow-[0_0_20px_rgba(247,148,29,0.1)] animate-[spinRing1_4s_linear_infinite]"
                        style={{ transform: 'rotateX(60deg) rotateY(10deg)' }}></div>

                    {/* Ring 2 (Blue) */}
                    <div className="absolute top-5 left-5 right-5 bottom-5 rounded-full border-2 border-transparent border-l-[#2DD6F5]/70 border-r-[#2DD6F5]/10 shadow-[0_0_20px_rgba(45,214,245,0.1)] animate-[spinRing2_5s_linear_infinite_reverse]"
                        style={{ transform: 'rotateX(45deg) rotateY(-10deg)' }}></div>

                    {/* Ring 3 (Pink) */}
                    <div className="absolute top-10 left-10 right-10 bottom-10 rounded-full border border-dashed border-[#EC008C]/50 animate-[spinRing3_12s_linear_infinite]"
                        style={{ transform: 'rotateX(30deg)' }}></div>
                </div>

                {/* LOGO COIN (Center) */}
                {/* LOGO REMOVED - JUST PURE ENERGY CORE */}
                <div className="w-40 h-40 relative flex items-center justify-center animate-[coinFloat_3s_ease-in-out_infinite]">
                    <div className="absolute w-20 h-20 bg-white rounded-full blur-[40px] opacity-60 animate-pulse"></div>
                    <div className="absolute w-full h-full border-4 border-transparent border-t-white/40 rounded-full animate-spin duration-[4s]"></div>
                    <div className="absolute w-3/4 h-3/4 border-2 border-transparent border-b-white/20 rounded-full animate-spin duration-[3s] direction-reverse"></div>
                </div>

                {/* SHADOW FLOOR */}
                <div className="absolute -bottom-16 w-24 h-5 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.2)_0%,transparent_70%)] rounded-full blur-[5px] animate-[shadowPulse_3s_ease-in-out_infinite]"></div>

                {/* TEXT CONTAINER */}
                <div className="absolute -bottom-24 flex flex-col items-center gap-3 text-center w-[200%]">
                    <div className="text-5xl font-black bg-gradient-to-r from-[#F7941D] via-[#EC008C] to-[#2DD6F5] bg-clip-text text-transparent tracking-[0.2em] drop-shadow-sm scale-y-110">
                        ACTIVA
                    </div>
                    <div className="text-xs text-gray-400 font-bold tracking-[0.3em] animate-[pulseText_2s_ease-in-out_infinite] uppercase">
                        GRACIAS POR VISITARNOS
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PremiumLoader;
