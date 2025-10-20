// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
    initMagneticButtons();
    initScrollAnimations();
    initNavigation();
    initSmoothScrolling();
    
    // Netlify Form Handling - MOVED INSIDE DOMContentLoaded
    const projectForm = document.getElementById('projectForm');
      if (projectForm) {
        projectForm.addEventListener('submit', function(e) {
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;

            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;

            // Let Netlify handle the submission automatically
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 4000); // reset after 4s (optional visual reset)
        });
    }
}); // REMOVED THE EXTRA BRACKET FROM HERE

// Initialize navigation
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            // Toggle active class
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = hamburger.querySelectorAll('span');
            if (hamburger.classList.contains('active')) {
                // Transform to X
                gsap.to(spans[0], { rotation: 45, y: 8, duration: 0.3 });
                gsap.to(spans[1], { opacity: 0, duration: 0.3 });
                gsap.to(spans[2], { rotation: -45, y: -8, duration: 0.3 });
                
                // Show menu with animation
                gsap.fromTo(navMenu, 
                    { opacity: 0, y: -20 },
                    { opacity: 1, y: 0, duration: 0.3 }
                );
            } else {
                // Transform back to hamburger
                gsap.to(spans, { rotation: 0, y: 0, opacity: 1, duration: 0.3 });
                
                // Hide menu
                gsap.to(navMenu, { opacity: 0, y: -20, duration: 0.3 });
            }
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Reset hamburger animation
                const spans = hamburger.querySelectorAll('span');
                gsap.to(spans, { rotation: 0, y: 0, opacity: 1, duration: 0.3 });
            }
        });
    });
}

// Fixed smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                // Calculate offset for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                // Smooth scroll
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Main animations
function initAnimations() {
    // Hero title animation
    gsap.to('.title-word', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.5
    });

    // Hero subtitle and buttons
    gsap.from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 1.5,
        ease: 'power3.out'
    });

    gsap.from('.hero-buttons', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 1.8,
        ease: 'power3.out'
    });

    // Floating cube animation
    gsap.to('.floating-cube', {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none'
    });
}

// Magnetic buttons effect
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.magnetic');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) * 0.2;
            const moveY = (y - centerY) * 0.2;
            
            gsap.to(this, {
                x: moveX,
                y: moveY,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mouseleave', function() {
            gsap.to(this, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    // Project cards
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.fromTo(card, {
            y: 100,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Skill categories
    gsap.utils.toArray('.skill-category').forEach((skill, i) => {
        gsap.fromTo(skill, {
            y: 50,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: i * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: skill,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Service cards
    gsap.utils.toArray('.service-card').forEach((service, i) => {
        gsap.fromTo(service, {
            y: 50,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: i * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: service,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Section titles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title, {
            y: 50,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// REMOVED THE DUPLICATE FORM HANDLING CODE FROM HERE

// Parallax effect for background shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.floating-shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        gsap.to(shape, {
            y: yPos,
            duration: 0.1,
            ease: 'none'
        });
    });
});