let intGameType=1;//game type single-player or not
let booPlaying=false;
let intPlayer=0;
let GameTypeButton=document.getElementById('idGameTypeButton');
let StartButton=document.getElementById('idStartButton');
let intDieRoll=0;
let intTarget=0;
let arrScores=[0,0,0,0];
let arrDieRotations = ["(0, 1, 0, 90deg)", "(1, 0, 0, 90deg)", "(0, 0, 0, 0)", "(0,1, 0, 180deg)","(1,0, 0, -90deg)", "(0,1, 0, -90deg)"];
let arrRollButtons = document.querySelectorAll("#idRollButton");
let arrBankButtons = document.querySelectorAll("#idBankButton");

/*  1=(0, 1, 0, 90deg)
    2=(1, 0, 0, 90deg)
    3=(0, 0, 0, 0)
    4=(0,1, 0, 180deg)
    5=(1,0, 0, -90deg)
    6=(0,1, 0, -90deg)
    */
setGameType();
GameTypeButton.addEventListener('click', setGameType);

function setGameType(){
    if (booPlaying===false){
        let GameTypeChosen= document.getElementsByClassName('clsGameType');
        if (intGameType===2){//switch to single player
            document.getElementById("idPlayer1").style.display='none';
            GameTypeButton.style.left='-1em';
            GameTypeChosen[0].style.color='#FFd700';
            GameTypeChosen[1].style.color='#AA9200';
            intGameType=1;
        }else{//switch to 2 player game
            document.getElementById("idPlayer1").style.display='flex';
            GameTypeButton.style.left='16em';
            GameTypeChosen[0].style.color='#AA9200';
            GameTypeChosen[1].style.color='#FFd700';
            intGameType=2;
        };
    };
}
function setButtons(){
    let i = (intPlayer===0)?0:1;
    let ni= (intPlayer===0)?1:0;
    if (intGameType===2){
        arrRollButtons[i].classList.add("clsButton");
        arrRollButtons[i].classList.remove("clsUnselectable");
        arrRollButtons[i].disabled= false;
        arrBankButtons[i].classList.add("clsButton");
        arrBankButtons[i].classList.remove("clsUnselectable");
        arrBankButtons[i].disabled= false;
        arrRollButtons[i].style.display="inline";
        arrBankButtons[ni].disabled=true;
        arrRollButtons[ni].disabled=true;
        arrRollButtons[ni].classList.remove("clsButton");
        arrRollButtons[ni].classList.add("clsUnselectable");
        arrBankButtons[ni].classList.remove("clsButton");
        arrBankButtons[ni].classList.add("clsUnselectable");
    }else{
        arrRollButtons[i].classList.add("clsButton");
        arrRollButtons[i].classList.remove("clsUnselectable");
        arrRollButtons[i].disabled= false;
        arrBankButtons[i].classList.remove("clsButton");
        arrBankButtons[i].classList.add("clsUnselectable");
        arrBankButtons[i].style.display="none"
        arrBankButtons[ni].classList.remove("clsButton");
        arrBankButtons[ni].classList.add("clsUnselectable");
        arrBankButtons[ni].disabled= true;
    }
}
function unsetButtons(){
    for(const button of document.getElementsByClassName("clsPlayerButton")){
        button.classList.remove('clsButton');
        button.classList.add('clsUnselectable');
        button.disabled=true;
    }
}
function switchPlayer(){
    document.getElementsByClassName("clsDie")[intPlayer].style.visibility="hidden";
    intPlayer = (intPlayer===0)?1:0;
    setButtons();
}
function bankScore(){
    arrScores[intPlayer * 2] = arrScores[(intPlayer * 2)+1];//banked cash = total cash
    setScoreboards();
}

