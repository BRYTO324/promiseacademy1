// ================= PRELOADER =================

window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");

    setTimeout(() => {
        preloader.classList.add("hide");
    }, 500);
});


// ================= NAVBAR =================

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


// ================= MOBILE MENU =================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if (navLinks.classList.contains("active")) {
        icon.classList.replace("fa-bars", "fa-xmark");
    } else {
        icon.classList.replace("fa-xmark", "fa-bars");
    }

});


document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.replace("fa-xmark", "fa-bars");

    });

});


// ================= HERO SLIDER =================

const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

function changeSlide() {

    slides[currentSlide].classList.remove("active");

    currentSlide = (currentSlide + 1) % slides.length;

    slides[currentSlide].classList.add("active");

}

setInterval(changeSlide, 6000);


// ================= SCROLL REVEAL =================

const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

            }

        });

    },
    {
        threshold: 0.12
    }
);

reveals.forEach(element => {
    revealObserver.observe(element);
});


// ================= COUNTER ANIMATION =================

const counters = document.querySelectorAll(".counter");

let counterStarted = false;

function startCounters() {

    counters.forEach(counter => {

        const target = Number(counter.dataset.target);

        let count = 0;

        const increment = Math.ceil(target / 80);

        const updateCounter = () => {

            count += increment;

            if (count < target) {

                counter.textContent = count;

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent = target + "+";

            }

        };

        updateCounter();

    });

}


const statsSection = document.querySelector(".stats");

const statsObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting && !counterStarted) {

                startCounters();

                counterStarted = true;

            }

        });

    },
    {
        threshold: 0.4
    }
);

statsObserver.observe(statsSection);


// ================= BACK TO TOP =================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ================= GALLERY LIGHTBOX =================

const galleryImages = document.querySelectorAll(".gallery-item img");

const lightbox = document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const closeLightbox =
    document.getElementById("closeLightbox");


galleryImages.forEach(image => {

    image.addEventListener("click", () => {

        lightboxImage.src = image.src;

        lightbox.classList.add("active");

    });

});


closeLightbox.addEventListener("click", () => {

    lightbox.classList.remove("active");

});


lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {

        lightbox.classList.remove("active");

    }

});


// ================= CONTACT FORM =================

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener("submit", event => {

    event.preventDefault();

    formMessage.textContent =
        "Thank you! Your message has been received.";

    formMessage.style.color = "#123b5d";

    contactForm.reset();

});


// ================= ACTIVE NAVIGATION =================

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });


    document
        .querySelectorAll(".nav-links a")
        .forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });

});


// ================= CURRENT YEAR =================

document.getElementById("year").textContent =
    new Date().getFullYear();