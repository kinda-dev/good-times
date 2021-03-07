const CONSTANTS = {
    REWARD_WIDTH: 40,
    REWARD_HEIGHT: 40,

};

export default class Reward {
    constructor(dimensions) {
      this.dimensions = dimensions;
      // obstacle position on x axis
      this.x = 900,

      // I will put like 3 obstacles in an array to cycle them on the screen
      this.rewards = [
          this.reward(this.x),
          this.reward(this.x + 100),
        //   this.reward(this.x + 200),
      ]

    }

    reward(rewardStartPoint) {

        const rewardSpecs = {
            rewardSpeed: Math.random() * 5 + 1,
            rewardYposition: Math.random() * (450 - 150) + 150,
            rewardStartPoint: rewardStartPoint,
        }

        return rewardSpecs;

    }
    
    drawreward(ctx) {
        const shaka = new Image();
        shaka.src = 'https://good-times-surfing-game.s3-us-west-1.amazonaws.com/shaka.png'
        this.rewards.forEach(rew => {

            ctx.drawImage(shaka, 0, 0, 356, 293, rew.rewardStartPoint, rew.rewardYposition, CONSTANTS.REWARD_WIDTH, CONSTANTS.REWARD_HEIGHT);

        //     ctx.fillStyle = "red";


        //     ctx.fillRect(
        //         rew.rewardStartPoint, rew.rewardYposition, CONSTANTS.REWARD_WIDTH, CONSTANTS.REWARD_HEIGHT);
        });
    }

    

    animate(ctx) {

        this.drawreward(ctx);
        this.moveReward();

    }

    moveReward() {

    // // // move rewacles to the left on the orizontal axis
        this.rewards.forEach(rew => {
            if ( rew.rewardStartPoint + CONSTANTS.REWARD_WIDTH  < 0) {
                rew.rewardStartPoint = this.x + (Math.random() * (200 - 1) + 1);
                rew.rewardSpeed = Math.random() * 5 + 1;
                rew.rewardYposition = Math.random() * (450 - 150) + 150;

            }
            rew.rewardStartPoint -= rew.rewardSpeed;

    });
    }

    collidesWith(dude) {
        const _overlap = (obj1, obj2) => {
            if ((obj1.rewardStartPoint > obj2.right || 
                obj1.rewardStartPoint + CONSTANTS.REWARD_WIDTH < obj2.left)) {
                    return false;
                }
            if ((obj1.rewardYposition > obj2.bottom || 
                obj1.rewardYposition + CONSTANTS.REWARD_HEIGHT < obj2.top)) {
                    return false;
                }
            return true
        }







        let collision = false;
        this.rewards.forEach(rew => {
            //check that they don't overlap in the x axis or the y axis
            if ( _overlap(rew, dude) ) { 
                rew.rewardStartPoint = this.x + (Math.random() * (200 - 1) + 1);
                rew.rewardSpeed = Math.random() * 5 + 1;
                rew.rewardYposition = Math.random() * (450 - 150) + 150;
                collision = true; 
            } 
        });
        return collision;

        
    }

  }