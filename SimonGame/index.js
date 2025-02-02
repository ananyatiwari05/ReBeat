//empty array for storing user chosen game pattern
var userPattern = [];
//array to store the four four colors
var buttonColors = ["green", "red", "yellow", "blue"];
//empty array for storing game pattern
var gamePattern = [];
var started = false;
var level = 0;
$(document).keydown(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    started = true;
    nextSequence();
    console.log("keypressed");
  }
});

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  //storing id of the chosen color inside the variable userChosencolor
  userPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (userPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 100);
    } 
    }
    else {
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
  }
}

//function to generate random numbers between 0 to 3
function nextSequence() {
  //Once nextSequence() is triggered, we reset the userClickedPattern to an empty array ready for the next level.
  userPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);
  $("#" + randomColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomColor);
}
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
