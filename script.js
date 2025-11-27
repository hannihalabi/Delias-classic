// ===================================
// DELIAS SNELTRANSPORT - JAVASCRIPT
// Interactive Features & Animations
// ===================================

// === NAVIGATION SCROLL EFFECT ===
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class when scrolling down
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// === MOBILE MENU TOGGLE ===
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const menuOverlay = document.getElementById('menuOverlay');
const toggleSpans = mobileMenuToggle ? mobileMenuToggle.querySelectorAll('span') : [];
const heroVideo = document.getElementById('heroVideo');
const heroSources = heroVideo ? Array.from(heroVideo.querySelectorAll('source')) : [];
const languageToggleButton = document.getElementById('languageToggleButton');
const languageMenu = document.getElementById('languageMenu');
const languageToggleContainer = document.getElementById('languageToggle');
const languageToggleFlag = languageToggleButton ? languageToggleButton.querySelector('.language-toggle__flag') : null;
const languageToggleText = languageToggleButton ? languageToggleButton.querySelector('.language-toggle__text') : null;
const contactForm = document.getElementById('contactForm');
const contactFormSubmitButton = contactForm ? contactForm.querySelector('.cta-button') : null;

const DEFAULT_LANGUAGE = 'en';
const LANGUAGE_STORAGE_KEY = 'delias_language';
const RTL_LANGUAGES = ['ar'];
const LANGUAGE_META = {
    fr: { flag: '🇫🇷', label: 'Français' },
    es: { flag: '🇪🇸', label: 'Español' },
    en: { flag: '🇬🇧', label: 'English' },
    pt: { flag: '🇵🇹', label: 'Português' },
    nl: { flag: '🇳🇱', label: 'Nederlands' },
    ar: { flag: '🇸🇦', label: 'العربية' },
    tr: { flag: '🇹🇷', label: 'Türkçe' },
    zh: { flag: '🇨🇳', label: '中文' },
    ru: { flag: '🇷🇺', label: 'Русский' }
};

