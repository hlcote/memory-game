/*
 * Create a list that holds all of your cards
 */
let cardList = ["diamond", "diamond", "plane", "plane", "anchor", "anchor", "bolt", "bolt", "cube", "cube", "leaf", "leaf", "bicycle", "bicycle", "bomb", "bomb"]
let clickerCount = 0;
let openList = [];


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
    
    location.reload();
}

function toggleCard(card){
    //increment the clickerCount for moves
    incrementClicker();
 
    //open the card by toggling the class names 
    card.classList.toggle("open");
    card.classList.toggle("show");


    //check if there is another open card
    if (openList.length < 1){
        // if openList is empty add clicked card
        openList[0] = card;
    }

    else{

    //disable other cards from being clicked while cards are compared
    disableCards();
    
    //start a timer to delay compare so viewer can see cards
    var delayInMilliseconds = 1500; //1.5 seconds
    setTimeout(function() {
        compareList(card);
        }, delayInMilliseconds);
    }   
}

//increment the clickerCount for moves
function incrementClicker(){
    clickerCount ++;
    document.getElementsByClassName("moves")[0].innerHTML = clickerCount;
    
    //decrement the star count based on number of moves
    if (clickerCount === 25 || clickerCount === 50 ){
        var star = document.getElementsByClassName("fa-star")[0];
        star.parentNode.removeChild(star);
    }

}

function compareList(card){
    //add 2nd clicked card
    openList[1] = card;
    // if the cards symbol are the same, toggle to match and empty openList
    if (openList[0].innerHTML == openList[1].innerHTML){
        var matches = document.querySelectorAll(".open");
        for(var i = 0; i < matches.length; i++){
            matches[i].classList.remove("open");
            matches[i].classList.add("match");
        }
    }
    //if the cards are not the same, flip them both back over and empty openList
    else{
        var nonMatches = document.querySelectorAll(".open");
        for(var i = 0; i < nonMatches.length; i++){
            nonMatches[i].classList.remove("open");
            nonMatches[i].classList.remove("show");
        }
            
    }

    //enable cards to be clicked again
    enableCards();

    //clear the stored cards from openList
    openList = [];  
}

function disableCards(){
    var inactive = document.querySelectorAll(".card");
    for(var i = 0; i < inactive.length; i++){
        inactive[i].classList.add("disabled");
    }
}

function enableCards(){
    var active = document.querySelectorAll(".card");
    for(var i = 0; i < active.length; i++){
        active[i].classList.remove("disabled");
    }
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

