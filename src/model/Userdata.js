const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:haihello@ictakfiles.hrt5k.mongodb.net/ICTFILES?retryWrites=true&w=majority');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    email: String,
    phonenumber: Number,
    password: String,
    password2: String,
    authorization: String
});

var Userdata = mongoose.model('userdata',UserSchema);

module.exports = Userdata;