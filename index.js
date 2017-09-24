var port = process.env.PORT || 6969;
var express = require("express");
var app = express();
var passport = require("passport");
var passportfb = require("passport-facebook").Strategy;
var session = require("express-session");
//var db = require("./db.js");

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));
// Use theo thu tu 1.
app.use(session({
    "secret": "vkjnbwibwnebe"
}));
// 2.
app.use(passport.initialize());
// 3.
app.use(passport.session())

var server = require('http').Server(app);
var io = require("socket.io")(server);
var arrUser = [];

console.log(port);

io.on("connection", function (socket) {
    console.log("123456789   123456789");
    console.log(socket);
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
app.get("/success", (req, res) => { res.send("Chuc mung!!!") });
app.get("/error", (req, res) => { res.send("Chia buon!!!") });
app.get("/login", (req, res) => { res.render("trangchu") });
app.get("/auth/fb", passport.authenticate("facebook", {scope: ["email"]}));
app.get("/auth/fb/cb", passport.authenticate("facebook", {
    failureRedirect: "/error",
    successRedirect: "/success",
}) );

server.listen(port, () => { console.log(port); console.log("server da hoat dong") });

passport.use(new passportfb(
    {
        clientID: "132777897461868",
        clientSecret: "f5ce30036431d0db6041bee7539a1305",
        callbackURL: "https://stream6969.herokuapp.com/auth/fb/cb",
        profileFields: ["email", "gender", "locale", "displayName"]
    },
    (accessToken, refreshToken, profile, done) => {
        return done;
        //db.findOne({ id: profile._json.id }, (err, user) => {
        //    if (err) return done(err)
        //    if (user) return done(null, user)
        //    const newuser = new db({
        //        id: profile._json.id,
        //        name: profile._json.name,
        //        email: profile._json.email
        //    });
        //    newuser.save((err) => {
        //        return done(null, newuser);
        //    });
        //});
    }
));
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    db.findOne({ id: id }, (err, user) => {
        done(null, user);
    });
});
