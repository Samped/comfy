const mongoose = require('mongoose')

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    image: { type: String, default: '' },
    author: { type: String, required: true },
    date: { type: Date, default: Date.now },
    views: { type: Number, default: 0 },
    category: { type: String, default: 'general' }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Article', ArticleSchema)

