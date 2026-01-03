document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');

            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Burger Animation
            burger.classList.toggle('toggle');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (nav.classList.contains('nav-active') && !nav.contains(e.target) && !burger.contains(e.target)) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach((link) => {
                    link.style.animation = '';
                });
            }
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Typewriter Effect
    const corporateTexts = [
        '> Full-Stack Developer',
        '> Enterprise Solutions Architect',
        '> Building Scalable Systems',
        '> Cloud Infrastructure Expert',
        '> Enterprise Problem Solver'
    ];
    
    const funnyTexts = [
        '> Ctrl+Alt+Deploy',
        '> Coffee Powered Developer',
        '> Professional Bug Translator',
        '> Building Things That Actually Work',
        '> 99 Problems But Code Ain\'t One'
    ];
    
    // Shuffle function
    const shuffleArray = (arr) => {
        const shuffled = [...arr];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };
    
    let shuffledCorporate = shuffleArray(corporateTexts);
    let shuffledFunny = shuffleArray(funnyTexts);
    let corporateIndex = 0;
    let funnyIndex = 0;
    
    // Get next line - cycles through arrays without repeating
    const getNextText = () => {
        const isFunny = Math.random() < 0.2;
        
        if (isFunny) {
            const text = shuffledFunny[funnyIndex];
            funnyIndex++;
            if (funnyIndex >= shuffledFunny.length) {
                shuffledFunny = shuffleArray(funnyTexts);
                funnyIndex = 0;
            }
            return text;
        } else {
            const text = shuffledCorporate[corporateIndex];
            corporateIndex++;
            if (corporateIndex >= shuffledCorporate.length) {
                shuffledCorporate = shuffleArray(corporateTexts);
                corporateIndex = 0;
            }
            return text;
        }
    };
    
    let index = 0;
    let currentText = getNextText();
    let letter = '';

    (function type() {
        letter = currentText.slice(0, ++index);

        const typewriterElement = document.querySelector('.typewriter');
        if (typewriterElement) {
            typewriterElement.textContent = letter;
        }

        if (letter.length === currentText.length) {
            index = 0;
            currentText = getNextText();
            setTimeout(type, 2000); // Wait before typing next word
        } else {
            setTimeout(type, 100); // Typing speed
        }
    })();

    // Canvas Animation (Digital Rain)
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const characters = '01';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        function draw() {
            ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#ff003c'; // Cyber Red
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        setInterval(draw, 33);

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
