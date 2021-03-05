const CONSTANTS = {
    DUDE_WIDTH: 90,
    DUDE_HEIGHT: 100,
    // how many frames I move per animation
    // 12 was ideal using .keyCode ad event listener
    SPEED: 12,
    // pullback value to test
    WAVE_PULLBACK: 1

};

const KEYS = [];

export default class Dude {
    constructor(dimensions) {
      this.dimensions = dimensions;
      // dude position on x axis
      this.x = 200,
      // dude position on y axis
      this.y = 200
    }
    
    drawDude(ctx) {
        // ctx.clearRect(this.x - CONSTANTS.DUDE_WIDTH, this.y - CONSTANTS.DUDE_HEIGHT, CONSTANTS.DUDE_WIDTH, CONSTANTS.DUDE_HEIGHT);
        
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, CONSTANTS.DUDE_WIDTH, CONSTANTS.DUDE_HEIGHT);
    }

    animate(ctx) {

        this.drawDude(ctx);
        this.moveDude();
        // ctx.clearRect(this.x -=1, this.y -=1, CONSTANTS.DUDE_WIDTH, CONSTANTS.DUDE_HEIGHT);

    }

    moveDude(e = '') {
        if ( e.type === 'keydown') {
            KEYS[e.keyCode] = true;
        }
        
        if ( e.type === 'keyup') {
            delete KEYS[e.keyCode];
        }
        // console.log(e.type)

        // debugger
            // move char in negative direction along y axes
            // move dude up
    // player.y > 100 is to limit the movement to 100 pixels max from the top
    if (KEYS[38] && this.y > 100) {
        this.y -= CONSTANTS.SPEED;
    }
    // // // move player to the left on the orizontal axis
    // // // implement here logic for out of screen / game over
    if (KEYS[37]  && this.x > 0) {
        this.x -= CONSTANTS.SPEED;
    }
    // //     // move dude down
    if (KEYS[40] && this.y < 370) {
        this.y += CONSTANTS.SPEED;
    }
    // //     // move dude right
    if (KEYS[39] && this.x < 700) {
        this.x += CONSTANTS.SPEED;
    }

    // line below pulls the dude toward the back of the wave
    // tested and working later
    // this.x -= CONSTANTS.WAVE_PULLBACK;
    }

    bounds() {
        return {
            left: this.x,
            right: this.x + CONSTANTS.DUDE_WIDTH,
            top: this.y,
            bottom: this.y +CONSTANTS.DUDE_HEIGHT
        }
    }


  }