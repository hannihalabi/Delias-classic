// ===================================
// DELIAS SNELTRANSPORT - JAVASCRIPT
// Core interactions (menu, video, form)
// ===================================

const normalizeLang = (lang) => (lang || 'en').toLowerCase().split('-')[0];
const pageLang = normalizeLang(document.documentElement.lang);

const i18n = {
    en: {
        form: {
            error_name: 'Please enter a valid name.',
            error_email: 'Please enter a valid email address.',
            error_phone: 'Please enter a valid phone number.',
            error_message: 'Please enter a message of at least 10 characters.',
            error_submit: 'Something went wrong. Please try again.',
            form_success: 'Thank you for your message! We will contact you as soon as possible.',
            form_button_success: 'Sent! ✓',
            form_submit: 'Send message'
        },
        route: {
            calculating: 'Calculating route...',
            routeNotAvailable: 'Route not available. Please try different locations.',
            unableToCalculate: 'Unable to calculate route.',
            couldNotFindPrefix: 'Could not find:',
            eta: '2–5 days',
            fromTo: (from, to) => `From "${from}" to "${to}"`
        },
        languagePrompt: {
            question: (name) => `View this site in ${name}?`,
            switch: 'Switch',
            dismiss: 'Not now'
        }
    },
    nl: {
        form: {
            error_name: 'Vul een geldige naam in.',
            error_email: 'Vul een geldig e-mailadres in.',
            error_phone: 'Vul een geldig telefoonnummer in.',
            error_message: 'Vul een bericht in van minimaal 10 tekens.',
            error_submit: 'Er ging iets mis. Probeer het opnieuw.',
            form_success: 'Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.',
            form_button_success: 'Verzonden! ✓',
            form_submit: 'Bericht versturen'
        },
        route: {
            calculating: 'Route wordt berekend...',
            routeNotAvailable: 'Route niet beschikbaar. Probeer andere locaties.',
            unableToCalculate: 'Route berekenen lukt niet.',
            couldNotFindPrefix: 'Niet gevonden:',
            eta: '2–5 dagen',
            fromTo: (from, to) => `Van "${from}" naar "${to}"`
        },
        languagePrompt: {
            question: (name) => `Deze website bekijken in ${name}?`,
            switch: 'Wisselen',
            dismiss: 'Niet nu'
        }
    },
    de: {
        form: {
            error_name: 'Bitte geben Sie einen gültigen Namen ein.',
            error_email: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
            error_phone: 'Bitte geben Sie eine gültige Telefonnummer ein.',
            error_message: 'Bitte geben Sie eine Nachricht mit mindestens 10 Zeichen ein.',
            error_submit: 'Etwas ist schiefgelaufen. Bitte versuche es erneut.',
            form_success: 'Vielen Dank! Wir melden uns so schnell wie möglich.',
            form_button_success: 'Gesendet! ✓',
            form_submit: 'Nachricht senden'
        },
        route: {
            calculating: 'Route wird berechnet...',
            routeNotAvailable: 'Route nicht verfügbar. Bitte andere Orte versuchen.',
            unableToCalculate: 'Route kann nicht berechnet werden.',
            couldNotFindPrefix: 'Nicht gefunden:',
            eta: '2–5 Tage',
            fromTo: (from, to) => `Von "${from}" nach "${to}"`
        },
        languagePrompt: {
            question: (name) => `Diese Website auf ${name} ansehen?`,
            switch: 'Wechseln',
            dismiss: 'Nicht jetzt'
        }
    },
    es: {
        form: {
            error_name: 'Introduce un nombre válido.',
            error_email: 'Introduce un email válido.',
            error_phone: 'Introduce un teléfono válido.',
            error_message: 'Escribe un mensaje de al menos 10 caracteres.',
            error_submit: 'Algo salió mal. Inténtalo de nuevo.',
            form_success: 'Gracias por tu mensaje. Nos pondremos en contacto lo antes posible.',
            form_button_success: 'Enviado ✓',
            form_submit: 'Enviar mensaje'
        },
        route: {
            calculating: 'Calculando ruta...',
            routeNotAvailable: 'Ruta no disponible. Prueba con otras ubicaciones.',
            unableToCalculate: 'No se pudo calcular la ruta.',
            couldNotFindPrefix: 'No se encontró:',
            eta: '2–5 días',
            fromTo: (from, to) => `De "${from}" a "${to}"`
        },
        languagePrompt: {
            question: (name) => `¿Ver este sitio en ${name}?`,
            switch: 'Cambiar',
            dismiss: 'Ahora no'
        }
    }
};

const messages = i18n[pageLang] || i18n.en;
const formMessages = messages.form;
const routeMessages = messages.route;

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
let routeAbortController;
const heritageMedia = document.querySelector('.heritage-media');
const gallerySlider = document.querySelector('.gallery-slider');

