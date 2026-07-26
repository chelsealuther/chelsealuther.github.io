const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -45px 0px' });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
document.getElementById('year').textContent = new Date().getFullYear();

const progressBar = document.querySelector('.progress span');
const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${Math.min(progress, 100)}%`;
};
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();


const videoOpen = document.querySelector('[data-video-open]');
const videoModal = document.querySelector('[data-video-modal]');
const videoClose = document.querySelector('[data-video-close]');
const clientVideo = document.querySelector('[data-client-video]');
const videoFallback = document.querySelector('[data-video-fallback]');

const openClientVideo = () => {
  if (!videoModal || !clientVideo) return;
  videoModal.classList.add('open');
  videoModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  clientVideo.play().catch(() => {});
  videoClose?.focus();
};

const closeClientVideo = () => {
  if (!videoModal || !clientVideo) return;
  clientVideo.pause();
  videoModal.classList.remove('open');
  videoModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  videoOpen?.focus();
};

videoOpen?.addEventListener('click', openClientVideo);
videoClose?.addEventListener('click', closeClientVideo);
videoModal?.addEventListener('click', (event) => {
  if (event.target === videoModal) closeClientVideo();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && videoModal?.classList.contains('open')) closeClientVideo();
});
clientVideo?.addEventListener('error', () => {
  if (videoFallback) videoFallback.hidden = false;
});
