document.addEventListener('DOMContentLoaded', () => {
  // Scroll animations
  const fadeEls = document.querySelectorAll('.fade-up');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => obs.observe(el));

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-pill a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });

    navLinks.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === `#${current}`) a.classList.add('active');
    });
  });

  // Smooth scroll
  navLinks.forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Modal logic
  const modal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');

  function openModal(data) {
    const titleEl = document.getElementById('modalTitle');
    const subtitleEl = document.getElementById('modalSubtitle');
    const overviewEl = document.getElementById('modalOverview');
    const tagsEl = document.getElementById('modalTags');
    const highlightsEl = document.getElementById('modalHighlights');
    const toolsEl = document.getElementById('modalTools');
    const typeEl = document.getElementById('modalType');

    if (titleEl) titleEl.textContent = data.title;
    if (subtitleEl) subtitleEl.textContent = data.desc;
    if (overviewEl) overviewEl.textContent = data.overview;

    if (tagsEl) {
      tagsEl.innerHTML = data.tags.map(t => `<span class="overlay-tag">${t}</span>`).join('');
    }

    if (highlightsEl) {
      highlightsEl.innerHTML = data.highlights.map(h => `<li>${h}</li>`).join('');
    }

    if (toolsEl) {
      toolsEl.innerHTML = data.tools.map(t => `
        <div style="display:flex;align-items:center;gap:6px;font-size:13px;color:var(--white70);">${t}</div>
      `).join('');
    }

    if (typeEl) typeEl.textContent = data.type;

    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  const designCard = document.querySelector('.design-card');
  let isPlayed = false;

  if (designCard) {
    designCard.addEventListener('mouseenter', () => {
      if (isPlayed) return;

      designCard.classList.add('play-shine');
      isPlayed = true;
    });
  }

  // Project data
  const projects = {
    smartedu: {
      title: 'Smart Edu Platform',
      desc: 'A smart education platform designed to enhance digital learning with a clean and structured experience.',
      overview: 'This project is a conceptual education platform aimed at modernizing digital learning. The goal was to create a clean, structured, and user-friendly interface that improves usability and overall learning experience.',
      image: 'images/smart-edu.png',
      tags: ['UI Design', 'UX Thinking', 'Frontend'],
      highlights: [
        'Clean and modern interface design',
        'Well-structured layout system',
        'Responsive and adaptive design',
        'User-centered experience focus'
      ],
      tools: [
        'UI Design',
        'UX Thinking',
        'Frontend Development'
      ],
      type: 'Web Application'
    },
    coffeeshop: {
      title: 'Coffee Shop Landing Page',
      desc: 'A modern UI/UX landing page focused on product showcase and clean layout.',
      overview: 'This project is a conceptual landing page for a coffee shop. The goal was to create a visually appealing, modern, and user-friendly layout.',
      image: 'images/coffeeshop.png',
      tags: ['Figma', 'UI Design', 'Layout', 'Typography'],
      highlights: ['Clean and modern UI', 'Well structured sections', 'Responsive design', 'Focus on user experience'],
      tools: ['🎨 Figma', '📐 UI Design', '🖼 Layout', 'Aa Typography'],
      type: 'Web Design'
    }
  };

  document.querySelectorAll('.project-card').forEach(projectCard => {
    projectCard.addEventListener('click', () => {
      const key = projectCard.dataset.project;
      console.log('CLICK:', key);

      if (projects[key]) {
        openModal(projects[key]);
      }
    });
  });

  document.querySelectorAll('.btn-view').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const projectCard = btn.closest('.project-card');
      const key = projectCard?.dataset.project;

      console.log('BTN CLICK:', key);

      if (projects[key]) {
        openModal(projects[key]);
      }
    });
  });
});

const form = document.getElementById("contactForm");
const btn = form.querySelector(".btn-send");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  btn.innerText = "Sending...";
  btn.disabled = true;

  const data = new FormData(form);

  const res = await fetch(form.action, {
    method: "POST",
    body: data,
    headers: { Accept: "application/json" }
  });

  if (res.ok) {
    btn.innerText = "Sent ✓";
    form.reset();
  } else {
    btn.innerText = "Error!";
  }

  setTimeout(() => {
    btn.innerText = "Send Message";
    btn.disabled = false;
  }, 2000);
});