// === LANGUAGE PREFERENCE (non-intrusive) ===
const supportedLangs = ['nl', 'en', 'de', 'es'];
const langToPath = { nl: '/', en: '/lang/en/', de: '/lang/de/', es: '/lang/es/' };
const langDisplayName = { nl: 'Nederlands', en: 'English', de: 'Deutsch', es: 'Español' };

const isLikelyBot = () => /bot|crawler|spider|crawling|lighthouse/i.test(navigator.userAgent || '');

const getBrowserLang = () => {
    const candidate = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';
    return normalizeLang(candidate);
};

const preferredLang = (() => {
    try {
        return normalizeLang(localStorage.getItem('preferredLang'));
    } catch (_e) {
        return null;
    }
})();

const setPreferredLang = (lang) => {
    try {
        localStorage.setItem('preferredLang', normalizeLang(lang));
    } catch (_e) {
        // ignore
    }
};

const maybeRedirectToPreferredLang = () => {
    if (!/^https?:$/.test(window.location.protocol)) return;
    if (isLikelyBot()) return;
    if (!preferredLang || !supportedLangs.includes(preferredLang)) return;
    if (preferredLang === pageLang) return;
    const target = langToPath[preferredLang];
    if (!target) return;
    if (window.location.pathname === target) return;
    window.location.href = target;
};

const maybeShowLanguagePrompt = () => {
    if (!/^https?:$/.test(window.location.protocol)) return;
    if (isLikelyBot()) return;
    if (preferredLang) return;
    const browserLang = getBrowserLang();
    if (!supportedLangs.includes(browserLang)) return;
    if (browserLang === pageLang) return;

    const banner = document.createElement('div');
    banner.className = 'lang-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');

    const question = document.createElement('p');
    question.textContent = messages.languagePrompt.question(langDisplayName[browserLang] || browserLang.toUpperCase());

    const actions = document.createElement('div');
    actions.className = 'lang-banner-actions';

    const switchLink = document.createElement('a');
    switchLink.href = langToPath[browserLang];
    switchLink.textContent = messages.languagePrompt.switch;
    switchLink.addEventListener('click', () => setPreferredLang(browserLang));

    const dismissButton = document.createElement('button');
    dismissButton.type = 'button';
    dismissButton.textContent = messages.languagePrompt.dismiss;
    dismissButton.addEventListener('click', () => {
        setPreferredLang(pageLang);
        banner.remove();
    });

    actions.appendChild(switchLink);
    actions.appendChild(dismissButton);
    banner.appendChild(question);
    banner.appendChild(actions);
    document.body.appendChild(banner);
};

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

// === FOOTER YEAR ===
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// === LANGUAGE INIT ===
maybeRedirectToPreferredLang();
maybeShowLanguagePrompt();

document.querySelectorAll('.lang-switch a[data-lang]').forEach((link) => {
    link.addEventListener('click', () => {
        const targetLang = link.getAttribute('data-lang');
        if (targetLang) setPreferredLang(targetLang);
    });
});

document.querySelectorAll('.lang-switch').forEach((switcher) => {
    const trigger = switcher.querySelector('.lang-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', (event) => {
        event.preventDefault();
        const isOpen = switcher.classList.toggle('is-open');
        trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', (event) => {
        if (switcher.contains(event.target)) return;
        switcher.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
    });
});

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

// === HERITAGE IMAGE NAVIGATION ===
if (heritageMedia) {
    const heritageSlides = Array.from(heritageMedia.querySelectorAll('.heritage-image'));
    if (heritageSlides.length > 0) {
        const prevHeritage = heritageMedia.querySelector('.heritage-control.prev');
        const nextHeritage = heritageMedia.querySelector('.heritage-control.next');
        let heritageIndex = 0;
        let heritageTimer;

        const showHeritageSlide = (index) => {
            if (!heritageSlides.length) return;
            heritageSlides.forEach((slide, idx) => {
                slide.classList.toggle('active', idx === index);
            });
        };

        const restartHeritageTimer = () => {
            clearInterval(heritageTimer);
            if (heritageSlides.length < 2) return;
            heritageTimer = setInterval(() => moveHeritage(1), 12000);
        };

        const moveHeritage = (direction) => {
            heritageIndex = (heritageIndex + direction + heritageSlides.length) % heritageSlides.length;
            showHeritageSlide(heritageIndex);
            restartHeritageTimer();
        };

        // Init
        showHeritageSlide(heritageIndex);
        restartHeritageTimer();

        if (prevHeritage) prevHeritage.addEventListener('click', () => moveHeritage(-1));
        if (nextHeritage) nextHeritage.addEventListener('click', () => moveHeritage(1));
    }
}

