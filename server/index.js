const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const articlesRouter = require('./routes/articles')
const authRouter = require('./routes/auth')

const app = express()

app.use(cors())
app.use(express.json({ limit: '2mb' }))
app.use(morgan('dev'))

const mongoUri = process.env.MONGODB_URI
if (!mongoUri) {
  console.error('Missing MONGODB_URI in environment')
  process.exit(1)
}

mongoose
  .connect(mongoUri, { dbName: process.env.MONGODB_DB || 'comfyverse' })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  })

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/auth', authRouter)
app.use('/api/articles', articlesRouter)

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`API server listening on https://comfyverse.vercel.app:${port}`)
})

