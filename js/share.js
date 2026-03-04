// Share functionality
document.addEventListener('DOMContentLoaded', function() {
    const shareBtn = document.querySelector('.share-btn');
    const toast = document.querySelector('.share-toast');

    if (shareBtn) {
        shareBtn.addEventListener('click', async function() {
            const url = window.location.href;
            const title = document.title;

            // Try native share first (mobile)
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: title,
                        url: url
                    });
                } catch (err) {
                    // User cancelled or error
                }
            } else {
                // Fallback: copy to clipboard
                try {
                    await navigator.clipboard.writeText(url);
                    showToast('Link copied!');
                } catch (err) {
                    const textarea = document.createElement('textarea');
                    textarea.value = url;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                    showToast('Link copied!');
                }
            }
        });
    }

    function showToast(message) {
        if (toast) {
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 2000);
        }
    }
});
