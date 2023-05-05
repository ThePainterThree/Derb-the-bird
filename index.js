// Average browser window size = 1366 x 784
// General guideline: canvas size of 800x600 pixels for simple browser games
/* STEPS:

  1.Create the Canvas and draw on it (background, derb, obstacles)
  2.Move the player
  3.Define the player to the limits of the canvas
  4.Keyboard controls
  5.Game over
  6.Collision detection
  7.Track the score and win
  8.Restart
  9.Finishing up

 */

/* STEPS: Create the Canvas and draw on it (background, derb, obstacles);

  1. startGame function
    1.1 Load game screen and player

  2.Move the player
   2.1 Define the player to the limits of the canvas
   2.2 Keyboard controls

  3. Define obstacles and from where they appear
    3.1 Collision detection
    
  4. Function updateGame
    4.1 Player position
    4.2 Obstacles position
    4.3 Track the score (and win ?)

  5. Function gameOver or gameWon
  
  6.Function reStart
    6.1 Button Restart - eventListener
    6.2 Start new game 

  7.Finishing up (sounds? original drawings?)

 */

  //const canvas = document.getElementById('canvas');
  //const ctx = canvas.getContext('2d');

  // window.onload: add the first screen with the start game button and instructions, after the window loads totally
  
  
  window.onload = () => {
    document.getElementById('start-button').onclick = () => {
      startGame();
    };
};
   
    function playerDerb() { //Player function must be define first than startGame function

      class Player {
      constructor() {
        this.x = 50;   // define initial position for Derb x
        this.y = 50;   // define initial position for Derb y
        const derb = new Image();
        derb.addEventListener('load', () => {
          this.img = derb;  
          this.draw();
        });
        derb.src = "./images/Derb-bird.png"  // adds Derb image
      }
    
      moveLeft(){
        this.x -=20;
      }
      moveRight(){
        this.x +=20;
      }
      moveUp(){
        this.y -=20;
      }
      moveDown(){
        this.y +=20;
      }
  
      draw() {
        ctx.drawImage(this.img, this.x, this.y, 50, 100); //Define the size of derb
      }
    }
    return new Player();
  }


    function startGame() {
        const canvas = document.getElementById("game-area");
        const ctx = canvas.getContext("2d");
        // Set the canvas dimensions to match the viewport or is not necessary?
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
   
        // create the player
        const player = new Player();
    }
  
  
    
    