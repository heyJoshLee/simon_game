$(".quad").on("click", function() {
  lightUp($(this).attr("data-id"));  
})

function Game() {

}

Game.prototype.initialize = function() {
  console.log("new game")
}

var game = new Game();



function lightUp(idx) {
  var quad = $("#quad_" + +idx);
  quad.addClass('on');
  setTimeout(function(){
    quad.removeClass("on")
  }, 300)
};

$("#on_off_switch").on("click", function() {
  console.log("witch")
  $("#switch").toggleClass("switch_on");
});

$("#start_button, #strict_button").on("click", function() {
  $(this).toggleClass('button_on');
  console.log("clock");
});