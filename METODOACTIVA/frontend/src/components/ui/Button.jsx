import React from 'react';

const Button = ({ children, variant = 'primary', className = '', onClick, type = 'button', ...props }) => {
    const baseStyle = "relative px-8 py-4 rounded-full font-bold transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-sans overflow-hidden group";

    const variants = {
        amazon: "bg-[#FF9900] text-white hover:bg-[#ffad33] shadow-lg hover:shadow-xl border border-transparent",
        primary: "bg-gradient-to-r from-brand-pink via-brand-pink-dark to-brand-pink text-white shadow-lg hover:shadow-glow-pink border border-transparent hover:brightness-110",
        secondary: "bg-white text-gray-900 border-2 border-gray-200 hover:border-brand-blue hover:text-brand-blue hover:shadow-soft",
        ghost: "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900",
        icon: "p-3 rounded-full hover:bg-gray-100 text-gray-600 transition-colors shadow-sm hover:shadow-md"
    };

    const handleMouseMove = (e) => {
        if (variant === 'icon' || variant === 'ghost') return;
        const btn = e.currentTarget;
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.02)`;
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.transform = 'translate(0px, 0px)';
    };

    return (
        <button
            type={type}
            className={`${baseStyle} ${variants[variant]} ${className}`}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            <span className="relative z-10 flex items-center gap-2 pointer-events-none">{children}</span>
            {(variant === 'primary' || variant === 'amazon') && (
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full blur-md pointer-events-none"></div>
            )}
        </button>
    );
};

export default Button;
