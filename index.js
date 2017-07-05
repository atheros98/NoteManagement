var express = require("express");
var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({extended: false})
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.listen(3000);
console.log("App listening at port 3000.....");
app.get("/", function(req, res) {
	res.render("trangchu");
});
var list_note = [];

app.post("/add", parser, function(req, res){
	list_note.unshift(req.body.content);
	res.send(list_note);
})

app.post("/getNotes", function(req, res){
	res.send(list_note);
})

app.post("/delete",parser, function(req, res){
	list_note.splice(req.body.id_del, 1);
	res.send(list_note);
})

app.post("/save", parser, function(req, res){
	if(req.body.content_save != ""){
		list_note[req.body.id_save] = req.body.content_save;
	}
	res.send(list_note);
})