const code= document.getElementById("idCode");
const key = document.getElementById("idKey");
const which = document.getElementById("idWhich");

document.addEventListener("keypress", (event)=>{
        code.innerText = "Code:" + event.code;
        key.innerText = "Key:" + event.key;
        which.innerText = "Which:" + event.which;
});