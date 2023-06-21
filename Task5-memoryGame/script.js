const section = document.querySelector('section')
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
        id : "Kd",
        type : "d",
        src : "img/kd.png"
    },
    {
        id : "Sd",
        type : "d",
        src : "img/sd.png"
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
]

let cardsCopy = [...cards]

function randomId(length) {
    return cardsCopy[Math.floor(Math.random() * length)]
}

function randomCards(x, y){
    cardsCopy = cardsCopy.splice(0, x*y)
    for(let i = 0; i < y; i++){
        const row = document.createElement('div')
        for(let j = 0; j < x; j++){
            const elem = document.createElement('img')
            const card = randomId(cardsCopy.length);
            elem.className = card.type;
            elem.id = card.id
            elem.src = "img/black.png";
            cardsCopy.splice(cardsCopy.findIndex((el) => el.id === elem.id),1);
            row.append(elem)
        }
        section.append(row)
    }
}

randomCards(5,4)

const cardImages = document.querySelectorAll('img')
let clickedCount = 0;
let prevElem = "";
cardImages.forEach((el) => {
    el.addEventListener('click', () => {
        let currentElem;
        new Promise((res) => {
            res(true)
        }).then(() => {
            if (clickedCount < 2) {
                clickedCount++;
                currentElem = cards.find((element) => element.id === el.id)
                el.src = currentElem.src;
                if (!prevElem && prevElem.id !== currentElem.id) {
                    prevElem = {...currentElem}
                }
            }
        }).then(() => {
            if (clickedCount === 2) {
                console.log(prevElem, currentElem)
                if(prevElem?.id === currentElem?.id){
                    return true
                }else if (prevElem?.type === currentElem?.type){
                    clickedCount = 0;
                    prevElem = ""
                    return true
                } else {
                    setTimeout(() => {
                        el.src = "img/black.png"
                        cardImages.forEach((elem) => {
                            if (elem.id === prevElem.id) {
                                elem.src = "img/black.png"
                                clickedCount = 0;
                                prevElem = ""
                            }
                            return true
                        })
                    }, 1000)

                }
            }
        })

    })
})

