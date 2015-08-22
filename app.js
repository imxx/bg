var express = require("express");
var app =  express();

app.use(express.static("public"));
app.use(express.static("public/views"));
//app.use(express.static("public/css"));

app.get("/", function(req, res){
	res.render("index.html");
});

app.listen(3000);