StartButton.addEventListener('click', ()=>{
    StartButton.style.display="none";
    intPlayer=0;
    arrScores=[0,0,0,0];
    setScoreboards();
    let StatusBox = document.getElementById("idStatusBox");
    StatusBox.style.display="block";
    if (intGameType===2){
        StatusBox.innerText = "Player one to go first";
    }else{
        StatusBox.innerText = "Press to roll the die";
    };
    booPlaying=true;
    setButtons();
    intTarget=document.getElementById("idTargetValue").value;
    document.getElementById("idTargetValue").style.display="none";
    document.getElementById("idTargetText").innerText="Your target for this game is " + intTarget;
    document.getElementById("idSubHeading").style.visibility="hidden";
    document.getElementById("idGameTypeButton").style.cursor = "inherit";
});
for(const button of document.querySelectorAll("#idRollButton")){
    button.addEventListener('click', ()=>{
        intDieRoll=Math.ceil(Math.random()*6);
        let root = document.querySelector(':root');
        root.style.setProperty('--desiredRotation', arrDieRotations[intDieRoll-1]);
        let Die = document.getElementById("idPlayer" + intPlayer + "Die");
        Die.classList.toggle('clsDieAnimation');
        document.getElementsByClassName("clsDie")[intPlayer].style.visibility="visible";
        Die.style.transform="rotate3d" + arrDieRotations[intDieRoll-1];
        unsetButtons();
        document.getElementById("idStatusBox").innerHTML="";
    })
}
for(const die of document.getElementsByClassName("clsDie")){
    die.addEventListener('animationend', ()=>{
        console.log("Animation End");
        die.classList.toggle('clsDieAnimation');
        die.style.transform="rotate3d" + arrDieRotations[intDieRoll-1];
        checkScores();
    });    
}
function setScoreboards(){
    if (intGameType===2){
        document.getElementById("idPlayer0Score").innerText="Banked Score:" + arrScores[0] + "  Total Score:" + arrScores[1];
        document.getElementById("idPlayer1Score").innerText="Banked Score:" + arrScores[2] + "  Total Score:" + arrScores[3];
    }else{
        document.getElementById("idPlayer0Score").innerText="Score:" + arrScores[1];
    }
    
}
function winner(){
    let StatusBox = document.getElementById("idStatusBox"); 
    if(intGameType===2){
        StatusBox.innerHTML="Player " + (intPlayer+1) + "Wins!";
    }else{
        StatusBox.innerHTML="Congratulations! You won!";
    }    
    resetGame();
}
function resetGame(){
    booPlaying=false;
    unsetButtons();
    intTarget=document.getElementById("idTargetValue").value;
    document.getElementById("idTargetValue").style.display="block";
    document.getElementById("idTargetText").innerText="Choose your target ";
    document.getElementById("idSubHeading").style.visibility="visible";
    document.getElementById("idGameTypeButton").cursor = "pointer";
    document.getElementsByClassName("clsDie")[intPlayer].style.visibility="hidden";
    StartButton.style.display="block";
}

function checkScores(){
    let strName="";
    if (intGameType===2){
        strName = "Player " + (intPlayer + 1);
    }else{
        strName="You";
    };
    document.getElementById("idStatusBox").innerHTML=strName + " rolled a " + intDieRoll + "<br> "
    let i = intPlayer * 2;
    if (intDieRoll == 1){ 
        if (intGameType===2){
            arrScores[i+1] = arrScores[i]; //total score = banked score
            switchPlayer();
            setScoreboards();
            document.getElementById("idStatusBox").innerHTML+="They lose their accumulated score<BR> Player " +(intPlayer+1) + " to roll next";
        }else{
            document.getElementById("idStatusBox").innerHTML="You rolled a one! You lose";
            resetGame();
        }
    }else{
        arrScores[i+1] += intDieRoll;
        setScoreboards();
        if (arrScores[i+1]>=intTarget){
            winner();
        }else{
            if (intGameType===2){
                document.getElementById("idStatusBox").innerHTML+="Bank your accumulated score or roll again?";
            }
            setButtons();
        }
    }
}
for(const button of document.querySelectorAll("#idBankButton")){
    button.addEventListener('click', ()=>{
        bankScore();
        switchPlayer();
        document.getElementById("idStatusBox").innerHTML="Score banked!<br> Player " +(intPlayer+1)+ " to roll next."
    })
}