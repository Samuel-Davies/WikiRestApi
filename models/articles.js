const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/wikiDB')


const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

module.exports  = mongoose.model('Article', articleSchema );