const translations = {
    nl: {
        nav_home: 'Home',
        nav_services: 'Diensten',
        nav_about: 'Over ons',
        nav_contact: 'Contact',
        nav_cta: 'Neem contact op',
        hero_title: 'Zoekt u een internationaal verhuisbedrijf?',
        hero_tagline: 'Betrouwbaar transport naar Spanje, Portugal, Italië en Frankrijk sinds 1989',
        hero_cta: 'Neem contact op',
        services_title: 'Onze diensten',
        services_subtitle: 'Professionele transportoplossingen op maat',
        service_small_title: 'Kleinere vrachtjes',
        service_small_text: 'We bieden een scala aan vervoersopties die zijn afgestemd op kleine vrachtjes, waaronder snelle koeriersdiensten en speciaal vervoer voor kwetsbare items.',
        service_courier_title: 'Koeriersdiensten',
        service_courier_text: 'Of het nu gaat om een spoedlevering binnen dezelfde stad of een internationale zending, onze ervaren koeriers zorgen voor veilige en tijdige levering.',
        service_special_title: 'Speciaal transport',
        service_special_text: 'Transport van boten, caravans, motors en scooters met gespecialiseerde trailers en apparatuur voor maximale veiligheid tijdens het vervoer.',
        about_title: 'Over ons',
        about_history_title: 'Onze geschiedenis',
        about_history_text: 'Wat in 1989 vanuit een bescheiden woonkamer begon, is inmiddels uitgegroeid tot een groot verhuisbedrijf. Het team heeft in de loop der jaren met trots een indrukwekkend netwerk opgebouwd.',
        about_reliability_title: 'Betrouwbaarheid',
        about_reliability_text: 'De jarenlange ervaring en het uitgebreide logistieke netwerk garanderen een efficiënte levering van goederen, waardoor klanten tijd en geld besparen op transport.',
        about_communication_title: 'Transparante communicatie',
        about_communication_text: 'Het team is sterk klantgericht, wat duidelijk naar voren komt in de klantenservice. Door een grondige kennis van hun klanten kunnen we snel en efficiënt op elke vraag reageren.',
        contact_title: 'Neem contact op',
        contact_subtitle: 'Vraag vandaag nog een gratis offerte aan',
        form_name_label: 'Naam *',
        form_email_label: 'E-mail *',
        form_phone_label: 'Telefoon *',
        form_service_label: 'Dienst',
        form_service_placeholder: 'Selecteer een dienst',
        option_moving: 'Internationale verhuizing',
        option_smallfreight: 'Kleinere vrachtjes',
        option_courier: 'Koeriersdienst',
        option_special: 'Speciaal transport',
        form_message_label: 'Bericht *',
        form_submit: 'Verstuur bericht',
        contactinfo_title: 'Contactinformatie',
        contact_phone_label: 'Telefoon',
        contact_phone_hours: 'Ma t/m vr bereikbaar tot 17:00',
        contact_hours_label: 'Openingstijden',
        contact_hours_text: 'Maandag - vrijdag<br>09:00 - 17:00',
        footer_rights: '&copy; 2024 Delias Sneltransport. Alle rechten voorbehouden.',
        error_name: 'Vul een geldige naam in.',
        error_email: 'Vul een geldig e-mailadres in.',
        error_phone: 'Vul een geldig telefoonnummer in.',
        error_message: 'Vul een bericht in van minimaal 10 tekens.',
        form_success: 'Bedankt voor uw bericht! We nemen zo spoedig mogelijk contact met u op.',
        form_button_success: 'Verzonden! ✓'
    },
    en: {
        nav_home: 'Home',
        nav_services: 'Services',
        nav_about: 'About us',
        nav_contact: 'Contact',
        nav_cta: 'Contact us',
        hero_title: 'Looking for an international moving company?',
        hero_tagline: 'Reliable transport to Spain, Portugal, Italy and France since 1989',
        hero_cta: 'Contact us',
        services_title: 'Our services',
        services_subtitle: 'Tailor-made professional transport solutions',
        service_small_title: 'Small shipments',
        service_small_text: 'We offer a range of transport options for compact loads, including express couriers and extra care for delicate items.',
        service_courier_title: 'Courier services',
        service_courier_text: 'From urgent deliveries within the same city to international consignments, our experienced couriers ensure safe and punctual transport.',
        service_special_title: 'Special transport',
        service_special_text: 'Transport of boats, caravans, motorcycles and scooters with specialized trailers and equipment for maximum safety on the road.',
        about_title: 'About us',
        about_history_title: 'Our history',
        about_history_text: 'What started in 1989 from a modest living room has grown into a large moving company with a network we are proud of.',
        about_reliability_title: 'Reliability',
        about_reliability_text: 'Years of experience and a broad logistics network guarantee efficient deliveries, saving clients both time and money.',
        about_communication_title: 'Transparent communication',
        about_communication_text: 'Our customer focus shines through our service. Knowing our clients well lets us respond quickly and efficiently to every request.',
        contact_title: 'Get in touch',
        contact_subtitle: 'Request a free quote today',
        form_name_label: 'Name *',
        form_email_label: 'Email *',
        form_phone_label: 'Phone *',
        form_service_label: 'Service',
        form_service_placeholder: 'Select a service',
        option_moving: 'International relocation',
        option_smallfreight: 'Small shipments',
        option_courier: 'Courier service',
        option_special: 'Special transport',
        form_message_label: 'Message *',
        form_submit: 'Send message',
        contactinfo_title: 'Contact information',
        contact_phone_label: 'Phone',
        contact_phone_hours: 'Mon to Fri reachable until 17:00',
        contact_hours_label: 'Opening hours',
        contact_hours_text: 'Monday - Friday<br>09:00 - 17:00',
        footer_rights: '&copy; 2024 Delias Sneltransport. All rights reserved.',
        error_name: 'Please enter a valid name.',
        error_email: 'Please enter a valid email address.',
        error_phone: 'Please enter a valid phone number.',
        error_message: 'Please enter a message of at least 10 characters.',
        form_success: 'Thank you for your message! We will contact you as soon as possible.',
        form_button_success: 'Sent! ✓'
    },
    fr: {
        nav_home: 'Accueil',
        nav_services: 'Services',
        nav_about: 'À propos',
        nav_contact: 'Contact',
        nav_cta: 'Contactez-nous',
        hero_title: 'Vous cherchez une entreprise de déménagement internationale ?',
        hero_tagline: 'Transport fiable vers l\'Espagne, le Portugal, l\'Italie et la France depuis 1989',
        hero_cta: 'Contactez-nous',
        services_title: 'Nos services',
        services_subtitle: 'Des solutions de transport professionnelles sur mesure',
        service_small_title: 'Petits chargements',
        service_small_text: 'Nous proposons une gamme d\'options adaptées aux petits chargements, notamment des services de messagerie express et un transport spécial pour les objets fragiles.',
        service_courier_title: 'Services de messagerie',
        service_courier_text: 'Qu\'il s\'agisse d\'une livraison urgente dans la même ville ou d\'un envoi international, nos coursiers expérimentés assurent un transport sûr et ponctuel.',
        service_special_title: 'Transport spécial',
        service_special_text: 'Transport de bateaux, caravanes, motos et scooters avec des remorques et équipements spécialisés pour une sécurité maximale.',
        about_title: 'À propos',
        about_history_title: 'Notre histoire',
        about_history_text: 'Ce qui a commencé en 1989 dans un modeste salon est devenu une grande entreprise de déménagement avec un réseau impressionnant dont nous sommes fiers.',
        about_reliability_title: 'Fiabilité',
        about_reliability_text: 'Des années d\'expérience et un vaste réseau logistique garantissent une livraison efficace, faisant gagner du temps et de l\'argent à nos clients.',
        about_communication_title: 'Communication transparente',
        about_communication_text: 'Notre orientation client se reflète dans notre service. Grâce à notre parfaite connaissance de nos clients, nous répondons rapidement et efficacement à chaque demande.',
        contact_title: 'Contactez-nous',
        contact_subtitle: 'Demandez dès aujourd\'hui un devis gratuit',
        form_name_label: 'Nom *',
        form_email_label: 'E-mail *',
        form_phone_label: 'Téléphone *',
        form_service_label: 'Service',
        form_service_placeholder: 'Sélectionnez un service',
        option_moving: 'Déménagement international',
        option_smallfreight: 'Petits chargements',
        option_courier: 'Service de messagerie',
        option_special: 'Transport spécial',
        form_message_label: 'Message *',
        form_submit: 'Envoyer le message',
        contactinfo_title: 'Informations de contact',
        contact_phone_label: 'Téléphone',
        contact_phone_hours: 'Disponible du lundi au vendredi jusqu\'à 17h00',
        contact_hours_label: 'Horaires d\'ouverture',
        contact_hours_text: 'Lundi - vendredi<br>09:00 - 17:00',
        footer_rights: '&copy; 2024 Delias Sneltransport. Tous droits réservés.',
        error_name: 'Veuillez saisir un nom valide.',
        error_email: 'Veuillez saisir une adresse e-mail valide.',
        error_phone: 'Veuillez saisir un numéro de téléphone valide.',
        error_message: 'Veuillez entrer un message d\'au moins 10 caractères.',
        form_success: 'Merci pour votre message ! Nous vous contacterons dès que possible.',
        form_button_success: 'Envoyé ! ✓'
    },
    es: {
        nav_home: 'Inicio',
        nav_services: 'Servicios',
        nav_about: 'Sobre nosotros',
        nav_contact: 'Contacto',
        nav_cta: 'Contáctanos',
        hero_title: '¿Busca una empresa de mudanzas internacional?',
        hero_tagline: 'Transporte fiable a España, Portugal, Italia y Francia desde 1989',
        hero_cta: 'Contáctanos',
        services_title: 'Nuestros servicios',
        services_subtitle: 'Soluciones de transporte profesionales a medida',
        service_small_title: 'Cargas pequeñas',
        service_small_text: 'Ofrecemos diversas opciones adaptadas a cargas pequeñas, incluidos servicios de mensajería urgente y transporte especial para objetos delicados.',
        service_courier_title: 'Servicios de mensajería',
        service_courier_text: 'Ya sea una entrega urgente en la misma ciudad o un envío internacional, nuestros mensajeros garantizan un transporte seguro y puntual.',
        service_special_title: 'Transporte especial',
        service_special_text: 'Transporte de barcos, caravanas, motos y scooters con remolques y equipos especializados para la máxima seguridad.',
        about_title: 'Sobre nosotros',
        about_history_title: 'Nuestra historia',
        about_history_text: 'Lo que comenzó en 1989 en una sala de estar modesta se ha convertido en una gran empresa de mudanzas con una red de la que estamos orgullosos.',
        about_reliability_title: 'Fiabilidad',
        about_reliability_text: 'Nuestra amplia experiencia y red logística garantizan entregas eficientes, ahorrando tiempo y dinero a los clientes.',
        about_communication_title: 'Comunicación transparente',
        about_communication_text: 'Nuestro enfoque en el cliente se nota en el servicio. Conocemos bien a nuestros clientes y respondemos con rapidez y eficacia a cada consulta.',
        contact_title: 'Ponte en contacto',
        contact_subtitle: 'Solicita hoy mismo un presupuesto gratuito',
        form_name_label: 'Nombre *',
        form_email_label: 'Correo electrónico *',
        form_phone_label: 'Teléfono *',
        form_service_label: 'Servicio',
        form_service_placeholder: 'Selecciona un servicio',
        option_moving: 'Mudanza internacional',
        option_smallfreight: 'Cargas pequeñas',
        option_courier: 'Servicio de mensajería',
        option_special: 'Transporte especial',
        form_message_label: 'Mensaje *',
        form_submit: 'Enviar mensaje',
        contactinfo_title: 'Información de contacto',
        contact_phone_label: 'Teléfono',
        contact_phone_hours: 'Disponible de lunes a viernes hasta las 17:00',
        contact_hours_label: 'Horario',
        contact_hours_text: 'Lunes - viernes<br>09:00 - 17:00',
        footer_rights: '&copy; 2024 Delias Sneltransport. Todos los derechos reservados.',
        error_name: 'Introduce un nombre válido.',
        error_email: 'Introduce un correo electrónico válido.',
        error_phone: 'Introduce un número de teléfono válido.',
        error_message: 'Escribe un mensaje de al menos 10 caracteres.',
        form_success: '¡Gracias por tu mensaje! Nos pondremos en contacto lo antes posible.',
        form_button_success: '¡Enviado! ✓'
    },
    pt: {
        nav_home: 'Início',
        nav_services: 'Serviços',
        nav_about: 'Sobre nós',
        nav_contact: 'Contato',
        nav_cta: 'Entre em contato',
        hero_title: 'Procura uma empresa de mudanças internacional?',
        hero_tagline: 'Transporte confiável para Espanha, Portugal, Itália e França desde 1989',
        hero_cta: 'Entre em contato',
        services_title: 'Nossos serviços',
        services_subtitle: 'Soluções profissionais de transporte sob medida',
        service_small_title: 'Pequenas cargas',
        service_small_text: 'Oferecemos diversas opções para cargas menores, incluindo entregas expressas e transporte especial para itens delicados.',
        service_courier_title: 'Serviços de courier',
        service_courier_text: 'Seja uma entrega urgente na mesma cidade ou um envio internacional, nossos couriers garantem transporte seguro e pontual.',
        service_special_title: 'Transporte especial',
        service_special_text: 'Transporte de barcos, caravanas, motos e scooters com reboques e equipamentos especializados para máxima segurança.',
        about_title: 'Sobre nós',
        about_history_title: 'Nossa história',
        about_history_text: 'O que começou em 1989 em uma sala modesta cresceu para uma grande empresa de mudanças com uma rede da qual temos orgulho.',
        about_reliability_title: 'Confiabilidade',
        about_reliability_text: 'Anos de experiência e uma ampla rede logística garantem entregas eficientes, economizando tempo e dinheiro aos clientes.',
        about_communication_title: 'Comunicação transparente',
        about_communication_text: 'Nosso foco no cliente fica evidente no atendimento. Conhecendo bem nossos clientes, respondemos de forma rápida e eficiente a cada solicitação.',
        contact_title: 'Fale conosco',
        contact_subtitle: 'Solicite um orçamento gratuito hoje mesmo',
        form_name_label: 'Nome *',
        form_email_label: 'E-mail *',
        form_phone_label: 'Telefone *',
        form_service_label: 'Serviço',
        form_service_placeholder: 'Selecione um serviço',
        option_moving: 'Mudança internacional',
        option_smallfreight: 'Pequenas cargas',
        option_courier: 'Serviço de courier',
        option_special: 'Transporte especial',
        form_message_label: 'Mensagem *',
        form_submit: 'Enviar mensagem',
        contactinfo_title: 'Informações de contato',
        contact_phone_label: 'Telefone',
        contact_phone_hours: 'Seg a sex disponível até 17h00',
        contact_hours_label: 'Horário de atendimento',
        contact_hours_text: 'Segunda - sexta<br>09:00 - 17:00',
        footer_rights: '&copy; 2024 Delias Sneltransport. Todos os direitos reservados.',
        error_name: 'Digite um nome válido.',
        error_email: 'Digite um e-mail válido.',
        error_phone: 'Digite um telefone válido.',
        error_message: 'Digite uma mensagem com pelo menos 10 caracteres.',
        form_success: 'Obrigado pela mensagem! Entraremos em contato o mais rápido possível.',
        form_button_success: 'Enviado! ✓'
    },
    ar: {
        nav_home: 'الرئيسية',
        nav_services: 'الخدمات',
        nav_about: 'من نحن',
        nav_contact: 'اتصل بنا',
        nav_cta: 'تواصل معنا',
        hero_title: 'هل تبحث عن شركة نقل دولية؟',
        hero_tagline: 'نقل موثوق إلى إسبانيا والبرتغال وإيطاليا وفرنسا منذ عام 1989',
        hero_cta: 'تواصل معنا',
        services_title: 'خدماتنا',
        services_subtitle: 'حلول نقل احترافية مصممة خصيصًا',
        service_small_title: 'شحنات صغيرة',
        service_small_text: 'نقدم خيارات نقل متنوعة للشحنات الصغيرة، بما في ذلك خدمات التوصيل السريع ورعاية خاصة للعناصر الحساسة.',
        service_courier_title: 'خدمات التوصيل',
        service_courier_text: 'سواء كانت تسليمًا عاجلًا داخل المدينة أو شحنة دولية، يضمن سائقونا الخبراء نقلًا آمنًا وفي الوقت المحدد.',
        service_special_title: 'نقل خاص',
        service_special_text: 'نقل القوارب والقوافل والدراجات النارية والسكوترات بواسطة مقطورات ومعدات متخصصة لضمان أقصى درجات الأمان أثناء الرحلة.',
        about_title: 'من نحن',
        about_history_title: 'تاريخنا',
        about_history_text: 'ما بدأ عام 1989 من غرفة معيشة متواضعة أصبح الآن شركة نقل كبيرة ذات شبكة واسعة نفخر بها.',
        about_reliability_title: 'الموثوقية',
        about_reliability_text: 'يضمن الخبرة الطويلة وشبكتنا اللوجستية الواسعة تسليم البضائع بكفاءة، ما يوفر على عملائنا الوقت والمال.',
        about_communication_title: 'تواصل شفاف',
        about_communication_text: 'يظهر تركيزنا على العملاء في خدمة الدعم لدينا. بفضل معرفتنا العميقة بعملائنا نستجيب بسرعة وكفاءة لكل طلب.',
        contact_title: 'تواصل معنا',
        contact_subtitle: 'اطلب عرض سعر مجاني اليوم',
        form_name_label: 'الاسم *',
        form_email_label: 'البريد الإلكتروني *',
        form_phone_label: 'الهاتف *',
        form_service_label: 'الخدمة',
        form_service_placeholder: 'اختر خدمة',
        option_moving: 'نقل دولي',
        option_smallfreight: 'شحنات صغيرة',
        option_courier: 'خدمة توصيل',
        option_special: 'نقل خاص',
        form_message_label: 'الرسالة *',
        form_submit: 'أرسل الرسالة',
        contactinfo_title: 'معلومات الاتصال',
        contact_phone_label: 'الهاتف',
        contact_phone_hours: 'متاح من الاثنين إلى الجمعة حتى 17:00',
        contact_hours_label: 'ساعات العمل',
        contact_hours_text: 'الاثنين - الجمعة<br>09:00 - 17:00',
        footer_rights: '&copy; 2024 دلياس للنقل السريع. جميع الحقوق محفوظة.',
        error_name: 'يرجى إدخال اسم صالح.',
        error_email: 'يرجى إدخال بريد إلكتروني صالح.',
        error_phone: 'يرجى إدخال رقم هاتف صالح.',
        error_message: 'يرجى كتابة رسالة لا تقل عن 10 أحرف.',
        form_success: 'شكرًا لرسالتك! سنتواصل معك في أسرع وقت ممكن.',
        form_button_success: 'تم الإرسال! ✓'
    },
    tr: {
        nav_home: 'Ana sayfa',
        nav_services: 'Hizmetler',
        nav_about: 'Hakkımızda',
        nav_contact: 'İletişim',
        nav_cta: 'Bizimle iletişime geçin',
        hero_title: 'Uluslararası bir taşımacılık şirketi mi arıyorsunuz?',
        hero_tagline: '1989\'dan beri İspanya, Portekiz, İtalya ve Fransa\'ya güvenilir taşımacılık',
        hero_cta: 'Bizimle iletişime geçin',
        services_title: 'Hizmetlerimiz',
        services_subtitle: 'İhtiyaca özel profesyonel taşıma çözümleri',
        service_small_title: 'Küçük yükler',
        service_small_text: 'Hızlı kurye ve hassas eşyalar için özel taşıma dahil küçük yükler için birçok seçenek sunuyoruz.',
        service_courier_title: 'Kurye hizmetleri',
        service_courier_text: 'Aynı şehirde acil teslimat ya da uluslararası gönderi olsun, deneyimli kuryelerimiz güvenli ve zamanında teslimat sağlar.',
        service_special_title: 'Özel taşımacılık',
        service_special_text: 'Tekneler, karavanlar, motosikletler ve scooterlar özel römork ve ekipmanlarla maksimum güvenlikle taşınır.',
        about_title: 'Hakkımızda',
        about_history_title: 'Tarihçemiz',
        about_history_text: '1989\'da mütevazı bir salonda başlayan yolculuk, gurur duyduğumuz geniş ağa sahip büyük bir taşımacılık şirketine dönüştü.',
        about_reliability_title: 'Güvenilirlik',
        about_reliability_text: 'Yılların deneyimi ve geniş lojistik ağımız, müşterilere zaman ve para kazandıran verimli teslimatlar sunar.',
        about_communication_title: 'Şeffaf iletişim',
        about_communication_text: 'Müşteri odaklı yaklaşımımız hizmetimize yansır. Müşterilerimizi tanıdığımız için her talebe hızlı ve etkili yanıt veririz.',
        contact_title: 'Bizimle iletişime geçin',
        contact_subtitle: 'Bugün ücretsiz bir teklif isteyin',
        form_name_label: 'Ad *',
        form_email_label: 'E-posta *',
        form_phone_label: 'Telefon *',
        form_service_label: 'Hizmet',
        form_service_placeholder: 'Bir hizmet seçin',
        option_moving: 'Uluslararası taşımacılık',
        option_smallfreight: 'Küçük yükler',
        option_courier: 'Kurye hizmeti',
        option_special: 'Özel taşımacılık',
        form_message_label: 'Mesaj *',
        form_submit: 'Mesajı gönder',
        contactinfo_title: 'İletişim bilgileri',
        contact_phone_label: 'Telefon',
        contact_phone_hours: 'Hafta içi 17:00\'ye kadar ulaşabilirsiniz',
        contact_hours_label: 'Çalışma saatleri',
        contact_hours_text: 'Pazartesi - Cuma<br>09:00 - 17:00',
        footer_rights: '&copy; 2024 Delias Sneltransport. Tüm hakları saklıdır.',
        error_name: 'Lütfen geçerli bir ad girin.',
        error_email: 'Lütfen geçerli bir e-posta adresi girin.',
        error_phone: 'Lütfen geçerli bir telefon numarası girin.',
        error_message: 'Lütfen en az 10 karakterlik bir mesaj yazın.',
        form_success: 'Mesajınız için teşekkürler! En kısa sürede sizinle iletişime geçeceğiz.',
        form_button_success: 'Gönderildi! ✓'
    },
    zh: {
        nav_home: '首页',
        nav_services: '服务',
        nav_about: '关于我们',
        nav_contact: '联系',
        nav_cta: '联系我们',
        hero_title: '正在寻找国际搬家公司？',
        hero_tagline: '自1989年以来，可靠运往西班牙、葡萄牙、意大利和法国',
        hero_cta: '联系我们',
        services_title: '我们的服务',
        services_subtitle: '量身定制的专业运输解决方案',
        service_small_title: '小型货物',
        service_small_text: '我们提供多种适用于小型货物的运输方式，包括特快专递和对易碎物品的特别保护。',
        service_courier_title: '快递服务',
        service_courier_text: '无论是同城急件还是国际托运，我们经验丰富的快递员都能确保安全准时。',
        service_special_title: '特殊运输',
        service_special_text: '使用专业拖车和设备运输船只、房车、摩托车和踏板车，确保最高安全。',
        about_title: '关于我们',
        about_history_title: '我们的历史',
        about_history_text: '1989年从一间简朴的客厅起步，如今已发展成拥有庞大网络的大型搬家公司。',
        about_reliability_title: '可靠性',
        about_reliability_text: '多年经验与广泛物流网络确保高效交付，为客户节省时间和成本。',
        about_communication_title: '透明沟通',
        about_communication_text: '我们以客户为中心，凭借对客户需求的深入了解，能够快速高效地回应每个请求。',
        contact_title: '联系我们',
        contact_subtitle: '立即申请免费报价',
        form_name_label: '姓名 *',
        form_email_label: '电子邮箱 *',
        form_phone_label: '电话 *',
        form_service_label: '服务',
        form_service_placeholder: '选择服务',
        option_moving: '国际搬迁',
        option_smallfreight: '小型货物',
        option_courier: '快递服务',
        option_special: '特殊运输',
        form_message_label: '留言 *',
        form_submit: '发送留言',
        contactinfo_title: '联系方式',
        contact_phone_label: '电话',
        contact_phone_hours: '周一至周五可联系至17:00',
        contact_hours_label: '营业时间',
        contact_hours_text: '周一 - 周五<br>09:00 - 17:00',
        footer_rights: '&copy; 2024 Delias Sneltransport。保留所有权利。',
        error_name: '请输入有效的姓名。',
        error_email: '请输入有效的电子邮箱。',
        error_phone: '请输入有效的电话号码。',
        error_message: '请输入不少于10个字符的留言。',
        form_success: '感谢您的留言！我们会尽快与您联系。',
        form_button_success: '已发送！✓'
    },
    ru: {
        nav_home: 'Главная',
        nav_services: 'Услуги',
        nav_about: 'О компании',
        nav_contact: 'Контакты',
        nav_cta: 'Связаться с нами',
        hero_title: 'Ищете международную компанию по перевозкам?',
        hero_tagline: 'Надежные перевозки в Испанию, Португалию, Италию и Францию с 1989 года',
        hero_cta: 'Связаться с нами',
        services_title: 'Наши услуги',
        services_subtitle: 'Профессиональные транспортные решения под ваши задачи',
        service_small_title: 'Небольшие отправления',
        service_small_text: 'Мы предлагаем разные варианты для небольших грузов, включая экспресс-курьеров и бережную доставку хрупких предметов.',
        service_courier_title: 'Курьерские услуги',
        service_courier_text: 'Срочная ли доставка по городу или международная отправка - наши опытные курьеры обеспечат безопасность и пунктуальность.',
        service_special_title: 'Специальные перевозки',
        service_special_text: 'Перевозим лодки, караваны, мотоциклы и скутеры на специализированных прицепах и с оборудованием для максимальной безопасности.',
        about_title: 'О компании',
        about_history_title: 'Наша история',
        about_history_text: 'То, что началось в 1989 году в скромной гостиной, превратилось в крупную компанию по переездам с впечатляющей сетью.',
        about_reliability_title: 'Надежность',
        about_reliability_text: 'Многолетний опыт и развитая логистическая сеть гарантируют эффективную доставку, экономя клиентам время и деньги.',
        about_communication_title: 'Прозрачная коммуникация',
        about_communication_text: 'Ориентированность на клиента заметна в нашем сервисе. Хорошо зная клиентов, мы быстро и эффективно отвечаем на каждый запрос.',
        contact_title: 'Свяжитесь с нами',
        contact_subtitle: 'Запросите бесплатное предложение уже сегодня',
        form_name_label: 'Имя *',
        form_email_label: 'Эл. почта *',
        form_phone_label: 'Телефон *',
        form_service_label: 'Услуга',
        form_service_placeholder: 'Выберите услугу',
        option_moving: 'Международный переезд',
        option_smallfreight: 'Небольшие грузы',
        option_courier: 'Курьерская служба',
        option_special: 'Специальные перевозки',
        form_message_label: 'Сообщение *',
        form_submit: 'Отправить сообщение',
        contactinfo_title: 'Контактная информация',
        contact_phone_label: 'Телефон',
        contact_phone_hours: 'Доступны с пн по пт до 17:00',
        contact_hours_label: 'Часы работы',
        contact_hours_text: 'Понедельник - пятница<br>09:00 - 17:00',
        footer_rights: '&copy; 2024 Delias Sneltransport. Все права защищены.',
        error_name: 'Введите корректное имя.',
        error_email: 'Введите корректный адрес эл. почты.',
        error_phone: 'Введите корректный номер телефона.',
        error_message: 'Введите сообщение минимум из 10 символов.',
        form_success: 'Спасибо за сообщение! Мы свяжемся с вами в ближайшее время.',
        form_button_success: 'Отправлено! ✓'
    }
};

