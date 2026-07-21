// ===== SK SANGAM ENTERPRISES — shared script =====

// mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  // navbar background on scroll
  const navbar = document.querySelector('.navbar');
  const onScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 30) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  // scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // animated stat counters
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 60));
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = current + suffix;
        }, 22);
        cio.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(el => cio.observe(el));
  }

  // gallery filters (gallery.html)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (filterBtns.length && galleryItems.length) {
    const applyFilter = (filter) => {
      galleryItems.forEach(item => {
        const match = filter === 'all' || item.getAttribute('data-category') === filter;
        item.classList.toggle('show', match);
      });
    };
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyFilter(btn.getAttribute('data-filter'));
      });
    });
    applyFilter('all');
  }

  // services page division tabs (smooth scroll + active state)
  const divisionLinks = document.querySelectorAll('.division-nav a');
  if (divisionLinks.length) {
    divisionLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        divisionLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        if (target) {
          const y = target.getBoundingClientRect().top + window.scrollY - 90;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      });
    });
  }

  // contact form -> builds a WhatsApp message (no backend needed)
  const contactForm = document.querySelector('#inquiryForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.name.value.trim();
      const mobile = contactForm.mobile.value.trim();
      const service = contactForm.service.value;
      const message = contactForm.message.value.trim();

      if (!name || !mobile || !service) {
        const msg = document.querySelector('#formMsg');
        msg.textContent = 'Please fill in name, mobile number and service required.';
        msg.classList.add('show');
        msg.classList.remove('ok');
        return;
      }

      // TODO: replace this number with the business WhatsApp number
      const WHATSAPP_NUMBER = '919931053202';
      const text = `New Inquiry - SK Sangam Enterprises%0A` +
        `Name: ${encodeURIComponent(name)}%0A` +
        `Mobile: ${encodeURIComponent(mobile)}%0A` +
        `Service Required: ${encodeURIComponent(service)}%0A` +
        `Message: ${encodeURIComponent(message || '-')}`;

      const msg = document.querySelector('#formMsg');
      msg.textContent = 'Thanks! Opening WhatsApp to send your inquiry…';
      msg.classList.add('show', 'ok');

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
      contactForm.reset();
    });
  }

  // scroll progress bar
  const progressBar = document.querySelector('#scrollProgress');
  if (progressBar) {
    const updateProgress = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      progressBar.style.width = scrolled + '%';
    };
    window.addEventListener('scroll', updateProgress);
    updateProgress();
  }

  // scroll to top button
  const scrollTopBtn = document.querySelector('#scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('show', window.scrollY > 500);
    });
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // gallery lightbox
  const lightbox = document.querySelector('#lightbox');
  if (lightbox) {
    document.querySelectorAll('.gallery-item .shot').forEach(shot => {
      shot.addEventListener('click', () => {
        const label = shot.querySelector('.shot-label')?.innerHTML || '';
        const classes = shot.className;
        lightbox.querySelector('.lightbox-inner').innerHTML =
          `<div class="${classes}" style="aspect-ratio:4/3;"><div class="shot-label">${label}</div></div>`;
        lightbox.classList.add('open');
      });
    });
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.closest('.lightbox-close')) {
        lightbox.classList.remove('open');
      }
    });
  }
});
