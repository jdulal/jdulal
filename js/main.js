/**
 * ============================================
 * PORTFOLIO WEBSITE - MAIN JAVASCRIPT
 * Jagadishwor Dulal | Senior Web Developer
 * ============================================
 */

document.addEventListener('DOMContentLoaded', function () {

    // ========== CUSTOM CURSOR ==========
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (cursor && cursorFollower && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 80);
        });

        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            cursorFollower.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
            cursorFollower.style.opacity = '1';
        });
    }

    // ========== NAVIGATION ==========
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // ========== TYPEWRITER EFFECT ==========
    const typewriterElement = document.getElementById('typewriter');

    if (typewriterElement) {
        const roles = [
            'Web & App Developer',
            'UX/UI Designer',
            'Bug Fixing Expert',
            'Unit Testing Specialist',
            'Microsoft Certified Professional'
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isWaiting = false;

        function typeWriter() {
            const currentRole = roles[roleIndex];

            if (!isDeleting && !isWaiting) {
                typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentRole.length) {
                    isWaiting = true;
                    setTimeout(() => {
                        isWaiting = false;
                        isDeleting = true;
                        typeWriter();
                    }, 2000);
                    return;
                }
            } else if (isDeleting) {
                typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                }
            }

            const speed = isDeleting ? 50 : 100;
            setTimeout(typeWriter, speed);
        }

        setTimeout(typeWriter, 1000);
    }

    // ========== SKILL BARS ANIMATION ==========
    const skillFills = document.querySelectorAll('.skill-fill');
    let skillsAnimated = false;

    function animateSkillBars() {
        if (skillsAnimated) return;

        const skillsSection = document.getElementById('skills');
        if (!skillsSection) return;

        const sectionTop = skillsSection.offsetTop;
        const sectionHeight = skillsSection.offsetHeight;
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        if (scrollY + windowHeight > sectionTop + sectionHeight * 0.3 && scrollY < sectionTop + sectionHeight) {
            skillFills.forEach(fill => {
                const targetWidth = fill.getAttribute('data-width');
                fill.style.width = targetWidth;
            });
            skillsAnimated = true;
        }
    }

    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars();

    // ========== PROJECT FILTERING ==========
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ========== CONTACT FORM ==========
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.btn-submit');
            submitBtn.classList.add('loading');

            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.classList.add('success');
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.classList.remove('success');
                }, 3000);

            }, 1500);
        });
    }

    // ========== BACK TO TOP BUTTON ==========
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // ========== SCROLL ANIMATIONS ==========
    const animatedElements = document.querySelectorAll(
        '.skill-card, .project-card, .contact-card, .timeline-item, .cert-card'
    );

    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    function checkScrollAnimations() {
        animatedElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight * 0.9) {
                el.classList.add('animated');
            }
        });
    }

    window.addEventListener('scroll', checkScrollAnimations);
    checkScrollAnimations();

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();

            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== ADD KEYFRAME ANIMATION ==========
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    console.log('🚀 Portfolio initialized - Jagadishwor Dulal | Senior Web Developer');
    console.log('💼 19+ years at Nepalese Army | Microsoft Certified Professional');
    console.log('📍 Kathmandu, Nepal');
});