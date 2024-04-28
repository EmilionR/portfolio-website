const sections = document.querySelectorAll('section');
const upArrow = document.getElementById('up-arrow');
const downArrow = document.getElementById('down-arrow');

// Toggle Navbar Menu
function toggleMenu() {
    const menu = document.querySelector(".nav-links");
    const icon = document.querySelector(".burger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// Determine visibility of navigation arrows
const updateArrowsVisibility = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const pageHeight = document.body.scrollHeight;

    const distanceFromBottom = pageHeight - (scrollPosition + windowHeight);

    if (scrollPosition > 500) {
        upArrow.style.display = "block";
    } else {
        upArrow.style.display = "none";
    }
    if (distanceFromBottom > 400) {
        downArrow.style.display = "block";
    } else {
        downArrow.style.display = "none";
    }
};

// Add event listener to scroll event
window.addEventListener('scroll', () => {
    updateArrowsVisibility();
});

// Add event listener to the 'previous' arrow
upArrow.addEventListener('click', () => {
    Array.from(sections).reverse().forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            section.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    });
});

// Add event listener to the 'next' arrow
downArrow.addEventListener('click', () => {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});