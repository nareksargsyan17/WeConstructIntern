const left = document.querySelector(".left");
const right = document.querySelector(".right");
const autoSlide = document.querySelector(".auto");
const noTouch = document.querySelector(".arrow");
const arrowBtns = document.querySelectorAll(".browse-btn");
let activeIndex;
let slides;
function startSlide(way = "left") {
    slides = document.querySelectorAll(".carousel-item");
    slides.forEach((el, i) => {
        if (el.classList.contains("active")) {
            activeIndex = i;
        }
    })
    if (way === "right") {
        if (activeIndex === slides.length - 1) {
            activeIndex = 0;
            slides[activeIndex].classList.toggle("active");
            slides[slides.length - 1].classList.toggle("active");
        } else {
            slides[activeIndex+1].classList.toggle("active");
            slides[activeIndex].classList.toggle("active");
        }
    } else {
        if (activeIndex === 0) {
            activeIndex = slides.length - 1;
            slides[0].classList.toggle("active");
            slides[activeIndex].classList.toggle("active");
        } else {
            slides[activeIndex-1].classList.toggle("active");
            slides[activeIndex].classList.toggle("active");
        }
    }
}

let interval;
autoSlide.addEventListener("click", () => {
    if (autoSlide.classList.contains("active-conf")) {
        autoSlide.classList.toggle("active-conf");
        clearInterval(interval);
    } else {
        autoSlide.classList.toggle("active-conf");
        interval = setInterval(() => {
            startSlide();
        }, 2000)
    }
})
noTouch.addEventListener("click", () => {
    if (noTouch.classList.contains("active-conf")) {
        noTouch.classList.toggle("active-conf");
        arrowBtns.forEach((btn) => {
            btn.style.opacity = "1";
        })
    } else {
        noTouch.classList.toggle("active-conf");
        arrowBtns.forEach((btn) => {
            btn.style.opacity = "0";
        })
    }

})
left.addEventListener("click", () => {
    startSlide("left");
})
right.addEventListener("click", () => {
    startSlide("right");
})