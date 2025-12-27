/**
 * Simple Particle Confetti Utility (Zero-Dependency)
 * Creates a burst of dopamine-inducing particles.
 */

export function triggerConfetti() {
    const colors = ['#EC008C', '#F7941D', '#00AEEF', '#FFD700'];

    for (let i = 0; i < 50; i++) {
        createParticle(colors[Math.floor(Math.random() * colors.length)]);
    }
}

function createParticle(color) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = '50%';
    particle.style.bottom = '50%';
    particle.style.width = '8px';
    particle.style.height = '8px';
    particle.style.backgroundColor = color;
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';

    // Random direction
    const angle = Math.random() * Math.PI * 2;
    const velocity = 5 + Math.random() * 5;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;

    document.body.appendChild(particle);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let opacity = 1;

    const animate = () => {
        x += vx;
        y += vy;
        opacity -= 0.02;

        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.opacity = opacity;

        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    };

    requestAnimationFrame(animate);
}
