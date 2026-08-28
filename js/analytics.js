/* PostHog — same project (517138) as the three marketing sites, separated in
   every query by $host. array.js is self-hosted (adblockers eat the CDN copy);
   the key is the public project key, safe to inline like the sister sites.
   No session recording here: these pages are for guests inside the homes. */
(function () {
  if (/^(localhost|127\.|0\.0\.0\.0)/.test(location.hostname)) return;
  var s = document.createElement('script');
  s.async = true;
  s.src = '/js/posthog-array.js?v=1.403.0';
  s.onload = function () {
    window.posthog &&
      window.posthog.init('phc_oWKxMpkQkRx7sTTDqotwV3aPmhgY84wMVEcJYHn54JSc', {
        api_host: 'https://us.i.posthog.com',
        capture_pageview: true,
        capture_pageleave: true,
        person_profiles: 'identified_only',
        disable_session_recording: true,
      });
  };
  document.head.appendChild(s);
})();
