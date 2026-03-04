// Guesty API - Get current guest by property
// Automatically finds who's staying at a property TODAY

const GUESTY_AUTH_URL = 'https://open-api.guesty.com/oauth2/token';
const GUESTY_API_URL = 'https://open-api.guesty.com/v1';

// Property mapping: URL slug -> Guesty listing ID
const PROPERTY_MAPPING = {
  'villa-a': '6077269ef25260002f94b7e7',
  'villa-b': '607b6ae0aed119002ff5c202',
  'villa-c': '607b677162c7fc002fbcbef8',
  'villa-d': '607753f964fe4200312283c0',
  'villa-1726': '6782b6ec6e9c10000fe0f3ea',
  'villa-1728': '678403487beb6100115bc0b1',
};

let cachedToken = null;
let tokenExpiry = null;

async function getAccessToken() {
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry - 300000) {
    return cachedToken;
  }

  const clientId = process.env.GUESTY_CLIENT_ID;
  const clientSecret = process.env.GUESTY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Missing Guesty credentials');
  }

  const response = await fetch(GUESTY_AUTH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      scope: 'open-api',
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Auth failed: ${error}`);
  }

  const data = await response.json();
  cachedToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in * 1000);

  return cachedToken;
}

async function getCurrentReservation(listingId, token) {
  const params = new URLSearchParams({
    listingId: listingId,
    checkInFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    checkInTo: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'confirmed',
    limit: '10',
  });

  const response = await fetch(`${GUESTY_API_URL}/reservations?${params}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to fetch reservations: ${error}`);
  }

  const data = await response.json();

  const now = new Date();
  const currentReservation = data.results?.find(res => {
    const checkIn = new Date(res.checkIn);
    const checkOut = new Date(res.checkOut);
    checkIn.setHours(0, 0, 0, 0);
    checkOut.setDate(checkOut.getDate() + 1);
    return now >= checkIn && now < checkOut;
  });

  return currentReservation;
}

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const propertySlug = event.queryStringParameters?.property;

  if (!propertySlug) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Missing property parameter' }),
    };
  }

  try {
    const token = await getAccessToken();

    const listingId = PROPERTY_MAPPING[propertySlug];

    if (!listingId) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Property not found', noGuest: true }),
      };
    }

    const reservation = await getCurrentReservation(listingId, token);

    if (!reservation) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ noGuest: true, message: 'No current guest' }),
      };
    }

    const guestInfo = {
      guestName: reservation.guest?.fullName || 'Guest',
      checkIn: reservation.checkIn,
      checkOut: reservation.checkOut,
      propertyName: reservation.listing?.title || reservation.listing?.nickname,
      lockCode: reservation.customFields?.lockCode
        || reservation.doorCode
        || reservation.listing?.customFields?.lockCode
        || null,
      messagingLink: reservation.customFields?.messagingLink || null,
      source: reservation.source,
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(guestInfo),
    };

  } catch (error) {
    console.error('Error:', error.message);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
