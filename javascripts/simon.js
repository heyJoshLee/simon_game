

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
  this.strict = false;
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
      self.clickQuad(self.sequence[i]);
      i++;

      setTimeout(nextButton, 800);
    } else {
      self.canInput = true;
    }
  }
  nextButton();
}

Game.prototype.startTurn = function() {
  game.canInput = false;
  this.playerPresses = [];
  if (this.correct) {
    this.addPress();
  }
  var self = this;
  setTimeout(function() {
    self.playSequence();

  }, 1000);
}

var game = new Game();
game.init();


function lightUp(idx) {
  var quad = $("#quad_" + +idx);
  quad.addClass('on');
  setTimeout(function(){
    quad.removeClass("on")
  }, 300)
};

$("#on_off_switch").on("click", function() {
  $("#switch").toggleClass("switch_on");
});

$("#start_button, #strict_button").on("click", function() {
  $(this).toggleClass('button_on');
});

$(".quad").on("mousedown", function() {
  if (game.canInput) {
    $(this).addClass("on");
    var id = +$(this).attr("data-id");
    game.playerPresses.push(id);
    var idx = game.playerPresses.length - 1;
    if (game.playerPresses[idx] === game.sequence[idx]) {
      game.correct = true;
    } else {
      game.correct = false;
      game.canInput = false;
      game.startTurn();
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


