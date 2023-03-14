const submitButton = document.getElementById('submitButton');
const input = document.getElementById('todoInput');
const list=document.getElementById('list');
const remove = document.getElementById('removeButton');
const surprise = document.getElementById('surprise');
const heading = document.getElementById('heading');
const allListItems=document.querySelectorAll('li');
const closeButton = document.getElementById("closeButton");
const openButton = document.getElementById("openButton");


closeButton.addEventListener('click', ()=>{
    closeButton.parentNode.style.display="none";
});

openButton.addEventListener('click', ()=>{
    openButton.previousElementSibling.style.display='block';
})
list.addEventListener('mouseover', (event) =>{
    event.target.textContent = event.target.textContent.toUpperCase();
    // event.target.style.textTransform = "uppercase";
});
list.addEventListener('mouseout', (event) =>{
    event.target.textContent = event.target.textContent.toLowerCase();
});

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