const axios = require('axios');
import GoodTimes from './public/javascripts/game';

let canvas = '';

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
        riff.play();
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
    
    const leaderBoardPlayers = document.getElementsByClassName('leader-board-players')[0];
    
      // Initialize Firebase
    //   firebase.initializeApp(firebaseConfig);
    //   firebase.analytics();
      // maybe lines above are to comment out
    
    const app = firebase.initializeApp(firebaseConfig);
    
    const db = firebase.firestore(app);
        firebase.firestore().settings({
            cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
        });

        
    leaderBoardButton.addEventListener('click', (e) => {
        e.preventDefault()
        leaderBoard.innerHTML = '';
        gameOver.classList.add('hidden');
        leaderBoardContainer.classList.remove('hidden');

        // firebase logic below

        if( playername.value != ''){
            db.collection('players').add({
                name: playername.value,
                score: parseInt(score.innerHTML)
                })
        }
        getLeaderBoard()    
    })

    playername.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            leaderBoard.innerHTML = '';
            gameOver.classList.add('hidden');
            leaderBoardContainer.classList.remove('hidden');
            
            // firebase logic below
            
            if( playername.value != ''){
                    db.collection('players').add({
                            name: playername.value,
                            score: parseInt(score.innerHTML)
                            })
                    }
                    getLeaderBoard()    
        }
    })
    
    
    //    const name = document.querySelector("#name");
    //    const leaderBoard = document.querySelector("#leaderBoard");
    //    const score = document.querySelector("#demo2");
    
    function renderScore(doc){
        
        let ul = document.createElement('ul')
        ul.setAttribute('data-id', doc.id);
        ul.className = "players-data-container"
        
        let name = document.createElement('li')
        name.className = "firebase-player-data"
        name.innerHTML = doc.data().name;
        
        let score = document.createElement('li');
        score.className = "firebase-player-data";
        score.innerHTML = doc.data().score + " points";
        
        leaderBoard.appendChild(ul);
        ul.appendChild(name);
        ul.appendChild(score);
    }
    
    
    
    // .onSnapshot({
        //     // Listen for document metadata changes
        //     includeMetadataChanges: true
        // });
        function getLeaderBoard(){
            
            let leaderBoard = db.collection('players').orderBy('score', "desc").limit(5)
            leaderBoard.get().then((doc) => {
                if (doc) {
                    doc.forEach(player => {
                        renderScore(player)
                    });
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
            
            
        }
            // saving data




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