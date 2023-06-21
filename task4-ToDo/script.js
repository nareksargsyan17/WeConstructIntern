const newTask = document.querySelector(".new-task");
const form = document.querySelector('form');
const addInput =  document.querySelector(".add-input");
const addButton = document.querySelector('.add-button');
const todoList = document.querySelector('ul');

function todoRow(text) {
    let li = document.createElement("li");
    li.innerHTML = `<label class="container">
                    <input type="checkbox">
                    <span class="checkmark"></span>
                </label>
                <p class="todo-text">${text}</p>
                <button class="trash del"><img src="img/trash.png" alt="trash"></button>`
    return li;
}

newTask.addEventListener("click", (evt => {
    evt.preventDefault();
    addButton.parentElement.style.display = "flex";
    newTask.style.display = "none";
    setTimeout(()=>{
        addInput.style.cssText =  `
        visibility: visible;
        width: 100%;
        padding: 8px;
        border: 0.5px solid $main-color;
    `;
        addButton.style.cssText  = `
        width: auto;
        visibility: visible;
    `
    },0);
}))

form.addEventListener('submit', (evt => {
    evt.preventDefault();
    if(addInput.value.trim()){
        todoList.append(todoRow(addInput.value.trim()));
    }
    evt.target.reset();
}))

const trashAll = document.querySelector(".trash-all")
let checkedCount = 0;
todoList.addEventListener('click', (evt => {
    if(evt.target.type === "checkbox"){
        if(evt.target.checked) {
            evt.target.parentElement.nextElementSibling.style.color = "#ae81e7"
            checkedCount++;
        }else {
            evt.target.parentElement.nextElementSibling.style.color = "rgba(100, 100, 100, 0.77)";
            checkedCount--;
        }
        console.log(checkedCount)
        if(checkedCount >= 3){
            trashAll.style.visibility = "visible";
        }else{
            trashAll.style.visibility = "hidden";
        }
    }

    if (evt.target.nodeName === "BUTTON") {
        evt.target.parentElement.remove();
    }else if(evt.target.nodeName === "IMG"){
        evt.target.parentElement.parentElement.remove();
    }
}))

trashAll.addEventListener("click", ()=>{
    const checkBoxes = document.querySelectorAll("input[type='checkbox']")
    checkBoxes.forEach((el) =>{
        if(el.checked){
            checkedCount--;
            el.parentElement.parentElement.remove();
        }
    })
    trashAll.style.visibility = "hidden";
})
