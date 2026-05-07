const initAdalyaTouch = () => {
    const cards = document.querySelectorAll('.adalya-card');
    const container = document.querySelector('.adalya-container');

    if (!container || cards.length === 0) return;
    if (window.matchMedia('(max-width: 1024px)').matches) return;

    cards.forEach(card => {
        card.addEventListener('touchstart', function (e) {
            // If already active, don't do anything special (allow link click)
            if (this.classList.contains('active')) return;

            // Otherwise, prevent default to handle activation
            e.preventDefault();

            cards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            container.classList.add('has-active');
        }, { passive: false });
    });

    // Close when clicking outside
    document.addEventListener('touchstart', (e) => {
        if (!container.contains(e.target)) {
            cards.forEach(c => c.classList.remove('active'));
            container.classList.remove('has-active');
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    initAgeGate();
    initAdalyaTouch();
    initMobileMenu();
    initSmoothScroll();
    initRevealAnimations();
    initProductInteractions();
    initCategoryEffects();
    initNewsletter();
    initHeaderScroll();
});

function initAgeGate() {
    const ageGate = document.getElementById('ageGate');
    const confirmBtn = document.getElementById('ageGateConfirm');
    const declineBtn = document.getElementById('ageGateDecline');
    const storageKey = 'vapesbaratos_age_verified';

    if (!ageGate || !confirmBtn || !declineBtn) return;

    const setApprovedState = (approved) => {
        document.documentElement.classList.toggle('age-gate-approved', approved);
        document.documentElement.classList.toggle('age-gate-locked', !approved);
        document.body.classList.toggle('age-gate-locked', !approved);
        ageGate.classList.toggle('is-hidden', approved);
        ageGate.setAttribute('aria-hidden', approved ? 'true' : 'false');
    };

    let isApproved = false;

    try {
        isApproved = window.localStorage.getItem(storageKey) === 'true';
    } catch (error) {
        // Ignore storage access failures and fall back to the locked state.
    }

    setApprovedState(isApproved);

    confirmBtn.addEventListener('click', () => {
        try {
            window.localStorage.setItem(storageKey, 'true');
        } catch (error) {
            // Ignore storage access failures and still unlock the page.
        }

        setApprovedState(true);
    });

    declineBtn.addEventListener('click', () => {
        window.location.href = 'https://www.google.com/';
    });
}

// ========================================
// MOBILE MENU
// ========================================

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const warnDiv = document.querySelector('.warn');

    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        warnDiv.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            warnDiv.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ========================================
// SMOOTH SCROLLING
// ========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                window.scrollTo({
                    top: targetSection.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// REVEAL ANIMATIONS (Beautiful Stagger)
// ========================================

function initRevealAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');

                // Stagger children
                const children = entry.target.querySelectorAll('.product-card, .category-card, .adalya-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('revealed');
                    }, index * 80);
                });

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .hero-content').forEach(el => {
        el.classList.add('reveal-trigger');
        observer.observe(el);
    });
}

// ========================================
// PRODUCT CARD INTERACTIONS
// ========================================

function initProductInteractions() {
    // Check if any product cards exist
    const productCards = document.querySelectorAll('.product-card');
    if (productCards.length === 0) return;
}

// ========================================
// CATEGORY EFFECTS
// ========================================

function initCategoryEffects() {
    // Check if category cards exist
    const categoryCards = document.querySelectorAll('.category-card');
    if (categoryCards.length === 0) return;
}

// ========================================
// NEWSLETTER
// ========================================

function initNewsletter() {
    const btn = document.querySelector('.newsletter-btn');
    const input = document.querySelector('.newsletter-input');
    if (!btn || !input) return;

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = input.value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            input.style.borderColor = '#ef4444';
            setTimeout(() => input.style.borderColor = '', 2000);
            return;
        }
        input.value = '';
        input.placeholder = 'DziР”в„ўkujemy! РІСљвЂњ';
        btn.textContent = 'РІСљвЂњ';
        setTimeout(() => {
            input.placeholder = 'TwР“С–j email';
            btn.textContent = 'РІвЂ вЂ™';
        }, 3000);
    });
}

// ========================================
// HEADER SCROLL
// ========================================

