/**
 * GSAP Registration & Initialization (Professional)
 */
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * Clean & Sleek Preloader
 */
const initPreloader = () => {
    const preloader = document.querySelector('.preloader');
    const loadingProgress = document.querySelector('.loading-progress');
    const percentText = document.querySelector('.percent');
    
    let progress = 0;
    const duration = 1200; // Faster, 1.2s loader
    const interval = 20; 
    const step = 100 / (duration / interval);
    
    // Lock scroll
    document.body.classList.add('loading');
    
    const loadingInterval = setInterval(() => {
        progress += step;
        if (progress > 100) progress = 100;
        
        loadingProgress.style.width = `${progress}%`;
        percentText.textContent = `${Math.floor(progress)}%`;
        
        if (progress === 100) {
            clearInterval(loadingInterval);
            
            setTimeout(() => {
                gsap.to(preloader, {
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.inOut",
                    onComplete: () => {
                        document.body.classList.remove('loading');
                        preloader.style.display = 'none';
                        initHeroAnimations();
                        initScrollAnimations();
                    }
                });
            }, 300);
        }
    }, interval);
};

/**
 * Professional Hero GSAP Animations
 */
const initHeroAnimations = () => {
    const tl = gsap.timeline();
    
    // Navbar reveals smoothly
    tl.fromTo('.navbar',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
    
    // Hero textual content cascades in
    tl.fromTo(['.hero-eyebrow', '.hero-heading', '.hero-description', '.hero-btns'],
        { y: 30, opacity: 0, autoAlpha: 0 },
        { y: 0, opacity: 1, autoAlpha: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        "-=0.4"
    );
    
    // Hero Code Window fades and scales subtly
    tl.fromTo('.code-window',
        { y: 30, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
        "-=0.6"
    );
};

/**
 * ScrollTrigger GSAP Animations
 */
const initScrollAnimations = () => {
    // Fade up elements
    gsap.utils.toArray('.fade-up').forEach((elem) => {
        gsap.fromTo(elem,
            { y: 30, opacity: 0, autoAlpha: 0 },
            {
                y: 0, 
                opacity: 1,
                autoAlpha: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Fade left elements
    gsap.utils.toArray('.fade-left').forEach((elem) => {
        gsap.fromTo(elem,
            { x: 30, opacity: 0, autoAlpha: 0 },
            {
                x: 0, 
                opacity: 1,
                autoAlpha: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
};

/**
 * Navbar Scroll Effect
 */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/**
 * Mobile Menu Toggle
 */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li a');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close mobile menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

/**
 * Contact Form Simulation
 */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = 'Sending...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = 'Message Sent';
            btn.style.backgroundColor = 'var(--accent)';
            btn.style.borderColor = 'var(--accent)';
            
            contactForm.reset();
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.backgroundColor = '';
                btn.style.borderColor = '';
                btn.disabled = false;
            }, 3000);
            
        }, 1500);
    });
}

// Initialization Sequence
window.addEventListener('DOMContentLoaded', () => {
    initPreloader();
});
