const axios = require('axios');
import GoodTimes from './public/javascripts/game';



document.addEventListener('DOMContentLoaded', () => {

    
    const canvas = document.getElementById('good-times');
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
    const leaderBoardContainer = document.getElementsByClassName('leader-board-container')[0];
    const leaderBoardButton = document.getElementById('leader-board-button');
    const leaderBoard = document.getElementById('leader-board-scores');
    const playername = document.getElementById("player-name");
    const score = document.getElementById('your-score');
    const riff = document.getElementById('play-riff');
    const lowerScore = document.getElementById('lower-score');


    playGameButton.addEventListener('mouseover', () => {
        musicOnMsg.innerHTML = "Music will play when the game starts";

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
        getLeaderBoard()    
        splashScreen.classList.add('hidden');
        volumeButton.classList.remove('hidden');
        let game = new GoodTimes(canvas);
        riff.muted= false
        game.startGame();
    })



    restartGameButton.addEventListener('click', () => {
        splashScreen.classList.add('hidden');
        volumeButton.classList.remove('hidden');
        let game = new GoodTimes(canvas);
        game.startGame();
    })


    
    // firestore setup


    const firebaseConfig = {
        apiKey: "AIzaSyDdqeG61IDJustJMg4w67P2ryGb2nPJbTs",
        authDomain: "good-times-mini-game.firebaseapp.com",
        projectId: "good-times-mini-game",
        storageBucket: "good-times-mini-game.appspot.com",
        messagingSenderId: "584091630854",
        appId: "1:584091630854:web:76393596b9351fa3daf287",
        measurementId: "G-Q6PK57SF02"
      };
    
    

    const app = firebase.initializeApp(firebaseConfig);
    
    const db = firebase.firestore(app);
        firebase.firestore().settings({
            cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
        });

        
    leaderBoardButton.addEventListener('click', (e) => {
        e.preventDefault()
        gameOver.classList.add('hidden');
        leaderBoardContainer.classList.remove('hidden');


        if( playername.value != '' && parseInt(score.innerHTML) > parseInt(lowerScore.innerHTML)){
            console.log('added')
            db.collection('players').add({
                name: playername.value,
                score: parseInt(score.innerHTML)
            })
            getLeaderBoard()    
        }
    })

    playername.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            gameOver.classList.add('hidden');
            leaderBoardContainer.classList.remove('hidden');
            
            
            if( playername.value != '' && parseInt(score.innerHTML) > parseInt(lowerScore.innerHTML)){
                console.log('added')
                db.collection('players').add({
                    name: playername.value,
                    score: parseInt(score.innerHTML)
                })
                getLeaderBoard()    
            }
        }
    })
    
    
    function renderScore(doc, idx){
        let ul = document.createElement('ul')
        ul.setAttribute('data-id', doc.id);
        ul.className = "players-data-container"

        let index = document.createElement('li');
        index.className = "firebase-player-score";
        index.innerHTML = idx + ".";

        let name = document.createElement('li')
        name.className = "firebase-player-name"
        name.innerHTML = doc.data().name;
        
        let score = document.createElement('li');
        score.className = "firebase-player-score";
        score.innerHTML = doc.data().score + " pts.";
        
        leaderBoard.appendChild(ul);
        ul.appendChild(index);
        ul.appendChild(name);
        ul.appendChild(score);
    }
    
    
    function getLeaderBoard(){

        if (parseInt(score.innerHTML) > parseInt(lowerScore.innerHTML)) {
            leaderBoard.innerHTML = '';
            let scoreBoard = db.collection('players').orderBy('score', "desc").limit(5)
            scoreBoard.get().then((doc) => {
                console.log('hit database')
                console.log(doc)
                if (doc) {
                    let idx = 0
                    doc.forEach((player) => {
                        idx ++;
                        renderScore(player, idx);
                        lowerScore.innerHTML = player.data().score;
                    });
                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
        } 
        
    }


})