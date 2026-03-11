const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx - 4 + 'px';
  cursor.style.top  = my - 4 + 'px';
});

(function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx - 18 + 'px';
  ring.style.top  = ry - 18 + 'px';
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button, .service-card, .pricing-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.transform = 'scale(1.6)';
    ring.style.borderColor = 'rgba(200,169,110,0.7)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.transform = 'scale(1)';
    ring.style.borderColor = 'rgba(200,169,110,0.4)';
  });
});

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillSection = document.getElementById('skillBars');
if (skillSection) barObserver.observe(skillSection);

const circleObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.circle-arc').forEach(arc => {
        const pct = parseFloat(arc.dataset.pct);
        const circumference = 238.76;
        arc.style.strokeDashoffset = circumference - (circumference * pct / 100);
      });
      circleObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const circleSection = document.getElementById('circleSkills');
if (circleSection) circleObserver.observe(circleSection);
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});