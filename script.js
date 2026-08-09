/* ==========================================================
   BLUELI WEBSITE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================================
       FADE-IN ANIMATION
    ====================================================== */

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    document.querySelectorAll(
        ".feature-card,.timeline-item,.phone-large,.stat,.faq details,.contact-form,.contact-info"
    ).forEach(el => {

        el.classList.add("fade");

        observer.observe(el);

    });


    /* ======================================================
       NAVBAR SCROLL
    ====================================================== */

    const navbar = document.querySelector(".navbar");

    if (navbar) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 40) {

                navbar.style.background = "rgba(7,17,31,.95)";
                navbar.style.boxShadow =
                    "0 15px 40px rgba(0,0,0,.25)";

            } else {

                navbar.style.background = "rgba(7,17,31,.72)";
                navbar.style.boxShadow = "none";

            }

        });

    }


    /* ======================================================
       COUNTER ANIMATION
    ====================================================== */

    const stats = document.querySelectorAll(".stat h2");

    stats.forEach(stat => {

        const txt = stat.innerText;
        const value = parseInt(txt);

        if (isNaN(value)) return;

        let current = 0;

        const step = Math.max(
            1,
            Math.ceil(value / 70)
        );

        const timer = setInterval(() => {

            current += step;

            if (current >= value) {

                current = value;

                clearInterval(timer);

            }

            stat.innerText = current;

        }, 20);

    });


    /* ======================================================
       SMOOTH ANCHOR SCROLL
    ====================================================== */

    document.querySelectorAll("a[href^='#']").forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(
                this.getAttribute("href")
            );

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        });

    });


    /* ======================================================
       SMARTPHONE - UHRZEIT
    ====================================================== */

    function updatePhoneTime() {

        const phoneTime = document.getElementById("phoneTime");

        if (!phoneTime) return;

        const now = new Date();

        const hours = String(
            now.getHours()
        ).padStart(2, "0");

        const minutes = String(
            now.getMinutes()
        ).padStart(2, "0");

        phoneTime.textContent =
            `${hours}:${minutes}`;

    }

    updatePhoneTime();

    setInterval(updatePhoneTime, 1000);


    /* ======================================================
       SMARTPHONE - DEMO ALARM
       
       Standardmäßig:
       NEUTRAL
       
       Nach 5 Sekunden:
       ALARM
       
       Danach kann wieder zurückgeschaltet werden.
    ====================================================== */

    const neutralView =
        document.getElementById("neutralView");

    const alarmView =
        document.getElementById("alarmView");

    if (neutralView && alarmView) {

        window.showBlueliAlarm = function () {

            neutralView.style.display = "none";
            alarmView.style.display = "block";

        };

        window.showBlueliNeutral = function () {

            alarmView.style.display = "none";
            neutralView.style.display = "flex";

        };

    }


    /* ======================================================
       SMARTPHONE - ALARM COUNTDOWN
    ====================================================== */

    function startAlarmCountdown(element, seconds) {

        if (!element) return;

        let remaining = seconds;

        element.textContent =
            `Alarm endet in ${remaining} s`;

        const timer = setInterval(() => {

            remaining--;

            if (remaining <= 0) {

                element.textContent =
                    "Alarm beendet";

                clearInterval(timer);

                return;

            }

            element.textContent =
                `Alarm endet in ${remaining} s`;

        }, 1000);

    }

    const countdowns =
        document.querySelectorAll(".alarm-countdown");

    countdowns.forEach((element, index) => {

        const seconds =
            index === 0 ? 9 : 17;

        startAlarmCountdown(
            element,
            seconds
        );

    });


    /* ======================================================
       BUTTON RIPPLE
    ====================================================== */

    document.querySelectorAll(".button").forEach(button => {

        button.addEventListener("click", function (e) {

            const circle =
                document.createElement("span");

            const d = Math.max(
                this.clientWidth,
                this.clientHeight
            );

            circle.style.width = d + "px";
            circle.style.height = d + "px";

            circle.style.left =
                e.offsetX - d / 2 + "px";

            circle.style.top =
                e.offsetY - d / 2 + "px";

            circle.classList.add("ripple");

            this.appendChild(circle);

            setTimeout(() => {
                circle.remove();
            }, 600);

        });

    });


    /* ======================================================
       KONTAKTFORMULAR
    ====================================================== */

    const form =
        document.getElementById("contactForm");

    if (form) {

        form.addEventListener(
            "submit",
            async function (e) {

                e.preventDefault();

                const result =
                    document.getElementById("result");

                const button =
                    form.querySelector("button");

                const buttonText =
                    document.getElementById("buttonText");

                const loading =
                    document.getElementById("loading");

                if (button) {
                    button.disabled = true;
                }

                if (buttonText) {
                    buttonText.style.display = "none";
                }

                if (loading) {
                    loading.style.display = "inline";
                }

                try {

                    const data =
                        new FormData(form);

                    const response =
                        await fetch(
                            "https://api.web3forms.com/submit",
                            {
                                method: "POST",
                                body: data
                            }
                        );

                    const json =
                        await response.json();

                    if (loading) {
                        loading.style.display = "none";
                    }

                    if (buttonText) {
                        buttonText.style.display = "inline";
                    }

                    if (button) {
                        button.disabled = false;
                    }

                    if (json.success) {

                        if (result) {

                            result.className = "success";

                            result.innerHTML =
                                "✅ Vielen Dank! Ihre Nachricht wurde erfolgreich versendet.";

                        }

                        form.reset();

                    } else {

                        if (result) {

                            result.className = "error";

                            result.innerHTML =
                                "❌ Nachricht konnte nicht versendet werden. Bitte versuchen Sie es später erneut.";

                        }

                    }

                } catch (error) {

                    if (loading) {
                        loading.style.display = "none";
                    }

                    if (buttonText) {
                        buttonText.style.display = "inline";
                    }

                    if (button) {
                        button.disabled = false;
                    }

                    if (result) {

                        result.className = "error";

                        result.innerHTML =
                            "❌ Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.";

                    }

                    console.error(
                        "Kontaktformular Fehler:",
                        error
                    );

                }

            }
        );

    }

});


