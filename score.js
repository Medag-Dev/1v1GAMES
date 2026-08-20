
//score
let redScore = Number(localStorage.getItem("redScore")) || 0;
let blueScore = Number(localStorage.getItem("blueScore")) || 0;
const red=document.getElementById("redScore")
const blue=document.getElementById("blueScore")
const win = new Howl({
          src: ['win.mp3'],
          volume:1
    
        });

if(red){
  red.textContent = redScore;
  
}
if(blue){
  blue.textContent = blueScore;
  
}

function resetScores() {
  redScore = 0;
  blueScore = 0;

  localStorage.setItem("redScore", 0);
  localStorage.setItem("blueScore", 0);

  red.textContent = 0;
  blue.textContent = 0;
}



//fonction gain

function xWins() {
  
  win.play();
  document.querySelector(".red_wins").style.display = "flex";
  
  setTimeout(() =>{
    document.querySelector(".red_wins").style.display = "none";
    
    history.back();
    
  },3100);
  redScore++;
  localStorage.setItem("redScore", redScore);
  
  if(red){
    red.textContent = redScore;
    
  }

  
}

function oWins() {
  
  win.play();
  document.querySelector(".blue_wins").style.display = "flex";
  setTimeout(() => {
    document.querySelector(".blue_wins").style.display = "none";
    
    history.back();
    
  }, 3100);
  blueScore++;
  localStorage.setItem("blueScore", blueScore);
  
  if(blue){
    blue.textContent = blueScore;
    
  }
  
}
