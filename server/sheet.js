const google = require('googleapis')
const settings = require('./settings')
const cache = require('./cache')

const sheets = google.sheets('v4')

function authorize () {
  const pEmail = settings.get('google-client-email')
  const pKey = settings.get('google-private-key')

  return Promise.all([ pEmail, pKey ])
    .then(([ email, key ]) => {
      const authClient = new google.auth.JWT(email, null, key,
        [ 'https://www.googleapis.com/auth/spreadsheets.readonly' ])

      return new Promise((resolve, reject) => {
        authClient.authorize((err, tokens) =>
          err ? reject(err) : resolve(authClient))
      })
    })
}

function getValues (options) {
  const pAuthClient = cache.get('auth-client')
    .catch(() => authorize()
      .then(authClient => cache.set('auth-client', authClient)))

  const pSpreadsheetId = settings.get('spreadsheet-id')

  return Promise.all([ pAuthClient, pSpreadsheetId ])
    .then(([ authClient, spreadsheetId ]) => {
      options.spreadsheetId = spreadsheetId
      options.valueRenderOption = 'UNFORMATTED_VALUE'
      options.auth = authClient

      return new Promise((resolve, reject) => {
        sheets.spreadsheets.values.get(options, (err, response) =>
          err ? reject(err) : resolve(response.values))
      })
    })
}

module.exports = {
  getValues: getValues
}
