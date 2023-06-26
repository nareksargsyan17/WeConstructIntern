const left = document.querySelector(".left");
const right = document.querySelector(".right");
const slideBox = document.querySelector("#carousel-box");
const autoSlide = document.querySelector(".auto");
let activeIndex;
let slides;
function leftSlide() {
    slides = document.querySelectorAll(".carousel-item");
    slides.forEach((el, i) => {
        if (el.classList.contains("active")) {
            activeIndex = i;
        }
    })
    if (activeIndex === 0) {
        slideBox.prepend(slides[slides.length - 1]);
        slides[slides.length - 1].style.marginLeft = `-100%`;
        slides[slides.length - 1].classList.add("active");
        slides[0].style.marginLeft = `0%`;

        setTimeout(() => {
            slides[slides.length - 1].style.marginLeft = "0"
            slides[0].style.marginLeft = `100%`;
            slides[0].classList.remove("active");


        },100)
        slides[0].style.marginLeft = `0`;

    } else {
        slides[activeIndex - 1].style.marginLeft = `-10%`;
        slides[activeIndex-1].classList.add("active");
        slides[activeIndex].style.marginLeft = `0%`;

        setTimeout(() => {
            slides[activeIndex - 1].style.marginLeft = "0"
            slides[activeIndex].style.marginLeft = `100%`;
        },100)
        slides[activeIndex].classList.remove("active");
        setTimeout(() => {
        }, 4005)
        slides[activeIndex].style.marginLeft = `0`;

    }
}

let interval;
autoSlide.addEventListener("click", () => {
    if (autoSlide.classList.contains("active-auto")) {
        autoSlide.classList.toggle("active-auto");
        clearInterval(interval);
    } else {
        autoSlide.classList.toggle("active-auto");
        interval = setInterval(() => {
            leftSlide()
        }, 2000)
    }

})
left.addEventListener("click", () => {
    setTimeout(() => {
        leftSlide();
    }, 100)
})
right.addEventListener("click", () => {
    slides = document.querySelectorAll(".carousel-item");
    slides.forEach((el, i) => {
        if (el.classList.contains("active")) {
            activeIndex = i;
        }
    })
    if (activeIndex === slides.length - 1) {
        slideBox.append(slides[0]);
        slides[slides.length - 1].classList.toggle("active");
        slides[0].classList.toggle("active");
    } else {
        slides[activeIndex+1].classList.toggle("active");
        slides[activeIndex].classList.toggle("active");
    }
})