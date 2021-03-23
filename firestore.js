const firebaseConfig = {
    apiKey: "AIzaSyDdqeG61IDJustJMg4w67P2ryGb2nPJbTs",
    authDomain: "good-times-mini-game.firebaseapp.com",
    projectId: "good-times-mini-game",
    storageBucket: "good-times-mini-game.appspot.com",
    messagingSenderId: "584091630854",
    appId: "1:584091630854:web:76393596b9351fa3daf287",
    measurementId: "G-Q6PK57SF02"
  };

const leaderBoardButton = document.getElementById('leader-board-button');
const playername = document.getElementById("player-name");
const leaderBoardPlayers = document.getElementsByClassName('leader-board-players')[0];
const score = document.getElementById('your-score')
console.log(leaderBoardButton)
console.log(leaderBoardPlayers)
console.log(playername)
console.log(document)


  // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
  // maybe lines above are to comment out

const app = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore(app);
    firebase.firestore().settings({
        cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
    });


//    const name = document.querySelector("#name");
//    const leaderBoard = document.querySelector("#leaderBoard");
//    const score = document.querySelector("#demo2");

function renderPlayer(doc){
    let tr = document.createElement('tr');
    let name = document.createElement('span');
    let score = document.createElement('td');

    tr.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    score.textContent = doc.data().score;

    tr.appendChild(name);
    tr.appendChild(score);

    leaderBoard.appendChild(tr);
}



let leaderBoard = db.collection('players').orderBy('score', "desc").limit(5);

leaderBoard.get().then((doc) => {
    if (doc.exists) {
        doc.forEach(player => {
            console.log(player.data())
        });
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    })
    .catch((error) => {
        console.log("Error getting document:", error);
});

// saving data
leaderBoardButton.addEventListener("click",function(){
    if( playername.value != ''){
    db.collection('players').set({
        name: playername.value,
        score: score.innerHTML
        });
      }
    });

