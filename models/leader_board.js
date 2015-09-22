var leaderBoardPath = "leader_board.txt";
var fs = require('fs');

exports.getBoard = function(callback){
	var board = null;
	fs.readFile(leaderBoardPath, "utf8", function(err, data){
		callback( JSON.parse(data) );
	});
};

exports.checkForHighness = function(score, passedCallback, failedCallback){
	var position = null;
	fs.readFile(leaderBoardPath, "utf8", function(err, data){
		var board = JSON.parse(data);
		for(var i = 0; i < board.length; i++){
			if(score > board[i].highScore){
				position = i; break;
			}
		}
		if(position || position === 0)
			passedCallback(position);
		else
			failedCallback();
	});
};

exports.putInPosition = function(entry, position, callback){
	fs.readFile(leaderBoardPath, "utf8", function(err, data){
		var board = JSON.parse(data);
		board.splice(position, 0, entry);
		fs.writeFile(leaderBoardPath, JSON.stringify(board), function(){
			callback();
		});
	});
};