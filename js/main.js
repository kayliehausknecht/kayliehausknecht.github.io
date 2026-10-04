/**
 * ============================================================================
 * Main UI Logic — Paper/Talk Filtering & Drawers
 * Site: https://kayliehausknecht.github.io
 * ============================================================================
 */

(function initSiteUI() {
  // Always ensure light tannish-pink theme is active
  document.documentElement.removeAttribute('data-theme');
  localStorage.removeItem('kh_site_theme');

  document.addEventListener('DOMContentLoaded', function () {
    setupPapersAndTalksFilter();
    setupDrawersAndCopy();
  });

  /**
   * 1. Papers & Talks Filtering (Tabs + Search Input)
   */
  function setupPapersAndTalksFilter() {
    const filterTabs = document.querySelectorAll('[data-filter-type]');
    const searchInput = document.getElementById('pub-search-input');
    const cards = document.querySelectorAll('.pub-card');
    const groups = document.querySelectorAll('.entry-group');

    if (!cards.length) return;

    let activeType = 'all';
    let searchQuery = '';

    function applyFilters() {
      cards.forEach(function (card) {
        const itemType = card.getAttribute('data-item-type') || '';
        const textContent = card.textContent.toLowerCase();
        const matchesType = activeType === 'all' || itemType === activeType;
        const matchesSearch = !searchQuery || textContent.includes(searchQuery);

        card.style.display = matchesType && matchesSearch ? '' : 'none';
      });

      // Update group visibility and visible counts
      groups.forEach(function (group) {
        const visibleCards = group.querySelectorAll('.pub-card:not([style*="display: none"])');
        const countBadge = group.querySelector('.entry-count');
        if (countBadge) {
          countBadge.textContent = visibleCards.length + (visibleCards.length === 1 ? ' entry' : ' entries');
        }
        group.style.display = visibleCards.length > 0 ? '' : 'none';
      });
    }

    filterTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        filterTabs.forEach(function (t) {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        activeType = tab.getAttribute('data-filter-type') || 'all';
        applyFilters();

        if (typeof window.trackGAEvent === 'function') {
          window.trackGAEvent('filter_papers_talks', {
            event_category: 'navigation',
            event_label: activeType
          });
        }
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        searchQuery = (e.target.value || '').trim().toLowerCase();
        applyFilters();
      });
    }
  }

  /**
   * 2. Expandable Abstract / BibTeX Drawers & One-Click Copy
   */
  function setupDrawersAndCopy() {
    document.body.addEventListener('click', function (e) {
      const toggleBtn = e.target.closest('[data-drawer-target]');
      if (toggleBtn) {
        const targetId = toggleBtn.getAttribute('data-drawer-target');
        const drawer = document.getElementById(targetId);
        if (!drawer) return;

        const isOpen = drawer.classList.toggle('open');
        toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        return;
      }

      const copyBtn = e.target.closest('[data-copy-target]');
      if (copyBtn) {
        const targetId = copyBtn.getAttribute('data-copy-target');
        const codeEl = document.getElementById(targetId);
        if (!codeEl) return;

        navigator.clipboard.writeText(codeEl.textContent.trim()).then(function () {
          const originalText = copyBtn.textContent;
          copyBtn.textContent = 'Copied!';
          setTimeout(function () {
            copyBtn.textContent = originalText;
          }, 1800);
        });

        if (typeof window.trackGAEvent === 'function') {
          window.trackGAEvent('bibtex_copy', {
            event_category: 'citation',
            event_label: copyBtn.getAttribute('data-ga-label') || targetId
          });
        }
      }
    });
  }
})();
