/* ==========================================
   Wedding Invitation App
   Hafiz Ilham & Sera Vika Eviana
========================================== */


document.addEventListener("DOMContentLoaded", () => {

    loadGuestName();

    initCountdown();

    initMusic();

    initSmoothScroll();

    initGallery();

    initHeroSlideshow();

});



/* ==========================================
   PERSONALIZED GUEST NAME
   URL Example:
   website.com/?to=Ahmad%20Fauzi
========================================== */


function loadGuestName(){

    const guestElement =
        document.getElementById("guestName");


    if(!guestElement) return;


    const params =
        new URLSearchParams(window.location.search);


    const guest =
        params.get("to");


    if(guest){

        guestElement.textContent =
            decodeURIComponent(guest);

    }else{

        guestElement.textContent =
            "Our Lovely Guest";

    }

}





/* ==========================================
   COUNTDOWN
========================================== */


// Change your wedding date here
const weddingDate =
new Date("2027-01-01T09:00:00").getTime();



function initCountdown(){


    const days =
        document.getElementById("days");


    const hours =
        document.getElementById("hours");


    const minutes =
        document.getElementById("minutes");


    const seconds =
        document.getElementById("seconds");



    if(!days) return;



    function update(){


        const now =
        new Date().getTime();



        const distance =
        weddingDate - now;



        if(distance <= 0){


            days.innerHTML = "0";

            hours.innerHTML = "0";

            minutes.innerHTML = "0";

            seconds.innerHTML = "0";


            return;

        }



        days.innerHTML =
        Math.floor(
            distance /
            (1000*60*60*24)
        );



        hours.innerHTML =
        Math.floor(
            (distance %
            (1000*60*60*24))
            /
            (1000*60*60)
        );



        minutes.innerHTML =
        Math.floor(
            (distance %
            (1000*60*60))
            /
            (1000*60)
        );



        seconds.innerHTML =
        Math.floor(
            (distance %
            (1000*60))
            /
            1000
        );


    }



    update();


    setInterval(update,1000);


}





/* ==========================================
   MUSIC PLAYER
========================================== */


function initMusic(){


    const music =
    document.getElementById("bgMusic");


    const button =
    document.getElementById("musicBtn");



    if(!music || !button)
        return;



    let playing=false;



    function playMusic(){


        music.play()

        .then(()=>{


            playing=true;

            button.innerHTML="🔊";


        })

        .catch(()=>{


            console.log(
            "Autoplay blocked. Waiting for user click."
            );


        });


    }




    // Browser requires user interaction

    document.body.addEventListener(
        "click",
        function startMusic(){


            playMusic();


        },
        {
            once:true
        }
    );




    button.addEventListener(
        "click",
        (event)=>{


            event.stopPropagation();



            if(playing){


                music.pause();


                playing=false;


                button.innerHTML="🔇";


            }

            else{


                music.play();


                playing=true;


                button.innerHTML="🔊";


            }


        }
    );



}





/* ==========================================
   SMOOTH SCROLL
========================================== */


function initSmoothScroll(){


    document
    .querySelectorAll("nav a")
    .forEach(link=>{


        link.addEventListener(
            "click",
            e=>{


                e.preventDefault();



                const target =
                document.querySelector(
                    link.getAttribute("href")
                );



                if(target){


                    target.scrollIntoView({

                        behavior:"smooth"

                    });


                }


            }
        );


    });


}






/* ==========================================
   HERO SLIDESHOW
========================================== */


function initHeroSlideshow(){


    const hero =
    document.querySelector(".hero");



    if(!hero) return;



    const images=[


        "assets/photos/1.jpg",

        "assets/photos/2.jpg",

        "assets/photos/3.jpg",

        "assets/photos/4.jpg",

        "assets/photos/5.jpg"


    ];



    let index=0;



    setInterval(()=>{


        index++;



        if(index >= images.length){

            index=0;

        }



        hero.style.backgroundImage =

        `
        linear-gradient(
        rgba(0,0,0,.45),
        rgba(0,0,0,.45)
        ),
        url("${images[index]}")
        `;



    },5000);



}






/* ==========================================
   GALLERY AUTO LOAD
========================================== */


function initGallery(){


    const gallery =
    document.querySelector(".gallery");



    if(!gallery) return;




    const photos=[


        "1.jpg",

        "2.jpg",

        "3.jpg",

        "4.jpg",

        "5.jpg",

        "6.jpg",

        "7.jpg",

        "8.jpg"


    ];




    gallery.innerHTML="";



    photos.forEach(photo=>{


        const link =
        document.createElement("a");



        link.href =
        `assets/photos/${photo}`;


        link.setAttribute(
            "data-lightbox",
            "wedding-gallery"
        );



        const img =
        document.createElement("img");



        img.src =
        `assets/photos/${photo}`;



        img.loading="lazy";



        img.alt =
        "Wedding Photo";



        link.appendChild(img);



        gallery.appendChild(link);



    });



}






/* ==========================================
   NAVBAR EFFECT
========================================== */


window.addEventListener(
"scroll",
()=>{


    const nav =
    document.querySelector("nav");



    if(!nav) return;



    if(window.scrollY > 80){


        nav.style.background =
        "rgba(255,255,255,.95)";

        nav.style.boxShadow =
        "0 10px 25px rgba(0,0,0,.1)";


    }

    else{


        nav.style.background =
        "rgba(255,255,255,.85)";


        nav.style.boxShadow =
        "none";


    }


});






/* ==========================================
   NOTIFICATION
========================================== */


function showNotification(message){


    const notification =
    document.createElement("div");



    notification.innerHTML =
    message;



    notification.style.position =
    "fixed";


    notification.style.top =
    "30px";


    notification.style.right =
    "30px";


    notification.style.background =
    "#c8a96a";


    notification.style.color =
    "white";


    notification.style.padding =
    "15px 25px";


    notification.style.borderRadius =
    "15px";


    notification.style.zIndex =
    "99999";



    document.body.appendChild(
        notification
    );



    setTimeout(()=>{


        notification.remove();


    },3000);



}