/* ==========================================================
   PARALLAX BACKGROUND
========================================================== */

window.addEventListener("mousemove", e => {

    const glow =
        document.querySelector(".background-glow");

    if (!glow) return;

    const x =
        e.clientX / window.innerWidth - 0.5;

    const y =
        e.clientY / window.innerHeight - 0.5;

    glow.style.transform =
        `translate(${x * 40}px,${y * 40}px)`;

});


/* ==========================================================
   HERO PHONE FLOAT
========================================================== */

let direction = 1;
let offset = 0;

function floatPhone() {

    const phone =
        document.querySelector(".hero .phone");

    if (phone) {

        offset += 0.15 * direction;

        phone.style.transform =
            `translateY(${offset}px)`;

        if (offset > 12) {
            direction = -1;
        }

        if (offset < -12) {
            direction = 1;
        }

    }

    requestAnimationFrame(floatPhone);

}

floatPhone();
/* ==========================================================
   BLUELI SMARTPHONE – NORMAL / ALARM
   ========================================================== */

function setPhoneMode(mode) {

    const neutralView =
        document.getElementById("neutralView");

    const alarmView =
        document.getElementById("alarmView");

    const normalButton =
        document.getElementById("normalModeButton");

    const alarmButton =
        document.getElementById("alarmModeButton");


    if (!neutralView || !alarmView) {
        return;
    }


    if (mode === "normal") {

        /* Normal anzeigen */

        neutralView.style.display = "flex";

        alarmView.style.display = "none";


        /* Buttons */

        normalButton.classList.add("active");

        alarmButton.classList.remove("active");

    }


    if (mode === "alarm") {

        /* Alarm anzeigen */

        neutralView.style.display = "none";

        alarmView.style.display = "block";


        /* Buttons */

        normalButton.classList.remove("active");

        alarmButton.classList.add("active");

    }

}
function setPhoneMode(mode) {

    const phone = document.querySelector('.hero-right');

    const normalButton = document.getElementById('normalModeButton');
    const alarmButton = document.getElementById('alarmModeButton');

    if (!phone) return;

    if (mode === 'alarm') {

        phone.classList.remove('phone-normal');
        phone.classList.add('phone-alarm');

        normalButton.classList.remove('active');
        alarmButton.classList.add('active');

    } else {

        phone.classList.remove('phone-alarm');
        phone.classList.add('phone-normal');

        alarmButton.classList.remove('active');
        normalButton.classList.add('active');
    }
}
document.addEventListener('DOMContentLoaded', function () {
    setPhoneMode('normal');
});
