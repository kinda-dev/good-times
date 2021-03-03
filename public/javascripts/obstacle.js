const CONSTANTS = {
    OBSTACLE_WIDTH: 100,
    OBSTACLE_HEIGHT: 55,
    // how many frames I move per animation
    // variable speed assigned randomly
    // SPEED: Math.random() * 5 + 1,
    // pullback value to test
    // WAVE_PULLBACK: 1

};

export default class Obstacle {
    constructor(dimensions) {
      this.dimensions = dimensions;
      // obstacle position on x axis
      this.x = 900,

      // I will put like 3 obstacles in an array to cycle them on the screen
      this.obstacles = [
          this.obstacle(this.x),
          this.obstacle(this.x + 100),
          this.obstacle(this.x + 200),
      ]

    }

    obstacle(obstacleStartPoint) {

        const obstacleSpecs = {
            // how many frames I move per animation
            // variable speed assigned randomly
            obstacleSpeed: Math.random() * 5 + 1,
            // obstacle position on y axis
            // randomly calculated as follows Math.random() * (max - min) + min

            obstacleYposition: Math.random() * (450 - 150) + 150,

            obstacleStartPoint: obstacleStartPoint
        }

        return obstacleSpecs;

    }
    
    drawObstacle(ctx) {
        // ctx.clearRect(this.x - CONSTANTS.OBSTACLE_WIDTH, this.y - CONSTANTS.OBSTACLE_HEIGHT, CONSTANTS.OBSTACLE_WIDTH, CONSTANTS.OBSTACLE_HEIGHT);
        // while (true) {
        this.obstacles.forEach(obst => {
            ctx.fillStyle = "orange";


            ctx.fillRect(
                obst.obstacleStartPoint, obst.obstacleYposition, CONSTANTS.OBSTACLE_WIDTH, CONSTANTS.OBSTACLE_HEIGHT);
        });
    }

    // }

    animate(ctx) {

        this.drawObstacle(ctx);
        this.moveObstacle();

    }

    moveObstacle() {

    // // // move obstacles to the left on the orizontal axis
        this.obstacles.forEach(obst => {
            if ( obst.obstacleStartPoint + CONSTANTS.OBSTACLE_WIDTH  < 0) {
                obst.obstacleStartPoint = this.x + (Math.random() * (200 - 1) + 1);
                obst.obstacleSpeed = Math.random() * 5 + 1;
                obst.obstacleYposition = Math.random() * (450 - 150) + 150;

            }
            obst.obstacleStartPoint -= obst.obstacleSpeed;

    });
    }


  }