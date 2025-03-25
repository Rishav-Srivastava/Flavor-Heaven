// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for menu navigation
    const menuNavItems = document.querySelectorAll('.menu-nav-item');
    menuNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Offset for sticky header
                const offset = 120;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Add active class to clicked item
                menuNavItems.forEach(navItem => navItem.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // FAQ accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            faqItem.classList.toggle('active');
            
            // Change icon
            const icon = this.querySelector('i');
            if (faqItem.classList.contains('active')) {
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            } else {
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            }
        });
    });

    // Form submissions
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validateForm(contactForm)) {
                // Simulate form submission (would be replaced with actual submission in a real app)
                setTimeout(function() {
                    contactForm.style.display = 'none';
                    formSuccess.style.display = 'block';
                }, 1000);
            }
        });
    }
    
    const reservationForm = document.getElementById('reservationForm');
    const reservationSuccess = document.getElementById('reservationSuccess');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validateForm(reservationForm)) {
                // Simulate form submission (would be replaced with actual submission in a real app)
                setTimeout(function() {
                    reservationForm.style.display = 'none';
                    reservationSuccess.style.display = 'block';
                }, 1000);
            }
        });
    }
    
    // Form validation function
    function validateForm(form) {
        let valid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = 'red';
                valid = false;
            } else {
                input.style.borderColor = '';
            }
            
            // Email validation
            if (input.type === 'email' && input.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(input.value)) {
                    input.style.borderColor = 'red';
                    valid = false;
                }
            }
        });
        
        return valid;
    }

    // Scroll to top button functionality
    window.addEventListener('scroll', function() {
        const scrollHeight = window.pageYOffset;
        const scrollTopBtn = document.querySelector('.scroll-top');
        
        if (scrollTopBtn) {
            if (scrollHeight > 500) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        }
    });
});

// Function to highlight active menu section while scrolling
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.menu-section');
    const menuNavItems = document.querySelectorAll('.menu-nav-item');
    
    if (sections.length > 0 && menuNavItems.length > 0) {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Offset for sticky header
            const offset = 140;
            
            if (pageYOffset >= (sectionTop - offset)) {
                current = section.getAttribute('id');
            }
        });
        
        menuNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }
});
