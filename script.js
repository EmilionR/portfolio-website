function toggleMenu() {
    const menu = document.querySelector(".nav-links");
    const icon = document.querySelector(".burger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}