function initHeaderScroll() {
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ========================================
// JNR PRODUCTS SLIDER
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('jnrSlider');
    const prevBtn = document.getElementById('jnrPrev');
    const nextBtn = document.getElementById('jnrNext');
    const wrapper = document.getElementById('jnrWrapper');

    if (!slider || !prevBtn || !nextBtn || !wrapper) return;

    let currentIndex = 0;
    const items = slider.querySelectorAll('.product-card');
    const totalItems = items.length;

    function getItemsPerView() {
        if (window.innerWidth > 1024) return 4;
        if (window.innerWidth > 640) return 2;
        return 1;
    }

    function calculateWidths() {
        const itemsPerView = getItemsPerView();
        const gap = parseFloat(getComputedStyle(slider).gap) || 35;
        const containerWidth = wrapper.offsetWidth;
        const itemWidth = (containerWidth - (gap * (itemsPerView - 1))) / itemsPerView;
        return { itemWidth, gap, itemsPerView };
    }

    function updateSlider() {
        const { itemWidth, gap, itemsPerView } = calculateWidths();
        const maxIndex = Math.max(0, totalItems - itemsPerView);
        currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
        const moveDistance = currentIndex * (itemWidth + gap);
        slider.style.transform = `translateX(-${moveDistance}px)`;
        prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
        prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
        nextBtn.style.opacity = currentIndex >= maxIndex ? '0.3' : '1';
        nextBtn.style.pointerEvents = currentIndex >= maxIndex ? 'none' : 'auto';
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalItems - getItemsPerView()) {
            currentIndex++;
            updateSlider();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    let isDragging = false, startX, startScrollX;
    const start = (e) => {
        isDragging = true;
        startX = (e.pageX || e.touches[0].pageX) - wrapper.offsetLeft;
        startScrollX = currentIndex;
        slider.style.transition = 'none';
        wrapper.style.cursor = 'grabbing';
    };
    const move = (e) => {
        if (!isDragging) return;
        const x = (e.pageX || e.touches[0].pageX) - wrapper.offsetLeft;
        const { itemWidth, gap } = calculateWidths();
        currentIndex = startScrollX + (startX - x) / (itemWidth + gap);
        updateSlider();
    };
    const end = () => {
        if (!isDragging) return;
        isDragging = false;
        wrapper.style.cursor = 'grab';
        slider.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        currentIndex = Math.round(currentIndex);
        updateSlider();
    };

    wrapper.addEventListener('mousedown', start);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', end);
    wrapper.addEventListener('touchstart', start, { passive: true });
    window.addEventListener('touchmove', (e) => { if (isDragging) e.preventDefault(); move(e); }, { passive: false });
    window.addEventListener('touchend', end);
    window.addEventListener('resize', updateSlider);
    setTimeout(updateSlider, 100);
});

