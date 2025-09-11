const express = require('express')
const jwt = require('jsonwebtoken')

const router = express.Router()

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || ''
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || ''
const JWT_SECRET = process.env.JWT_SECRET 

router.post('/login', (req, res) => {
  const { username, password } = req.body
  if (!username || !password) return res.status(400).json({ error: 'Missing credentials' })
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) return res.status(401).json({ error: 'Invalid credentials' })
  const token = jwt.sign({ sub: 'admin', username }, JWT_SECRET, { expiresIn: '12h' })
  res.json({ token })
})

module.exports = router

