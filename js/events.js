// 2026 New Orleans Events Calendar
// Updated March 2026 — contemporaneous events from now through end of year

const NOLA_EVENTS_2026 = [
  // MARCH
  { title: "Wednesday at the Square", startDate: "2026-03-11", endDate: "2026-05-06", category: "Music", teaser: "Free weekly outdoor concert series in Lafayette Square. Every Wednesday, 5 PM.", location: "Lafayette Square", link: "https://www.wednesaysatthesquare.com/" },
  { title: "Irish Channel St. Patrick's Day Parade", startDate: "2026-03-14", category: "Parade", teaser: "Annual parade starting at Napoleon & Tchoupitoulas. 1 PM.", location: "Irish Channel", link: "https://www.stpatricksdayneworleans.com/icp.html" },
  { title: "Super Sunday", startDate: "2026-03-15", category: "Culture", teaser: "Mardi Gras Indian tribes showcase hand-sewn suits. Noon at A.L. Davis Park.", location: "A.L. Davis Park", link: "https://www.mardigrasneworleans.com/history/mardi-gras-indians/super-sunday" },
  { title: "St. Patrick's Day — Downtown Irish Club Parade", startDate: "2026-03-17", category: "Parade", teaser: "Downtown Irish Club rolls from Bywater to French Quarter.", location: "French Quarter", link: "https://www.stpatricksdayneworleans.com/" },
  { title: "Danny Barker Banjo & Guitar Festival", startDate: "2026-03-24", category: "Music", teaser: "Celebrating the legacy of Danny Barker with live performances.", location: "Various", link: null },
  { title: "New Orleans Opera Festival", startDate: "2026-03-24", endDate: "2026-04-01", category: "Music", teaser: "Inaugural opera festival in the French Quarter.", location: "French Quarter", link: null },
  { title: "Tennessee Williams Festival", startDate: "2026-03-25", endDate: "2026-03-29", category: "Culture", teaser: "Literary festival featuring the famous 'Stella!' shouting contest.", location: "French Quarter", link: "https://www.tennesseewilliams.net/" },
  { title: "Congo Square Rhythms Festival", startDate: "2026-03-28", category: "Music", teaser: "Free music festival celebrating the African roots of New Orleans music.", location: "Armstrong Park", link: null },

  // APRIL
  { title: "Hogs for the Cause", startDate: "2026-04-10", endDate: "2026-04-11", category: "Festival", teaser: "90+ teams compete for BBQ Pork Grand Champion. Live music, great food, family fun.", location: "UNO Lakefront Arena", link: "https://www.hogsforthecause.org/" },
  { title: "French Quarter Festival", startDate: "2026-04-16", endDate: "2026-04-19", category: "Festival", teaser: "FREE 4-day festival with 20+ stages of Louisiana music & local food.", location: "French Quarter", link: "https://frenchquarterfest.org/" },
  { title: "Jazz Fest — Weekend 1", startDate: "2026-04-23", endDate: "2026-04-26", category: "Festival", teaser: "World-renowned music festival. Headliners include Eagles, Stevie Nicks, Lorde.", location: "Fair Grounds", link: "https://www.nojazzfest.com/" },
  { title: "Jazz Fest — Weekend 2", startDate: "2026-04-30", endDate: "2026-05-03", category: "Festival", teaser: "Second weekend of Jazz Fest. Teddy Swims, T-Pain, and more.", location: "Fair Grounds", link: "https://www.nojazzfest.com/" },

  // MAY
  { title: "Greek Fest", startDate: "2026-05-22", endDate: "2026-05-24", category: "Festival", teaser: "Greek food, music, and culture at Holy Trinity Cathedral.", location: "Holy Trinity Cathedral", link: null },

  // JUNE
  { title: "Creole Tomato Festival", startDate: "2026-06-06", endDate: "2026-06-07", category: "Festival", teaser: "Celebrating the beloved Creole tomato with food, music, and cooking demos.", location: "French Market", link: null },
  { title: "New Orleans Wine & Food Experience", startDate: "2026-06-10", endDate: "2026-06-14", category: "Festival", teaser: "Five days of wine seminars, dinners, and the Grand Tasting.", location: "Downtown", link: "https://www.nowfe.com/" },
  { title: "Restaurant Week", startDate: "2026-06-15", endDate: "2026-06-21", category: "Food", teaser: "Special prix-fixe menus at participating restaurants across the city.", location: "Citywide", link: null },
  { title: "LIV Golf New Orleans", startDate: "2026-06-26", endDate: "2026-06-28", category: "Sports", teaser: "LIV Golf comes to New Orleans for the first time at Bayou Oaks.", location: "Bayou Oaks at City Park", link: null },

  // JULY
  { title: "Essence Festival", startDate: "2026-07-02", endDate: "2026-07-05", category: "Festival", teaser: "Celebration of Black music, culture & community at the Superdome.", location: "Superdome", link: "https://www.essencefestival.com/" },
  { title: "Tales of the Cocktail", startDate: "2026-07-19", endDate: "2026-07-23", category: "Festival", teaser: "Global gathering of spirits professionals and cocktail enthusiasts.", location: "French Quarter", link: "https://talesofthecocktail.org/" },

  // AUGUST
  { title: "COOLinary New Orleans", startDate: "2026-08-01", endDate: "2026-08-31", category: "Food", teaser: "Month-long dining deals: 2-course lunches & 3-course dinners at top restaurants.", location: "Citywide", link: "https://www.coolinarynola.com/" },
  { title: "Museum Month", startDate: "2026-08-01", endDate: "2026-08-31", category: "Culture", teaser: "Visit several museums for the price of one membership.", location: "Citywide", link: null },

  // SEPTEMBER - OCTOBER
  { title: "NOLAxNOLA", startDate: "2026-09-15", endDate: "2026-10-15", category: "Music", teaser: "Citywide celebration of local musicians and music venues with dozens of live performances.", location: "Citywide", link: null },

  // OCTOBER
  { title: "Boo at the Zoo", startDate: "2026-10-16", endDate: "2026-10-31", category: "Family", teaser: "Family-friendly Halloween event at the Audubon Zoo.", location: "Audubon Zoo", link: null },

  // DECEMBER
  { title: "Celebration in the Oaks", startDate: "2026-11-27", endDate: "2026-01-03", category: "Holiday", teaser: "Spectacular holiday light display throughout City Park.", location: "City Park", link: null },
  { title: "Christmas New Orleans Style", startDate: "2026-12-01", endDate: "2026-12-31", category: "Holiday", teaser: "Month-long holiday celebration with bonfires on the levee, caroling, and special events.", location: "Citywide", link: null }
];

