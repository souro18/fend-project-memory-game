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
const time=document.getElementById('time');
const modal=document.getElementById('mod');
const finalMove=document.getElementById('final-move');
const finalTime=document.getElementById('final-time');
const star=document.getElementById('star');
let matchedCards=0;
let sec=0;
let min=0;
let interval=null;
const stars=document.getElementsByClassName('fa-star');

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

function restartEvent(){
	console.log('restart functoin');
	for(let i=0;i<cards.length;i++){
		cards[i].classList.remove('match');
		cards[i].classList.remove('show');
		cards[i].addEventListener('click',clickEvent);
	}
	shuffle(cards);
	score.innerHTML=0;
	if(array.length!=0){
		array.pop();
	}
	resetStar();
	count();
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
function displayTime(){
	sec++;
	if(sec===60){
		sec=0;
		min++;
	}
	time.innerHTML= ((min<10)? ("0"+min) : min.toString()) + " : "+ ((sec<10)? ("0"+sec): sec.toString());
}
async function count(){
	sec=0;
	min=0;
	interval=setInterval(displayTime,1000);
}
function resetStar(){
	stars[0].classList.add('star-colour');
	stars[1].classList.add('star-colour');
	stars[2].classList.add('star-colour');
}
function updateStar(scor){
	if(scor===15){
		stars[2].classList.toggle('star-colour');
	}
	if(scor===25){
		stars[1].classList.toggle('star-colour');
	}
	if(scor===35){
		stars[0].classList.toggle('star-colour');
	}
}
function updateScore(){
	const sc=Number(score.innerHTML);
	score.innerHTML=sc+1;
	updateStar(sc+1);
}
function showScore(){
	finalTime.innerHTML=time.innerHTML;
	finalMove.innerHTML=score.innerHTML;
	star.innerHTML=document.getElementsByClassName('stars')[0].innerHTML;
	star.style.fontSize="2em";
	modal.style.display='block';
}
function process(card){
	let ind=card.getAttribute('index');
	if(array.length===0){
		array.push(card);
	}
	else{
		updateScore();

		if(Math.abs(array[0].getAttribute('index')-ind)==8){
			match(array[0],card);
			matchedCards+=1;
			if(matchedCards===8){
				console.log("finished " + score.innerHTML);
				clearInterval(interval);
				showScore();
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
count();
resetStar();
const restart=document.getElementsByClassName('fa-repeat')[0];
restart.addEventListener('click',restartEvent);
document.getElementById('display-topright').addEventListener('click',function(){
	modal.style.display='none';
});
document.getElementById('replay').addEventListener('click',function(){
	modal.style.display='none';
	restartEvent();
})

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
