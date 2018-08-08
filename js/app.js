/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
let array=[];
const score=document.getElementsByClassName('moves')[0];
let matchedCards=0;

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
// my scripts
function createcards(){
	const classes=['fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-leaf','fa-bicycle','fa-bomb'];
	// create basic card dom
	
	var cards=[];
	for(let i=0;i<classes.length;i++){
		for(let j=0;j<=1;j++){
			let li=document.createElement('li');
			li.classList.add('card');
			let iTag=document.createElement('i');
			iTag.classList.add('fa');
			li.setAttribute("index",j*8+i);
			iTag.classList.add(classes[i]);
			li.appendChild(iTag);
			cards.push(li);
		}
	}
	console.log(cards);
	cards=shuffle(cards);
	// shuffle..
	// add to page
	let deck = document.getElementsByClassName("deck")[0];
	console.log(deck);
	console.log(cards.length);
	for(let i=0;i<cards.length;i++){
		console.log(cards[i]);
		// typeof cards[i];
		deck.innerHTML+=cards[i].outerHTML;
	}
}
function match(card1,card2){
	card1.classList.add("match");
	card2.classList.add("match");
	card1.removeEventListener('click',clickEvent);
	card2.removeEventListener('click',clickEvent);
	console.log('removed');
}
async function mismatch(card1,card2){
	card1.classList.toggle("mismatch");
	card2.classList.toggle("mismatch");
	await new Promise(resolve => setTimeout(resolve, 500));
	card1.classList.toggle("mismatch");
	card2.classList.toggle("mismatch");
	card1.classList.toggle("show");
	card2.classList.toggle("show");


}



function process(card){
	let ind=card.getAttribute('index');
	if(array.length===0){
		array.push(card);
	}
	else{
		score.innerHTML=Number(score.innerHTML)+1;

		if(Math.abs(array[0].getAttribute('index')-ind)==8){
			match(array[0],card);
			matchedCards+=1;
			if(matchedCards===8){
				console.log("finished " + score.innerHTML);
			}
		}
		else{
			mismatch(card,array[0]);
		}
		array.pop();
	}
	console.log(array);
}
function clickEvent(card){
	this.classList.toggle("show");
	process(this);
}

createcards();
const cards=document.querySelectorAll('.card');
for(let i=0 ;i<cards.length; i++){
	cards[i].addEventListener('click',clickEvent);
}

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
