// Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const isOpen = item.classList.contains('open');

            // Close all accordion items in same accordion group
            const accordion = item.closest('.accordion');
            if (accordion) {
                accordion.querySelectorAll('.accordion-item').forEach(i => {
                    i.classList.remove('open');
                });
            }

            // Toggle current item
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });
});