// Format date for display
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

// Render event cards
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
    const dateStr = formatEventDate(evt.startDate, evt.endDate);
    const linkOpen = evt.link ? `<a href="${evt.link}" target="_blank" class="event-card-link">` : '';
    const linkClose = evt.link ? '</a>' : '';
    const categoryHtml = evt.category
      ? `<span class="event-card-category">${evt.category}</span>`
      : '';
    const locationHtml = evt.location
      ? `<span class="event-card-location">${evt.location}</span>`
      : '';
    const teaser = evt.teaser
      ? `<div class="event-card-desc">${evt.teaser}</div>`
      : '';

    html += `
      ${linkOpen}
      <div class="event-card">
        <div class="event-card-content">
          <div class="event-card-date">${dateStr}</div>
          <div class="event-card-title">${evt.title}</div>
          ${teaser}
          <div class="event-card-meta">
            ${categoryHtml}
            ${locationHtml}
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

// Render upcoming events on page
function renderHomeEvents(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  // Filter to upcoming events (end date hasn't passed, or start date if no end date)
  const upcoming = NOLA_EVENTS_2026.filter(evt => {
    const checkDate = evt.endDate || evt.startDate;
    return new Date(checkDate + 'T23:59:59') >= now;
  });

  // Sort by start date
  upcoming.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  // Show next 8 upcoming events
  renderEventCards(upcoming.slice(0, 8), container);
}

// Auto-initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  renderHomeEvents('home-events');
});
