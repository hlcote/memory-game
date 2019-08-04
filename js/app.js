/*
 * Create a list that holds all of your cards
 */
let cardList = ["diamond", "diamond", "plane", "plane", "anchor", "anchor", "bolt", "bolt", "cube", "cube", "leaf", "leaf", "bicycle", "bicycle", "bomb", "bomb"]
let clickerCount = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function displayCards() {

    /* shuffle the array*/
    shuffle(cardList);

    for(var i = 0; i < cardList.length; i++){
        let deck = document.getElementsByClassName("deck")[0];
        let card = document.createElement("li");
        
        //insert font awesome unicode to match the symbol in cardList
        if (cardList[i] == 'diamond')
        card.innerHTML = "&#xf219";
        else if (cardList[i] == 'plane')
        card.innerHTML = "&#xf1d8";
        else if (cardList[i] == 'anchor')
        card.innerHTML = "&#xf13d";
        else if (cardList[i] == 'bolt')
        card.innerHTML = "&#xf0e7";
        else if (cardList[i] == 'cube')
        card.innerHTML = "&#xf1b2";
        else if (cardList[i] == 'leaf')
        card.innerHTML = "&#xf06c";
        else if (cardList[i] == 'bicycle')
        card.innerHTML = "&#xf206";
        else if (cardList[i] == 'bomb')
        card.innerHTML = "&#xf1e2";
        else
        card.innerHTML = "&#xf128";

        card.className = "card fa";

        //add event listener to each card as it is created
        card.addEventListener("click", function() {
            toggleCard(card);
        });

        //add card to deck to be displayed
        deck.appendChild(card);
    }
  }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Clear the current board for new deck shuffle on refresh icon click
function refreshBoard(){
    let deck = document.getElementsByClassName("deck")[0];
    while (deck.firstChild) {
        deck.removeChild(deck.firstChild);
    }
    displayCards();
}

function toggleCard(card){
    card.classList.toggle("open");
    card.classList.toggle("show");

    clickerCount ++;
}

/*****
 * 
 * Event Listeners
 * 
 ****/

//On page load shuffle and display cards 
document.addEventListener("DOMContentLoaded", function() {
    displayCards();
  });

//On restart clicked reset and shuffle cards
let refresh = document.getElementsByClassName("restart")[0];
refresh.addEventListener("click", function() {
    refreshBoard();
  });






/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
