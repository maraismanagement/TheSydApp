// Tab navigation functionality — bottom nav bar
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.bottom-nav-item[data-tab]');
    const panels = document.querySelectorAll('.tab-panel');
    const header = document.querySelector('.property-header');

    // Get the villa slug from body attribute
    const villaSlug = document.body.dataset.villa;

    // Map tab IDs to header images
    const headerImages = {
        'villa': villaSlug ? `../images/header-${villaSlug}.jpg` : '../images/header-villa.jpg',
        'pool': '../images/header-pool.jpg',
        'services': '../images/header-services.jpg',
        'explore': '../images/header-explore.jpg',
        'events': '../images/header-events.jpg',
        'contact': '../images/header-contact.jpg'
    };

    function updateHeaderImage(tabId) {
        if (header && headerImages[tabId]) {
            header.style.backgroundImage = `url('${headerImages[tabId]}')`;
        }
    }

    // Show Villa Info tab by default
    const defaultTab = document.querySelector('[data-tab="villa"]');
    const defaultPanel = document.getElementById('villa');
    if (defaultTab && defaultPanel) {
        defaultTab.classList.add('active');
        defaultPanel.classList.add('active');
        updateHeaderImage('villa');
    } else if (panels.length > 0 && tabs.length > 0) {
        panels[0].classList.add('active');
        tabs[0].classList.add('active');
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('data-tab');

            // Remove active from all tabs and panels
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            // Add active to clicked tab and corresponding panel
            this.classList.add('active');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }

            // Update header image
            updateHeaderImage(targetId);

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
});
