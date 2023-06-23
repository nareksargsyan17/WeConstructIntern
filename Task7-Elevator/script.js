const callBtns = document.querySelectorAll(".call");
const floors = document.querySelectorAll(".elevator");
const leftDoors = document.querySelectorAll(".left-door");
const rightDoors = document.querySelectorAll(".right-door");
const floorBtns = document.querySelectorAll(".floor-button")


const floorsStack = [];
let status = "wait";
let floor = 1;

function fromTo (btn, to, stat) {
    floorsStack[1] = to;
    floors.forEach((el) => {
        if (el.classList.contains("elevator-floor")) {
            let interval = setInterval(() => {
                floors[floors.length - floor].classList.toggle("elevator-floor");
                if (floor === floorsStack[1]) {
                    setTimeout(() => {
                        leftDoors[floors.length - floor].classList.toggle("open-door");
                        rightDoors[floors.length - floor].classList.toggle("open-door");
                        clearInterval(interval);
                    }, 200);
                    setTimeout(() => {
                        btn.style.backgroundColor = "#777777";
                        leftDoors[floors.length - floor].classList.toggle("open-door");
                        rightDoors[floors.length - floor].classList.toggle("open-door");
                        status = stat;
                    }, 3200);
                } else if (floor <= floorsStack[1]) {
                    floor++;
                } else {
                    floor--;
                }
                floors[floors.length - floor].classList.toggle("elevator-floor");
            }, 2000);
        }
    })
}
callBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if(status === "wait"){
            status = "going";
            btn.style.backgroundColor = "#f38b8b";
            let thisFloor = parseInt(btn.parentElement.getAttribute("data-floor"));
            fromTo(btn, thisFloor, "ready");
            clearInterval(interval);
        } else if (status === "going") {
            let thisFloor = parseInt(btn.parentElement.getAttribute("data-floor"));
            if(floor <= floorsStack[1] && ((thisFloor <= floorsStack[1]) && (thisFloor >= floor))) {
                fromTo(btn, thisFloor, "ready");
                clearInterval(interval);
            }
        }
    })
})

floorBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (status === "ready") {
            status = "going";
            btn.style.backgroundColor = "#f38b8b";
            fromTo(btn, parseInt(btn.textContent), "wait");
            clearInterval(interval);
        }
    })
})