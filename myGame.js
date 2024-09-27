let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let userChosenColor;
let i = 0;

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 3);
  let randomChosenColor = buttonColors[randomNumber];
  $("." + randomChosenColor)
    .fadeOut("fast")
    .fadeIn("fast");
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  console.log("gamePattern: ", gamePattern);
  userClickedPattern = [];
  console.log("userClickedPattern: ", userClickedPattern);
}

function comparePatterns(array1, array2) {
  for (let n = 0; n < array1.length; n++) {
    if (array1[n] != array2[n]) {
      return false;
    }
  }
  return true;
}

function playSound(sound) {
  switch (sound) {
    case "blue":
      new Audio("./sounds/blue.mp3").play();
      break;
    case "green":
      new Audio("./sounds/green.mp3").play();
      break;
    case "red":
      new Audio("./sounds/red.mp3").play();
      break;
    case "yellow":
      new Audio("./sounds/yellow.mp3").play();
      break;
    case "wrong":
      new Audio("./sounds/wrong.mp3").play();
      break;
  }
}

function levelUp(){
  i += 1;
  $("h1").text("Level " + i);
  setTimeout(() => {
    nextSequence();
  }, 1000);
}

function startGame(){
  i = 1;
  userClickedPattern = [];
  gamePattern = [];
}

function gameOver(){
  $("h1").text("Game Over, Press Any Key to Restart");
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
}

function checkAnswer(){
  if (gamePattern.length == userClickedPattern.length) {
    if (comparePatterns(gamePattern, userClickedPattern)) {
      // console.log(true);
      levelUp();
    } else {
      // console.log(false);
      gameOver();
      startGame();
    }
  }
}

$(".btn").on("click", function () {
  // console.log(this.id);
  userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  $(this).addClass("pressed");
  setTimeout(() => {
    $(this).removeClass("pressed");
  }, 100);
  // console.log("userClickedPattern: ", userClickedPattern);
  // console.log("done");
  checkAnswer();
});

$("body").on("keydown", function () {
  startGame();
  nextSequence();
  $("h1").text("Level " + i);
});
