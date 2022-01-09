// accessing mongoose package
const mongoose = require('mongoose');

// database connection
mongoose.connect('mongodb+srv://userone:haihello@ictakfiles.hrt5k.mongodb.net/ICTFILES?retryWrites=true&w=majority');

// schema definition
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    author: String,
    genre: String,
    image: String
});

// model creation
var Authordata = mongoose.model('authordata',AuthorSchema);

module.exports = Authordata;