/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
var scores, roundScore, activePlayer, gamePlaying;

init();


//roll dice event
document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gamePlaying){
        //1. Random number
        var dice = [ Math.floor(Math.random()*6)+1 , Math.floor(Math.random()*6)+1];

        //2. Display the result
        var diceDOM = document.getElementsByClassName('dice')[0];
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-'+dice[0]+'.png';

        var diceDOM1 = document.getElementsByClassName('dice')[1] ;
        diceDOM1.style.display = 'block';
        diceDOM1.src = 'dice-'+dice[1]+'.png';

        //3. Update the roundscore if the rolled number was not 1
        if(dice[0] !== 1 && dice[1] !== 1){
            //Add score
            roundScore += dice[0]+dice[1];
            document.querySelector('#current-'+activePlayer).textContent = roundScore;
        }else{
            //next player
            nextPlayer();
        }
    }

});

//hold button event
document.getElementsByClassName('btn-hold')[0].addEventListener('click',function(){
    if(gamePlaying) {
        //add the current score to the players global score
        scores[activePlayer] += roundScore;

        // update the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        // check if the player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner';
            document.getElementsByClassName('dice')[0].style.display = 'none';
            document.getElementsByClassName('dice')[1].style.display = 'none';
            let winner = document.querySelector('.player-' + activePlayer + '-panel');
            winner.classList.add('winner');
            winner.classList.remove('active');
            gamePlaying = false;

        } else {
            //next player
            nextPlayer();
        }
    }
});

//new game button event
document.getElementsByClassName('btn-new')[0].addEventListener('click',init);



function nextPlayer(){
    roundScore = 0;
    document.getElementById('current-'+activePlayer).textContent = roundScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.getElementsByClassName('dice')[0].style.display = 'none';
    document.getElementsByClassName('dice')[1].style.display = 'none';
}
function init() {

    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
//Set to 0 scores displayed in html
    document.getElementsByClassName('dice')[0].style.display = 'none';
    document.getElementsByClassName('dice')[1].style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}