// ========================================
// FUMOT COLLECTION SLIDER
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('fumotSlider');
    const dotsContainer = document.getElementById('fumotDots');
    const originalItems = Array.from(track?.querySelectorAll('.fumot-item') || []);
    if (!track || originalItems.length === 0 || !dotsContainer) return;

    const firstClone = originalItems[0].cloneNode(true);
    const lastClone = originalItems[originalItems.length - 1].cloneNode(true);
    firstClone.setAttribute('data-clone', 'true');
    lastClone.setAttribute('data-clone', 'true');
    track.insertBefore(lastClone, track.firstChild);
    track.appendChild(firstClone);

    const items = Array.from(track.querySelectorAll('.fumot-item'));
    let currentIndex = 1;
    let isDragging = false;
    let startX = 0;
    let dragOffset = 0;

    originalItems.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'fumot-dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => {
            currentIndex = i + 1;
            updateSlider();
        };
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.querySelectorAll('.fumot-dot'));
    const pBtn = document.getElementById('fumotPrev'), nBtn = document.getElementById('fumotNext');

    function getBaseOffset(index) {
        const itemWidth = items[0].offsetWidth;
        return (track.parentElement.offsetWidth / 2) - (itemWidth / 2) - (index * itemWidth);
    }

    function getRealIndex(index) {
        if (index === 0) return originalItems.length - 1;
        if (index === items.length - 1) return 0;
        return index - 1;
    }

    function setActiveState() {
        const realIndex = getRealIndex(currentIndex);
        items.forEach((it, i) => it.classList.toggle('active', i === currentIndex));
        dots.forEach((d, i) => d.classList.toggle('active', i === realIndex));
        if (pBtn && nBtn) {
            pBtn.style.opacity = '1';
            pBtn.style.pointerEvents = 'auto';
            nBtn.style.opacity = '1';
            nBtn.style.pointerEvents = 'auto';
        }
    }

    function updateSlider(animate = true) {
        track.style.transition = animate ? 'transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)' : 'none';
        track.style.transform = `translateX(${getBaseOffset(currentIndex)}px)`;
        setActiveState();
    }

    function normalizeLoopPosition() {
        if (currentIndex === 0) {
            currentIndex = originalItems.length;
            updateSlider(false);
        } else if (currentIndex === items.length - 1) {
            currentIndex = 1;
            updateSlider(false);
        }
    }

    if (pBtn) pBtn.onclick = () => { currentIndex--; updateSlider(); };
    if (nBtn) nBtn.onclick = () => { currentIndex++; updateSlider(); };

    const start = (e) => {
        isDragging = true;
        startX = e.pageX || e.touches[0].pageX;
        dragOffset = 0;
        track.style.transition = 'none';
    };
    const move = (e) => {
        if (!isDragging) return;
        dragOffset = (e.pageX || e.touches[0].pageX) - startX;
        track.style.transform = `translateX(${getBaseOffset(currentIndex) + dragOffset}px)`;
    };
    const end = (e) => {
        if (!isDragging) return;
        isDragging = false;
        const walk = (e.pageX || e.changedTouches?.[0].pageX || e.pageX) - startX;
        if (Math.abs(walk) > items[0].offsetWidth / 4) {
            if (walk > 0) currentIndex--;
            else if (walk < 0) currentIndex++;
        }
        updateSlider();
    };

    track.onmousedown = start; window.onmousemove = move; window.onmouseup = end;
    track.ontouchstart = start;
    window.ontouchmove = (e) => { if (isDragging) e.preventDefault(); move(e); };
    window.ontouchend = end;
    track.addEventListener('transitionend', normalizeLoopPosition);
    window.addEventListener('resize', () => updateSlider(false));
    setTimeout(() => updateSlider(false), 200);
});


// Hide the top warning when the page is scrolled
const warn = document.querySelector(".warn");
if (warn) {
    const toggleWarningVisibility = () => {
        warn.classList.toggle("is-hidden", window.scrollY > 10);
    };

    toggleWarningVisibility();
    window.addEventListener("scroll", toggleWarningVisibility, { passive: true });
}

// footer
const citiesToggle = document.getElementById('cities-toggle');
const portugalCities = document.getElementById('portugal-cities');

if (citiesToggle && portugalCities) {
    portugalCities.hidden = true;

    citiesToggle.addEventListener('click', () => {
        const isExpanded = citiesToggle.getAttribute('aria-expanded') === 'true';
        const nextExpanded = !isExpanded;

        citiesToggle.setAttribute('aria-expanded', nextExpanded ? 'true' : 'false');
        portugalCities.hidden = !nextExpanded;
    });
}

const footerYear = document.querySelector('#footer-year');
if (footerYear) {
    footerYear.innerText = new Date().getFullYear();
}

// ========================================
// DESCRIPTION SECTION - SHOW MORE
// ========================================

const initShowMore = () => {
    const showMoreBtn = document.getElementById('showMoreBtn');
    const toggleCards = Array.from(document.querySelectorAll('.description-card.hidden'));

    if (!showMoreBtn || toggleCards.length === 0) return;

    let expanded = false;

    const updateButtonText = () => {
        showMoreBtn.textContent = expanded ? 'Ver menos' : 'Ver mais';
        showMoreBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    };

    showMoreBtn.addEventListener('click', () => {
        expanded = !expanded;
        toggleCards.forEach(card => card.classList.toggle('hidden', !expanded));
        updateButtonText();
    });

    updateButtonText();
};

// Call on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShowMore);
} else {
    initShowMore();
}




