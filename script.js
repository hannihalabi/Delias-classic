const defaultLang = 'nl';
const normalizeLang = (lang) => (lang || defaultLang).toLowerCase().split('-')[0];
const pageLang = normalizeLang(document.documentElement.lang);

// Google Ads call conversion tracking.
function gtag_report_conversion(url) {
    const callback = function () {
        if (typeof url !== 'undefined') {
            window.location = url;
        }
    };

    if (typeof gtag === 'function') {
        gtag('event', 'conversion', {
            'send_to': 'AW-17817498588/NNlPCM3txOobENznhbBC',
            'value': 1.0,
            'currency': 'SEK',
            'event_callback': callback
        });
    } else if (typeof url !== 'undefined') {
        window.location = url;
    }

    return false;
}

const i18n = {
    en: {
        form: {
            error_name: 'Please enter a valid name.',
            error_email: 'Please enter a valid email address.',
            error_phone: 'Please enter a valid phone number.',
            error_message: 'Please enter a message of at least 10 characters.',
            error_submit: 'Something went wrong. Please try again.',
            form_success: 'Thank you for your message. We will contact you as soon as possible.',
            form_button_success: 'Sent',
            form_submit: 'Send message'
        }
    },
    nl: {
        form: {
            error_name: 'Vul een geldige naam in.',
            error_email: 'Vul een geldig e-mailadres in.',
            error_phone: 'Vul een geldig telefoonnummer in.',
            error_message: 'Vul een bericht in van minimaal 10 tekens.',
            error_submit: 'Er ging iets mis. Probeer het opnieuw.',
            form_success: 'Bedankt voor je bericht. We nemen zo snel mogelijk contact met je op.',
            form_button_success: 'Verzonden',
            form_submit: 'Bericht versturen'
        }
    },
    de: {
        form: {
            error_name: 'Bitte geben Sie einen gültigen Namen ein.',
            error_email: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
            error_phone: 'Bitte geben Sie eine gültige Telefonnummer ein.',
            error_message: 'Bitte geben Sie eine Nachricht mit mindestens 10 Zeichen ein.',
            error_submit: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.',
            form_success: 'Vielen Dank. Wir melden uns so schnell wie möglich.',
            form_button_success: 'Gesendet',
            form_submit: 'Nachricht senden'
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
            form_button_success: 'Enviado',
            form_submit: 'Enviar mensaje'
        }
    }
};

const messages = i18n[pageLang] || i18n.en;
const formMessages = messages.form;

const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const menuOverlay = document.getElementById('menuOverlay');
const toggleSpans = mobileMenuToggle ? mobileMenuToggle.querySelectorAll('span') : [];
const contactForm = document.getElementById('contactForm');
const contactFormSubmitButton = contactForm ? contactForm.querySelector('.cta-button') : null;
const currentYearElement = document.getElementById('currentYear');

const supportedLangs = ['nl', 'en', 'de', 'es'];
const langToPath = { nl: '/', en: '/lang/en/', de: '/lang/de/', es: '/lang/es/' };

const isLikelyBot = () => /bot|crawler|spider|crawling|lighthouse/i.test(navigator.userAgent || '');

const getStoredLang = () => {
    try {
        return normalizeLang(localStorage.getItem('preferredLang'));
    } catch (_error) {
        return null;
    }
};

const setPreferredLang = (lang) => {
    try {
        localStorage.setItem('preferredLang', normalizeLang(lang));
    } catch (_error) {
        // Ignore storage failures.
    }
};

const maybeRedirectToPreferredLang = () => {
    if (!/^https?:$/.test(window.location.protocol)) return;
    if (isLikelyBot()) return;

    const preferredLang = getStoredLang();
    if (!preferredLang || preferredLang === pageLang || !supportedLangs.includes(preferredLang)) return;

    const target = langToPath[preferredLang];
    if (!target || window.location.pathname === target) return;
    window.location.href = target;
};

if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

maybeRedirectToPreferredLang();

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

window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.pageYOffset > 40);
});

const setMenuToggleState = (isOpen) => {
    if (!mobileMenuToggle || toggleSpans.length < 3) return;
    toggleSpans[0].style.transform = isOpen ? 'rotate(45deg) translateY(8px)' : 'none';
    toggleSpans[1].style.opacity = isOpen ? '0' : '1';
    toggleSpans[2].style.transform = isOpen ? 'rotate(-45deg) translateY(-8px)' : 'none';
};

const setMenuOverlayState = (isOpen) => {
    if (menuOverlay) menuOverlay.classList.toggle('active', isOpen);
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

navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        const targetId = link.getAttribute('href');
        if (!targetId || !targetId.startsWith('#')) return;

        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;

        event.preventDefault();
        closeMobileMenu();

        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });

        navLinks.forEach((item) => item.classList.remove('active'));
        link.classList.add('active');
    });
});

const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset + 150;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        if (!sectionId) return;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach((link) => {
                link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
            });
        }
    });
});

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const nameField = contactForm.querySelector('#name');
        const emailField = contactForm.querySelector('#email');
        const phoneField = contactForm.querySelector('#phone');
        const messageField = contactForm.querySelector('#message');
        const formStatus = contactForm.querySelector('.form-status');

        const name = nameField ? nameField.value.trim() : '';
        const email = emailField ? emailField.value.trim() : '';
        const phone = phoneField ? phoneField.value.trim() : '';
        const message = messageField ? messageField.value.trim() : '';

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
            contactFormSubmitButton.style.background = '#1f8a55';
            contactFormSubmitButton.style.borderColor = '#1f8a55';
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
                if (!response.ok) throw new Error('Submission failed');
                if (formStatus) formStatus.textContent = formMessages.form_success;
                contactForm.reset();
            })
            .catch(() => {
                if (formStatus) formStatus.textContent = formMessages.error_submit;
            })
            .finally(() => {
                if (!contactFormSubmitButton) return;

                contactFormSubmitButton.disabled = false;
                setTimeout(() => {
                    contactFormSubmitButton.textContent = formMessages.form_submit;
                    contactFormSubmitButton.style.background = '';
                    contactFormSubmitButton.style.borderColor = '';
                }, 2000);
            });
    });
}
