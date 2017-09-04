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

async function getValues (spreadsheetId, sheetName) {
  const authClient = await cache.get('auth-client').catch(authorize)
  const options = {
    spreadsheetId: spreadsheetId,
    auth: authClient,
    valueRenderOption: 'UNFORMATTED_VALUE',
    majorDimension: 'ROWS',
    range: `${sheetName}`
  }

  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.get(options, (err, response) =>
      err ? reject(err) : resolve(response.values))
  })
}

module.exports = { getValues: getValues }