let currentLanguage = DEFAULT_LANGUAGE;

const getTranslation = (key, lang = currentLanguage) => {
    if (translations[lang] && translations[lang][key] !== undefined) {
        return translations[lang][key];
    }
    if (translations[DEFAULT_LANGUAGE] && translations[DEFAULT_LANGUAGE][key] !== undefined) {
        return translations[DEFAULT_LANGUAGE][key];
    }
    return '';
};

const updateLanguageToggleLabel = (lang) => {
    if (!languageToggleButton) return;
    const meta = LANGUAGE_META[lang] || LANGUAGE_META[DEFAULT_LANGUAGE];
    if (languageToggleFlag) {
        languageToggleFlag.textContent = meta.flag;
    }
    if (languageToggleText) {
        languageToggleText.textContent = meta.label;
    }
    languageToggleButton.setAttribute('aria-label', `Select language: ${meta.label}`);
};

const applyTranslations = (lang) => {
    const i18nElements = document.querySelectorAll('[data-i18n]');
    i18nElements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = getTranslation(key, lang);
        if (translation !== undefined) {
            el.innerHTML = translation;
        }
    });

    if (contactFormSubmitButton) {
        contactFormSubmitButton.textContent = getTranslation('form_submit', lang);
    }
};

const setLanguage = (lang) => {
    if (!translations[lang]) {
        lang = DEFAULT_LANGUAGE;
    }
    currentLanguage = lang;
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = RTL_LANGUAGES.includes(lang) ? 'rtl' : 'ltr';
    updateLanguageToggleLabel(lang);
    applyTranslations(lang);
};

