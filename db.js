//  require mongoose
const mongoose = require("mongoose");
// coonect
mongoose.connect("mongodb://localhost/stream");
// tao schema
const userSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String
});
module.exports = mongoose.model('user', userSchema);