function back() {
    window.location.href = "/"
}

function bio() {
    window.location.href = "/biografi"
}

function video() {
    window.location.href = "/video"
}

function game() {
    window.location.href = "/games"
}

function creators() {
    window.location.href = "/creatorprof"
}

function mentors() {
    window.location.href = "/mentors"
}

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const backgroundMusic = document.getElementById('background-music');
    
    let isPlaying = false;
    
    function initParticles() {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: getComputedStyle(document.documentElement).getPropertyValue('--primary-color')
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: 'white'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: getComputedStyle(document.documentElement).getPropertyValue('--primary-color'),
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
    
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        const icon = themeToggle.querySelector('i');
        if (newTheme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
        
        setTimeout(initParticles, 100);
    }
    
    function toggleMusic() {
        if (isPlaying) {
            backgroundMusic.pause();
            playPauseBtn.querySelector('i').className = 'fas fa-play';
            isPlaying = false;
        } else {
            backgroundMusic.play().catch(e => console.log('Audio play failed:', e));
            playPauseBtn.querySelector('i').className = 'fas fa-pause';
            isPlaying = true;
        }
    }
    
    function loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        const icon = themeToggle.querySelector('i');
        if (savedTheme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
    
    function animateOnScroll() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        const animateElements = document.querySelectorAll('.project-card, .skill-item, .thanks-item, .contact-card');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }
    
    function smoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    function addHoverEffects() {
        const cards = document.querySelectorAll('.project-card, .contact-card, .skill-item');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    function typewriterEffect() {
        const text = document.querySelector('.developer-name');
        const originalText = text.textContent;
        text.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            text.textContent += originalText.charAt(i);
            i++;
            if (i >= originalText.length) {
                clearInterval(typeInterval);
            }
        }, 100);
    }
    
    function navbarScroll() {
        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.background = document.documentElement.getAttribute('data-theme') === 'dark' 
                    ? 'rgba(15, 23, 42, 0.95)' 
                    : 'rgba(255, 255, 255, 0.95)';
            } else {
                navbar.style.background = document.documentElement.getAttribute('data-theme') === 'dark' 
                    ? 'rgba(15, 23, 42, 0.9)' 
                    : 'rgba(255, 255, 255, 0.9)';
            }
        });
    }
    
    themeToggle.addEventListener('click', toggleTheme);
    playPauseBtn.addEventListener('click', toggleMusic);
    
    loadSavedTheme();
    initParticles();
    animateOnScroll();
    smoothScroll();
    addHoverEffects();
    typewriterEffect();
    navbarScroll();
    
    window.addEventListener('resize', () => {
        setTimeout(initParticles, 100);
    });
});
