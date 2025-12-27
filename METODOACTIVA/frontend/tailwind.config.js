/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Playfair Display', 'Georgia', 'serif'],
            },
            colors: {
                brand: {
                    yellow: { light: '#FFD200', DEFAULT: '#F7941D', dark: '#E67E00' },
                    blue: { light: '#2DD6F5', DEFAULT: '#00AEEF', dark: '#008CCF' },
                    pink: { light: '#FF5FAF', DEFAULT: '#EC008C', dark: '#B5006C' },
                }
            },
            boxShadow: {
                'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
                'glow-yellow': '0 0 20px rgba(247, 148, 29, 0.3)',
                'glow-blue': '0 0 20px rgba(0, 174, 239, 0.3)',
                'glow-pink': '0 0 20px rgba(236, 0, 140, 0.3)',
            },
            animation: {
                'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'shimmer': 'sheenMove 3s infinite linear',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                pageTurnNext: {
                    '0%': { transform: 'rotateY(0deg)' },
                    '100%': { transform: 'rotateY(-180deg)' },
                },
                pageTurnPrev: {
                    '0%': { transform: 'rotateY(-180deg)' },
                    '100%': { transform: 'rotateY(0deg)' },
                },
                sheenMove: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(200%)' },
                }
            }
        },
    },
    plugins: [],
}
