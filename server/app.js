const express = require('express')

const app = express()

app.set('port', process.env.PORT || 3001)

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

app.get('/api/holdings', (req, res) => {
  res.json([])
})

app.listen(app.get('port'), () => {
  console.info(`Listening on http://localhost:${app.get('port')}`)
})
