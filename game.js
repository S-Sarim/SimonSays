
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userPattern = [];

var gameStart = false;
var level = 0;



$(document).keypress(function(){
    if (!gameStart) {
        $("level-title").text("Level" + level);
        nextSequence();
        gameStart = true; 
    }
}); 



$(".btn").click(function(){
    var userChoice = $(this).attr("id");
    userPattern.push(userChoice);
    playSound(userChoice);
    animatePress(userChoice);
    checkAnswer(userPattern.length -1);
});




function nextSequence(){
    userPattern=[];
    level++;
    $("level-title").text("Level" + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColour = buttonColours[randomNumber];
    gamePattern.push(randomColour);
    console.log(gamePattern);
    function delayedLoop(i) {
        if (i < gamePattern.length) {
            var colour = gamePattern[i];
            $("#" + colour).fadeIn(100).fadeOut(100).fadeIn(100);
            playSound(colour);
            setTimeout(function () {
                delayedLoop(i + 1);
            }, 150);
        }
    }
    delayedLoop(0);
}


function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
    
}


function checkAnswer(curLevel){
    if(gamePattern[curLevel] == userPattern[curLevel]){
        console.log("Sucess!");
        if(userPattern.length == gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game over, Press Any Key To Start Again");
        gameRestart();
    }
}

function gameRestart() {
    level = 0;
    var gamePattern = [];
    var gameStart = false;
}
