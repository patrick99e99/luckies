$(document).ready(function() {
  $("#boxtop").click(function() {
      $(".box").animate({"top": "-=50px"}, "slow");
  });
  $("#boxbottom").click(function() {
      $(".box").animate({"top": "+=50px"}, "slow");
  });
  $("#boxlefttop,#boxleftbottom").click(function() {
      $(".box").animate({"left": "-=50px"}, "slow");
  });
  $("#boxrighttop,#boxrightbottom").click(function() {
      $(".box").animate({"left": "+=50px"}, "slow");
  });
 
  $("#call_lucky").click(function() {
  		var r_top = $(".box").css('top');
  		var r_left = $(".box").css('left');
		$('#comp_box').animate({'top': r_top, 'left': r_left}, 'slow');
  });

  var q = setInterval(function() { animateCompBox(); }, 2000);
})

function animateCompBox() {
	var lucky = $('#comp_box');

	var direction = getRandomItem(["top", "left"]);
	var amount = Math.floor(Math.random() * 250);
	var positive = Math.floor(Math.random() * 2);

	var sign = (positive == 0) ? "-=" : "+=";

	var obj = {};
	obj[direction] = sign + amount;

	lucky.animate(obj, "slow");
}

function getRandomItem(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}
