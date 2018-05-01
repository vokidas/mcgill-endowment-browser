const google = require('googleapis')
const cache = require('./cache')

const sheets = google.sheets('v4')

async function authorize () {
  const email = process.env.google_client_email
  const key = process.env.google_private_key

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

function parseValues (values, headings) {
  // map column headings to object field names (undefined if dne)
  const fields = values[0].map(heading => headings[heading.trim()])

  const createObject = (row, i) => {
    const object = { id: i }

    // set field value for each field not undefined
    fields.forEach((field, i) => {
      if (field !== void 0) {
        object[field] = row[i]
      }
    })

    // if there is a ticker field, convert it to string
    if (typeof object.ticker === 'number') {
      object.ticker = object.ticker.toString()

      while (object.ticker.length < 4) {
        object.ticker = '0' + object.ticker
      }
    }

    return object
  }

  // ignore header row
  return values.slice(1).map(createObject)
}

module.exports = {
  getValues: getValues,
  parseValues: parseValues
}
