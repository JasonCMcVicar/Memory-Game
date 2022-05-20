"use strict";



const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

//OUR SHUFFLED ARRAY IS CREATED
const colors = shuffle(COLORS);


//////////////////////////////////////////////////////////////////////////////
/** Shuffle array items in-place and return shuffled array. */
function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}
//////////////////////////////////////////////////////////////////////////////

////////////////////GAME BOARD IS CREATED WITH COLORS HIDDEN//////////////////
const game = document.querySelector('#game');
var theMove = []; //keeps track of the current move plus last move
var matchArray = []; //holds all the cards that should remain face up
makeGame();

function makeGame() {
//our ten cards are created and assigned class and id's
for (let i = 0; i < 10; i++) {
  const card = document.createElement('div');
  let string = i.toString();
  card.setAttribute('id', string);
  card.setAttribute('class', `${colors[i]}` );
  game.appendChild(card);
}
addEventz();
}


//code for end of game
function youWin(){
  const ending = document.createElement('h2');
  ending.innerText = "YOU WIN!";
  game.appendChild(ending);
  playAgain();
}

//to start over once game is completed
function playAgain(){
  const startOverButton = document.createElement('button');
  startOverButton.innerText = "Play Again?";
  startOverButton.addEventListener('click', function(event){
    event.preventDefault();
    theMove.length = 0;
    matchArray.length = 0;
    shuffle(colors);
    for (let i = 0; i < 10; i++) {
      const remCard = document.getElementById(`${i}`);
      game.removeChild(remCard);
    }
    const winMessage = document.querySelector('#game h2');
    game.removeChild(winMessage);
    game.removeChild(startOverButton);
    makeGame();
  })

  setTimeout(function(){
  game.appendChild(startOverButton);
  }, 1000);
}




//this function allows for interaction: event listeners are added
function addEventz() {
  const stack = document.querySelectorAll('#game div');
  for (let item of stack) {
    //console.log('the class is ', item.className);

    if (!matchArray.includes(item.className)){
      item.addEventListener('click', findState);
    }
  }
}


//callback from the event listener, color of card changes, theMove array is updated
function findState(event) {
  //WHY DOESN'T THIS LINE WORK??
  //const coloured = document.querySelector(`#${event.target.id}`);
  const coloured = document.getElementById(`${event.target.id}`);
  coloured.style.backgroundColor = event.target.className;

  theMove.push(event.target.id);
  if (theMove[0] === theMove[1]){
    theMove.pop();
  }
  moveLimiter(theMove);
}

//function that is only run when two moves accumulate in theMove array
//does a lot of work: halts the gamer's progress by calling the removeEventz function,
//checks for a match, calls the return to facedown function after 1 second,
//resets theMove array, and adds the event listeners back after a second
function moveLimiter(arr){
  if (arr.length == 2){
  removeEventz();
  const card1 = document.getElementById(`${arr[0]}`);
  const card2 = document.getElementById(`${arr[1]}`);

    if (card1.className === card2.className) {
      matchArray.push(card1.className);
    }
    if (matchArray.length === 5) {
      youWin();
    }

    setTimeout(function(){
    returnToGray(arr);
  },1000);

  setTimeout(function(){
    addEventz();
    theMove.length = 0;
  }, 1000);

  };
}


//theMove array is passed in and we'll figure out if we have a match, if not we
//will flip the cards over
function returnToGray(arr){
  const card1 = document.getElementById(`${arr[0]}`);
  const card2 = document.getElementById(`${arr[1]}`);
  if (!matchArray.includes(card1.className)){
    card1.style.backgroundColor = 'gray';
    card2.style.backgroundColor = 'gray';
  }
}

//removes the event listener from each card
function removeEventz() {
  const stack = document.querySelectorAll('#game div');
  for (let card of stack) {
    card.removeEventListener('click', findState);
  }

}
