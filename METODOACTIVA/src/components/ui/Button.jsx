import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyle = "px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-sans";

    const variants = {
        amazon: "bg-[#FF9900] text-white hover:bg-[#ffad33] shadow-lg hover:shadow-xl border border-transparent",
        primary: "bg-gradient-to-r from-brand-pink via-brand-pink-dark to-brand-pink text-white shadow-lg hover:shadow-glow-pink border border-transparent hover:brightness-110",
        secondary: "bg-white text-gray-900 border-2 border-gray-200 hover:border-brand-blue hover:text-brand-blue hover:shadow-soft",
        ghost: "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900",
        icon: "p-3 rounded-full hover:bg-gray-100 text-gray-600 transition-colors shadow-sm hover:shadow-md"
    };

    return (
        <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
