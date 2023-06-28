const callBtns = document.querySelectorAll(".call");
const floors = document.querySelectorAll(".elevator");
const leftDoors = document.querySelectorAll(".left-door");
const rightDoors = document.querySelectorAll(".right-door");
const floorBtns = document.querySelectorAll(".floor-button")
let floorsStack = [];
let newStack = [];
let status = "wait";
let floor = 1;
let interval;
let way = "up";

function fromTo () {
    if (way === "up") {
        floorsStack = floorsStack.sort((a, b) => a - b);
    } else {
        floorsStack = floorsStack.sort((a, b) => b - a);
    }
    floors.forEach((el) => {
        if (el.classList.contains("elevator-floor")) {
            interval = setInterval(() => {
                floors[floors.length - floor].classList.toggle("elevator-floor");
                if (floor === floorsStack[0]) {
                    if (callBtns[floors.length - floor].classList.contains("change-color")) {
                        callBtns[floors.length - floor].classList.toggle("change-color");
                    }
                    if (floorBtns[floors.length - floor].classList.contains("change-color")) {
                        floorBtns[floors.length - floor].classList.toggle("change-color");
                    }
                    floorsStack.splice(0, 1);
                    setTimeout(() => {
                        leftDoors[floors.length - floor].classList.toggle("open-door");
                        rightDoors[floors.length - floor].classList.toggle("open-door");
                        clearInterval(interval);
                    }, 200);
                    setTimeout(() => {
                        leftDoors[floors.length - floor].classList.toggle("open-door");
                        rightDoors[floors.length - floor].classList.toggle("open-door");
                        if (floorsStack.length > 0) {
                            status = "ready";
                            clearInterval(interval);
                            fromTo();
                            // if (status === "wait") {
                            // } else {
                            //     status = "going";
                            //     clearInterval(interval);
                            //     fromTo();
                            // }
                        } else {
                            if (status === "wait") {
                                status = "ready";
                            } else if (status === "ready") {
                                status = "going";
                            } else {
                                if (newStack.length > 0) {
                                    floorsStack = [...newStack];
                                    newStack = [];
                                    if (way === "up") {
                                        way = "down";
                                    } else {
                                        way = "up";
                                    }
                                    // TODO: check
                                    status = "going";
                                    console.log(way)
                                    clearInterval(interval);
                                    fromTo();
                                } else {
                                    status = "wait";
                                }
                            }
                        }
                    }, 3200);
                } else if (way === "up") {
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
        btn.classList.toggle("change-color");
        let thisFloor = parseInt(btn.parentElement.getAttribute("data-floor"));
        if (way === "up" && thisFloor >= floor || way === "down" && thisFloor <= floor) {
            checkingFloor(thisFloor, floorsStack);
        } else {
            checkingFloor(thisFloor, newStack);
        }
        if(status === "wait"){
            clearInterval(interval);
            fromTo();
        } else {
            clearInterval(interval);
            fromTo();
        }
    })
})

floorBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (status === "ready") {
            btn.classList.toggle("change-color");
            status = "going";
            let thisFloor = parseInt(btn.textContent);
            checkingFloor(thisFloor, floorsStack);
            if (thisFloor < floor) {
                way = "down";
            } else {
                way = "up";
            }
            clearInterval(interval);
            fromTo();
        } else if(status === "going") {
            btn.classList.toggle("change-color");
            let thisFloor = parseInt(btn.textContent);
            if(way === "up" && thisFloor >= floor || way === "down" && thisFloor <= floor) {
                checkingFloor(thisFloor, floorsStack);
            } else {
                checkingFloor(thisFloor, newStack);
            }
            clearInterval(interval);
            fromTo();
        }
    })
})

function checkingFloor (floor, arr) {
    if (arr.filter((el) => el === floor).length === 0) {
        arr.push(floor);
    }
}