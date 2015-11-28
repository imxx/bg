var BubbleShoot = window.BubbleShoot || {};
BubbleShoot.LeaderBoard = (function($){
	var LeaderBoard = {
		getLeaderList: function(callback){
			$.get("/leader_board", {}, function(data){
				callback(data);
			});
		},
		checkForHighness: function(score, callback){
			console.log("check_for_highness");
			$.post("/check_for_highness", {score: score}, function(data){
				console.log(data);
				if(data.status == true){
					console.log("status == true");
					callback(data.position);
				}
			});
		},
		addHighscoreEntry: function(entry, callback){
			console.log(entry);
			$.post("/add_high_score_entry", entry, function(data){
				callback();
			});
		}
	};
	return LeaderBoard;
})(jQuery);