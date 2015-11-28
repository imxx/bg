var leaderBoardPath = "leader_board.txt";
var fs = require('fs');

exports.getBoard = function(callback){
	fs.readFile(leaderBoardPath, "utf8", function(err, data){
		var board = data ? JSON.parse(data) : [];
		callback( board );
	});
};

exports.checkForHighness = function(score, passedCallback, failedCallback){
	var position = null;
	fs.readFile(leaderBoardPath, "utf8", function(err, data){
		var board = data ? JSON.parse(data) : [];
		for(var i = 0; i < board.length; i++){
			if(score > board[i].score){
				position = i; break;
			}
		}
		if(board.length < 15 && position === null)
			position = board.length;
		if(position || position === 0)
			passedCallback(position);
		else
			failedCallback();
	});
};

exports.putInPosition = function(entry, position, callback){
	console.log("Entry score --> " + entry.score);
	fs.readFile(leaderBoardPath, "utf8", function(err, data){
		var board = data ? JSON.parse(data) : [];
		board.splice(position, 0, entry);
		fs.writeFile(leaderBoardPath, JSON.stringify(board), function(){
			callback();
		});
	});
};