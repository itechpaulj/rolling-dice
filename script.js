'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');


const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let score = [], currentScore, activePlayer, playing

let init = () => {

    score = [0,0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden')
    diceEl.classList.add('hidden');
    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')
    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')
}

init();

const switchPlayer = () => {
    document.querySelector(`#current--${activePlayer}`).textContent  = 0;
    currentScore = 0;
    // switch player
    activePlayer = activePlayer === 0 ? 1 : 0;
    
    if(activePlayer === 1){
        player0El.classList.remove('player--active')
        player1El.classList.add('player--active')
    }else if(activePlayer === 0){
        player0El.classList.add('player--active')
        player1El.classList.remove('player--active')
    }
}

btnRoll.addEventListener('click',function(){

    if(playing){
        const dice = Math.trunc(Math.random() * 6 ) + 1;
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        if(dice !== 1){
            // if not dice is selected 1, player keep playing a dice
            currentScore += dice;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore

        }else{
            // if dice selected 1, player to be switch
            //  before switch a player current score player will be reset;
            switchPlayer();
            
        }
    }

});

btnHold.addEventListener('click',function(){
    
    if(playing){
        // hold the current score
        score[activePlayer] += currentScore;
        // if get 100 points finish the game
        if(score[activePlayer] >=  100){
            //score--0
            document.querySelector(`#score--${activePlayer}`).textContent = score[activePlayer];
            document.querySelector(`#current--${activePlayer}`).textContent = 0;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            diceEl.classList.add('hidden');
            playing = false;
        }else{
            document.querySelector(`#score--${activePlayer}`).textContent = score[activePlayer];
            document.querySelector(`#current--${activePlayer}`).textContent = 0;
            switchPlayer();
        }
    }

});

btnNew.addEventListener('click',init)