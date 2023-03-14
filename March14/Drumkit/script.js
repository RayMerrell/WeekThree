const allDivs = document.querySelectorAll('div');
allDivs.forEach((div)=>{
    if (div.className==="clsInstrument"){
        div.addEventListener('click', ()=>{
            div.lastElementChild.play();
            animate(div.lastElementChild.id);
        })
    };
});
document.addEventListener('keypress', (event)=>{
    try{ //fail silently on unbound keypress please
        document.getElementById(event.key).play();
        animate(event.key);
    }catch(e){

    };
});
function animate(id){
    let picdiv = document.getElementsByClassName(id);
    picdiv[0].style.display='block';
    setTimeout(() => {
        picdiv[0].style.display='none';
    }, 1200);
};