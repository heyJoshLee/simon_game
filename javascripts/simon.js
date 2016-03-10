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