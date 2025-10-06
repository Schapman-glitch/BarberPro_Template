const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('show');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Simple lightbox for gallery
const overlay = document.getElementById('lightboxOverlay');
const overlayImg = document.getElementById('lightboxImage');
const closeBtn = document.querySelector('.lightbox-close');

document.querySelectorAll('.lightbox').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    overlayImg.src = a.getAttribute('href');
    overlay.hidden = false;
  });
});

function closeOverlay(){
  overlay.hidden = true;
  overlayImg.src = "";
}
if (overlay) {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeOverlay();
  });
}
if (closeBtn) closeBtn.addEventListener('click', closeOverlay);
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && !overlay.hidden) closeOverlay() });