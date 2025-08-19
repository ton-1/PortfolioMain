// Loading Animation
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.getElementById('loadingOverlay').classList.add('hidden');
      }, 1000);
    });

    // Custom Cursor
    const cursor = document.getElementById('cursor');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover effects
    document.querySelectorAll('a, button, .card, .skill-item').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // Progress Bar
    function updateProgressBar() {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      document.getElementById('progressBar').style.transform = `scaleX(${scrollPercent})`;
    }

    window.addEventListener('scroll', updateProgressBar);

    // Particles
    function createParticles() {
      const particleContainer = document.getElementById('particles');
      const particleCount = 50;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 3 + 1) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        particleContainer.appendChild(particle);
      }
    }
    createParticles();

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
      body.classList.add('light');
    }

    themeToggle.addEventListener('click', () => {
      body.classList.toggle('light');
      const theme = body.classList.contains('light') ? 'light' : 'dark';
      localStorage.setItem('theme', theme);
    });

    // Reveal Animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('section-title')) {
            entry.target.classList.add('visible');
          } else if (entry.target.classList.contains('section-subtitle')) {
            entry.target.classList.add('visible');
          } else if (entry.target.classList.contains('card')) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100);
          } else if (entry.target.classList.contains('skill-category')) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, Array.from(entry.target.parentElement.children).indexOf(entry.target) * 200);
          } else if (entry.target.classList.contains('timeline-item')) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, Array.from(entry.target.parentElement.children).indexOf(entry.target) * 300);
          } else {
            entry.target.classList.add('revealed');
          }
        }
      });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.reveal, .section-title, .section-subtitle, .card, .skill-category, .timeline-item').forEach(el => {
      observer.observe(el);
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const headerHeight = document.querySelector('.site-header').offsetHeight;
          const targetPosition = target.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    // Form Submission
    document.getElementById('contactForm').addEventListener('submit', (e) => {
      e.preventDefault();
      // Add form submission logic here
      alert('Thank you for your message! I\'ll get back to you soon.');
    });

    // Parallax Effect
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
      
      parallaxElements.forEach((el, index) => {
        const speed = (index + 1) * 0.5;
        el.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
      });
    });

    // Typing Effect for Hero Title
    function typeWriter(element, text, speed = 100) {
      let i = 0;
      element.innerHTML = '';
      
      function type() {
        if (i < text.length) {
          element.innerHTML += text.charAt(i);
          i++;
          setTimeout(type, speed);
        }
      }
      
      setTimeout(type, 1500); // Start after other animations
    }

    // Initialize typing effect
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
      const originalText = heroTitle.innerHTML;
      // Uncomment to enable typing effect
      // typeWriter(heroTitle, originalText.replace(/<[^>]*>/g, ''), 80);
    }

    // Add mobile menu functionality
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const nav = document.querySelector('.nav');
    
    if (mobileNavToggle) {
      mobileNavToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
      });
    }

    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('.site-header');

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
      
      lastScroll = currentScroll;
    });