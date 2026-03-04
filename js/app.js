// App.js — Renders shared sections (Pool/Spa, Services, Explore) from properties-data.json
// These sections are identical across all 6 villa pages

document.addEventListener('DOMContentLoaded', async function() {
  // Load property data
  let propertyData;
  try {
    const res = await fetch('../properties-data.json');
    propertyData = await res.json();
  } catch (err) {
    console.error('Failed to load property data:', err);
    return;
  }

  const shared = propertyData.shared;

  // --- Load villa-specific data into Villa Info tab ---
  const villaSlug = document.body.dataset.villa;
  if (villaSlug) {
    const villa = propertyData.properties.find(p => p.slug === villaSlug);
    if (villa) {
      loadVillaInfo(villa);
    }
  }

  // --- Render Pool & Spa tab ---
  renderPoolTab(shared.pool);

  // --- Render Services tab ---
  renderServicesTab(shared.services);

  // --- Render Explore tab ---
  // Explore content is hardcoded in app.js since it's rich HTML with links
  // (same approach as CastleDay's property pages)

  // Re-initialize accordion for dynamically added content
  initAccordions();

  // Rebuild search index after dynamic content is loaded
  if (typeof buildSearchIndex === 'function') {
    // search.js handles this on DOMContentLoaded, but dynamic content
    // is added after. We'll trigger a custom event.
    document.dispatchEvent(new Event('contentLoaded'));
  }
});

function loadVillaInfo(villa) {
  const container = document.getElementById('villa-info-content');
  if (!container) return;

  container.innerHTML = `
    <section class="content-section">
      <h2>WiFi</h2>
      <div class="info-block">
        <p><strong>Network:</strong> ${villa.wifi.network}</p>
        <p><strong>Password:</strong> ${villa.wifi.password}</p>
        <button class="copy-btn" onclick="copyText('${villa.wifi.password}')">Copy Password</button>
      </div>
    </section>

    <section class="content-section">
      <h2>Check-In / Check-Out</h2>
      <div class="info-block">
        <p><strong>Check-In:</strong> ${villa.checkIn}</p>
        <p><strong>Check-Out:</strong> ${villa.checkOut}</p>
      </div>
    </section>

    <section class="content-section">
      <h2>House Rules</h2>
      <ul>
        ${villa.houseRules.map(rule => `<li>${rule}</li>`).join('')}
      </ul>
    </section>

    <section class="content-section">
      <h2>Parking</h2>
      <div class="info-block">
        <p>${villa.parking}</p>
      </div>
    </section>

    <section class="content-section">
      <h2>Trash & Recycling</h2>
      <div class="info-block">
        <p>${villa.trash}</p>
      </div>
    </section>

    <section class="content-section">
      <h2>Check-Out Instructions</h2>
      <ul>
        ${villa.checkoutInstructions.map(inst => `<li>${inst}</li>`).join('')}
      </ul>
    </section>
  `;
}

function renderPoolTab(pool) {
  const container = document.getElementById('pool-content');
  if (!container) return;

  container.innerHTML = `
    <section class="content-section">
      <div class="info-block warning">
        <p><strong>QUIET HOURS: ${pool.quietHours}</strong></p>
        <p>Please be respectful of neighbors and other guests.</p>
      </div>
    </section>

    <section class="content-section">
      <h2>Heated Pool</h2>
      <div class="info-block">
        <p><strong>No lifeguard on duty.</strong> Swim at your own risk.</p>
      </div>
      <div class="info-block">
        <p><strong>Hours:</strong> ${pool.hours}</p>
      </div>
      <div class="info-block">
        <p><strong>Maintenance Schedule:</strong> ${pool.maintenance}</p>
      </div>
    </section>

    <section class="content-section">
      <h2>Hot Tub</h2>
      <div class="info-block">
        <p>${pool.hotTub}</p>
      </div>
    </section>

    <section class="content-section">
      <h2>Sauna</h2>
      <div class="info-block">
        <p>${pool.sauna}</p>
      </div>
    </section>

    <section class="content-section">
      <h2>Cabana</h2>
      <div class="info-block">
        <p>${pool.cabana}</p>
      </div>
    </section>

    <section class="content-section">
      <h2>Pool Rules</h2>
      <ul>
        ${pool.rules.map(rule => `<li>${rule}</li>`).join('')}
      </ul>
      <div class="info-block warning" style="margin-top: 24px;">
        <p><strong>Failure to follow pool rules can result in a minimum $1,000 fine and/or cancellation of your reservation.</strong></p>
      </div>
    </section>
  `;
}

function renderServicesTab(services) {
  const container = document.getElementById('services-content');
  if (!container) return;

  function serviceContactHtml(svc) {
    let html = '<ul>';
    if (svc.phone) html += `<li><strong>Phone:</strong> <a href="tel:${svc.phone.replace(/[^0-9+]/g, '')}">${svc.phone}</a></li>`;
    if (svc.email) html += `<li><strong>Email:</strong> <a href="mailto:${svc.email}">${svc.email}</a></li>`;
    if (svc.website) html += `<li><strong>Website:</strong> <a href="${svc.website.startsWith('http') ? svc.website : 'https://' + svc.website}" target="_blank">${svc.website}</a></li>`;
    html += '</ul>';
    return html;
  }

  container.innerHTML = `
    <section class="content-section">
      <h2>Private Chefs</h2>
      <div class="accordion">
        ${services.privateChefs.map(chef => `
          <div class="accordion-item">
            <div class="accordion-header">
              <span>${chef.name}</span>
              <span class="accordion-arrow">+</span>
            </div>
            <div class="accordion-content">
              <p>${chef.details}</p>
              ${serviceContactHtml(chef)}
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <section class="content-section">
      <h2>Crawfish Boil</h2>
      <div class="accordion">
        ${services.crawfishBoil.map(svc => `
          <div class="accordion-item">
            <div class="accordion-header">
              <span>${svc.name}</span>
              <span class="accordion-arrow">+</span>
            </div>
            <div class="accordion-content">
              <p>${svc.details}</p>
              ${serviceContactHtml(svc)}
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <section class="content-section">
      <h2>Hibachi</h2>
      <div class="accordion">
        ${services.hibachi.map(svc => `
          <div class="accordion-item">
            <div class="accordion-header">
              <span>${svc.name}</span>
              <span class="accordion-arrow">+</span>
            </div>
            <div class="accordion-content">
              <p>${svc.details}</p>
              ${serviceContactHtml(svc)}
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <section class="content-section">
      <h2>Tour Guides</h2>
      <div class="accordion">
        ${services.tourGuides.map(svc => `
          <div class="accordion-item">
            <div class="accordion-header">
              <span>${svc.name}</span>
              <span class="accordion-arrow">+</span>
            </div>
            <div class="accordion-content">
              <p>${svc.details}</p>
              ${serviceContactHtml(svc)}
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

// Re-initialize accordions for dynamically added content
function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    // Remove existing listeners by cloning
    const newHeader = header.cloneNode(true);
    header.parentNode.replaceChild(newHeader, header);

    newHeader.addEventListener('click', function() {
      const item = this.parentElement;
      const arrow = this.querySelector('.accordion-arrow');
      const isOpen = item.classList.contains('open');

      // Close all accordion items in same accordion group
      const accordion = item.closest('.accordion');
      if (accordion) {
        accordion.querySelectorAll('.accordion-item').forEach(i => {
          i.classList.remove('open');
          const a = i.querySelector('.accordion-arrow');
          if (a) a.textContent = '+';
        });
      }

      if (!isOpen) {
        item.classList.add('open');
        if (arrow) arrow.textContent = '−';
      }
    });
  });
}
