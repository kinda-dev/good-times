export default class Background {
    constructor(dimensions) {
      this.dimensions = dimensions;
    }
  
    drawBackground(ctx) {
        const background = new Image();
        background.src = 'https://good-times-surfing-game.s3-us-west-1.amazonaws.com/background.png';
        ctx.drawImage(background, 0, 0, this.dimensions.width, this.dimensions.height);

        // draws a rectangle
    //   ctx.fillStyle = "skyblue";
    //   ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
    }

    //create animate mthod to be invoked in other classes
    animate(ctx) {
        this.drawBackground(ctx);
    }
  }