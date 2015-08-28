var BubbleShoot = window.BubbleShoot || {};
BubbleShoot.Game = (function($){
	var Game = function(){
		var curBubble;
		this.init = function(){
			$(".but_start_game").bind("click", startGame);
		};
		var startGame = function(){
			$(".but_start_game").unbind("click");
			BubbleShoot.ui.hideDialog();
			curBubble = getNextBubble();
			$("#game").bind("click", clickGameScreen);
		};
		var getNextBubble = function(){
			var bubble = BubbleShoot.Bubble.create();
			bubble.getSprite().addClass("cur_bubble");
			$("#board").append(bubble.getSprite());
			return bubble;
		};
		var clickGameScreen = function(e){
			var angle = BubbleShoot.ui.getBubbleAngle(curBubble.getSprite(), e);
			var duration = 750;
			var distance = 1000;
			var distX = Math.sin(angle) * distance;
			var distY = Math.cos(angle) * distance;
			console.log("Angle: %s\nSin: %s\nCon: %s\nDistX: %s\nDistY: %s", angle, Math.sin(angle), Math.cos(angle), distX, distY);
			var bubbleCoords = BubbleShoot.ui.getBubbleCoords(curBubble.getSprite());
			var coords = {
				x: bubbleCoords.left + distX,
				y: bubbleCoords.top  - distY
			};
			console.log("Bubble coords - x: %s, y: %s\nCords to fire to - x: %s, y: %s", bubbleCoords.left, bubbleCoords.top, coords.x, coords.y);
			BubbleShoot.ui.fireBubble(curBubble, coords, duration);
		};
	};
	return Game;
})(jQuery);