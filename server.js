// Cyclic URL: https://shy-dove-lab-coat.cyclic.app


var express = require("express");
var app = express();
var path = require("path");
var B = require("./test2_moduleB.js");

const HTTP_PORT = 8080;

let onHttpStart = () => {
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "/views/index.html")); 
});

app.get("/CPA", (req,res) => {
    B.getCPA()
    .then((students) => res.send(students))
    .catch((err) => { 
        console.log(err)
        res.send("no students returned")
    });
});

app.get("/highGPA", (req,res) => {
    B.highGPA()
    .then((s) => {
        let body = "";
        body += "<h2>Highest GPA: </h2>\n"
        body += "StudentID: " + s.studId + "<br><br>"
        body += "Name: " + s.name + "<br><br>"
        body += "Program: " + s.program + "<br><br>"  
        body += "GPA: " + s.gpa+ "<br><br>" 
        res.send(body)
    })
    .catch((err) => { 
        res.send("no results returned")
    });
});

app.get("*", (req,res) => {
    res.send("Error 404: Page not found.");
});

app.listen(HTTP_PORT, onHttpStart)

