function logTime (req, res, next) {

  const currTime = new Date().toLocaleDateString()

  console.log(`[${currTime}][Request] ${req.originalUrl}`)

  next()
}

module.exports = logTime