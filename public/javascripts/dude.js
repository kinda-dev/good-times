const CONSTANTS = {
    DUDE_WIDTH: 100,
    DUDE_HEIGHT: 110,
    // how many frames I move per animation
    SPEED: 24,
    // pullback value to test
    WAVE_PULLBACK: 0.4

};

export default class Dude {
    constructor(dimensions) {
      this.dimensions = dimensions;
      // dude position on x axis
      this.x = 200,
      // dude position on y axis
      this.y = 200
    }
    
    drawDude(ctx) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, CONSTANTS.DUDE_WIDTH, CONSTANTS.DUDE_HEIGHT);
    }

    animate(ctx) {
        this.drawDude(ctx);
        this.moveDude();
    }

    moveDude(userInput) {
            // move char in negative direction along y axes
            // move dude up
    // player.y > 100 is to limit the movement to 100 pixels max from the top
    if (userInput === 'ArrowUp' && this.y > 100) {
        this.y -= CONSTANTS.SPEED;
    }
    // move player to the left on the orizontal axis
    // implement here logic for out of screen / game over
    if (userInput === 'ArrowLeft' && this.x > 0) {
        this.x -= CONSTANTS.SPEED;
    }
        // move dude down
    if (userInput === 'ArrowDown' && this.y < 370) {
        this.y += CONSTANTS.SPEED;
    }
        // move dude right
    if (userInput === 'ArrowRight' && this.x < 700) {
        this.x += CONSTANTS.SPEED;
    }

    // line below should pull the dude toward the back of the wave
    // commented out to be tested later
    // this.x -= CONSTANTS.WAVE_PULLBACK;
    }

  }