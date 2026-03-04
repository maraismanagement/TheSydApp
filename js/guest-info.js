// Guest Info - Fetches reservation details from Guesty API
// Personalizes the experience with guest name and booking channel contact

const API_BASE = '/.netlify/functions';

// Get property slug from the current URL
function getPropertySlug() {
  const path = window.location.pathname;
  const match = path.match(/\/properties\/([^\/]+?)\.html/);
  if (match) {
    return match[1];
  }
  return null;
}

// Get reservation ID from URL params (legacy support)
function getReservationId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('res') || params.get('reservation');
}

// Fetch guest info by property (auto-detects current guest)
async function fetchGuestInfoByProperty(propertySlug) {
  try {
    const response = await fetch(`${API_BASE}/get-current-guest?property=${propertySlug}`);
    if (!response.ok) {
      throw new Error('Failed to fetch guest info');
    }
    const data = await response.json();
    if (data.noGuest) {
      return null;
    }
    return data;
  } catch (error) {
    console.error('Failed to fetch guest info:', error);
    return null;
  }
}

// Check if reservation is still active (not past checkout)
function isReservationActive(checkOut) {
  if (!checkOut) return true;
  const checkoutDate = new Date(checkOut);
  const now = new Date();
  checkoutDate.setHours(checkoutDate.getHours() + 24);
  return now < checkoutDate;
}

// Check if reservation hasn't started yet
function isBeforeCheckIn(checkIn) {
  if (!checkIn) return false;
  const checkinDate = new Date(checkIn);
  const now = new Date();
  checkinDate.setHours(0, 0, 0, 0);
  return now < checkinDate;
}

// Check if guest is in checkout window (last 18 hours of stay)
function isInCheckoutWindow(checkOut) {
  if (!checkOut) return false;
  const checkoutDate = new Date(checkOut);
  const now = new Date();
  const checkoutWindowStart = new Date(checkoutDate);
  checkoutWindowStart.setHours(checkoutWindowStart.getHours() - 18);
  return now >= checkoutWindowStart && now < checkoutDate;
}

// Show checkout reminder banner
function showCheckoutReminder(checkOut) {
  const checkoutDate = new Date(checkOut);
  const checkoutTime = checkoutDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  const now = new Date();
  const hoursRemaining = Math.ceil((checkoutDate - now) / (1000 * 60 * 60));

  const banner = document.createElement('div');
  banner.className = 'checkout-banner';
  banner.innerHTML = `
    <div class="checkout-banner-content">
      <div class="checkout-banner-header">
        <strong>Checkout Reminder</strong>
      </div>
      <p>Your checkout is ${hoursRemaining <= 2 ? 'coming up soon' : 'tomorrow'} at <strong>${checkoutTime}</strong></p>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .checkout-banner {
      background: var(--light);
      color: var(--primary);
      padding: 16px 20px;
      margin: 16px 24px;
      text-align: center;
      border: 2px solid var(--primary);
    }
    .checkout-banner-header {
      margin-bottom: 8px;
      font-size: 1.1rem;
    }
    .checkout-banner p {
      margin: 0;
      font-size: 0.9rem;
    }
  `;

  document.head.appendChild(style);

  // Insert banner before the nav grid
  const navGrid = document.querySelector('.nav-grid');
  if (navGrid) {
    navGrid.insertAdjacentElement('beforebegin', banner);
  }
}

