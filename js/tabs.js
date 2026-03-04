// Tab navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.nav-item[data-tab]');
    const panels = document.querySelectorAll('.tab-panel');
    const headerImage = document.querySelector('.header-image img');

    // Map tab IDs to header images
    const headerImages = {
        'villa': { src: '../images/header-villa.jpg', position: 'center center' },
        'pool': { src: '../images/header-pool.jpg', position: 'center center' },
        'services': { src: '../images/header-services.jpg', position: 'center 30%' },
        'explore': { src: '../images/header-explore.jpg', position: 'center 20%' },
        'events': { src: '../images/header-events.jpg', position: 'center center' },
        'contact': { src: '../images/header-contact.jpg', position: 'center center' }
    };

    function updateHeaderImage(tabId) {
        if (headerImage && headerImages[tabId]) {
            headerImage.src = headerImages[tabId].src;
            headerImage.style.objectPosition = headerImages[tabId].position;
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
        });
    });
});
