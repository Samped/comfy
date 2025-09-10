const express = require('express')
const Article = require('../models/Article')

const router = express.Router()

// Create article
router.post('/', async (req, res) => {
  try {
    const article = await Article.create(req.body)
    res.status(201).json(article)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// List articles with basic search and category filter
router.get('/', async (req, res) => {
  try {
    const { q, category } = req.query
    const query = {}
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { body: { $regex: q, $options: 'i' } }
      ]
    }
    if (category && category !== 'all') {
      query.category = category
    }
    const articles = await Article.find(query).sort({ createdAt: -1 })
    res.json(articles)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get single article and increment views optionally
router.get('/:id', async (req, res) => {
  try {
    const { increment } = req.query
    const article = await Article.findById(req.params.id)
    if (!article) return res.status(404).json({ error: 'Not found' })
    if (increment === 'true') {
      article.views += 1
      await article.save()
    }
    res.json(article)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Update article
router.put('/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!article) return res.status(404).json({ error: 'Not found' })
    res.json(article)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Delete article
router.delete('/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id)
    if (!article) return res.status(404).json({ error: 'Not found' })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router

