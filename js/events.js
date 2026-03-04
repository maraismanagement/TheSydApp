// NOLA Events — live feed from neworleans.com + static festival fallback

const NOLA_FESTIVALS_2026 = [
  { title: "French Quarter Festival", startDate: "2026-04-16", endDate: "2026-04-19", category: "Festival", teaser: "FREE 4-day festival with 20+ stages of Louisiana music & local food", location: "French Quarter", link: "https://frenchquarterfest.org/" },
  { title: "Jazz Fest - Weekend 1", startDate: "2026-04-23", endDate: "2026-04-26", category: "Festival", teaser: "World-renowned music festival at the Fair Grounds", location: "Fair Grounds", link: "https://www.nojazzfest.com/" },
  { title: "Jazz Fest - Weekend 2", startDate: "2026-04-30", endDate: "2026-05-03", category: "Festival", teaser: "Second weekend of Jazz Fest", location: "Fair Grounds", link: "https://www.nojazzfest.com/" },
  { title: "Essence Festival", startDate: "2026-07-02", endDate: "2026-07-05", category: "Festival", teaser: "Celebration of Black music, culture & community", location: "Superdome", link: "https://www.essencefestival.com/" },
  { title: "Voodoo Music + Arts", startDate: "2026-10-30", endDate: "2026-11-01", category: "Festival", teaser: "Halloween weekend music festival", location: "City Park", link: "https://www.voodoomusicfest.com/" }
];

function formatEventDate(startDate, endDate) {
  const opts = { month: 'short', day: 'numeric' };
  const start = new Date(startDate + 'T12:00:00');

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const startDay = new Date(start);
  startDay.setHours(0, 0, 0, 0);

  let prefix = '';
  if (startDay.getTime() === now.getTime()) prefix = 'Today · ';
  else if (startDay.getTime() === tomorrow.getTime()) prefix = 'Tomorrow · ';

  let formatted = start.toLocaleDateString('en-US', opts);

  if (endDate && endDate !== startDate) {
    const end = new Date(endDate + 'T12:00:00');
    if (end.getTime() !== start.getTime()) {
      formatted += ' – ' + end.toLocaleDateString('en-US', opts);
    }
  }

  return prefix + formatted;
}

function renderEventCards(events, container) {
  if (!events || events.length === 0) {
    container.innerHTML = `
      <div class="event-card">
        <div class="event-card-content">
          <div class="event-card-date">Coming Soon</div>
          <div class="event-card-title">No Upcoming Events</div>
          <div class="event-card-desc">Check <a href="https://www.neworleans.com/events/upcoming-events/" target="_blank">NewOrleans.com</a> for the latest events.</div>
        </div>
      </div>
    `;
    return;
  }

  let html = '<div class="events-scroll">';

  events.forEach(evt => {
    const dateStr = formatEventDate(evt.startDate || evt.nextDate, evt.endDate);
    const linkOpen = evt.link ? `<a href="${evt.link}" target="_blank" class="event-card-link">` : '';
    const linkClose = evt.link ? '</a>' : '';
    const imageHtml = evt.image
      ? `<img src="${evt.image}" alt="${evt.title}" class="event-card-image" loading="lazy" onerror="this.remove()">`
      : '';
    const categoryHtml = evt.category
      ? `<span class="event-card-category">${evt.category}</span>`
      : '';
    const locationHtml = evt.location
      ? `<span class="event-card-location">${evt.location}</span>`
      : '';
    const timesHtml = evt.times
      ? `<span class="event-card-times">${evt.times}</span>`
      : '';
    const teaser = evt.teaser
      ? `<div class="event-card-desc">${evt.teaser.length > 120 ? evt.teaser.slice(0, 120) + '…' : evt.teaser}</div>`
      : '';

    html += `
      ${linkOpen}
      <div class="event-card">
        ${imageHtml}
        <div class="event-card-content">
          <div class="event-card-date">${dateStr}</div>
          <div class="event-card-title">${evt.title}</div>
          ${teaser}
          <div class="event-card-meta">
            ${categoryHtml}
            ${locationHtml}
            ${timesHtml}
          </div>
        </div>
      </div>
      ${linkClose}
    `;
  });

  html += '</div>';
  html += `<a href="https://www.neworleans.com/events/upcoming-events/" target="_blank" class="see-all-events">See All Events →</a>`;

  container.innerHTML = html;
}

async function renderHomeEvents(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '<div class="events-loading">Loading events…</div>';

  try {
    const res = await fetch('/api/get-nola-events');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const liveEvents = data.events || [];

    if (liveEvents.length > 0) {
      renderEventCards(liveEvents, container);
      return;
    }
  } catch (err) {
    console.warn('Could not load live events, using fallback:', err.message);
  }

  // Fallback: show upcoming festivals
  const now = new Date();
  const upcoming = NOLA_FESTIVALS_2026.filter(f => new Date(f.endDate + 'T23:59:59') >= now);

  if (upcoming.length > 0) {
    renderEventCards(upcoming, container);
  } else {
    renderEventCards([], container);
  }
}

// Auto-initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  renderHomeEvents('home-events');
});
