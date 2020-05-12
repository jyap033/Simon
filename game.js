var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var currLevel =0;

function playSound(color) {

  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();

}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  currLevel++;
  $("h1").text("Level "+currLevel);
}



function animatePressed(currentColor) {

  $("#" + currentColor).addClass("pressed").delay(100).queue(function(next) {
    $(this).removeClass("pressed");
    next();
  });

}



function checkAnswer(currentLevel)
{
console.log(userClickedPattern);
console.log(gamePattern);
console.log(currentLevel);


  if(userClickedPattern[currentLevel-1]=== gamePattern[currentLevel-1] )
  {

console.log("success");
if( userClickedPattern.length === gamePattern.length)
{

  setTimeout(nextSequence, 1000);
  userClickedPattern =[];
}


  }
  else{
    // $("h1").text("Lost ");
    $("h1").text("Wrong!  Press any Key to try again");
  startover();
    var audio = new Audio("sounds/wrong.mp3");

    audio.play();
    $("body").addClass("game-over").delay(100).queue(function(next) {
      $(this).removeClass("game-over");
      next();
    });



  }





}



function startover(){
  currLevel =0;
  userClickedPattern =[];
  gamePattern =[];


}


$(".btn").click(function(event) {

  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  $("#" + userChosenColour).fadeOut(100).fadeIn(100);
  playSound(userChosenColour);
  animatePressed(userChosenColour);
  checkAnswer(userClickedPattern.length);

})



$(document).keypress(function(){
  $("h1").text("Level 0");



nextSequence();


})
