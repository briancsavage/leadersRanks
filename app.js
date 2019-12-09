const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//const http = require("http");
//const fs = require("fs");
//const jsdom = require("jsdom");
//const cheerio = require("cheerio");
//const htmlparser2 = require("htmlparser2");
//const dom = htmlparser2.parseDOM("leaderboard.html");
//const $ = cheerio.load(dom);
//const JSON = require("JSON");

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dlee07:comp20@scores-qpnhf.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
	console.log("Connected");
	const collection = client.db("scores").collection("game");
	var users;
	collection.find({}).toArray(function(err, result) {
		users = result;
		console.log(users);
		users.sort(function (a, b) {
			return b.score - a.score;
		});
		var firstName 	= users[0].name;
		var firstScore  = users[0].score;
		var secondName 	= users[1].name;
		var secondScore = users[1].score;
		var thirdName 	= users[2].name;
		var thirdScore  = users[2].score;
		var fourthName	= users[3].name;
		var fourthScore = users[3].score;
		var fifthName 	= users[4].name;
		var fifthScore  = users[4].score;
		app.set("view engine", "ejs");
		app.set("views", __dirname + "/views");
		app.use(bodyParser.urlencoded({ extended: false })); 
		app.get("/", (req, res) => res.render("leaderboard", { 
			firstNameHTML: firstName,
			firstScoreHTML: firstScore,
			secondNameHTML: secondName,
			secondScoreHTML: secondScore,
			thirdNameHTML: thirdName,
			thirdScoreHTML: thirdScore,
			fourthNameHTML: fourthName,
			fourthScoreHTML: fourthScore,
			fifthNameHTML: fifthName,
			fifthScoreHTML: fifthScore
			}));  
		//app.listen(5000, () => console.log("Server online on http://localhost:5000"));
		console.log("Process finished!");
	});
    client.close();
});

