const express = require('express')
const holdings = require('./holdings')
const metadata = require('./metadata')
const descriptions = require('./descriptions')

const app = express()

function error (err, res) {
  console.error(err)
  res.sendStatus(500)
}

app.set('port', process.env.PORT || 3001)

if (process.env.NODE_ENV === 'development') {
  app.set('json spaces', 2)
}

app.get('/api/holdings', (req, res) => {
  holdings.get()
    .then(values => res.json(values))
    .catch(err => error(err, res))
})

app.get('/api/metadata', (req, res) => {
  metadata.get()
    .then(values => res.json(values))
    .catch(err => error(err, res))
})

app.get('/api/descriptions', (req, res) => {
  descriptions.get(req.query.tickers.split(','))
    .then(obj => res.json(obj))
    .catch(err => error(err, res))
})

app.listen(app.get('port'), () => {
  console.info(`Listening on http://localhost:${app.get('port')}`)
})
