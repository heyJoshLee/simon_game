$(".quad").on("click", function() {
  lightUp($(this).attr("data-id"));  
})




function lightUp(idx) {
  var quad = $("#quad_" + +idx);
  quad.addClass('on');
  setTimeout(function(){
    quad.removeClass("on")
  }, 300)
};