/* ==========================================
   GOOGLE SHEETS CONFIGURATION
========================================== */

// Replace with your deployed Google Apps Script Web App URL
const SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";

/* ==========================================
   RSVP SUBMIT
========================================== */

const rsvpForm = document.getElementById("rsvpForm");

if (rsvpForm) {

    rsvpForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const submitButton = rsvpForm.querySelector("button");
        submitButton.disabled = true;
        submitButton.innerText = "Sending...";

        const data = {
            action: "rsvp",
            nama: rsvpForm.nama.value,
            attendance: rsvpForm.attendance.value,
            guest: rsvpForm.guest.value
        };

        try {

            const response = await fetch(SCRIPT_URL, {

                method: "POST",

                body: JSON.stringify(data),

                headers: {
                    "Content-Type": "application/json"
                }

            });

            const result = await response.json();

            if (result.status === "success") {

                showNotification("Thank you for confirming ❤️");

                rsvpForm.reset();

            } else {

                alert(result.message || "Failed to send RSVP.");

            }

        } catch (err) {

            console.error(err);

            alert("Network error.");

        }

        submitButton.disabled = false;
        submitButton.innerText = "Send RSVP";

    });

}

/* ==========================================
   WISH SUBMIT
========================================== */

const wishForm = document.getElementById("wishForm");

if (wishForm) {

    wishForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const submitButton = wishForm.querySelector("button");

        submitButton.disabled = true;
        submitButton.innerText = "Sending...";

        const data = {

            action: "wish",

            nama: wishForm.querySelector("input").value,

            ucapan: wishForm.querySelector("textarea").value

        };

        try {

            const response = await fetch(SCRIPT_URL, {

                method: "POST",

                body: JSON.stringify(data),

                headers: {

                    "Content-Type": "application/json"

                }

            });

            const result = await response.json();

            if (result.status === "success") {

                showNotification("Thank you for your wishes ❤️");

                wishForm.reset();

                loadWishes();

            } else {

                alert(result.message || "Failed to send.");

            }

        } catch (err) {

            console.error(err);

            alert("Network error.");

        }

        submitButton.disabled = false;
        submitButton.innerText = "Send Wishes";

    });

}

/* ==========================================
   LOAD WISHES
========================================== */

async function loadWishes() {

    const container = document.getElementById("wishList");

    if (!container) return;

    try {

        const response = await fetch(
            SCRIPT_URL + "?action=getWishes"
        );

        const wishes = await response.json();

        container.innerHTML = "";

        wishes.reverse().forEach(item => {

            const div = document.createElement("div");

            div.className = "wish";

            div.innerHTML = `
                <h4>${escapeHtml(item.nama)}</h4>
                <p>${escapeHtml(item.ucapan)}</p>
            `;

            container.appendChild(div);

        });

    } catch (err) {

        console.error(err);

    }

}

/* ==========================================
   HTML ESCAPE
========================================== */

function escapeHtml(text) {

    if (!text) return "";

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}

/* ==========================================
   INITIAL LOAD
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadWishes();

});
