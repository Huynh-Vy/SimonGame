let buttonColors = ['red', 'blue', 'yellow', 'green']; //array variable to store color buttons

let gamePattern = [];

let userClickedPattern = [];

let level = 0;

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

$(".btn").click(function() {
  let userChosenColour = $(this).attr("id");//get the id attribute of the button of it is clicked

  userClickedPattern.push(userChosenColour);//add colors that user choose in the array

  playSound(userChosenColour); //play sound once user click on random buttons

  animatePress(userChosenColour);//add animate once button is clicked

  //check user answer with the index of last answer in user sequence
  checkAnswer(userClickedPattern.length - 1);

})

//call next sequence function when the keyboard pressed, the game started when the key board pressed
$(document).keypress(function () {
  nextSequence();

  $("#level-title").text("Level 0");//change h1 text when the game started
})


function nextSequence() {
  //Once nextSquence() is triggered, reset the userClickedPattern array to empty to ready for the next level
  userClickedPattern = [];

  level++;//increase level number by 1

  $("#level-title").text("Level " + level);//update h1 text with level number

  let randomNumber = Math.floor(Math.random() * 4);

  let randomChosenColor = buttonColors[randomNumber];//variable to store random color button

  gamePattern.push(randomChosenColor);//add the variable to the end of array

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  //play audio randomly corresponding to the random color
  playSound(randomChosenColor);

}

//animate function once user click on button
function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");

  setTimeout(function() {
    $("."+ currentColour).removeClass("pressed");
  }, 100);
}


function checkAnswer(currentLevel) {
  //check if user click pattern is the same with game pattern
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    //check if user have finished their sequence
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence()//call the nextSquence function after 1000ms delay
      }, 1000);
      //reset the array of user answers to empty array to start next level
      userClickedPattern.splice(0, userClickedPattern.length); 
    }
  } else {//if one of user click pattern is not the same with game pattern
    console.log("wrong");

    $("body").addClass("game-over");//add game-over class to the body

    setTimeout(function() {
      $("body").removeClass("game-over")//remove game-over class after 200ms
    }, 200)

    $("#level-title").text("Game Over, Press Any Key To Start");//update h1 text

    let audio = new Audio("sounds/wrong.mp3");
    audio.play();

    startOver(); //call startOver()
  }
  
}

function startOver() {
  level = 0;
  gamePattern = []; 
}


























