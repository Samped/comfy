const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'change_me_secret'

function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
  if (!token) return res.status(401).json({ error: 'Missing token' })
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    if (payload.sub !== 'admin') return res.status(403).json({ error: 'Forbidden' })
    next()
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

module.exports = { requireAdmin }

