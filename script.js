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
const currentYearElement = document.getElementById('currentYear');
const routesVideo = document.getElementById('routesVideo');
const routeForm = document.getElementById('routeForm');
const routeOriginInput = document.getElementById('routeOrigin');
const routeDestinationInput = document.getElementById('routeDestination');
const routeDistanceElement = document.getElementById('routeDistance');
const routeDurationElement = document.getElementById('routeDuration');
const routeStatusElement = document.getElementById('routeStatus');
const routeOriginSuggestions = document.getElementById('routeOriginSuggestions');
const routeDestinationSuggestions = document.getElementById('routeDestinationSuggestions');
const freightTypeElement = document.getElementById('freightType');
const routeProgress = document.getElementById('routeProgress');
const routeProgressBar = document.getElementById('routeProgressBar');
const routeProgressText = document.getElementById('routeProgressText');
let routeProgressTimer;

const setProgress = (value) => {
    const clamped = Math.max(0, Math.min(100, value));
    if (routeProgressBar) routeProgressBar.style.width = `${clamped}%`;
    if (routeProgressText) routeProgressText.textContent = `${Math.round(clamped)}%`;
};

const startProgress = () => {
    if (routeProgress) routeProgress.classList.add('active');
    setProgress(0);
    clearInterval(routeProgressTimer);
    let current = 0;
    routeProgressTimer = setInterval(() => {
        current = Math.min(current + Math.random() * 10, 90);
        setProgress(current);
    }, 150);
};

const finishProgress = () => {
    clearInterval(routeProgressTimer);
    setProgress(100);
    setTimeout(() => {
        if (routeProgress) routeProgress.classList.remove('active');
        setProgress(0);
    }, 500);
};

const resetProgress = () => {
    clearInterval(routeProgressTimer);
    if (routeProgress) routeProgress.classList.remove('active');
    setProgress(0);
};

const formMessages = {
    error_name: 'Please enter a valid name.',
    error_email: 'Please enter a valid email address.',
    error_phone: 'Please enter a valid phone number.',
    error_message: 'Please enter a message of at least 10 characters.',
    form_success: 'Thank you for your message! We will contact you as soon as possible.',
    form_button_success: 'Sent! ✓',
    form_submit: 'Send message'
};

// === FOOTER YEAR ===
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

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

// === ROUTES VIDEO AUTOPLAY ON VIEW ===
if (routesVideo) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                routesVideo.play().catch(() => {});
            } else {
                routesVideo.pause();
            }
        });
    }, { threshold: 0.4 });

    observer.observe(routesVideo);
}

// === ROUTE PLANNER ===
const formatDuration = (seconds) => {
    const totalMinutes = Math.round(seconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours === 0) return `${minutes} min`;
    if (minutes === 0) return `${hours} h`;
    return `${hours} h ${minutes} min`;
};

const setRouteStatus = (message, isError = false) => {
    if (routeStatusElement) {
        routeStatusElement.textContent = message;
        routeStatusElement.style.color = isError ? '#ff7a1a' : 'var(--text-gray)';
    }
};

const geocodeAddress = async (address) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`, {
        headers: {
            'Accept-Language': 'en',
            'User-Agent': 'DeliasSneltransport/1.0'
        }
    });
    const data = await response.json();
    if (!data.length) {
        throw new Error(`Could not find: ${address}`);
    }
    const { lat, lon, display_name } = data[0];
    return { lat: parseFloat(lat), lon: parseFloat(lon), label: display_name };
};

const fetchRoute = async (from, to) => {
    const url = `https://router.project-osrm.org/route/v1/driving/${from.lon},${from.lat};${to.lon},${to.lat}?overview=full&geometries=geojson`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.code !== 'Ok' || !data.routes || !data.routes.length) {
        throw new Error('Route not available. Please try different locations.');
    }
    return data.routes[0];
};

if (routeForm && routeOriginInput && routeDestinationInput) {

    const debounce = (fn, delay = 300) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    };

    const populateSuggestions = (datalist, items) => {
        if (!datalist) return;
        datalist.innerHTML = '';
        items.forEach(item => {
            const option = document.createElement('option');
            option.value = item.display_name;
            datalist.appendChild(option);
        });
    };

    const fetchSuggestions = async (query, datalist) => {
        if (!query || query.length < 3) {
            populateSuggestions(datalist, []);
            return;
        }
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`, {
                headers: {
                    'Accept-Language': 'en',
                    'User-Agent': 'DeliasSneltransport/1.0'
                }
            });
            const data = await res.json();
            populateSuggestions(datalist, data || []);
        } catch (_e) {
            populateSuggestions(datalist, []);
        }
    };

    const debouncedOriginSuggestions = debounce((value) => fetchSuggestions(value, routeOriginSuggestions));
    const debouncedDestinationSuggestions = debounce((value) => fetchSuggestions(value, routeDestinationSuggestions));

    routeOriginInput.addEventListener('input', (e) => debouncedOriginSuggestions(e.target.value));
    routeDestinationInput.addEventListener('input', (e) => debouncedDestinationSuggestions(e.target.value));

    routeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const origin = routeOriginInput.value.trim();
        const destination = routeDestinationInput.value.trim();
        if (!origin || !destination) return;
        setRouteStatus('Calculating route...');
        startProgress();
        routeForm.querySelector('button[type="submit"]').disabled = true;
        try {
            const [from, to] = await Promise.all([
                geocodeAddress(origin),
                geocodeAddress(destination)
            ]);
            const route = await fetchRoute(from, to);
            const distanceKm = (route.distance / 1000).toFixed(1);
            const durationText = '2-5 days';
            if (routeDistanceElement) routeDistanceElement.textContent = `${distanceKm} km`;
            if (routeDurationElement) routeDurationElement.textContent = durationText;
            if (freightTypeElement) freightTypeElement.classList.add('visible');
            setRouteStatus(`From "${from.label}" to "${to.label}"`);
            finishProgress();
        } catch (error) {
            setRouteStatus(error.message || 'Unable to calculate route.', true);
            if (routeDistanceElement) routeDistanceElement.textContent = '—';
            if (routeDurationElement) routeDurationElement.textContent = '—';
            if (freightTypeElement) freightTypeElement.classList.remove('visible');
            resetProgress();
        } finally {
            routeForm.querySelector('button[type="submit"]').disabled = false;
        }
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
