/* ==========================================================
   BLUELI WEBSITE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ============================================
       Fade-In Animation
    ============================================ */

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{
        threshold:0.15
    });

    document.querySelectorAll(

        ".feature-card,.timeline-item,.phone-large,.stat,.faq details,.contact-form,.contact-info"

    ).forEach(el=>{

        el.classList.add("fade");

        observer.observe(el);

    });

    /* ============================================
       Navbar Scroll
    ============================================ */

    const navbar=document.querySelector(".navbar");

    window.addEventListener("scroll",()=>{

        if(window.scrollY>40){

            navbar.style.background="rgba(7,17,31,.95)";
            navbar.style.boxShadow="0 15px 40px rgba(0,0,0,.25)";

        }else{

            navbar.style.background="rgba(7,17,31,.72)";
            navbar.style.boxShadow="none";

        }

    });

    /* ============================================
       Counter Animation
    ============================================ */

    const stats=document.querySelectorAll(".stat h2");

    stats.forEach(stat=>{

        const txt=stat.innerText;

        const value=parseInt(txt);

        if(isNaN(value)) return;

        let current=0;

        const step=Math.max(1,Math.ceil(value/70));

        const timer=setInterval(()=>{

            current+=step;

            if(current>=value){

                current=value;

                clearInterval(timer);

            }

            stat.innerText=current;

        },20);

    });

    /* ============================================
       Smooth Anchor Scroll
    ============================================ */

    document.querySelectorAll("a[href^='#']").forEach(anchor=>{

        anchor.addEventListener("click",function(e){

            e.preventDefault();

            const target=document.querySelector(

                this.getAttribute("href")

            );

            if(target){

                target.scrollIntoView({

                    behavior:"smooth"

                });

            }

        });

    });

});

/* ==========================================================
   PARALLAX BACKGROUND
========================================================== */

window.addEventListener("mousemove",(e)=>{

    const glow=document.querySelector(".background-glow");

    if(!glow) return;

    const x=e.clientX/window.innerWidth-.5;

    const y=e.clientY/window.innerHeight-.5;

    glow.style.transform=

        `translate(${x*40}px,${y*40}px)`;

});

/* ==========================================================
   HERO FLOAT
========================================================== */

const phone=document.querySelector(".phone");

let direction=1;

let offset=0;

function floatPhone(){

    if(phone){

        offset+=0.15*direction;

        phone.style.transform=

            `translateY(${offset}px)`;

        if(offset>12) direction=-1;

        if(offset<-12) direction=1;

    }

    requestAnimationFrame(floatPhone);

}

floatPhone();

/* ==========================================================
   BUTTON RIPPLE
========================================================== */

document.querySelectorAll(".button").forEach(button=>{

    button.addEventListener("click",function(e){

        const circle=document.createElement("span");

        const d=Math.max(

            this.clientWidth,

            this.clientHeight

        );

        circle.style.width=d+"px";
        circle.style.height=d+"px";

        circle.style.left=e.offsetX-d/2+"px";
        circle.style.top=e.offsetY-d/2+"px";

        circle.classList.add("ripple");

        this.appendChild(circle);

        setTimeout(()=>{

            circle.remove();

        },600);

    });

});
const form = document.getElementById("contactForm");

if(form){

form.addEventListener("submit", async function(e){

e.preventDefault();

const result=document.getElementById("result");

const button=document.querySelector(".button");

const buttonText=document.getElementById("buttonText");

const loading=document.getElementById("loading");

button.disabled=true;

buttonText.style.display="none";

loading.style.display="inline";

const data=new FormData(form);

const response=await fetch("https://api.web3forms.com/submit",{

method:"POST",

body:data

});

const json=await response.json();

loading.style.display="none";

buttonText.style.display="inline";

button.disabled=false;

if(json.success){

result.className="success";

result.innerHTML="✅ Vielen Dank! Ihre Nachricht wurde erfolgreich versendet.";

form.reset();

}else{

result.className="error";

result.innerHTML="❌ Nachricht konnte nicht versendet werden. Bitte versuchen Sie es später erneut.";

}

});

}
