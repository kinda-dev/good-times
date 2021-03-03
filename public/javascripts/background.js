const CONSTANTS = {
  // speed should be 
  
  BACKGROUND_SPEED: 4,


};

export default class Background {
    constructor(dimensions) {
      this.dimensions = dimensions;
      this.backgroundPosX1 = 0,
      this.backgroundPosX2 = this.dimensions.width,
      this.backgroundPosY = 0,
      this.backgroundHeight = this.dimensions.height,
      this.backgroundWidth = this.dimensions.width

    }
  
    background() {
      const background = new Image();
      background.src = 'https://good-times-surfing-game.s3-us-west-1.amazonaws.com/background.png';
      return background;
    }
    drawBackground(ctx) {
      // debugger
        // const background = new Image();
        // background.src = 'https://good-times-surfing-game.s3-us-west-1.amazonaws.com/background.png';
        // ctx.drawImage(background, 0, 0, this.dimensions.width, this.dimensions.height);

        if ( this.backgroundPosX1 <= -this.backgroundWidth + CONSTANTS.BACKGROUND_SPEED ) this.backgroundPosX1 = this.backgroundWidth;
        else  this.backgroundPosX1 -= CONSTANTS.BACKGROUND_SPEED;
        if ( this.backgroundPosX2 <= -this.backgroundWidth + CONSTANTS.BACKGROUND_SPEED ) this.backgroundPosX2 = this.backgroundWidth;
        else  this.backgroundPosX2 -= CONSTANTS.BACKGROUND_SPEED;
        // this.backgroundPosX2 -= CONSTANTS.BACKGROUND_SPEED;

        ctx.drawImage(this.background(), this.backgroundPosX1, this.backgroundPosY, this.backgroundWidth, this.backgroundHeight);
        ctx.drawImage(this.background(), this.backgroundPosX2, this.backgroundPosY, this.backgroundWidth, this.backgroundHeight);


          
        
        // draws a rectangle
      // ctx.fillStyle = "skyblue";
      // ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
    }

    //create animate mthod to be invoked in other classes
    animate(ctx) {
        this.drawBackground(ctx);
    }
  }