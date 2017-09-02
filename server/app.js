const express = require('express')
const sheet = require('./sheet')

const app = express()

function error (err, res) {
  console.error(err)
  res.status(500).send(err)
}

app.set('port', process.env.PORT || 3001)

if (process.env.NODE_ENV === 'development') {
  app.set('json spaces', 2)
}

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

app.get('/api/holdings', (req, res) => {
  sheet.getValues({ range: 'Holdings', majorDimension: 'ROWS' })
    .then(values => res.json(values))
    .catch(err => error(err, res))
})

app.listen(app.get('port'), () => {
  console.info(`Listening on http://localhost:${app.get('port')}`)
})