// === GALLERY SLIDER ===
if (gallerySlider) {
    const gallerySlides = Array.from(gallerySlider.querySelectorAll('.gallery-slide'));
    const prevGallery = gallerySlider.querySelector('.gallery-control.prev');
    const nextGallery = gallerySlider.querySelector('.gallery-control.next');
    let galleryIndex = 0;
    let galleryTimer;

    const showGallerySlide = (index) => {
        if (!gallerySlides.length) return;
        gallerySlides.forEach((slide, idx) => {
            slide.classList.toggle('active', idx === index);
        });
    };

    const restartGalleryTimer = () => {
        clearInterval(galleryTimer);
        if (gallerySlides.length < 2) return;
        galleryTimer = setInterval(() => moveGallery(1), 5000);
    };

    const moveGallery = (direction) => {
        galleryIndex = (galleryIndex + direction + gallerySlides.length) % gallerySlides.length;
        showGallerySlide(galleryIndex);
        restartGalleryTimer();
    };

    // Init
    showGallerySlide(galleryIndex);
    restartGalleryTimer();

    if (prevGallery) prevGallery.addEventListener('click', () => moveGallery(-1));
    if (nextGallery) nextGallery.addEventListener('click', () => moveGallery(1));
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

const geocodeAddress = async (address, signal) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`, {
        headers: {
            'Accept-Language': pageLang,
            'User-Agent': 'DeliasSneltransport/1.0'
        },
        signal
    });
    if (!response.ok) {
        throw new Error(routeMessages.unableToCalculate);
    }
    const data = await response.json();
    if (!data.length) {
        throw new Error(`${routeMessages.couldNotFindPrefix} ${address}`);
    }
    const { lat, lon, display_name } = data[0];
    return { lat: parseFloat(lat), lon: parseFloat(lon), label: display_name };
};

const fetchRoute = async (from, to, signal) => {
    const url = `https://router.project-osrm.org/route/v1/driving/${from.lon},${from.lat};${to.lon},${to.lat}?overview=full&geometries=geojson`;
    const response = await fetch(url, { signal });
    if (!response.ok) {
        throw new Error(routeMessages.routeNotAvailable);
    }
    const data = await response.json();
    if (data.code !== 'Ok' || !data.routes || !data.routes.length) {
        throw new Error(routeMessages.routeNotAvailable);
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
                    'Accept-Language': pageLang,
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
        if (routeAbortController) {
            routeAbortController.abort();
        }
        routeAbortController = new AbortController();

        const origin = routeOriginInput.value.trim();
        const destination = routeDestinationInput.value.trim();
        if (!origin || !destination) return;
        setRouteStatus(routeMessages.calculating);
        startProgress();
        routeForm.querySelector('button[type="submit"]').disabled = true;
        try {
            const [from, to] = await Promise.all([
                geocodeAddress(origin, routeAbortController.signal),
                geocodeAddress(destination, routeAbortController.signal)
            ]);
            const route = await fetchRoute(from, to, routeAbortController.signal);
            const distanceKm = (route.distance / 1000).toFixed(1);
            const durationText = routeMessages.eta;
            if (routeDistanceElement) routeDistanceElement.textContent = `${distanceKm} km`;
            if (routeDurationElement) routeDurationElement.textContent = durationText;
            if (freightTypeElement) freightTypeElement.classList.add('visible');
            setRouteStatus(routeMessages.fromTo(from.label, to.label));
            finishProgress();
        } catch (error) {
            if (error.name === 'AbortError') {
                resetProgress();
                return;
            }
            setRouteStatus(error.message || routeMessages.unableToCalculate, true);
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
        const formStatus = contactForm.querySelector('.form-status');

        const errors = [];
        if (name.length < 2) errors.push(formMessages.error_name);
        if (!isValidEmail(email)) errors.push(formMessages.error_email);
        if (phone.length < 10) errors.push(formMessages.error_phone);
        if (message.length < 10) errors.push(formMessages.error_message);

        if (errors.length) {
            alert(errors.join('\n'));
            return;
        }

        if (formStatus) formStatus.textContent = '';
        if (contactFormSubmitButton) {
            contactFormSubmitButton.textContent = formMessages.form_button_success;
            contactFormSubmitButton.style.background = 'linear-gradient(135deg, #4ECDC4, #44B3AA)';
            contactFormSubmitButton.disabled = true;
        }

        const formData = new FormData(contactForm);
        const submitUrl = contactForm.getAttribute('action');

        fetch(submitUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            body: formData
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Submission failed');
                }
                if (formStatus) formStatus.textContent = formMessages.form_success;
                contactForm.reset();
            })
            .catch(() => {
                if (formStatus) {
                    formStatus.textContent = formMessages.error_submit;
                }
            })
            .finally(() => {
                if (contactFormSubmitButton) {
                    contactFormSubmitButton.disabled = false;
                    setTimeout(() => {
                        contactFormSubmitButton.textContent = formMessages.form_submit;
                        contactFormSubmitButton.style.background = '';
                    }, 2000);
                }
            });
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
