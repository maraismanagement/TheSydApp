// Fetch upcoming NOLA events from neworleans.com Simpleview CMS API

const TOKEN_URL = 'https://www.neworleans.com/plugins/core/get_simple_token/';
const EVENTS_URL = 'https://www.neworleans.com/includes/rest_v2/plugins_events_events_by_date/find/';

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ').trim();
}

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=3600, s-maxage=3600',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // 1. Get auth token
    const tokenRes = await fetch(TOKEN_URL);
    if (!tokenRes.ok) throw new Error('Failed to get token');
    const token = (await tokenRes.text()).trim();

    // 2. Build date filter
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const future = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const filter = {
      "expired": { "$ne": true },
      "nextDate": { "$gte": today, "$lte": future }
    };

    const options = {
      "sort": { "nextDate": 1 },
      "limit": 20
    };

    const jsonParam = JSON.stringify({ filter, options });
    const url = `${EVENTS_URL}?json=${encodeURIComponent(jsonParam)}&token=${encodeURIComponent(token)}`;

    // 3. Fetch events
    const eventsRes = await fetch(url);
    if (!eventsRes.ok) throw new Error(`Events API returned ${eventsRes.status}`);
    const raw = await eventsRes.json();
    const docs = raw.docs || raw || [];

    // 4. Deduplicate by recid
    const seen = new Set();
    const unique = docs.filter(evt => {
      const key = evt.recid || evt._id;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    // 5. Clean response
    const events = unique.map(evt => {
      let image = null;
      if (evt._media && evt._media.length > 0) {
        const media = evt._media[0];
        image = media.mediaurl || media.imageurl || null;
      }

      let category = null;
      if (evt.categories && evt.categories.length > 0) {
        category = evt.categories[0].catName || evt.categories[0].name || null;
      }

      const toDateStr = (d) => d ? d.split('T')[0] : '';

      return {
        title: evt.title || '',
        startDate: toDateStr(evt.startDate) || toDateStr(evt.nextDate),
        endDate: toDateStr(evt.endDate),
        nextDate: toDateStr(evt.nextDate),
        location: evt.location || '',
        address: evt.address1 || '',
        city: evt.city || 'New Orleans',
        times: evt.times || '',
        category,
        image,
        link: evt.absoluteUrl || evt.linkUrl || null,
        teaser: stripHtml(evt.teaser || evt.description || ''),
      };
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ events }),
    };

  } catch (error) {
    console.error('NOLA events error:', error.message);
    return {
      statusCode: 502,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch events', events: [] }),
    };
  }
};
