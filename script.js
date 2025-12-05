// ===================================
// DELIAS SNELTRANSPORT - JAVASCRIPT
// Core interactions (menu, video, form)
// ===================================

const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const menuOverlay = document.getElementById('menuOverlay');
const toggleSpans = mobileMenuToggle ? mobileMenuToggle.querySelectorAll('span') : [];
const heroVideo = document.getElementById('heroVideo');
const heroSources = heroVideo ? Array.from(heroVideo.querySelectorAll('source')) : [];
const contactForm = document.getElementById('contactForm');
const contactFormSubmitButton = contactForm ? contactForm.querySelector('.cta-button') : null;

const formMessages = {
    error_name: 'Please enter a valid name.',
    error_email: 'Please enter a valid email address.',
    error_phone: 'Please enter a valid phone number.',
    error_message: 'Please enter a message of at least 10 characters.',
    form_success: 'Thank you for your message! We will contact you as soon as possible.',
    form_button_success: 'Sent! ✓',
    form_submit: 'Send message'
};

// === NAVIGATION SCROLL EFFECT ===
window.addEventListener('scroll', () => {
    if (!navbar) return;
    const currentScroll = window.pageYOffset;
    navbar.classList.toggle('scrolled', currentScroll > 50);
});

// === HERO VIDEO CYCLING ===
if (heroVideo && heroSources.length > 1) {
    let currentVideoIndex = 0;
    heroVideo.addEventListener('ended', () => {
        currentVideoIndex = (currentVideoIndex + 1) % heroSources.length;
        heroVideo.src = heroSources[currentVideoIndex].getAttribute('src');
        heroVideo.load();
        heroVideo.play();
    });
}

// === MOBILE MENU TOGGLE ===
const setMenuToggleState = (isOpen) => {
    if (!mobileMenuToggle || toggleSpans.length < 3) return;
    toggleSpans[0].style.transform = isOpen ? 'rotate(45deg) translateY(8px)' : 'none';
    toggleSpans[1].style.opacity = isOpen ? '0' : '1';
    toggleSpans[2].style.transform = isOpen ? 'rotate(-45deg) translateY(-8px)' : 'none';
};

const setMenuOverlayState = (isOpen) => {
    if (menuOverlay) {
        menuOverlay.classList.toggle('active', isOpen);
    }
    document.body.classList.toggle('menu-open', isOpen);
};

const closeMobileMenu = () => {
    if (!navMenu) return;
    navMenu.classList.remove('active');
    setMenuToggleState(false);
    setMenuOverlayState(false);
};

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');
        setMenuToggleState(isOpen);
        setMenuOverlayState(isOpen);
    });
}

if (menuOverlay) {
    menuOverlay.addEventListener('click', closeMobileMenu);
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// === SMOOTH SCROLLING FOR NAVIGATION LINKS ===
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            closeMobileMenu();
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// === ACTIVE NAVIGATION LINK ON SCROLL ===
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset + 150;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
            });
        }
    });
});

// === FORM VALIDATION & SUBMISSION ===
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        const errors = [];
        if (name.length < 2) errors.push(formMessages.error_name);
        if (!isValidEmail(email)) errors.push(formMessages.error_email);
        if (phone.length < 10) errors.push(formMessages.error_phone);
        if (message.length < 10) errors.push(formMessages.error_message);

        if (errors.length) {
            alert(errors.join('\n'));
            return;
        }

        alert(formMessages.form_success);
        contactForm.reset();

        if (contactFormSubmitButton) {
            contactFormSubmitButton.textContent = formMessages.form_button_success;
            contactFormSubmitButton.style.background = 'linear-gradient(135deg, #4ECDC4, #44B3AA)';
            setTimeout(() => {
                contactFormSubmitButton.textContent = formMessages.form_submit;
                contactFormSubmitButton.style.background = '';
            }, 3000);
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
