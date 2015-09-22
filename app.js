var express = require("express");
var app =  express();
var bodyParser = require("body-parser");
var leaderBoard = require("./models/leader_board");

app.use(express.static("public"));
app.use(express.static("public/views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
//app.use(express.static("public/css"));

app.get("/", function(req, res){
	res.render("index.html");
});

app.get("/leader_board", function(req, res){
	leaderBoard.getBoard(function(board){
		res.send(board);
	});
});

app.post("/check_for_highness", function(req, res){
	leaderBoard.checkForHighness(req.body.score, function(position){
		res.send({ message: "High enough", status: true });
	}, function(){
		res.send({ message: "Not high enough", status: false });
	});
});

app.post("/add_high_score_entry", function(req, res){
	leaderBoard.putInPosition(req.body, req.body.position, function(){
		res.send({ message: "Record was made", status: true });
	});
});

app.listen(3000);