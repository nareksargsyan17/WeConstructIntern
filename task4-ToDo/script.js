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


