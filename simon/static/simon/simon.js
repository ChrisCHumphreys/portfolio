  //universal variables
var allow = true;

function green(power) {
  // lights up green  corner and plays sound - power must be on

  if ((power == true)) {
    var sound = "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3";
    $.playSound(sound);
    $("#greenButton").css({
      fill: "#00ff00"
    });
    setTimeout(function() {
      $("#greenButton").css({
        fill: "#00cd00"
      });
    }, 800);
  }

}

function yellow(power) {
  // lights up yellow corner and plays sound - power must be on
  if (power == true) {
    var sound = "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3";
    $.playSound(sound);
    $("#yellowButton").css({
      fill: "#ffff00"
    });
    setTimeout(function() {
      $("#yellowButton").css({
        fill: "#e6e600"
      });
    }, 800);
  }
}

function blue(power) {
  // lights up blue corner and plays sound - power must be on
  if (power == true) {
    var sound = "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3";
    $.playSound(sound);
    $("#blueButton").css({
      fill: "#0000ff"
    });
    setTimeout(function() {
      $("#blueButton").css({
        fill: "#0000cd"
      });
    }, 800);
  }
}

function red(power) {
  // lights up red corner and plays sound - power must be on
  if (power == true) {
    var sound = "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3";
    $.playSound(sound);
    $("#redButton").css({
      fill: "#ff0000"
    });
    setTimeout(function() {
      $("#redButton").css({
        fill: "#cd0000"
      });
    }, 800);
  }

}

function togglePower(power) {
  // function that switches power switch returns true if turning on, false if turning off.
  if ($("#offOn").attr("x") == "420") {
    $("#offOn").attr("x", "404.01407");
    $("#tspan3822").html("<tspan sodipodi:role='line' id='tspan3822'></tspan>");
    $("#strictLight").css("fill", "#3c0000");
    clearInterval(interval);
    return false;
  } else {
    $("#offOn").attr("x", "420");
    $("#tspan3822").html("<tspan sodipodi:role='line' id='tspan3822'>00</tspan>");
    allow = true;
    return true;
  }
}

function toggleStrict(power) {
  // toggles strict mode on and off - power must be on, returns true if strict is on, false if not. returns -1 for error
  if (power == true) {
    if ($("#strictLight").css("fill") == "rgb(60, 0, 0)") {
      $("#strictLight").css("fill", "#ff0000");
      return true;
    } else {
      $("#strictLight").css("fill", "#3c0000");
      return false;
    }
  }
}

function startGame(power) {
  // start a game, if game is powered, returns array of numbers that will work for game if everything goes right, if not returns -1;
  if (power == true) {
    var sequence = [];
    // assigns 20 random colors to array
    for (var i = 0; i < 20; i++) {
      sequence.push((Math.floor((Math.random() * 4) + 1)));
    }
    return sequence;
  }
  return -1;
}

function playColors(power, array, num, loss) {
  // takes in an array, and plays corresponding colors and notes, also requires power
  if (loss == true) {
    var i = (-3);
  } else {
    var i = 0;
  }

  allow = false;
  // takes away ability to press button while pattern is playing
  interval = setInterval(function() {
    if (i < 0) {
      if (i < -1) {
        red(power);
        $("#tspan3822").html("<tspan sodipodi:role='line' id='tspan3822'>" + "!!" + "</tspan>");
      };
      i++;
    }
    if ((i < num) && (i >= 0)) {
      loss = false;
      countIncrease(power, num - 2);
      if (array[i] == 1) {
        green(power);
      } else if (array[i] == 2) {
        red(power);
      } else if (array[i] == 3) {
        yellow(power);
      } else if (array[i] == 4) {
        blue(power);
      } else {
        clearInterval(interval);
      }
      i++;
      if (i == num) {
        // if pattern is done, gives back power to push buttons
        allow = true;
      }
    }
  }, 1000);
}

function lose(power, score) {
  allow = false
  var i = 0;
  interval = setInterval(function() {
    if (i < 3) {
      red(power);
      i++;
      $("#tspan3822").html("<tspan sodipodi:role='line' id='tspan3822'>" + "!!" + "</tspan>");
    } else {
      clearInterval(interval);
    }
    if (i == 3) {
      allow = true;
      countIncrease(power, score);
    }
  }, 1000)
}

function winGame(power) {
  allow = false
  var i = 0;
  interval = setInterval(function() {
    if (i < 3) {
      green(power);
      red(power);
      blue(power);
      yellow(power);
      i++;
    } else {
      clearInterval(interval);
    }
    if (i == 3) {
      allow = true;
    }
  }, 1000);
}

