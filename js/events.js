// 2026 New Orleans Events Calendar
// Sources: Marais NOLA Events Calendar, mardigrasneworleans.com
// Format: Each entry is a parade "slot" - krewes array contains all krewes that roll together

const NOLA_PARADES_2026 = [
  // January 30 - Friday
  { date: "2026-01-30", time: "7:00 PM", location: "French Quarter",
    krewes: [{ name: "Krewe Bohème", url: "https://www.mardigrasneworleans.com/parades/krewe-boheme" }] },

  // January 31 - Saturday
  { date: "2026-01-31", time: "6:30 PM", location: "French Quarter",
    krewes: [
      { name: "Krewe du Vieux", url: "https://www.mardigrasneworleans.com/parades/krewe-du-vieux" },
      { name: "Krewedelusion", url: "https://www.mardigrasneworleans.com/parades/krewedelusion" }
    ] },

  // February 1 - Sunday
  { date: "2026-02-01", time: "4:30 PM", location: "Marigny",
    krewes: [{ name: "'tit Rex", url: null }] },

  // February 6 - Friday
  { date: "2026-02-06", time: "3:00 PM", location: "French Quarter",
    krewes: [{ name: "Krewe of Cork", url: "https://www.mardigrasneworleans.com/parades/krewe-of-cork" }] },
  { date: "2026-02-06", time: "5:00 PM", location: "Uptown",
    krewes: [
      { name: "Krewe of Oshun", url: "https://www.mardigrasneworleans.com/parades/krewe-of-oshun" },
      { name: "Krewe of Cleopatra", url: "https://www.mardigrasneworleans.com/parades/krewe-of-cleopatra" }
    ] },

  // February 7 - Saturday
  { date: "2026-02-07", time: "11:30 AM", location: "Uptown",
    krewes: [
      { name: "Krewe of Pontchartrain", url: "https://www.mardigrasneworleans.com/parades/krewe-of-pontchartrain" },
      { name: "Legion of Mars", url: "https://www.mardigrasneworleans.com/parades/legion-of-mars" },
      { name: "Krewe of Choctaw", url: "https://www.mardigrasneworleans.com/parades/krewe-of-choctaw" },
      { name: "Krewe of Freret", url: "https://www.mardigrasneworleans.com/parades/krewe-of-freret" }
    ] },
  { date: "2026-02-07", time: "5:30 PM", location: "Uptown",
    krewes: [{ name: "Knights of Sparta", url: "https://www.mardigrasneworleans.com/parades/knights-of-sparta" }] },
  { date: "2026-02-07", time: "6:15 PM", location: "Uptown",
    krewes: [{ name: "Krewe of Pygmalion", url: "https://www.mardigrasneworleans.com/parades/krewe-of-pygmalion" }] },

  // February 8 - Sunday
  { date: "2026-02-08", time: "11:00 AM", location: "Uptown",
    krewes: [{ name: "Mystic Krewe of Femme Fatale", url: "https://www.mardigrasneworleans.com/parades/mystic-krewe-of-femme-fatale" }] },
  { date: "2026-02-08", time: "12:30 PM", location: "Uptown",
    krewes: [{ name: "Krewe of Carrollton", url: "https://www.mardigrasneworleans.com/parades/krewe-of-carrollton" }] },
  { date: "2026-02-08", time: "1:00 PM", location: "French Quarter",
    krewes: [{ name: "Krewe of Barkus", url: "https://www.mardigrasneworleans.com/parades/krewe-of-barkus" }] },
  { date: "2026-02-08", time: "1:30 PM", location: "Uptown",
    krewes: [{ name: "Krewe of King Arthur", url: "https://www.mardigrasneworleans.com/parades/krewe-of-king-arthur" }] },

  // February 11 - Wednesday
  { date: "2026-02-11", time: "6:15 PM", location: "Uptown",
    krewes: [
      { name: "Krewe of Druids", url: "https://www.mardigrasneworleans.com/parades/krewe-of-druids" },
      { name: "Krewe of Alla", url: "https://www.mardigrasneworleans.com/parades/krewe-of-alla" }
    ] },

  // February 12 - Thursday (Muses!)
  { date: "2026-02-12", time: "4:30 PM", location: "Uptown",
    krewes: [{ name: "Knights of Chaos", url: "https://www.mardigrasneworleans.com/parades/knights-of-chaos" }] },
  { date: "2026-02-12", time: "5:30 PM", location: "Uptown",
    krewes: [{ name: "Knights of Babylon", url: "https://www.mardigrasneworleans.com/parades/knights-of-babylon" }] },
  { date: "2026-02-12", time: "6:00 PM", location: "Uptown",
    krewes: [{ name: "Krewe of Muses", url: "https://www.mardigrasneworleans.com/parades/krewe-of-muses" }] },

  // February 13 - Friday
  { date: "2026-02-13", time: "11:30 AM", location: "French Quarter",
    krewes: [{ name: "Krewe of Bosom Buddies", url: "https://www.mardigrasneworleans.com/parades/krewe-of-bosom-buddies" }] },
  { date: "2026-02-13", time: "5:30 PM", location: "Uptown",
    krewes: [{ name: "Krewe of Hermes", url: "https://www.mardigrasneworleans.com/parades/krewe-of-hermes" }] },
  { date: "2026-02-13", time: "6:30 PM", location: "Uptown",
    krewes: [
      { name: "Krewe d'Etat", url: "https://www.mardigrasneworleans.com/parades/krewe-detat" },
      { name: "Krewe of Morpheus", url: "https://www.mardigrasneworleans.com/parades/krewe-of-morpheus" }
    ] },

  // February 14 - Saturday (Endymion!)
  { date: "2026-02-14", time: "11:00 AM", location: "Uptown",
    krewes: [{ name: "Krewe of Iris", url: "https://www.mardigrasneworleans.com/parades/krewe-of-iris" }] },
  { date: "2026-02-14", time: "12:00 PM", location: "Uptown",
    krewes: [{ name: "Krewe of Tucks", url: "https://www.mardigrasneworleans.com/parades/krewe-of-tucks" }] },
  { date: "2026-02-14", time: "4:00 PM", location: "Mid-City",
    krewes: [{ name: "Krewe of Endymion", url: "https://www.mardigrasneworleans.com/parades/krewe-of-endymion" }] },

  // February 15 - Sunday (Bacchus!)
  { date: "2026-02-15", time: "11:00 AM", location: "Uptown",
    krewes: [
      { name: "Krewe of Okeanos", url: "https://www.mardigrasneworleans.com/parades/krewe-of-okeanos" },
      { name: "Krewe of Mid-City", url: "https://www.mardigrasneworleans.com/parades/krewe-of-mid-city" }
    ] },
  { date: "2026-02-15", time: "12:00 PM", location: "Uptown",
    krewes: [{ name: "Krewe of Thoth", url: "https://www.mardigrasneworleans.com/parades/krewe-of-thoth" }] },
  { date: "2026-02-15", time: "5:15 PM", location: "Uptown",
    krewes: [{ name: "Krewe of Bacchus", url: "https://www.mardigrasneworleans.com/parades/krewe-of-bacchus" }] },

  // February 16 - Monday (Lundi Gras)
  { date: "2026-02-16", time: "All Day", location: "Woldenberg Park",
    krewes: [{ name: "Zulu Lundi Gras Festival", url: null }] },
  { date: "2026-02-16", time: "5:15 PM", location: "Uptown",
    krewes: [{ name: "Krewe of Proteus", url: "https://www.mardigrasneworleans.com/parades/krewe-of-proteus" }] },
  { date: "2026-02-16", time: "6:00 PM", location: "Uptown",
    krewes: [{ name: "Krewe of Orpheus", url: "https://www.mardigrasneworleans.com/parades/krewe-of-orpheus" }] },

  // February 17 - Mardi Gras Day!
  { date: "2026-02-17", time: "8:00 AM", location: "Uptown",
    krewes: [{ name: "Krewe of Zulu", url: "https://www.mardigrasneworleans.com/parades/krewe-of-zulu" }] },
  { date: "2026-02-17", time: "10:30 AM", location: "Uptown",
    krewes: [
      { name: "Krewe of Rex", url: "https://www.mardigrasneworleans.com/parades/krewe-of-rex" },
      { name: "Krewe of Elks Orleans", url: "https://www.mardigrasneworleans.com/parades/krewe-of-elks-orleans" },
      { name: "Krewe of Crescent City", url: "https://www.mardigrasneworleans.com/parades/krewe-of-crescent-city" }
    ] }
];

