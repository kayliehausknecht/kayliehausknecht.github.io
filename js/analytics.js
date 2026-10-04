window.SITE_ANALYTICS_CONFIG = {
  measurementId: 'G-YF7N079D9K',
  siteDomain: 'kayliehausknecht.github.io'
};

(function initGA4() {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
  }

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
