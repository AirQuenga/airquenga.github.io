// Minimal client-side helpers for progress bars and countdowns.
// This file is safe for static Jekyll builds and only enhances UX client-side.

function animateProgressBars() {
  document.querySelectorAll('.progress > i[data-progress]').forEach(i => {
    const p = Number(i.getAttribute('data-progress') || 0);
    // small timeout to allow paint
    requestAnimationFrame(() => { i.style.width = p + '%'; });
  });
}

function initCountdowns() {
  function tick() {
    document.querySelectorAll('[data-until]').forEach(el => {
      const until = el.getAttribute('data-until');
      if (!until) { el.textContent = '—'; return; }
      const untilDate = new Date(until);
      if (isNaN(untilDate)) { el.textContent = 'invalid'; return; }
      const now = new Date();
      const diff = untilDate - now;
      if (diff <= 0) { el.textContent = 'now'; return; }
      const days = Math.floor(diff / (1000*60*60*24));
      const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
      const mins = Math.floor((diff % (1000*60*60)) / (1000*60));
      const secs = Math.floor((diff % (1000*60)) / 1000);
      el.textContent = `${days}d ${hours}h ${mins}m ${secs}s`;
    });
  }
  tick();
  if (window._bwf_countdown) clearInterval(window._bwf_countdown);
  window._bwf_countdown = setInterval(tick, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  animateProgressBars();
  initCountdowns();
});