// Major festivals (separate from parades)
const NOLA_FESTIVALS_2026 = [
  { name: "French Quarter Festival", date: "2026-04-16", endDate: "2026-04-19", category: "festival", description: "FREE 4-day festival with 20+ stages of Louisiana music & local food", location: "French Quarter", url: "https://frenchquarterfest.org/" },
  { name: "Jazz Fest - Weekend 1", date: "2026-04-23", endDate: "2026-04-26", category: "festival", description: "World-renowned music festival at the Fair Grounds", location: "Fair Grounds", url: "https://www.nojazzfest.com/" },
  { name: "Jazz Fest - Weekend 2", date: "2026-04-30", endDate: "2026-05-03", category: "festival", description: "Second weekend of Jazz Fest", location: "Fair Grounds", url: "https://www.nojazzfest.com/" },
  { name: "Essence Festival", date: "2026-07-02", endDate: "2026-07-05", category: "festival", description: "Celebration of Black music, culture & community", location: "Superdome", url: "https://www.essencefestival.com/" }
];

// Get parades for the next N days
function getUpcomingParades(daysAhead = 14) {
  // Get current time in Central Time
  const now = new Date();
  const centralTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Chicago' }));

  // Calculate the cutoff: events are removed at 1 AM the following day
  const cutoffDate = new Date(centralTime);
  if (centralTime.getHours() >= 1) {
    cutoffDate.setHours(0, 0, 0, 0);
  } else {
    cutoffDate.setDate(cutoffDate.getDate() - 1);
    cutoffDate.setHours(0, 0, 0, 0);
  }

  const futureDate = new Date(cutoffDate);
  futureDate.setDate(futureDate.getDate() + daysAhead);

  // Filter parades within the date range
  let upcoming = NOLA_PARADES_2026.filter(parade => {
    const paradeDate = new Date(parade.date + 'T12:00:00');
    return paradeDate >= cutoffDate && paradeDate <= futureDate;
  });

  // If no upcoming parades (e.g., we're not in parade season), show next 2 weeks of scheduled parades
  if (upcoming.length === 0) {
    // Find the earliest parade date
    const sortedParades = [...NOLA_PARADES_2026].sort((a, b) => new Date(a.date) - new Date(b.date));
    if (sortedParades.length > 0) {
      const firstParadeDate = new Date(sortedParades[0].date + 'T12:00:00');
      const twoWeeksLater = new Date(firstParadeDate);
      twoWeeksLater.setDate(twoWeeksLater.getDate() + daysAhead);

      upcoming = NOLA_PARADES_2026.filter(parade => {
        const paradeDate = new Date(parade.date + 'T12:00:00');
        return paradeDate >= firstParadeDate && paradeDate <= twoWeeksLater;
      });
    }
  }

  return upcoming.sort((a, b) => {
    const dateCompare = new Date(a.date) - new Date(b.date);
    if (dateCompare !== 0) return dateCompare;
    // Sort by time within same day
    return a.time.localeCompare(b.time);
  });
}

