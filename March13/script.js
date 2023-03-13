const button = document.getElementById("idButton");
const text=document.getElementById("idText");
const heading = document.getElementById("idHeading");
const list = document.getElementById("idList");
const listItems = document.getElementsByTagName("li");

button.addEventListener("click",()=>{
    let inputText = text.value;
    button.style.color=inputText;
});

for (let x=0;x<listItems.length;x++){
    listItems[x].style.color="orange";
}

const classList = document.getElementsByClassName("clsListItem");
for (let x=0;x<classList.length;x++){
    classList[x].style.color="red";
}
