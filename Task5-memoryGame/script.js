const cardBox = document.getElementById("cards-box");
const modalElems = document.querySelectorAll("#start-modal > div");
const startBtn = document.querySelector("#start-modal > .start-btn");
const startAgainBtn = document.querySelector("#win-modal > .start-btn");
const winModal = document.getElementById("win-modal");
const anim = document.querySelector(".anim");
const confText = document.getElementById("conf-text");

let cards = [
    {
        id : "KA",
        type : "A",
        src : "img/ka.png"
    },
    {
        id : "SA",
        type : "A",
        src : "img/sa.png"
    },
    {
        id : "K2",
        type : "2",
        src : "img/k2.png"
    },
    {
        id : "S2",
        type : "2",
        src : "img/s2.png"
    },
    {
        id : "K3",
        type : "3",
        src : "img/k3.png"
    },
    {
        id : "S3",
        type : "3",
        src : "img/s3.png"
    },
    {
        id : "K4",
        type : "4",
        src : "img/k4.png"
    },
    {
        id : "S4",
        type : "4",
        src : "img/s4.png"
    },
    {
        id : "K5",
        type : "5",
        src : "img/k5.png"
    },
    {
        id : "S5",
        type : "5",
        src : "img/s5.png"
    },
    {
        id : "K6",
        type : "6",
        src : "img/k6.png"
    },
    {
        id : "S6",
        type : "6",
        src : "img/s6.png"
    },
    {
        id : "K7",
        type : "7",
        src : "img/k7.png"
    },
    {
        id : "S7",
        type : "7",
        src : "img/s7.png"
    },
    {
        id : "K8",
        type : "8",
        src : "img/k8.png"
    },
    {
        id : "S8",
        type : "8",
        src : "img/s8.png"
    },
    {
        id : "K9",
        type : "9",
        src : "img/k9.png"
    },
    {
        id : "S9",
        type : "9",
        src : "img/s9.png"
    },
    {
        id : "K10",
        type : "10",
        src : "img/k10.png"
    },
    {
        id : "S10",
        type : "10",
        src : "img/s10.png"
    },
    {
        id : "Kj",
        type : "j",
        src : "img/kj.png"
    },
    {
        id: "Sj",
        type: "j",
        src: "img/sj.png"
    },
    {
        id : "Kq",
        type : "q",
        src : "img/kq.png"
    },
    {
        id : "Sq",
        type : "q",
        src : "img/sq.png"
    },
    {
        id : "Kk",
        type : "k",
        src : "img/kk.png"
    },
    {
        id : "Sk",
        type : "k",
        src : "img/sk.png"
    }
];
let cardsCopy = [...cards];
let configElem;

modalElems.forEach((elem) => {
    elem.addEventListener("click", () => {
        modalElems.forEach((el) => {
            el.classList.remove("checked-div");
        });
        elem.classList.toggle("checked-div");
        if (elem.className === "checked-div") {
            configElem = elem;
        }
    });
});

function configMessage(msg) {
    confText.textContent = msg;
    confText.style.visibility = "visible";

    setTimeout(() => {
        confText.style.visibility = "hidden";
    }, 800);
}

startBtn.addEventListener("click", () => {
    if (configElem?.getAttribute("data-x") && configElem?.getAttribute("data-y")) {
        let x = parseInt(configElem.getAttribute("data-x"));
        let y = parseInt(configElem.getAttribute("data-y"));
        startBtn.parentElement.remove();
        randomCards(x, y);
    } else {
        configMessage("Please select any option of this list");
    }
});

startAgainBtn.addEventListener("click", () => {
    window.location.reload();
})

function randomId(length) {
    return cardsCopy[Math.floor(Math.random() * length)];
}

function randomCards(x, y) {
    cardsCopy = cardsCopy.splice(0, x * y);
    for(let i = 0; i < y; i++){
        const row = document.createElement("div");
        row.className = "cards-row";
        for(let j = 0; j < x; j++){
            const elem = document.createElement("div");
            const card = randomId(cardsCopy.length);
            elem.setAttribute("data-type", card.type);
            elem.id = card.id;
            cardsCopy.splice(cardsCopy.findIndex((el) => el.id === elem.id),1);
            row.append(elem);
        }
        cardBox.append(row);
    }
    gameStart();
}

function creatingMoney() {
    for (let i = 0; i <= 1000; i++) {
        let img = document.createElement("img");
        img.src = "img/money.png";
        img.className = "money";
        img.style.left = `${i * Math.random() * 100}px`;
        img.style.top = `-${i * Math.random() * 20 + 40}px`;
        img.style.animationName = "money";
        anim.append(img);
    }
}

function gameStart() {
    const cardImages = document.querySelectorAll('#cards-box > .cards-row > div');
    let clickedCount = 0;
    let prevElem = "";
    let openCardsCount = 0;

    cardImages.forEach((el) => {
        el.addEventListener("click", () => {
            let currentElem;
            new Promise((res, rej) => {
                if (clickedCount < 2) {
                    currentElem = cards.find((element) => element.id === el.id);
                    if (currentElem && (prevElem?.id !== currentElem.id)) {
                        clickedCount++;
                        const animation = [
                            { transform: "rotateY(-180deg)", backgroundImage: `url(img/black.png)` },
                            { backgroundImage: `url(${currentElem.src})` },
                            { transform: "rotateY(0deg)", backgroundImage: `url(${currentElem.src})` }
                        ];
                        const animTiming = {
                            duration: 800,
                            iterations: 1,
                        };
                        el.animate(animation, animTiming);
                        el.style.backgroundImage = `url(${currentElem.src})`;
                        if (!prevElem) {
                            prevElem = {...currentElem};
                        }
                    } else {
                        configMessage("You can not open this card!!!!");
                    }

                    res(true);
                } else {
                    configMessage("You can open only two cards!!!!");
                    rej("You can open only two cards!!!!");
                }
            }).then(() => {
                if (clickedCount === 2) {
                    if (prevElem?.id === el.id) {
                        return true;
                    } else if (prevElem?.type === currentElem?.type) {
                        setTimeout(() => {
                            clickedCount = 0;
                            openCardsCount++;
                            cards.splice(cards.findIndex((el) => el.id === currentElem.id), 1);
                            cards.splice(cards.findIndex((el) => el.id === prevElem.id), 1);
                            prevElem = "";
                            if (openCardsCount === cardImages.length / 2) {
                                creatingMoney();
                                winModal.style.display =  "flex";
                                cardBox.style.display = "none";
                            }

                            return true;
                        },1000);

                    } else {
                        setTimeout(() => {
                            let animation = [
                                { transform: "rotateY(0deg)"},
                                { backgroundImage: `url(${currentElem.src})`},
                                { transform: "rotateY(-180deg)"}
                            ];
                            const animTiming = {
                                duration: 300,
                                iterations: 1,
                            };
                            el.animate(animation, animTiming);
                            el.style.backgroundImage= `url(img/black.png)`;
                            animation[1] = { backgroundImage: `url(${prevElem.src})`};
                            cardImages.forEach((elem) => {
                                if (elem.id === prevElem.id) {
                                    elem.animate(animation, animTiming);
                                    elem.style.backgroundImage= `url(img/black.png)`;
                                    clickedCount = 0;
                                    prevElem = "";
                                }

                                return true;
                            })
                        }, 1500)
                    }
                }
            })
        })
    })
}
