    document.getElementById("idButton").addEventListener('click', ()=>{
        let root = document.querySelector(':root');
        console.log(root);
        root.style.setProperty('--desiredRotation', 'rotate3d(1,0, 0, -90deg)');
        console.log(getComputedStyle(root).getPropertyValue('--desiredRotation'));
        document.getElementById("idPlayer1Die").classList.remove('clsAnimation');
        //document.getElementById("idPlayer1Die").classList.add('clsDieReveal');
        document.getElementById("idPlayer1Die").style.animation="diceReveal 1s";
        document.getElementById("idPlayer1Die").style.transform="rotate3d(1,0, 0, -90deg)";
});
let booSingle = false;//game type single-player or not
let booPlaying=false;
let GameTypeButton = document.getElementById('idGameTypeButton');
setGameType();

GameTypeButton.addEventListener('click', ()=>{
    if (booPlaying) return;
    if(booSingle){
        GameTypeButton.style.left='16em';
        booSingle=false;
        setGameType();

    }else{
        GameTypeButton.style.left='-1em';
        booSingle=true;
        setGameType();
    }
});
function setGameType(){    
    let GameTypeChosen= document.getElementsByClassName('clsGameType');
    if (booSingle){
        document.getElementById("idPlayer2").style.display='none';
        GameTypeChosen[1].style.color='#AA9200';
        GameTypeChosen[0].style.color='#FFd700';
    }else{
        document.getElementById("idPlayer2").style.display='flex';
        GameTypeChosen[0].style.color='#AA9200';
        GameTypeChosen[1].style.color='#FFd700';
    }
}
el=document.getElementById("idTargetValue");
el.value=77;
console.log(el.value);