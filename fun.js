// Mobile Menu
function toggleMenu() {
    document.getElementById("mobileMenu").classList.toggle("active");
}
function closeMenu() {
    document.getElementById("mobileMenu").classList.remove("active");
}

// Dark/Light Mode Toggle
function toggleTheme() {
    const body = document.body;
    const icon = document.querySelector("#themeToggle i");
    body.classList.toggle("light-mode");

    if (body.classList.contains("light-mode")) {
        icon.className = "fa-solid fa-sun";
        localStorage.setItem("theme", "light");
    } else {
        icon.className = "fa-solid fa-moon";
        localStorage.setItem("theme", "dark");
    }
}

// Load saved theme on page load
(function () {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
        document.body.classList.add("light-mode");
        const icon = document.querySelector("#themeToggle i");
        if (icon) icon.className = "fa-solid fa-sun";
    }
})();

function changeSlide(btn, direction) {
    const slider = btn.closest(".slider");
    const track = slider.querySelector(".slider-track");
    const images = track.querySelectorAll("img");
    const dots = slider.querySelectorAll(".dot");
    const total = images.length;

    let current = parseInt(slider.dataset.index || "0");
    current += direction;

    if (current < 0) current = total - 1;
    if (current >= total) current = 0;

    track.style.transform = `translateX(-${current * 100}%)`;
    slider.dataset.index = current;

    dots.forEach((d, i) => d.classList.toggle("active", i === current));
}

function goToSlide(dot, index) {
    const slider = dot.closest(".slider");
    const track = slider.querySelector(".slider-track");
    const dots = slider.querySelectorAll(".dot");

    track.style.transform = `translateX(-${index * 100}%)`;
    slider.dataset.index = index;

    dots.forEach((d, i) => d.classList.toggle("active", i === index));
}

// Auto-slide every 4 seconds
(function () {
    const sliders = document.querySelectorAll(".slider");
    sliders.forEach((slider) => {
        setInterval(() => {
            const nextBtn = slider.querySelector(".slider-next");
            if (nextBtn) changeSlide(nextBtn, 1);
        }, 4000);
    });
})();