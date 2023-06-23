const modalElems = document.querySelectorAll("#start-box > div");
const startBtn = document.querySelector(".start-btn");
const number = document.querySelector(".number");
const confText = document.querySelector("#conf-text");
const answerBox = document.querySelector("#answer-box");
const answerInput = document.querySelector("#answer-box > input");
const answerBtn = document.querySelector("#answer-box > button");
const resText = document.querySelector("#result-text");
const startAgain = document.querySelector("#start-again");

//get Random Number
function getRandomNumber(start, end) {
    return Math.floor((Math.random() * (end - start)) + start);
}

//selecting game level
let configElem;
modalElems.forEach((elem) => {
    elem.addEventListener("click", () => {
        if (elem.getAttribute("data-active")) {
            elem.style.boxShadow = "none";
            elem.style.backgroundColor = "rgba(39, 28, 24, 0.93)";
            elem.style.color = "white";
            elem.removeAttribute("data-active");
        } else {
            modalElems.forEach((el) => {
                if (el.getAttribute("data-active")) {
                    el.style.boxShadow = "none";
                    el.style.backgroundColor = "rgba(39, 28, 24, 0.93)";
                    el.style.color = "white";
                    el.removeAttribute("data-active");
                }
            })
            elem.style.boxShadow = "0 3px 15px 0 rgba(39, 28, 24, 0.93)";
            elem.style.backgroundColor = "white";
            elem.style.color = "rgba(39, 28, 24, 0.93)";
            elem.setAttribute("data-active", "true");
            configElem = elem;
        }
    })
})

//messagging warning message
function configMessage(msg) {
    confText.textContent = msg
    confText.style.visibility = "visible";
    setTimeout(() => {
        confText.style.visibility = "hidden";
    }, 800)
}


//getting result numbers object
function getNumResult(atr) {
    let result = {
        numberArr : [],
        sum : 0
    }
    if (configElem.getAttribute("data-level") === "easy") {
        for(let i = 0; i < 5; i++){
            let randomNum = getRandomNumber(1, 10);
            result.numberArr.push(randomNum);
            result.sum += randomNum;
        }
    } else if (configElem.getAttribute("data-level") === "middle") {
        for (let i = 0; i < 3; i++) {
            let randomNum = getRandomNumber(1, 10);
            result.numberArr.push(randomNum);
            result.sum += randomNum;
        }
        for (let i = 0; i < 2; i++) {
            let randomNum = getRandomNumber(11, 100);
            result.numberArr.push(randomNum);
            result.sum += randomNum;
        }
    } else if (configElem.getAttribute("data-level") === "hard") {
        for (let i = 0; i < 5; i++) {
            let randomNum = getRandomNumber(11, 100);
            result.numberArr.push(randomNum);
            result.sum += randomNum;
        }
    }

    return result;
}


//start button
startBtn.addEventListener("click", () => {
    if (configElem?.getAttribute("data-level")) {
        startBtn.parentElement.style.display = "none";
        number.parentElement.style.display = "flex";
        const numAnim = [
            {opacity : "0"},
            {opacity: "100%"}
        ]
        const numAnimTiming = {
            duration : 200,
            iterations : 1
        }
        let numObj = getNumResult(configElem.getAttribute("data-level"));
        let index = 0;
        let interval = setInterval(() => {
            number.textContent = numObj.numberArr[index];
            number.animate(numAnim, numAnimTiming);
            index++;
            if (index === 6) {
                clearInterval(interval);
                number.parentElement.style.display = "none";
                answerBox.style.display = "flex";
                answerChecking(numObj.sum)
            }
        }, parseInt(configElem.getAttribute("data-speed")))

    } else {
        configMessage("Please select any level, which you like!");
    }
})


//checking answer (true/false)
function answerChecking(sum) {
    console.log(sum)
    answerBtn.addEventListener("click", () => {
        if (parseInt(answerInput.value) === sum) {
            answerBox.style.display = "none";
            resText.style.display = "block";
            startAgain.style.display = "block";
            resText.textContent = "Congratulations. You Win!";
        } else {
            answerBox.style.display = "none";
            resText.style.display = "block";
            startAgain.style.display = "block";
            resText.textContent = "Oooppss. You Lost!";
        }
    })
}

//start again (reload the page)
startAgain.addEventListener("click", () => {
    window.location.reload();
})