const initLanguage = () => {
    const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    setLanguage(storedLanguage || DEFAULT_LANGUAGE);
};

initLanguage();

if (heroVideo && heroSources.length > 1) {
    let currentVideoIndex = 0;
    heroVideo.addEventListener('ended', () => {
        currentVideoIndex = (currentVideoIndex + 1) % heroSources.length;
        heroVideo.src = heroSources[currentVideoIndex].getAttribute('src');
        heroVideo.load();
        heroVideo.play();
    });
}

const setMenuToggleState = (isOpen) => {
    if (!mobileMenuToggle || toggleSpans.length < 3) return;
    if (isOpen) {
        toggleSpans[0].style.transform = 'rotate(45deg) translateY(8px)';
        toggleSpans[1].style.opacity = '0';
        toggleSpans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
    } else {
        toggleSpans[0].style.transform = 'none';
        toggleSpans[1].style.opacity = '1';
        toggleSpans[2].style.transform = 'none';
    }
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

// Toggle mobile menu
if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');
        setMenuToggleState(isOpen);
        setMenuOverlayState(isOpen);
    });
}

const closeLanguageMenu = () => {
    if (!languageToggleButton || !languageToggleContainer) return;
    languageToggleButton.setAttribute('aria-expanded', 'false');
    languageToggleContainer.classList.remove('open');
};

