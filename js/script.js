/**
 * The control functionalities are added to the desktop displays for easy navigation but removed for mobile displays
 * The touch gesture functionality is implemented for mobile to allow swiping through the cards
 * Slidebar is also implemented for both the desktop display and mobile
 */

// Execution starts after the HTML document has been fully loaded
document.addEventListener('DOMContentLoaded', () => {

    const slider = document.querySelector('.card-slider');
    const cards = document.querySelectorAll('.card');
    const cardWidth = cards[0].offsetWidth; // Width of a single card element
    const numOfCards = cards.length;
    const isMobile = window.matchMedia('(max-width: 768px)').matches; // Check for mobile screen
    const visibleCards = isMobile ? 1 : 3; // Display a minimum of 1 full card at a time on mobile and minimum of 3 on larger screens
    const visibleWidth = visibleCards * cardWidth; // Calculate the total visible width
    const slidebar = document.querySelector('.slidebar');
    const slidebarIncrement = 100 / (numOfCards / visibleCards); // Calculate the slidebar increment

    let currentIndex = 0;

    // Set the initial slidebar width to 10%
    slidebar.style.width = '10%';

    // Touch gesture variable for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;

    /**
     * Add touch event listeners
     * Passive is enabled to inform the browser that the event listener will not prevent vertical scrolling
    */
    slider.addEventListener('touchstart', (event) => {
        touchStartX = event.touches[0].clientX;
    }, { passive: true });

    slider.addEventListener('touchend', (event) => {
        touchEndX = event.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });

    // Function to handle swipe on mobile
    const handleSwipe = () => {
        const deltaX = touchEndX - touchStartX; // Calculate difference in X positions
        // Handle swipe to the right
        if (deltaX > 50) {
            slideToIndex(currentIndex - 1);
        }
        // Handle swipe to the left
        else if (deltaX < -50) {
            slideToIndex(currentIndex + 1);
        }
    };

    // Function to handle the general sliding behavior
    const slideToIndex = (index) => {
        // Ensure the index value stays within valid bounds to prevent sliding beyond available cards
        index = Math.max(0, Math.min(index, numOfCards - visibleCards));

        const maxSlideDistance = (numOfCards - visibleCards) * cardWidth;
        const slideDistance = Math.max(0, Math.min(index * visibleWidth, maxSlideDistance));

        slider.style.transform = `translateX(-${slideDistance}px)`;
        currentIndex = index; // Update the currently displayed card set

        // Update slidebar width based on the current index and increment
        const slidebarWidth = (currentIndex * slidebarIncrement) + 10;
        slidebar.style.width = `${slidebarWidth}%`;
    };

    // Previous button click handler
    document.getElementById('prevBtn').addEventListener('click', () => {
        slideToIndex(currentIndex - 1);
    });

    // Next button click handler
    document.getElementById('nextBtn').addEventListener('click', () => {
        slideToIndex(currentIndex + 1);
    });

});