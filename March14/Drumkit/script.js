for (const div of document.getElementsByClassName("clsInstrument")){
    div.addEventListener('click', ()=>{
        play(div.lastElementChild.id);
    })
 };
document.addEventListener('keypress', (event)=>{
    try{play(event.key.toLowerCase());}catch(e){};//fail silently on undesirable keypress please
});
function play(id){
    let picdiv = document.getElementsByClassName(id);//returns a collection but we know there is only one element, 
    picdiv[0].style.display='block';//so use index [0]
    document.getElementById(id).play();
    setTimeout(() => {
        picdiv[0].style.display='none';
    }, 1200);
};