if (languageToggleButton && languageMenu && languageToggleContainer) {
    languageToggleButton.addEventListener('click', (event) => {
        event.stopPropagation();
        const isOpen = languageToggleContainer.classList.toggle('open');
        languageToggleButton.setAttribute('aria-expanded', String(isOpen));
    });

    languageMenu.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            const selectedLanguage = button.dataset.language;
            if (selectedLanguage) {
                setLanguage(selectedLanguage);
            }
            closeLanguageMenu();
        });
    });

    document.addEventListener('click', (event) => {
        if (languageToggleContainer.contains(event.target)) return;
        closeLanguageMenu();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeLanguageMenu();
        }
    });
}

// === SMOOTH SCROLLING FOR NAVIGATION LINKS ===
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get target section
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Close mobile menu if open
            closeMobileMenu();
            
            // Smooth scroll to section
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

if (menuOverlay) {
    menuOverlay.addEventListener('click', () => {
        if (navMenu && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
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
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
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

        if (name.length < 2) {
            errors.push(getTranslation('error_name'));
        }

        if (!isValidEmail(email)) {
            errors.push(getTranslation('error_email'));
        }

        if (phone.length < 10) {
            errors.push(getTranslation('error_phone'));
        }

        if (message.length < 10) {
            errors.push(getTranslation('error_message'));
        }

        if (errors.length) {
            alert(errors.join('\n'));
            return;
        }

        alert(getTranslation('form_success'));
        contactForm.reset();

        if (contactFormSubmitButton) {
            contactFormSubmitButton.textContent = getTranslation('form_button_success');
            contactFormSubmitButton.style.background = 'linear-gradient(135deg, #4ECDC4, #44B3AA)';

            setTimeout(() => {
                contactFormSubmitButton.textContent = getTranslation('form_submit');
                contactFormSubmitButton.style.background = '';
            }, 3000);
        }
    });
}

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// === INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ===
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

// Observe service cards and about items
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .about-item, .contact-form, .contact-info');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// === PARALLAX EFFECT FOR HERO BACKGROUND ===
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// === PREVENT FORM RESUBMISSION ON PAGE REFRESH ===
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

console.log('🚀 Delias Sneltransport website loaded successfully!');
