const sections = document.querySelectorAll("section");
const upArrow = document.getElementById("up-arrow");
const downArrow = document.getElementById("down-arrow");
const arrowsMinWidth = 687;

// Check for reduced motion preference
const prefersReducedMotion =
  window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
  window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

var docWidth = document.documentElement.offsetWidth;

[].forEach.call(document.querySelectorAll("*"), function (el) {
  if (el.offsetWidth > docWidth) {
    console.log(el);
  }
});

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
  if (window.innerWidth >= arrowsMinWidth) {
    if (scrollPosition > 450) {
      upArrow.style.display = "block";
    } else {
      upArrow.style.display = "none";
    }
    if (distanceFromBottom > 400) {
      downArrow.style.display = "block";
    } else {
      downArrow.style.display = "none";
    }
  }
};

// Initial visibility check on page load
updateArrowsVisibility();

// Add event listener to scroll event
window.addEventListener("scroll", () => {
  updateArrowsVisibility();
});

// Add event listener to the 'previous' arrow
upArrow.addEventListener("click", () => {
  Array.from(sections)
    .reverse()
    .forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom > 0) {
        section.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    });
});

// Add event listener to the 'next' arrow
downArrow.addEventListener("click", () => {
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top >= 0 && rect.top < window.innerHeight) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Carousel function

let slideIndex = 0;
let intervalId; // Variable to store setInterval ID

function moveSlide(n) {
  slideIndex += n;
  showSlide(slideIndex);
}

function showSlide(n) {
  const slides = document.querySelectorAll(".carousel__slide");
  if (n >= slides.length) {
    slideIndex = 0;
  } else if (n < 0) {
    slideIndex = slides.length - 1;
  }
  slides.forEach((slide) => {
    slide.style.transform = `translateX(-${slideIndex * 100}%)`;
  });
}

// Slide buttons
document.querySelector(".prev").addEventListener("click", () => {
  moveSlide(-1);
});

document.querySelector(".next").addEventListener("click", () => {
  moveSlide(1);
});

// Function to start autoplay
function startAutoplay() {
  intervalId = setInterval(() => {
    moveSlide(1);
  }, 3000); // Change slide every 3 seconds (adjust as needed)
}

// Function to stop autoplay
function stopAutoplay() {
  clearInterval(intervalId);
}

// Start autoplay when the page loads
if (!prefersReducedMotion) {
  startAutoplay();

  // Stop autoplay when the carousel is hovered
  document
    .querySelector(".carousel")
    .addEventListener("mouseenter", stopAutoplay);

  // Restart autoplay when the carousel is not hovered
  document
    .querySelector(".carousel")
    .addEventListener("mouseleave", startAutoplay);
}
