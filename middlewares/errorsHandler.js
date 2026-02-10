function errorsHandler (err, req, res, next) {

  res.status(500).json({
    error: err.message
  })

  next()
}

module.exports = errorsHandler