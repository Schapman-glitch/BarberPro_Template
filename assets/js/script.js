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

// ===== Google Directions (no API key) =====
const DESTINATION = "Barber Pro, 123 Main Street, Temecula, CA 92590";

function gmapDirectionsUrl(origin, destination, mode = "driving") {
  const base = "https://www.google.com/maps/dir/?api=1";
  const qs = new URLSearchParams({
    destination,
    travelmode: mode
  });
  if (origin) qs.set("origin", origin);
  return `${base}&${qs.toString()}`;
}

(function initDirections() {
  const dirBtn = document.getElementById("directionsBtn");
  const modeSel = document.getElementById("travelMode");
  const mapFrame = document.getElementById("mapFrame");
  if (!dirBtn || !mapFrame) return;

  // Default map view of the shop
  mapFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(DESTINATION)}&output=embed`;

  const setHref = (origin = null) => {
    const href = gmapDirectionsUrl(origin, DESTINATION, modeSel?.value || "driving");
    dirBtn.href = href;
  };
  setHref();

  modeSel?.addEventListener("change", () => setHref());

  // Try to get user location for real-time route
  dirBtn.addEventListener("click", (e) => {
    if (!navigator.geolocation) return;
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(
      pos => {
        const origin = `${pos.coords.latitude},${pos.coords.longitude}`;
        setHref(origin);
        window.open(dirBtn.href, "_blank", "noopener");
      },
      _err => window.open(dirBtn.href, "_blank", "noopener"),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
  });
})();

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