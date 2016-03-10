

function Game() {
}

Game.prototype.init = function() {
  console.log("new game");
  this.sequence = [];
  this.$count_box = $("#count_display");
  this.updateCountBox();
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
  // this.clickQuad(num);
  this.sequence.push(num);
  this.updateCountBox();
}

Game.prototype.playSequence = function() {
  var i = 0,
      self = this;
  function nextButton() {
    if (i < self.sequence.length) {
      self.clickQuad(self.sequence[i]);
      i++;

      setTimeout(nextButton, 800);
    }
  }
  nextButton();
}

Game.prototype.startTurn = function() {
  this.addPress();
  this.playSequence();
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
  $(this).addClass("on");  
});

$(".quad").on("mouseup", function() {
  $(this).removeClass("on");  
});


