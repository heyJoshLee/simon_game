

function Game() {
}

Game.prototype.init = function() {
  console.log("new game");
  this.sequence = [];
  this.$count_box = $("#count_display");
  this.updateCountBox();
  this.playerPresses = [];
  this.canInput = false;
  this.correct = true;
  this.speed = 800;
  this.timer;
}

Game.prototype.clickQuad = function(id) {
  var quad = $("#quad_" + id );
  quad.addClass('on');
  setTimeout(function(){
    quad.removeClass("on");
  }, 400);
}

Game.prototype.updateCountBox = function() {
  this.$count_box.html(this.sequence.length);
}

Game.prototype.addPress = function() {
  var num = Math.floor(Math.random() * 4) + 1;
  this.sequence.push(num);
  this.updateCountBox();
  console.log("Added: " + num);
}

Game.prototype.playSequence = function() {
  var i = 0,
      self = this;
  function nextButton() {
    if (i < self.sequence.length) {
      console.log(self.sequence[i]);
      self.clickQuad(self.sequence[i]);
      console.log("audio" + self.sequence[i]);

      self["audio" + +self.sequence[i]].play();
      i++;

      setTimeout(nextButton, game.speed);
    } else {
      self.canInput = true;
    }
  }
  nextButton();
}

Game.prototype.startTurn = function() {
  game.canInput = false;

 if(this.sequence.length > 19 ){
  alert("You Win!");
  this.init();
 }

  this.playerPresses = [];
  if (this.correct) {
    if (this.sequence.length === 5) {
      this.speed -= 100;
    } else if (this.sequence.length  === 9) {
      this.speed -= 100;
    } else if (this.sequence.length === 13){
      this.speed -= 100;
    }
    this.addPress();
  }
  var self = this;
  setTimeout(function() {
    self.playSequence();

  }, 1000);
}

var game = new Game();
game.audio1 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
game.audio2 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
game.audio3 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
game.audio4 = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
game.audio_error = new Audio("http://www.pacdv.com/sounds/interface_sound_effects/beep-5.wav");


game.init();
game.strict = false;


function lightUp(idx) {
  var quad = $("#quad_" + +idx);
  quad.addClass('on');
  setTimeout(function(){
    quad.removeClass("on")
  }, 300)
};

$("#on_off_switch").on("click", function() {
  $("#switch").toggleClass("switch_on");
  game.strict = !game.strict;
  console.log(game.strict);
});

$("#strict_button").on("click", function() {
  $(this).toggleClass('button_on');
});

$("#strict_button").on("click", function() {
  game.strict = !game.strict;
  console.log(game.strict)
});

$("#start_button").on("click", function() {
  game.init();
  game.startTurn();
});

$(".quad").on("mousedown", function() {
  if (game.canInput) {
    $(this).addClass("on");
    var id = +$(this).attr("data-id");
    game.playerPresses.push(id);
    var idx = game.playerPresses.length - 1;
    if (game.playerPresses[idx] === game.sequence[idx]) {
      game.correct = true;
      game["audio" + id].play();
    

    } else {
      game.correct = false;
      game.audio_error.play();
      game.canInput = false;
      if (game.strict) {
         game.init();
      } else {
        game.startTurn();
      }
    }
    if (game.playerPresses.length === game.sequence.length) {
      game.canInput = false;
      if (game.correct) {
        game.startTurn();
      }
    }
  }
});

$(".quad").on("mouseup", function() {
  $(this).removeClass("on");  
});


