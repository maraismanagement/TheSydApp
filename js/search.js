// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.querySelector('.search-btn-header');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.getElementById('searchInput');
    const searchClose = document.getElementById('searchClose');
    const searchResults = document.getElementById('searchResults');

    if (!searchBtn || !searchOverlay) return;

    // Build searchable content index
    function buildSearchIndex() {
        const index = [];

        // Index tab panels
        document.querySelectorAll('.tab-panel').forEach(panel => {
            const tabId = panel.id;
            const tabName = document.querySelector(`[data-tab="${tabId}"]`)?.textContent || tabId;

            // Index sections
            panel.querySelectorAll('.content-section').forEach(section => {
                const heading = section.querySelector('h2')?.textContent || '';
                const content = section.textContent;

                index.push({
                    tab: tabId,
                    tabName: tabName,
                    heading: heading,
                    content: content,
                    element: section
                });
            });

            // Index accordion items
            panel.querySelectorAll('.accordion-item').forEach(item => {
                const heading = item.querySelector('.accordion-header span')?.textContent || '';
                const content = item.querySelector('.accordion-content')?.textContent || '';

                index.push({
                    tab: tabId,
                    tabName: tabName,
                    heading: heading,
                    content: content,
                    element: item,
                    isAccordion: true
                });
            });
        });

        return index;
    }

    const searchIndex = buildSearchIndex();

    // Open search
    searchBtn.addEventListener('click', function() {
        searchOverlay.classList.add('active');
        searchInput.focus();
        document.body.style.overflow = 'hidden';
    });

    // Close search
    searchClose.addEventListener('click', closeSearch);

    searchOverlay.addEventListener('click', function(e) {
        if (e.target === searchOverlay) {
            closeSearch();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            closeSearch();
        }
    });

    function closeSearch() {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
        document.body.style.overflow = '';
    }

    // Search function
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();

        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }

        const results = searchIndex.filter(item =>
            item.content.toLowerCase().includes(query) ||
            item.heading.toLowerCase().includes(query)
        );

        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-no-results">No results found</div>';
            return;
        }

        // Dedupe by heading
        const seen = new Set();
        const uniqueResults = results.filter(item => {
            const key = item.tabName + item.heading;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });

        searchResults.innerHTML = uniqueResults.slice(0, 10).map(item => {
            const lowerContent = item.content.toLowerCase();
            const matchIndex = lowerContent.indexOf(query);
            let snippet = '';
            if (matchIndex >= 0) {
                const start = Math.max(0, matchIndex - 30);
                const end = Math.min(item.content.length, matchIndex + query.length + 50);
                snippet = (start > 0 ? '...' : '') +
                          item.content.substring(start, end).trim() +
                          (end < item.content.length ? '...' : '');
            }

            return `
                <div class="search-result-item" data-tab="${item.tab}" data-heading="${item.heading}" data-accordion="${item.isAccordion || false}">
                    <h4>${item.heading || item.tabName}</h4>
                    <p>${snippet.substring(0, 100)}</p>
                </div>
            `;
        }).join('');
    });

    // Click on result
    searchResults.addEventListener('click', function(e) {
        const resultItem = e.target.closest('.search-result-item');
        if (!resultItem) return;

        const tabId = resultItem.dataset.tab;
        const heading = resultItem.dataset.heading;
        const isAccordion = resultItem.dataset.accordion === 'true';

        // Switch to the tab
        const tabBtn = document.querySelector(`[data-tab="${tabId}"]`);
        if (tabBtn) {
            tabBtn.click();
        }

        closeSearch();

        // Scroll to element and open accordion if needed
        setTimeout(() => {
            let targetElement = null;

            if (isAccordion && heading) {
                document.querySelectorAll('.accordion-header span').forEach(span => {
                    if (span.textContent === heading) {
                        targetElement = span.closest('.accordion-item');
                        if (targetElement && !targetElement.classList.contains('open')) {
                            targetElement.querySelector('.accordion-header').click();
                        }
                    }
                });
            } else if (heading) {
                document.querySelectorAll('h2').forEach(h2 => {
                    if (h2.textContent === heading) {
                        targetElement = h2.closest('.content-section');
                    }
                });
            }

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    });
});
