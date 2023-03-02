const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'newsItem title is required'],
  },
  description: {
    type: String,
    required: [true, 'newsItem desciption is required'],
  },
  image: String,
});

module.exports = mongoose.model('news', newsSchema);
