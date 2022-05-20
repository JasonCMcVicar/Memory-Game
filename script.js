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
var theMove = [];
var matchArray = [];

for (let i = 0; i < 10; i++) {
  const card = document.createElement('div');
  let string = i.toString();
  card.setAttribute('id', string);
  card.setAttribute('class', `${colors[i]}` );
  game.appendChild(card);
}

addEventz();


function addEventz() {
  const stack = document.querySelectorAll('#game div');
  for (let item of stack) {
    //console.log('the class is ', item.className);

    if (!matchArray.includes(item.className)){
      item.addEventListener('click', findState);
    }
  }
}


function findState(event, arr) {
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
//////////////////////////////////////////////////////////////////////////////



function moveLimiter(arr){
  if (arr.length == 2){
  removeEventz();
  setTimeout(function(){
    removeEventz();

    const card1 = document.getElementById(`${arr[0]}`);
    const card2 = document.getElementById(`${arr[1]}`);
    if (card1.className === card2.className) {
      matchArray.push(card1.className);
    }
    console.log(matchArray);
    returnToGray(arr);

  },1000);
  setTimeout(function(){
    addEventz();
    theMove.length = 0;
  }, 1000);
  };
}

function returnToGray(arr){
  console.log('the array is ', arr);
  const card1 = document.getElementById(`${arr[0]}`);
  const card2 = document.getElementById(`${arr[1]}`);
  if (!matchArray.includes(card1.className)){
    card1.style.backgroundColor = 'gray';
    card2.style.backgroundColor = 'gray';
  }
}

function removeEventz() {
  const stack = document.querySelectorAll('#game div');
  for (let card of stack) {
    card.removeEventListener('click', findState);
  }

}