function countIncrease(power, num) {
  // takes in a score, increases score on machine, returns increases score.
  if (power == true) {
    num += 1;
    if (num > 8) {
      var score = num + 1;
    } else {
      score = "0" + (num + 1).toString()
    }
    $("#tspan3822").html("<tspan sodipodi:role='line' id='tspan3822'>" + score + "</tspan>");
    return num;
  }
}

function checkTurn(press, score, power, array) {
  if (press >= score) {

    playColors(power, array, score + 1);

    return true;
  }
}

$(document).ready(function() {

  var power = false;
  var interval = null;
  // array of number 1-4 that will be game numbers
  var gameArray = [""];
  var score = 0;
  var playerArray = [];
  var press = 0;
  var strict = false;
  allow = true;
  var win = 20;

  $("#offOn").click(function() {
    power = togglePower(power);
    if (power == false) {
      gameArray = [""];
      score = 0;
      playerArray = [];
      press = 0;
      strict = false;
    }
  });

  $("#redButton").click(function() {
    if (allow == true) {
      // wont allow button press if currently playing a pattern
      red(power);
      if (gameArray != "") {
        //playerArray.push(2);
        if (gameArray[press] != 2) {
          if (strict == false) {
            press = 0;
            playerArray = [];
            playColors(power, gameArray, score + 1, true);
            //playColors(power, gameArray, score + 1);
          } else {
            press = 0;
            gameArray = [];
            score = 0;
            lose(power, score - 2);
          }
        } else {
          press++;
          if (press == win) {
            countIncrease(power, score);
            winGame(power, score);
            gameArray = [];
            score = 0;
            press = 0;
            countIncrease(power, -2);
          } else {
            if (press > score) {
              score = countIncrease(power, score);
              press = 0;
              playColors(power, gameArray, score + 1);
            }
          }
        }
      }
    }
  });

  $("#yellowButton").click(function() {
    if (allow == true) {
      // wont allow button press if currently playing a pattern
      yellow(power);
      if (gameArray != "") {
        //playerArray.push(2);
        if (gameArray[press] != 3) {
          if (strict == false) {
            press = 0;
            playerArray = [];
            playColors(power, gameArray, score + 1, true);
            //playColors(power, gameArray, score + 1);
          } else {
            press = 0;
            gameArray = [];
            score = 0;
            lose(power, score - 2);
          }
        } else {
          press++;
          if (press == win) {
            countIncrease(power, score);
            winGame(power, score);
            gameArray = [];
            score = 0;
            press = 0;
            countIncrease(power, -2);
          } else {
            if (press > score) {
              score = countIncrease(power, score);
              press = 0;
              playColors(power, gameArray, score + 1);
            }
          }
        }
      }
    }
  });

  $("#blueButton").click(function() {
    if (allow == true) {
      // wont allow button press if currently playing a pattern
      blue(power);
      if (gameArray != "") {
        //playerArray.push(2);
        if (gameArray[press] != 4) {
          if (strict == false) {
            press = 0;
            playerArray = [];
            playColors(power, gameArray, score + 1, true);
            //playColors(power, gameArray, score + 1);
          } else {
            press = 0;
            gameArray = [];
            score = 0;
            lose(power, score - 2);
          }
        } else {
          press++;
          if (press == win) {
            countIncrease(power, score);
            winGame(power, score);
            gameArray = [];
            score = 0;
            press = 0;
            countIncrease(power, -2);
          } else {
            if (press > score) {
              score = countIncrease(power, score);
              press = 0;
              playColors(power, gameArray, score + 1);
            }
          }
        }
      }
    }
  });

  $("#greenButton").click(function() {
    if (allow == true) {
      // wont allow button press if currently playing a pattern
      green(power);
      if (gameArray != "") {
        //playerArray.push(2);
        if (gameArray[press] != 1) {
          if (strict == false) {
            press = 0;
            playerArray = [];
            playColors(power, gameArray, score + 1, true);
            //playColors(power, gameArray, score + 1);
          } else {
            press = 0;
            gameArray = [];
            score = 0;
            lose(power, score - 2);
          }
        } else {
          press++;
          if (press == win) {
            countIncrease(power, score);
            winGame(power, score);
            gameArray = [];
            score = 0;
            press = 0;
            countIncrease(power, -2);
          } else {
            if (press > score) {
              score = countIncrease(power, score);
              press = 0;
              playColors(power, gameArray, score + 1);
            }
          }
        }
      }
    }
  });

  $("#strict").click(function() {
    strict = toggleStrict(power);
  });

  $("#start").click(function() {
    if ((allow == true) && (power == true)) {
      // msut have power and ability to push for this to work
      gameArray = startGame(power);
      //gameArray = ["3", "3", "1", "3", "3", "3", "3", "3", "3", "3", "3", "3", "3"];
      score = 0;
      press = 0;
      countIncrease(power, -1);
      playColors(power, gameArray, score + 1);
    }
  });
})