/* ==========================================
   GOOGLE SHEETS CONFIGURATION
========================================== */


// Google Apps Script Web App URL
const SCRIPT_URL = 
"https://script.google.com/macros/s/AKfycby6a0T0-nzqoR9309vAs3Sv21Ay4okGtJ_CWzzuJQUeUP1RMdSK6bgOhPeGs3hsxu6gQw/exec";



/* ==========================================
   RSVP SUBMIT
========================================== */


const rsvpForm = document.getElementById("rsvpForm");


if (rsvpForm) {


    rsvpForm.addEventListener(
        "submit",
        async function(e){


        e.preventDefault();


        const button = 
        rsvpForm.querySelector("button");


        button.disabled = true;

        button.innerText = "Sending...";



        const data = {


            action:"rsvp",

            nama:
            rsvpForm.nama.value,


            attendance:
            rsvpForm.attendance.value,


            guest:
            rsvpForm.guest.value


        };



        try {


            const response = await fetch(
                SCRIPT_URL,
                {

                    method:"POST",

                    body:
                    new URLSearchParams(data)

                }
            );



            const result =
            await response.json();



            if(result.status === "success"){


                showNotification(
                    "Thank you for confirming ❤️"
                );


                rsvpForm.reset();


            }

            else {


                alert(
                    result.message ||
                    "Failed to send RSVP."
                );


            }



        }

        catch(error){


            console.error(
                "RSVP Error:",
                error
            );


            alert(
                "Network error. Please try again."
            );


        }



        button.disabled = false;

        button.innerText = "Send RSVP";



    });



}




/* ==========================================
   WISH SUBMIT
========================================== */


const wishForm =
document.getElementById("wishForm");

if(wishForm){


    wishForm.addEventListener(
        "submit",
        async function(e){

        e.preventDefault();

        const button =
        wishForm.querySelector("button");

        button.disabled = true;

        button.innerText =
        "Sending...";

        const data = {


            action:"wish",

            nama:
            wishForm.querySelector(
                "input[name='nama']"
            ).value,

            ucapan:
            wishForm.querySelector(
                "textarea[name='ucapan']"
            ).value


        };

        try {



            const response =
            await fetch(
                SCRIPT_URL,
                {

                    method:"POST",

                    body:
                    new URLSearchParams(data)

                }
            );

            const result =
            await response.json();


            if(result.status === "success"){


                showNotification(
                    "Thank you for your wishes ❤️"
                );


                wishForm.reset();


                loadWishes();

            }

            else {


                alert(
                    result.message ||
                    "Failed to send wishes."
                );

            }

        }

        catch(error){


            console.error(
                "Wish Error:",
                error
            );


            alert(
                "Network error."
            );


        }

        button.disabled=false;

        button.innerText =
        "Send Wishes";

    });

}


/* ==========================================
   LOAD WISHES
========================================== */

async function loadWishes(){

    const container =
    document.getElementById(
        "wishList"
    );

    if(!container)
        return;

    try {

        const response =
        await fetch(
            SCRIPT_URL +
            "?action=getWishes"
        );

        const wishes =
        await response.json();

        container.innerHTML="";

        wishes
        .reverse()
        .forEach(item=>{

            const div =
            document.createElement(
                "div"
            );

            div.className =
            "wish";

            div.innerHTML = `

                <h4>
                ${escapeHtml(item.nama)}
                </h4>

                <p>
                ${escapeHtml(item.ucapan)}
                </p>

            `;

            container.appendChild(div);

        });

    }

    catch(error){

        console.error(
            "Load wishes error:",
            error
        );

    }

}


/* ==========================================
   ESCAPE HTML
========================================== */

function escapeHtml(text){

    if(!text)
        return "";

    return text

    .replace(
        /&/g,
        "&amp;"
    )

    .replace(
        /</g,
        "&lt;"
    )

    .replace(
        />/g,
        "&gt;"
    )

    .replace(
        /"/g,
        "&quot;"
    )

    .replace(
        /'/g,
        "&#039;"
    );


}


/* ==========================================
   NOTIFICATION
========================================== */


function showNotification(message){


    alert(message);


}

/* ==========================================
   INITIAL LOAD
========================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


    loadWishes();


});
