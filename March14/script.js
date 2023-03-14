const submitButton = document.getElementById('submitButton');
const input = document.getElementById('todoInput');
const list=document.getElementById('list');
const remove = document.getElementById('removeButton');
const surprise = document.getElementById('surprise');
const heading = document.getElementById('heading');
const allListItems=document.querySelectorAll('li');


console.log(list);

submitButton.addEventListener('click', ()=>{
    const listItem = document.createElement("li");
    listItem.textContent = input.value;
    input.value = "";
    list.appendChild(listItem);
});
remove.addEventListener('click', ()=>{
    const lastItem = document.querySelector("li:last-child");
    list.removeChild(lastItem);
});
surprise.addEventListener('click', ()=>{
    heading.textContent="Surprise!";
    setTimeout(() => {
        heading.textContent="";
    }, 15000);
});

allListItems.forEach((listItem) => {
    listItem.addEventListener('click', (event) =>{
        list.removeChild(event.target);
    });
});