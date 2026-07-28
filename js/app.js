/* ==========================================
   Wedding Invitation App
   Hafiz & Sera
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initCountdown();
    initMusic();
    initSmoothScroll();
    initGallery();
    initHeroSlideshow();

});

/* ==========================================
   COUNTDOWN
========================================== */

// Change this to your wedding date
const weddingDate = new Date("2027-01-01T09:00:00").getTime();

function initCountdown() {

    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");

    if (!days) return;

    function updateCountdown() {

        const now = new Date().getTime();

        const distance = weddingDate - now;

        if (distance <= 0) {

            days.innerHTML = "0";
            hours.innerHTML = "0";
            minutes.innerHTML = "0";
            seconds.innerHTML = "0";

            clearInterval(timer);

            return;
        }

        days.innerHTML = Math.floor(distance / (1000 * 60 * 60 * 24));

        hours.innerHTML = Math.floor(
            (distance % (1000 * 60 * 60 * 24))
            / (1000 * 60 * 60)
        );

        minutes.innerHTML = Math.floor(
            (distance % (1000 * 60 * 60))
            / (1000 * 60)
        );

        seconds.innerHTML = Math.floor(
            (distance % (1000 * 60))
            / 1000
        );

    }

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

}

/* ==========================================
   MUSIC PLAYER
========================================== */

function initMusic() {

    const music = document.getElementById("bgMusic");
    const button = document.getElementById("musicBtn");

    if (!music || !button) return;

    let playing = false;

    function playMusic() {

        music.play()
            .then(() => {

                playing = true;
                button.innerHTML = "🔊";

            })
            .catch(() => {

                // Browser blocked autoplay
                console.log("Waiting for user interaction...");

            });

    }

    // Play after first interaction
    document.body.addEventListener(
        "click",
        function firstClick() {

            playMusic();

            document.body.removeEventListener(
                "click",
                firstClick
            );

        },
        { once: true }
    );

    button.addEventListener("click", () => {

        if (playing) {

            music.pause();

            playing = false;

            button.innerHTML = "🔇";

        } else {

            music.play();

            playing = true;

            button.innerHTML = "🔊";

        }

    });

}

/* ==========================================
   SMOOTH NAVIGATION
========================================== */

function initSmoothScroll() {

    const links = document.querySelectorAll("nav a");

    links.forEach(link => {

        link.addEventListener("click", e => {

            e.preventDefault();

            const target = document.querySelector(
                link.getAttribute("href")
            );

            if (!target) return;

            window.scrollTo({

                top: target.offsetTop - 70,
                behavior: "smooth"

            });

        });

    });

}

/* ==========================================
   HERO BACKGROUND SLIDESHOW
========================================== */

function initHeroSlideshow() {

    const hero = document.querySelector(".hero");

    if (!hero) return;

    const images = [

        "assets/photos/1.jpg",
        "assets/photos/2.jpg",
        "assets/photos/3.jpg",
        "assets/photos/4.jpg",
        "assets/photos/5.jpg"

    ];

    let current = 0;

    hero.style.backgroundImage =
        `url('${images[current]}')`;

    setInterval(() => {

        current++;

        if (current >= images.length) {

            current = 0;

        }

        hero.style.backgroundImage =
            `url('${images[current]}')`;

    }, 5000);

}

/* ==========================================
   GALLERY AUTO LOADER
========================================== */

function initGallery() {

    const gallery = document.querySelector(".gallery");

    if (!gallery) return;

    const photos = [

        "1.jpg",
        "2.jpg",
        "3.jpg",
        "4.jpg",
        "5.jpg",
        "6.jpg",
        "7.jpg",
        "8.jpg"

    ];

    gallery.innerHTML = "";

    photos.forEach(photo => {

        const a = document.createElement("a");

        a.href = `assets/photos/${photo}`;

        a.setAttribute("data-lightbox", "gallery");

        const img = document.createElement("img");

        img.src = `assets/photos/${photo}`;

        img.loading = "lazy";

        img.alt = "Wedding Gallery";

        a.appendChild(img);

        gallery.appendChild(a);

    });

}

/* ==========================================
   OPEN INVITATION ANIMATION
========================================== */

const openButton = document.querySelector(".btn");

if (openButton) {

    openButton.addEventListener("click", () => {

        document.body.style.overflowY = "auto";

    });

}

/* ==========================================
   NAVBAR BACKGROUND
========================================== */

window.addEventListener("scroll", () => {

    const nav = document.querySelector("nav");

    if (!nav) return;

    if (window.scrollY > 80) {

        nav.style.background = "rgba(255,255,255,.96)";
        nav.style.boxShadow = "0 8px 20px rgba(0,0,0,.08)";

    } else {

        nav.style.background = "rgba(255,255,255,.88)";
        nav.style.boxShadow = "none";

    }

});

/* ==========================================
   SIMPLE FADE-IN
========================================== */

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

});

document.querySelectorAll("section").forEach(section => {

    observer.observe(section);

});

/* ==========================================
   SUCCESS NOTIFICATION
========================================== */

function showNotification(message) {

    const div = document.createElement("div");

    div.innerHTML = message;

    div.style.position = "fixed";
    div.style.top = "30px";
    div.style.right = "30px";
    div.style.background = "#C8A96A";
    div.style.color = "#fff";
    div.style.padding = "15px 22px";
    div.style.borderRadius = "10px";
    div.style.zIndex = "99999";
    div.style.boxShadow = "0 10px 25px rgba(0,0,0,.15)";

    document.body.appendChild(div);

    setTimeout(() => {

        div.remove();

    }, 3000);

}

// Example:
// showNotification("Thank you for your RSVP ❤️");