// Show the "stay ended" screen
function showStayEndedScreen(guestName) {
  const firstName = guestName ? guestName.split(' ')[0] : 'friend';

  const overlay = document.createElement('div');
  overlay.className = 'stay-ended-overlay';
  overlay.innerHTML = `
    <div class="stay-ended-content">
      <h1>Thanks for staying with us, ${firstName}!</h1>
      <p>We hope you had an amazing time in New Orleans.</p>
      <p class="stay-ended-message">
        Your reservation has ended, so this page is no longer accessible.
        We'd love to host you again!
      </p>
      <div class="stay-ended-actions">
        <a href="mailto:hello@thesyd.com?subject=Booking%20Request" class="btn">
          Book Another Stay
        </a>
      </div>
      <p class="stay-ended-signature">
        Till next time,<br>
        <strong>The Syd Team</strong>
      </p>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .stay-ended-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: var(--white, #fff);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .stay-ended-content {
      text-align: center;
      max-width: 400px;
    }
    .stay-ended-content h1 {
      font-family: 'Space Mono', monospace;
      font-size: 1.6rem;
      color: var(--primary, #0d2b48);
      margin-bottom: 16px;
    }
    .stay-ended-content p {
      color: var(--primary, #0d2b48);
      margin-bottom: 12px;
      line-height: 1.6;
    }
    .stay-ended-message {
      background: var(--light, #f0f2f5);
      padding: 20px;
      margin: 24px 0;
      font-size: 0.9rem;
    }
    .stay-ended-actions { margin: 24px 0; }
    .stay-ended-signature {
      font-size: 0.95rem;
      margin-top: 24px;
      opacity: 0.9;
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(overlay);
}

// Show "too early" screen
function showTooEarlyScreen(guestName, checkIn) {
  const firstName = guestName ? guestName.split(' ')[0] : 'there';
  const checkInDate = new Date(checkIn);
  const formattedDate = checkInDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const overlay = document.createElement('div');
  overlay.className = 'stay-ended-overlay';
  overlay.innerHTML = `
    <div class="stay-ended-content">
      <h1>Hey ${firstName}!</h1>
      <p>We're excited to host you!</p>
      <p class="stay-ended-message">
        Your property info will be available starting on <strong>${formattedDate}</strong> at check-in time.
        <br><br>
        Check back then for your door code, WiFi info, and local recommendations!
      </p>
      <p class="stay-ended-signature">
        See you soon,<br>
        <strong>The Syd Team</strong>
      </p>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    .stay-ended-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: var(--white, #fff);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .stay-ended-content {
      text-align: center;
      max-width: 400px;
    }
    .stay-ended-content h1 {
      font-family: 'Space Mono', monospace;
      font-size: 1.6rem;
      color: var(--primary, #0d2b48);
      margin-bottom: 16px;
    }
    .stay-ended-content p {
      color: var(--primary, #0d2b48);
      margin-bottom: 12px;
      line-height: 1.6;
    }
    .stay-ended-message {
      background: var(--light, #f0f2f5);
      padding: 20px;
      margin: 24px 0;
      font-size: 0.9rem;
    }
    .stay-ended-signature {
      font-size: 0.95rem;
      margin-top: 24px;
      opacity: 0.9;
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(overlay);
}

// Get the contact URL for each booking source
function getBookingContactUrl(source) {
  const sourceMap = {
    'airbnb': { name: 'Airbnb', url: 'https://www.airbnb.com/messaging', color: '#FF5A5F' },
    'vrbo': { name: 'Vrbo', url: 'https://www.vrbo.com/traveler/inbox', color: '#3D67FF' },
    'booking.com': { name: 'Booking.com', url: 'https://account.booking.com/mysettings/messages', color: '#003580' },
    'expedia': { name: 'Expedia', url: 'https://www.expedia.com/trips', color: '#00355F' }
  };

  const normalizedSource = source?.toLowerCase() || '';

  for (const [key, value] of Object.entries(sourceMap)) {
    if (normalizedSource.includes(key)) {
      return value;
    }
  }

  return { name: 'Email', url: 'mailto:hello@thesyd.com', color: null };
}

// Update the welcome message with guest name
function updateWelcomeMessage(guestName) {
  const welcomeElement = document.querySelector('.header-content h1');

  if (welcomeElement && guestName && guestName !== 'Guest') {
    const firstName = guestName.split(' ')[0];
    welcomeElement.textContent = `Welcome, ${firstName}!`;
  }
}

// Add dynamic contact button based on booking source
function addBookingContactButton(source, messagingLink) {
  const contactPanel = document.getElementById('contact');
  if (!contactPanel) return;

  const bookingInfo = getBookingContactUrl(source);
  const contactUrl = messagingLink || bookingInfo.url;

  const section = contactPanel.querySelector('.content-section');
  if (!section) return;

  const buttonHtml = `
    <div class="info-block">
      <p><strong>Message Us</strong></p>
      <a href="${contactUrl}" target="_blank" class="btn"
         style="${bookingInfo.color ? `background: ${bookingInfo.color}; border-color: ${bookingInfo.color}; color: white;` : ''}">
        Message us on ${bookingInfo.name}
      </a>
    </div>
  `;

  section.insertAdjacentHTML('afterbegin', buttonHtml);
}

// Show door code if available
function showDoorCode(lockCode) {
  if (!lockCode) return;

  const villaPanel = document.getElementById('villa');
  if (!villaPanel) return;

  const firstSection = villaPanel.querySelector('.content-section');
  if (!firstSection) return;

  const codeBlock = document.createElement('div');
  codeBlock.className = 'info-block';
  codeBlock.innerHTML = `
    <p><strong>Your Door Code:</strong></p>
    <p style="font-size: 1.5rem; font-weight: bold; letter-spacing: 2px;">${lockCode}</p>
    <button class="copy-btn" onclick="copyText('${lockCode}')">Copy Door Code</button>
  `;

  firstSection.insertAdjacentElement('afterbegin', codeBlock);
}

// Copy text utility
function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    const btn = event.target;
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
    }, 2000);
  });
}

// Initialize guest personalization
async function initGuestInfo() {
  const propertySlug = getPropertySlug();
  if (!propertySlug) {
    console.log('No property slug found — skipping guest detection');
    return;
  }

  console.log('Auto-detecting guest for property:', propertySlug);
  const guestInfo = await fetchGuestInfoByProperty(propertySlug);

  if (!guestInfo) {
    console.log('No current guest found — showing default experience');
    return;
  }

  console.log('Guest info loaded:', guestInfo);

  // SECURITY CHECK: Is the reservation still active?
  if (!isReservationActive(guestInfo.checkOut)) {
    console.log('Reservation has ended — blocking access');
    showStayEndedScreen(guestInfo.guestName);
    return;
  }

  // SECURITY CHECK: Has the reservation started yet?
  if (isBeforeCheckIn(guestInfo.checkIn)) {
    console.log('Reservation has not started yet');
    showTooEarlyScreen(guestInfo.guestName, guestInfo.checkIn);
    return;
  }

  // Reservation is active — show personalized experience
  if (guestInfo.guestName) {
    updateWelcomeMessage(guestInfo.guestName);
  }

  if (guestInfo.source) {
    addBookingContactButton(guestInfo.source, guestInfo.messagingLink);
  }

  if (guestInfo.lockCode) {
    showDoorCode(guestInfo.lockCode);
  }

  if (isInCheckoutWindow(guestInfo.checkOut)) {
    showCheckoutReminder(guestInfo.checkOut);
  }
}

// Auto-initialize on page load
document.addEventListener('DOMContentLoaded', initGuestInfo);
