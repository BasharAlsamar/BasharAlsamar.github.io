document.addEventListener('DOMContentLoaded', function() {
    // Add hamburger menu functionality
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function() {
            // Toggle hamburger animation
            this.classList.toggle('active');
            
            // Toggle nav menu visibility
            navLinks.classList.toggle('show');
            
            // Toggle body scroll when menu is open
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close menu when clicking a link
    const allNavLinks = document.querySelectorAll('.nav-link');
    
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add visual feedback animation on click
            this.classList.add('clicked');
            setTimeout(() => this.classList.remove('clicked'), 300);
            
            // Get the target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // If mobile menu is open, close it
            if (navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                hamburgerMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
            
            // Scroll smoothly to the target with delay to allow menu to close
            setTimeout(() => {
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // Offset for fixed nav
                    behavior: 'smooth'
                });
            }, 100);
            
            // Update active state
            allNavLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Show back to top button when scrolled down
    const backToTopButton = document.getElementById('back-to-top');
    
    // Add shadow to nav when scrolled
    const mainNav = document.getElementById('main-nav');
    
    // Function to check scroll position and animate elements
    function handleScroll() {
        // Show/hide back to top button
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
        
        // Add shadow to nav when scrolled
        if (window.pageYOffset > 50) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
        
        // Animate sections when they come into view
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 100) {
                section.classList.add('visible');
                
                // Animate timeline items within experience section
                if (section.id === 'experience') {
                    const timelineItems = section.querySelectorAll('.timeline-item');
                    timelineItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, 300 * index); // Stagger the animations
                    });
                }
                
                // Animate education items
                if (section.id === 'education') {
                    const educationItems = section.querySelectorAll('.education-item');
                    educationItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, 300 * index); // Stagger the animations
                    });
                }
                
                // Animate project cards
                if (section.id === 'projects' || section.id === 'certificates') {
                    const cards = section.querySelectorAll('.project-card, .certificate-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, 200 * index); // Stagger the animations
                    });
                }
            }
        });
        
        // Update active navigation based on scroll position
        const scrollPosition = window.pageYOffset;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
                allNavLinks.forEach(navLink => {
                    if (navLink.getAttribute('href') !== `#${sectionId}`) {
                        navLink.classList.remove('active');
                    }
                });
            }
        });
    }
    
    // Initial check and listen for scroll events
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    
    // Add animation to back to top button click
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Ensure all project cards and certificates are initialized with visible
    // in case JavaScript is disabled or sections are in view on load
    document.querySelectorAll('.project-card, .certificate-card').forEach(card => {
        if (card.getBoundingClientRect().top < window.innerHeight) {
            card.classList.add('visible');
        }
    });
    
    // Add lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
    
    // Add smooth hover animations to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Enhance accessibility by adding keyboard navigation
    document.querySelectorAll('.skill-item, .project-links a, .contact-icon-box').forEach(item => {
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                this.click();
            }
        });
    });
    
    // Add touch capability detection to enhance mobile interactions
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        document.body.classList.add('touch-device');
        
        // Make skill items and contact buttons better for touch devices
        document.querySelectorAll('.skill-item, .contact-icon-box').forEach(item => {
            item.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            item.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 300);
            });
        });
    }
    
    // Initial animations when page loads
    setTimeout(function() {
        document.querySelector('header').classList.add('visible');
        
        // Sequentially animate sections in view
        const visibleSections = Array.from(document.querySelectorAll('section')).filter(
            section => section.getBoundingClientRect().top < window.innerHeight
        );
        
        visibleSections.forEach((section, index) => {
            setTimeout(() => {
                section.classList.add('visible');
                
                // Trigger sub-animations within sections
                if (section.id === 'experience') {
                    const timelineItems = section.querySelectorAll('.timeline-item');
                    timelineItems.forEach((item, idx) => {
                        setTimeout(() => item.classList.add('visible'), 200 * idx);
                    });
                }
                
                if (section.id === 'projects' || section.id === 'certificates') {
                    const cards = section.querySelectorAll('.project-card, .certificate-card');
                    cards.forEach((card, idx) => {
                        setTimeout(() => card.classList.add('visible'), 150 * idx);
                    });
                }
            }, 200 * index);
        });
    }, 300);
    
    // Debounce function to limit scroll event firing
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }
    
    // Use debounced scroll handler for better performance
    const debouncedScrollHandler = debounce(handleScroll, 10);
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // Add resize handler for responsive adjustments
    window.addEventListener('resize', debounce(function() {
        // Recalculate any dimension-dependent values
        if (window.innerWidth <= 768) {
            document.body.classList.add('mobile-view');
        } else {
            document.body.classList.remove('mobile-view');
            // Ensure mobile menu is closed on resize to desktop
            if (navLinks) {
                navLinks.classList.remove('show');
            }
            if (hamburgerMenu) {
                hamburgerMenu.classList.remove('active');
            }
            document.body.classList.remove('menu-open');
        }
    }, 150));
    
    // Initialize page based on current viewport
    if (window.innerWidth <= 768) {
        document.body.classList.add('mobile-view');
    }
});