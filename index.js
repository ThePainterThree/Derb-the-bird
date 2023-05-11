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


  const canvas = document.getElementById("game-area");
  const ctx = canvas.getContext("2d");
  const CANVAS_WIDTH = canvas.width = 1200;
  const CANVAS_HEIGHT = canvas.height = 684;
  const backgroundImg = new Image;
  backgroundImg.src = "./Images/Untitled_Artwork 2.png";
  const derbImg = new Image();
  derbImg.src = "./Images/Derb-1.png";
  const obstaclesImg = new Image();
  obstaclesImg.src = "./Images/baseballBall.png";
  let obstacles = [];
  let frames = 0;
  let derbLives= 3;


  let music = new Audio("./Images/POL-bits-and-beats-short 2.wav");
  music.volume =0.1;
  let hit = new Audio ("./Images/ES_Slip Crash - SFX Producer.mp3")
  hit.volume = 0.2;
  let loser = new Audio ("./Images/ES_Laugh - SFX Producer.mp3");
  loser.volume = 0.3;
  let win = new Audio ("./Images/1819_applause-02.mp3");
  win.volume = 0.3;

  let obstaclesImages = ["./Images/baseballBall.png", "./Images/chinelo.png", "./Images/flyingTuna.png", "./Images/cuecas.png"]
  let randomObjects = obstaclesImages[Math.floor(Math.random()*obstaclesImages.lenght)];

  
   
  const backgroundImage = {

    img: backgroundImg,
    x: 0,
    speed: -3,

    move: function() {
      this.x += this.speed;
      this.x %= canvas.width;
    },

    draw: function() {
      ctx.drawImage(this.img, this.x, 0, 3000, 784);    
      ctx.drawImage(this.img, this.x + this.img.width, 0, 1500, 784);                    
    },

    update(){
      this.move();
      this.draw();
    }
  };


  window.onload = () => {
    document.getElementById('start-button').onclick = () => {
      startGame();
    };

    function startGame() {
      
      document.getElementById("game-instructions").style.display = "none";
      document.getElementsByClassName("game-intro")[0].style.display = "none";
      document.getElementById("game-area").style.display="block";
      updateGame();
      music.play();
      
    }
  };

let requestId

  function updateGame() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundImage.update(); //includes move and draw method for the background
    derb.update(); // includes move and draw method for Derb
    generateObstacles();
    collisionDetection(derb, obstacles);
    score();
    playerLives();
    checkGameOver();

    requestId = requestAnimationFrame(updateGame);

    if (checkGameOver()){
      cancelAnimationFrame(requestId);
            hit.pause();
            loser.play();
            music.pause();
            win.pause();
    }
    if(score()){
      cancelAnimationFrame(requestId);
            hit.pause();
            loser.pause();
            music.pause();
            win.play();
    }
  };

      const derbPosition2 = new Image();
      derbPosition2.src = "./Images/Derb-2.png";
      const derbPosition3 = new Image();
      derbPosition3.src = "./Images/Derb-3.png";
      const derbPosition4 = new Image();
      derbPosition4.src = "./Images/Derb-4.png";

    class Player {
      constructor() {
      this.x = 40;   // define initial position for Derb x
      this.y = 270;   // define initial position for Derb y
      this.img = derbImg;
      this.width = 220     // 150 size of derb
      this.height = 160    // 150 size of derb
      
      }
  
        draw() {
          
          ctx.drawImage(this.img, 0, 0, 960, 520, this.x, this.y, this.width, this.height);
        }

        move(){
          document.onkeydown = event => {
          const key = event.keyCode;
              switch (key) {
                case 38: // up
                  if(this.y > 10) 
                  this.y -=30;
                  this.img = derbPosition2;
                  break;
                case 40: // down
                  if (this.y < 540) 
                  this.y +=30;
                  this.img = derbPosition3;
                  break;
                case 37: // left
                  if (this.x >10) 
                  this.x -=30;
                  this.img = derbImg;
                  break;
                case 39: // right
                  if (this.x < 1030) 
                  this.x +=30;
                  this.img = derbPosition4;
                  break;
              }
            }
          }

          update(){
            this.draw();
            this.move();
          }
      }

    let derb = new Player();


    /* const chinelo = new Image();
    chinelo.src = "./Images/chinelo.png";
    const tuna = new Image();
    tuna.src = "./Images/flyingTuna.png"; */


     
      // Game over

      function checkGameOver(){
        if(derbLives === 0) {
          document.getElementById("game-area").style.display = "none";
          document.getElementById("winner").style.display = "none";
          document.getElementById("game-over").style.display = "block";
          music.pause();
          hit.pause();
          win.pause();
          loser.play();
          return true;
        }
      }


      //Lives

        function playerLives(){
          ctx.font = "30px Lato"
          ctx.fillStyle = 'black';
          ctx.fillText(`Lives: ${derbLives}`, 1050, 40);
          }


      //Score and // Win GAME !

        function score(){
          let points = Math.floor(frames / 60);
          ctx.font = "20px Lato"
          ctx.fillStyle = 'black';
          ctx.fillText(`Score: ${points}`, 1051, 70);

          if (points>120){
            document.getElementById("game-area").style.display = "none";
            document.getElementById("game-over").style.display = "none";
            document.getElementById("winner").style.display = "block";
            hit.pause();
            loser.pause();
            music.pause();
            win.play();
          }
        }


        //Restart button

        document.getElementById("restartButton").onclick = () => {
          restartGame();
        };

        document.getElementById("restartButton2").onclick = () => {
          restartGame();
        };


        function restartGame(){
          document.getElementById("game-over").style.display = "none";
          document.getElementById("winner").style.display = "none";
          document.getElementById("game-area").style.display = "block";
          resetGame();
          updateGame();
          music.play();
        }


        function resetGame() { 
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          backgroundImage.update();
          derb.x = 150;
          derb.y = 150;
          derb.update()
          obstacles = [];
          derbLives = 3;
          frames = 0;
        }
