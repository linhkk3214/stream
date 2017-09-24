var port = process.env.PORT || 6969;
var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));
var server = require('http').Server(app);
var io = require("socket.io")(server);
var arrUser = [];

io.on("connection", function (socket) {
    socket.on("client_send_username", function (data) {
        socket.username = data;
        if (arrUser.indexOf(data) > -1)
            socket.emit("server_send_login_fail");
        else {
            arrUser.push(data);
            socket.emit("server_send_login_success", data);
        }
    });
    socket.on("client_send_message", function (data) {
        io.sockets.emit("server_send_message", { text: data, username: socket.username });
    });
});

app.get("/", (req, res) => { res.send("Chao mung ban!!!") });
app.get("/login", (req, res) => { res.render("trangchu") });
server.listen(port, () => { console.log("server da hoat dong") });
