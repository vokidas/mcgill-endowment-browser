const google = require('googleapis')
const settings = require('./settings')
const cache = require('./cache')

const sheets = google.sheets('v4')

async function authorize () {
  const email = await settings.get('google-client-email')
  const key = await settings.get('google-private-key')

  const authClient = new google.auth.JWT(email, null, key,
    [ 'https://www.googleapis.com/auth/spreadsheets.readonly' ])

  return new Promise((resolve, reject) => {
    authClient.authorize((err, tokens) =>
      err ? reject(err) : resolve(cache.set('auth-client', authClient)))
  })
}

async function getValues (options) {
  const authClient = await cache.get('auth-client').catch(authorize)
  const spreadsheetId = await settings.get('spreadsheet-id')

  options.spreadsheetId = spreadsheetId
  options.valueRenderOption = 'UNFORMATTED_VALUE'
  options.auth = authClient

  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.get(options, (err, response) =>
      err ? reject(err) : resolve(response.values))
  })
}

module.exports = {
  getValues: getValues
}
