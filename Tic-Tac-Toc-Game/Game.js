$(document).ready(function () {

  var curButton;
  var count = 9;
  var scroeX = 0;
  var scroeO = 0;
  // var random = 0;
  var computerTurn;
  // var curIndex=0;
  // var timer;
  // var status = false;
  var newButton;
  var arrIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  var player = false;
  var computerGame = false;

  $(".two-player").click(function () {
    console.log(computerGame, "computer_twoPlayer");
    changePage();
    startGame();
    computerGame = false;
    player = false;
  });

  function changePage() {
    $(".game-choice").fadeOut(1000);
    $(".game-starter").fadeIn(1000);
  }


  function randomClick() {
    if (player && computerGame) {
      setTimeout(function () {
        var num = getRandom();
        $("#" + num).text(computerTurn);
        $(".showTurn").text("It\'s  " + curButton + "\'s turn");
        count--;
        residualArr(num);
        console.log(count, "countComputer");

        console.log(residualArr, "starthahahh");
        whoWin(computerTurn);
        arrIsZero();
      }, 500);

      player = false;
      
     


    }
  }

  function getArr() {
    arrIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }

  function arrIsZero() {
    if (arrIndex.length === 0) {
      isDrawNot();
      setFirstButton();
    }
  }


  function whoWin(who) {
    if (checkForWinner(who)) {
      $(".showTurn").text("Congratulation," + who + " YOU Win");
      if (who === "O") {
        scroeO++;
        $(".score-2 span").text(scroeO);
      } else if (who === "X") {
        scroeX++;
        $(".score-1 span").text(scroeX);
      }
      if (who === computerTurn) {
        console.log("who_computer", who);
         $(".showTurn").text("oh, " + who + " YOU Lost ");
        $(".game-message").text("haha, "+ curButton + ", You Lost !!!:(").fadeIn(1400);
      } else if (who === curButton) {
        console.log("who_cur", who);
         $(".showTurn").text("Congratulation," + who + " YOU Win");
        $(".game-message").text(curButton + ", You Win !!!:)").fadeIn(1400);
        player = false;
      }

      $(".game-message").fadeOut(1700);
      clearBorad();
      getArr();
      setFirstButton();

    }
  }

  function getRandom() {
    var randomNum = 0;
    if (count === 1) {
      randomNum = 0;
    } else if (count > 1) {
      randomNum = Math.floor(Math.random() * count);
      console.log(count, "count_random");
    }
    console.log(randomNum, "randomNum ");
    return arrIndex[randomNum];
  }

  function whoStart(play, computer) {
    var step = Math.floor(Math.random() * 10);
    if (step % 2 === 1) {
      console.log(play, "start");
      return play;

    } else if (step % 2 === 0) {
      console.log(computer, "start_start");
      return computer;
    }
  }


  function firstClick(button) {
    var nowIndex = getRandom();
    $("#" + nowIndex).text(button);
    count--;
    residualArr(nowIndex);
  }


  function isDrawNot() {
    $(".game-message").text("It was a draw .. -_-!!").fadeIn(900);
    $(".game-message").fadeOut(1900);
    clearBorad();
    getArr();
  }

  function clearBorad() {
    setTimeout(function () {
      $("td").each(function () {
        $(".square").text("");
      });

    }, 1000);
    count = 9;
  }

  function setFirstButton() {
    if (newButton === computerTurn) {

      setTimeout(function () {
        $(".showTurn").text(computerTurn + "  gets to start.");
        firstClick(computerTurn);
        // player = false;
      }, 2000);

    }

  }
  $(".one-player").click(function () {

    changePage();
    computerGame = true;
    $(".game-starter .choice-x,.game-starter .choice-o").click(function () {
      if (computerGame) {
        curButton = $(this).text();
        if (curButton === "X") {
          computerTurn = "O";
        } else if (curButton === "O") {
          computerTurn = "X";
        }
        newButton = whoStart(curButton, computerTurn);
        $(".showTurn").text(newButton + "  gets to start.");
        setFirstButton();
        console.log(curButton, computerTurn);
        initStart();

      }

    });
  });


  function goBack() {
    $(".game-starter").fadeOut(900);
    $(".game-choice").fadeIn(900);
  }
  $(".back").click(function () {
    goBack();
  });

  function initStart() {
    $(".game-starter").fadeOut(900);
    $(".border-box").fadeIn(900);
    $(".title").fadeOut(900);
    $(".showTurn").fadeIn(700);
    $(".bottom-footer").fadeOut(900);
    $(".board-bottom").fadeIn(900);
  }

  function startGame() {

    $(".game-starter .choice-x,.game-starter .choice-o").click(function () {
      var btn = $(this).text();

      console.log("btn", btn);
      curButton = btn;
      initStart();
      getMessage(curButton);

    });
  }


  function getMessage(msg) {
    $(".title").hide();
    $(".showTurn").show();
    $(".showTurn").text(msg + "  gets to start.");
  }

  function residualArr(now) {
    for (var i = 0; i < arrIndex.length; i++) {
      if (arrIndex[i] === now) {
        arrIndex.splice(i, 1);
      }
    }
    console.log(arrIndex, "residualArr");
  }

  $("tr .square").click(function () {
    if ($(this).text() === "" && !computerGame) {
      $(this).text(curButton);
      count--;

      switchTurn();
      fullTd();
    } else if ($(this).text() === "" && computerGame && !player) {
       player = true;
      $(this).text(curButton);

      var curNum = $(this).attr("id");
      count--;
      residualArr(Number(curNum));

      $(".showTurn").text("It\'s  " + computerTurn + "\'s turn");
      whoWin(curButton);
      randomClick();





    } else {
      return;
    }

  });


  function checkForWinner(move) {
    var result = false;
    if (checkRow(1, 2, 3, move) ||
      checkRow(4, 5, 6, move) ||
      checkRow(7, 8, 9, move) ||
      checkRow(1, 4, 7, move) ||
      checkRow(2, 5, 8, move) ||
      checkRow(3, 6, 9, move) ||
      checkRow(1, 5, 9, move) ||
      checkRow(3, 5, 7, move)) {

      result = true;

    }
    return result;
  }

  function checkRow(a, b, c, move) {
    var result = false;
    if (getBox(a) === move && getBox(b) === move && getBox(c) === move) {
      result = true;


      function winStyle() {
        $("#" + a).addClass("win");
        $("#" + a).css("color", "green");
        $("#" + b).addClass("win");
        $("#" + b).css("color", "green");
        $("#" + c).addClass("win");
        $("#" + c).css("color", "green");
      }
      console.log(a, b, c);


      function hideStyle() {
        $("#" + a).removeClass("win");
        $("#" + a).css("color", "#fff");
        $("#" + b).removeClass("win");
        $("#" + b).css("color", "#fff");
        $("#" + c).removeClass("win");
        $("#" + c).css("color", "#fff");
      }
      setTimeout(winStyle, 400);
      setTimeout(hideStyle, 1700);

      console.log($("#" + a).css("background-color"));
      console.log($("#" + b).css("background-color"));
      console.log($("#" + c).css("background-color"));
    }
    return result;

  }

  function getBox(number) {
    console.log($('#' + number).text());

    return $('#' + number).text();

  }

  function switchTurn() {
    if (checkForWinner(curButton)) {

      $(".showTurn").text("Congratulation," + curButton + " YOU Win");
      getLoop();

    } else if (curButton === "X") {
      curButton = "O";
      $(".showTurn").text("It\'s  " + curButton + "\'s turn");
    } else {
      curButton = "X";
      $(".showTurn").text("It\'s  " + curButton + "\'s turn");
    }

  }

  function getLoop() {
    if (curButton === "O") {
      scroeO++;
      $(".score-2 span").text(scroeO);
    } else if (curButton === "X") {
      scroeX++;
      $(".score-1 span").text(scroeX);
    }
    $(".game-message").text(curButton + ", You Win !!!:)").fadeIn(1400);
    $(".game-message").fadeOut(1700);
    clearBorad();
  }


  function isDraw() {
    if (count === 0) {
      $(".game-message").text("It was a draw .. -_-!!").fadeIn(900);
      $(".game-message").fadeOut(1900);
      clearBorad();
    } else {
      return;
    }
    return;
  }

  function fullTd() {
    $(".square").each(function () {
      console.log(count, "count2222");
      isDraw();
    });
  }

  function clearBox() {
    $(".game-choice").fadeIn(700);
    $(".border-box").fadeOut(900);
    $(".title").fadeIn(700);
    $(".showTurn").fadeOut(900);
    $(".bottom-footer").fadeIn(700);
    $(".board-bottom").fadeOut(900);
    $(".square").each(function () {
      $(".square").text("");
    });
    $(".game-message").fadeOut(900);
    scroeX = 0;
    scroeO = 0;
    count = 9;
    newButton = null;
    computerTurn = null;
    curButton = null;
    arrIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    computerGame = false;
    player = false;
    $(".score-1 span").text(scroeX);
    $(".score-2 span").text(scroeO);
  }

  $(".reset").click(function () {
    clearBox();
  });
});