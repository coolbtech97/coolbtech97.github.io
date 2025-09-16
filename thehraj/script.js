// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Create sparkles on click
    document.addEventListener('click', createSparkles);
    
    // Create random sparkles every few seconds
    setInterval(createRandomSparkles, 3000);
    
    // Add pulsing effect to hearts
    setInterval(pulseHearts, 2000);
    
    // Create shooting stars
    setInterval(createShootingStar, 5000);
    
    // Add keyboard interaction
    document.addEventListener('keydown', handleKeyPress);
});

// Create sparkles at mouse click position
function createSparkles(e) {
    const sparkleCount = 8;
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.innerHTML = '✨';
        
        // Set position based on click
        sparkle.style.position = 'absolute';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        sparkle.style.fontSize = '1.5rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        sparkle.style.color = getRandomColor();
        
        document.body.appendChild(sparkle);
        
        // Animate sparkle
        animateSparkle(sparkle, i);
        
        // Remove after animation
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 2000);
    }
}

// Animate individual sparkle
function animateSparkle(sparkle, index) {
    const angle = (360 / 8) * index;
    const distance = 100 + Math.random() * 50;
    const duration = 1500 + Math.random() * 500;
    
    const radians = angle * Math.PI / 180;
    const endX = Math.cos(radians) * distance;
    const endY = Math.sin(radians) * distance;
    
    sparkle.style.transition = `all ${duration}ms ease-out`;
    sparkle.style.transform = `translate(${endX}px, ${endY}px) scale(0) rotate(720deg)`;
    sparkle.style.opacity = '0';
}

// Create random sparkles
function createRandomSparkles() {
    const sparkleCount = 3;
    
    for (let i = 0; i < sparkleCount; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            
            createSparkles({ clientX: x, clientY: y });
        }, i * 500);
    }
}

// Make hearts pulse randomly
function pulseHearts() {
    const hearts = document.querySelectorAll('.heart');
    
    hearts.forEach((heart, index) => {
        setTimeout(() => {
            heart.style.animation = 'none';
            heart.offsetHeight; // Trigger reflow
            heart.style.animation = 'float 6s ease-in-out infinite, pulse 0.6s ease-in-out';
        }, index * 200);
    });
}

// Create shooting stars
function createShootingStar() {
    const star = document.createElement('div');
    star.innerHTML = '🌟';
    star.style.position = 'absolute';
    star.style.fontSize = '2rem';
    star.style.top = Math.random() * 50 + '%';
    star.style.left = '-100px';
    star.style.pointerEvents = 'none';
    star.style.zIndex = '999';
    
    document.body.appendChild(star);
    
    // Animate shooting star
    star.style.transition = 'all 3s ease-out';
    setTimeout(() => {
        star.style.left = window.innerWidth + 100 + 'px';
        star.style.transform = 'rotate(360deg) scale(0.5)';
        star.style.opacity = '0';
    }, 100);
    
    // Remove after animation
    setTimeout(() => {
        if (star.parentNode) {
            star.parentNode.removeChild(star);
        }
    }, 3500);
}

// Handle keyboard interactions
function handleKeyPress(e) {
    switch(e.key.toLowerCase()) {
        case ' ': // Spacebar
            createRandomSparkles();
            break;
        case 'h': // H for hearts
            addMoreHearts();
            break;
        case 'l': // L for lightning
            triggerExtraLightning();
            break;
        case 's': // S for shooting star
            createShootingStar();
            break;
    }
}

// Add more floating hearts
function addMoreHearts() {
    const heartsContainer = document.querySelector('.hearts');
    const heartEmojis = ['💖', '💕', '💗', '💝', '❤️', '💞', '💓', '💘'];
    
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart temporary';
        heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (1.5 + Math.random()) + 'rem';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.animationDuration = (4 + Math.random() * 3) + 's';
        
        heartsContainer.appendChild(heart);
        
        // Remove temporary hearts after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 8000);
    }
}

// Trigger extra lightning effects
function triggerExtraLightning() {
    const lightning = document.querySelectorAll('.lightning');
    
    lightning.forEach((bolt, index) => {
        setTimeout(() => {
            bolt.style.animation = 'none';
            bolt.offsetHeight; // Trigger reflow
            bolt.style.animation = 'lightning 0.5s ease-in-out 3';
        }, index * 100);
    });
}

// Get random color
function getRandomColor() {
    const colors = ['#ff69b4', '#00ff7f', '#1e90ff', '#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Add CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.3); }
    }
    
    .sparkle {
        text-shadow: 0 0 10px currentColor;
    }
    
    .main-text:hover .word {
        animation-play-state: paused;
        transform: scale(1.2) rotate(5deg);
        transition: all 0.3s ease;
    }
    
    .character:hover {
        transform: scale(1.5) rotate(360deg);
        transition: all 0.5s ease;
    }
`;
document.head.appendChild(style);

// Create confetti effect on page load
window.addEventListener('load', function() {
    setTimeout(() => {
        createConfetti();
    }, 1000);
});

// Create confetti effect
function createConfetti() {
    const confettiCount = 50;
    const confettiEmojis = ['🎉', '🎊', '✨', '🌟', '💫', '⭐', '🎈', '🎁'];
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.innerHTML = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
            confetti.style.position = 'absolute';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-50px';
            confetti.style.fontSize = (1 + Math.random()) + 'rem';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '1001';
            confetti.style.animation = `fall ${3 + Math.random() * 2}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 6000);
        }, i * 100);
    }
}

// Add fall animation for confetti
const fallStyle = document.createElement('style');
fallStyle.textContent = `
    @keyframes fall {
        to {
            transform: translateY(calc(100vh + 100px)) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(fallStyle);
