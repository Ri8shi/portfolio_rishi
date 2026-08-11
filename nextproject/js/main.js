/* ============================================
   RISHI — Portfolio JavaScript
   ============================================ */

(function () {
  'use strict';

  // ---- DOM refs ----
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTop = document.getElementById('backToTop');
  const sections = document.querySelectorAll('section[id]');

  // ---- Mobile menu ----
  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  // close menu when a link is clicked
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('open');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ---- Navbar scroll effect ----
  function handleNavbarScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // ---- Active nav link on scroll ----
  function updateActiveLink() {
    var scrollPos = window.scrollY + 100;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('data-section') === id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ---- Scroll reveal ----
  function setupScrollReveal() {
    // tag elements for reveal
    var revealTargets = [
      '.about__content',
      '.about__stats',
      '.skill-category',
      '.project-card',
      '.contact__text',
      '.contact .btn',
      '.contact__socials'
    ];

    revealTargets.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (el) {
        el.classList.add('reveal');
      });
    });

    // section titles
    document.querySelectorAll('.section-title').forEach(function (el) {
      el.classList.add('reveal');
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  // ---- Stagger project cards & skill categories ----
  function setupStaggeredReveals() {
    var groups = ['.projects__grid', '.skills__grid'];

    groups.forEach(function (selector) {
      var el = document.querySelector(selector);
      if (el) {
        el.classList.add('reveal-children');

        var observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        }, {
          threshold: 0.1,
          rootMargin: '0px 0px -20px 0px'
        });

        observer.observe(el);
      }
    });
  }

  // ---- Count-up animation for stats ----
  function setupCountUp() {
    var stats = document.querySelectorAll('.stat__number[data-count]');

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-count'), 10);
          var duration = 1200;
          var start = 0;
          var startTime = null;

          function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            var elapsed = currentTime - startTime;
            var progress = Math.min(elapsed / duration, 1);

            // ease-out curve
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(start + (target - start) * eased);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          }

          requestAnimationFrame(animate);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    stats.forEach(function (stat) {
      observer.observe(stat);
    });
  }

  // ---- Back to top ----
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---- Hero entrance animation ----
  function animateHero() {
    var greeting = document.querySelector('.hero__greeting');
    var name = document.querySelector('.hero__name');
    var title = document.querySelector('.hero__title');
    var tagline = document.querySelector('.hero__tagline');
    var ctas = document.querySelector('.hero__ctas');

    var elements = [greeting, name, title, tagline, ctas];

    elements.forEach(function (el, i) {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.6s ' + (i * 0.12) + 's var(--ease-out), transform 0.6s ' + (i * 0.12) + 's var(--ease-out)';

      // force reflow
      el.getBoundingClientRect();

      // use rAF to trigger
      requestAnimationFrame(function () {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });
  }

  // ---- Throttle helper ----
  function throttle(fn, wait) {
    var lastTime = 0;
    return function () {
      var now = Date.now();
      if (now - lastTime >= wait) {
        lastTime = now;
        fn();
      }
    };
  }

  // ---- Init ----
  window.addEventListener('scroll', throttle(function () {
    handleNavbarScroll();
    updateActiveLink();
  }, 50));

  // Run on load
  handleNavbarScroll();
  updateActiveLink();
  animateHero();
  setupScrollReveal();
  setupStaggeredReveals();
  setupCountUp();
})();
