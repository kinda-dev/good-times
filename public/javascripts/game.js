import Background from './background';
import Dude from './dude';
import Obstacle from './obstacle';
import Reward from './reward';
import WaveCrest from './wave';

export default class GoodTimes {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.dimensions = { width: canvas.width, height: canvas.height};
        this.loc = canvas;
        
  
        this.starterListener();

        this.score = 0;
        this.isPitted = false;

        this.isPlaying = false;


        this.gameOver = true;
        this.restart = false;

        this.buttonActive = true;
        this.drawStart();
    }

    startGame() {
        this.gameOver = false;
        // create instance of background
        this.isPlaying = true;
        this.background = new Background(this.dimensions);
        // create instance of dude after the backround so it doesn't get covered
        this.dude = new Dude(this.dimensions);

        this.obstacles = new Obstacle(this.dimensions);

        this.rewards = new Reward(this.dimensions);


        this.wave = new WaveCrest(this.dimensions);

        this.registerEvents();
        this.collision();

        // triggers animate condinoals to trigger will go here
        this.animate();
    }

    registerEvents() {
        this.boundKeyDown = this.handlePressedKeys.bind(this);
        this.boundDudeStopHandler = this.stopDudeTrigger.bind(this);
        document.addEventListener("keydown", this.boundKeyDown);
        document.addEventListener("keyup", this.boundDudeStopHandler);

    }

    starterListener() {
        this.boundStarter = this.starter.bind(this);
        document.addEventListener("keydown", this.boundStarter);

    }

    starter(e = '') {
        if (( e.key === "s" ) && (this.buttonActive)){ 
            this.gameOver = false;
            this.isPlaying = true;
            this.startGame();
        }
    }
    
    handlePressedKeys(e = '') {
  

        if (( e.key === "Enter" ) && (!this.isPlaying) && (this.gameOver)){ 
          this.restart = true;
        }

        if (( e.key === "p" ) || ( e.key === "P")) { this.playPause() };
        
        this.dude.moveDude(e);
        // console.log(e.key)
    }

    stopDudeTrigger(e = '') {
        this.dude.moveDude(e);
    }

    collision() {
        if ( this.obstacles.collidesWith(this.dude.bounds()) ) {
            this.gameOver = true;
        }
        // add logic for adding scores if pickup bonuses
        if ( this.rewards.collidesWith(this.dude.bounds()) ) {
            this.score += 10;

            // maybe we can draw something
        }
        
    }

    handleScore() {
        if (this.dude.bounds().right < 180) {
            this.score += 0.08;
            this.isPitted = true;

        } else {
        this.score += 0.04;
        this.isPitted = false;
        }

    }

    // first I am going to crate an animate method
    animate() {
        document.getElementById('play-riff').play()
        this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height)
        if ( this.gameOver ) {

            // this.playRiff.currentTime = 0;
            
            
            this.buttonActive = false;

            this.isPlaying = false;
            if ( !this.restart ) {
                this.drawGameOver();
            } else {
                this.drawStart();
            }
            
            // alert('what the hell');
        } else {

        this.buttonActive = false;
        this.handleScore();
        this.collision()

        // drasw the background this is to comment in
        this.background.animate(this.ctx);

        // draw the dude after the backround so it doesn't get covered
        this.dude.animate(this.ctx);
        
        this.obstacles.animate(this.ctx);

        this.rewards.animate(this.ctx);
        // below should be the last to animate
        this.wave.animate(this.ctx);

        if (this.isPitted) {
            this.drawPitted();
        }

        this.drawScore()
        }
            // cancelAnimationFrame(this.id)
        
        // debugger
            // if (this.isPlaying) {
               this.id = requestAnimationFrame(this.animate.bind(this));
            // } 
        
    }

    drawScore() {
        //loc will be the location 
        const loc = {x: this.dimensions.width / 30, y: this.dimensions.height / 10}
        this.ctx.font = "bold 20pt 'DotGothic16', sans-serif";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("SCORE " + Math.trunc(this.score), loc.x, loc.y);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.strokeText("SCORE " + Math.trunc(this.score), loc.x, loc.y);
    }

    drawPitted() {
        const loc = {x: this.dimensions.width / 4.5, y: this.dimensions.height / 6}
        this.ctx.font = "bold 30pt 'DotGothic16', sans-serif";
        this.ctx.fillStyle = "yellow";
        this.ctx.fillText("Gnarly!! Double Points!!", loc.x, loc.y);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.strokeText("Gnarly!! Double Points!!", loc.x, loc.y);

    }

    drawStart() {
        const loc = {x: this.dimensions.width / 7, y: this.dimensions.height / 4}
        this.ctx.font = "bold 20pt 'DotGothic16', sans-serif";
        this.ctx.fillStyle = "yellow";
        this.ctx.fillText("Press 'S' to start a new game", loc.x, loc.y);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.strokeText("Press 'S' to start a new game", loc.x, loc.y);

        // this.ctx.fillStyle = "white";
        this.ctx.fillText("Controls:", loc.x, loc.y + 60);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.strokeText("Controls:", loc.x, loc.y + 60);

        this.ctx.fillText("- Move the dude using Keyboard arrows", loc.x, loc.y + 90);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.strokeText("- Move the dude using Keyboard arrows", loc.x, loc.y + 90);

        this.ctx.fillText("- Collect the Shaka Hands or surf", loc.x, loc.y + 120);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.strokeText("- Collect the Shaka Hands or surf", loc.x, loc.y + 120);

        this.ctx.fillText("  under the wave for extra points", loc.x, loc.y + 150);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.strokeText("  under the wave for extra points", loc.x, loc.y + 150);

        this.ctx.fillText("- Avoid floating folks and floating objects", loc.x, loc.y + 180);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.strokeText("- Avoid floating folks and floating objects", loc.x, loc.y + 180);

        this.ctx.fillText("  or the game will be over", loc.x, loc.y + 210);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.strokeText("  or the game will be over", loc.x, loc.y + 210);

    }

    drawGameOver() {

        const loc = {x: this.dimensions.width / 7, y: this.dimensions.height / 4}
        this.ctx.font = "bold 20pt 'DotGothic16', sans-serif";
        this.ctx.fillStyle = "yellow";
        this.ctx.fillText("The Game is Over your score is: " + Math.trunc(this.score), loc.x, loc.y);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.strokeText("The Game is Over your score is: " + Math.trunc(this.score), loc.x, loc.y);

        this.ctx.fillStyle = "blue";
        this.ctx.fillText("Hopefully you enjoyed playing this game", loc.x, loc.y + 60);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.strokeText("Hopefully you enjoyed playing this game", loc.x, loc.y + 60);

        this.ctx.fillText("as much as I did making it.", loc.x, loc.y + 90);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.strokeText("as much as I did making it.", loc.x, loc.y + 90);

        this.ctx.fillText("Thank you for playing. With pleasure, Fabio.", loc.x, loc.y + 150);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.strokeText("Thank you for playing. With pleasure, Fabio.", loc.x, loc.y + 150);

        this.ctx.fillStyle = "yellow";
        this.ctx.fillText("To play again press Enter", loc.x, loc.y + 200);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        this.ctx.strokeText("To play again press Enter", loc.x, loc.y + 200);
    }

    

    
}