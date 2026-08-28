/* PostHog — same project (517138) as the three marketing sites, separated in
   every query by $host. array.js is self-hosted (adblockers eat the CDN copy);
   the key is the public project key, safe to inline like the sister sites.
   No session recording here: these pages are for guests inside the homes.
   The pageview is captured explicitly: this script loads deferred, after the
   document is complete, which is past the window where posthog-js fires its
   automatic one (verified live — auto never arrived, explicit does). */
(function () {
  if (/^(localhost|127\.|0\.0\.0\.0)/.test(location.hostname)) return;
  var s = document.createElement('script');
  s.async = true;
  s.src = '/js/posthog-array.js?v=1.403.0';
  s.onload = function () {
    if (!window.posthog) return;
    window.posthog.init('phc_oWKxMpkQkRx7sTTDqotwV3aPmhgY84wMVEcJYHn54JSc', {
      api_host: 'https://us.i.posthog.com',
      capture_pageview: false,
      capture_pageleave: true,
      person_profiles: 'identified_only',
      disable_session_recording: true,
      loaded: function (ph) { ph.capture('$pageview'); },
    });
  };
  document.head.appendChild(s);
})();
