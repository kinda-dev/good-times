const axios = require('axios');
import GoodTimes from './public/javascripts/game';

let canvas = '';

document.addEventListener('DOMContentLoaded', () => {

    
    const canvas = document.getElementById('good-times');
    const music = document.getElementById('good-times');
    const instructions = document.getElementsByClassName('instructions')[0];
    const volumeButton = document.getElementById('volume-button-wrap');
    const playGameButton = document.getElementById('start-game-button');
    const instructionsButton = document.getElementById('show-instructions-button');
    const splashText = document.getElementsByClassName('splash-text')[0];
    const hideInstructionsButton = document.getElementById('hide-instructions');
    const splashScreen = document.getElementsByClassName('splash-screen')[0];
    const gameContainer = document.getElementsByClassName('game-container')[0];
    const gameOver = document.getElementsByClassName('game-over')[0];
    const restartGameButton = document.getElementById('re-start-game-button');
    const musicOnMsg = document.getElementById('music-on-msg');




    playGameButton.addEventListener('mouseover', () => {
        musicOnMsg.innerHTML = "Music will play when you click this";

    })

    playGameButton.addEventListener('mouseout', () => {
        musicOnMsg.innerHTML = "";

    })

    instructionsButton.addEventListener('click', () => {
        gameOver.classList.add('hidden');
        splashText.classList.add('hidden');
        instructionsButton.classList.add('hidden');
        instructions.classList.remove('hidden');
        hideInstructionsButton.classList.remove('hidden');
    })

    hideInstructionsButton.addEventListener('click', () => {
        instructions.classList.add('hidden');
        hideInstructionsButton.classList.add('hidden');
        splashText.classList.remove('hidden');
        instructionsButton.classList.remove('hidden');
    })

    playGameButton.addEventListener('click', () => {
        splashScreen.classList.add('hidden');
        volumeButton.classList.remove('hidden');
        let game = new GoodTimes(canvas);
        game.startGame();
    })

    restartGameButton.addEventListener('click', () => {
        splashScreen.classList.add('hidden');
        volumeButton.classList.remove('hidden');
        let game = new GoodTimes(canvas);
        game.startGame();
    })


    

    // before game start
    // no music button
    // navbar
    // splash
    // instructions button
    // play game button

    // when looking at instructions
    // hide splah-text
    // display hide instructions button
    // display play game button

    // when click game start
    // hide play game button
    // hide splash
    // hide instructions
    // reset canvas
    // show music button
    // show canvas
    // create game instance

    // when game stops
    // hide canvas
    // reset canvas
    // show game over message
    // show scoreboard
    // show start a new game button

    // when click start new game
    // show splash

})