// Special Mardi Gras day labels
const SPECIAL_DAYS = {
  '2026-02-16': 'Lundi Gras',
  '2026-02-17': 'Mardi Gras Day'
};

// Format date for display
function formatParadeDate(dateStr) {
  const date = new Date(dateStr + 'T12:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Check for special Mardi Gras days
  const specialLabel = SPECIAL_DAYS[dateStr];

  // Format: "Friday, Feb 7" or "Tuesday, Feb 18 - Mardi Gras Day"
  const options = { weekday: 'long', month: 'short', day: 'numeric' };
  let formatted = date.toLocaleDateString('en-US', options);

  // Add "Today" or "Tomorrow" prefix if applicable
  if (date.getTime() === today.getTime()) {
    formatted = 'Today - ' + formatted;
  } else if (date.getTime() === tomorrow.getTime()) {
    formatted = 'Tomorrow - ' + formatted;
  }

  // Add special day label
  if (specialLabel) {
    formatted += ' - ' + specialLabel;
  }

  return formatted;
}

// Render scrollable parade list on home page
function renderHomeEvents(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const parades = getUpcomingParades(14); // Next 2 weeks

  if (parades.length === 0) {
    container.innerHTML = `
      <div class="event-card">
        <div class="event-card-content">
          <div class="event-card-date">Check Back Soon</div>
          <div class="event-card-title">No Parades This Week</div>
          <div class="event-card-desc">The next parade season is coming up! Check <a href="https://www.mardigrasneworleans.com/parades/" target="_blank">MardiGrasNewOrleans.com</a> for the full schedule.</div>
        </div>
      </div>
    `;
    return;
  }

  // Group parades by date
  const groupedByDate = {};
  parades.forEach(parade => {
    if (!groupedByDate[parade.date]) {
      groupedByDate[parade.date] = [];
    }
    groupedByDate[parade.date].push(parade);
  });

  let html = '<div class="parade-scroll">';

  Object.keys(groupedByDate).sort().forEach(date => {
    const dateLabel = formatParadeDate(date);
    const dayParades = groupedByDate[date];

    html += `<div class="parade-day">`;
    html += `<div class="parade-day-header">${dateLabel}</div>`;

    // Sort by time chronologically within each day
    const sortedParades = dayParades.sort((a, b) => {
      // Handle "All Day" events - put them first
      if (a.time === 'All Day') return -1;
      if (b.time === 'All Day') return 1;
      // Parse times for comparison
      const parseTime = (t) => {
        const match = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (!match) return 0;
        let hours = parseInt(match[1]);
        const mins = parseInt(match[2]);
        const period = match[3].toUpperCase();
        if (period === 'PM' && hours !== 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;
        return hours * 60 + mins;
      };
      return parseTime(a.time) - parseTime(b.time);
    });

    sortedParades.forEach(slot => {
      // Build krewe names with links
      const kreweLinks = slot.krewes.map(krewe => {
        if (krewe.url) {
          return `<a href="${krewe.url}" target="_blank" class="krewe-link">${krewe.name}</a>`;
        }
        return `<span class="krewe-name">${krewe.name}</span>`;
      }).join(', ');

      html += `
        <div class="parade-item">
          <div class="parade-location-header">${slot.location}</div>
          <div class="parade-time">${slot.time}</div>
          <div class="parade-info">
            <div class="parade-krewes">${kreweLinks}</div>
          </div>
        </div>
      `;
    });

    html += `</div>`;
  });

  html += '</div>';

  // Add parade tracker links during Mardi Gras season
  const today = new Date();
  const mardiGrasStart = new Date('2026-01-25');
  const mardiGrasEnd = new Date('2026-02-19');
  if (today >= mardiGrasStart && today <= mardiGrasEnd) {
    html += `
      <div class="parade-trackers">
        <p><strong>Track parades live:</strong></p>
        <a href="https://www.wdsu.com/article/download-wdsu-parade-tracker/37907878" target="_blank" class="tracker-link">WDSU Parade Tracker</a>
        <a href="https://www.wwltv.com/article/entertainment/events/mardi-gras/download-wwl-tvs-2026-mardi-gras-parade-tracker-app/289-c3bb04e5-980b-4939-aea2-37815b6338fa" target="_blank" class="tracker-link">WWL Parade Tracker</a>
      </div>
    `;
  }

  container.innerHTML = html;
}

// Auto-initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  renderHomeEvents('home-events');
});
