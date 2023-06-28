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


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async  function(position) {
        const latitude = position.coords.latitude.toFixed(4);
        const longitude = position.coords.longitude.toFixed(4);
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

       await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=436fe5cd8348b41771c808ecc16b25e9`)
           .then(async data => {
               console.log(await data.json())
           })
        await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=gyumri&appid=436fe5cd8348b41771c808ecc16b25e9`)
            .then(async data => {
                console.log(await data.json())
            })
    });
} else {
    console.log("Geolocation is not supported by this browser.");
}
