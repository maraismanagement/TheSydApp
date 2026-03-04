// Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const arrow = this.querySelector('.accordion-arrow');
            const isOpen = item.classList.contains('open');

            // Close all other accordion items and reset arrows
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('open');
                const a = i.querySelector('.accordion-arrow');
                if (a) a.textContent = '+';
            });

            // Toggle current item
            if (!isOpen) {
                item.classList.add('open');
                if (arrow) arrow.textContent = '−';
            }
        });
    });
});
