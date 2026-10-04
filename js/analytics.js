/**
 * ============================================================================
 * Google Analytics 4 (GA4) Central Configuration & Custom Event Tracker
 * Site: https://kayliehausknecht.github.io
 * ============================================================================
 *
 * HOW TO CONNECT YOUR GOOGLE ANALYTICS 4 PROPERTY:
 * 1. Go to https://analytics.google.com/ and create a GA4 Property & Web Data Stream
 *    for https://kayliehausknecht.github.io
 * 2. Copy your Measurement ID (format: G-XXXXXXXXXX)
 * 3. Replace 'G-XXXXXXXXXX' in SITE_ANALYTICS_CONFIG below with your real ID.
 */

window.SITE_ANALYTICS_CONFIG = {
  measurementId: 'G-XXXXXXXXXX', // <-- Replace with your GA4 Measurement ID
  siteDomain: 'kayliehausknecht.github.io'
};

(function initGA4() {
  const config = window.SITE_ANALYTICS_CONFIG;
  const measurementId = config.measurementId;
  const isPlaceholder = !measurementId || measurementId === 'G-XXXXXXXXXX';

  // 1. Initialize dataLayer and global gtag() helper
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  // 2. Load the official Google tag script (gtag.js) in the background
  if (!isPlaceholder) {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    document.head.appendChild(script);
  }

  gtag('js', new Date());
  gtag('config', measurementId, {
    page_title: document.title,
    page_path: window.location.pathname
  });

  // 3. Helper for firing custom GA4 events (sent silently to your GA4 dashboard)
  window.trackGAEvent = function trackGAEvent(eventName, eventParams) {
    const payload = Object.assign(
      {
        page_path: window.location.pathname,
        transport_type: 'beacon'
      },
      eventParams || {}
    );

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, payload);
    }
  };

  // 4. Attach automatic declarative event listeners once DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', function (e) {
      const target = e.target.closest('[data-ga-event]');
      if (!target) return;

      const eventName = target.getAttribute('data-ga-event');
      const label = target.getAttribute('data-ga-label') || target.textContent.trim();
      const category = target.getAttribute('data-ga-category') || 'engagement';
      const itemType = target.getAttribute('data-ga-type') || '';

      window.trackGAEvent(eventName, {
        event_category: category,
        event_label: label,
        item_type: itemType,
        link_url: target.getAttribute('href') || ''
      });
    });
  });
})();
