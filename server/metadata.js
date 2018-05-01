const sheets = require('./sheets')
const cache = require('./cache')

async function getRaw () {
  const spreadsheetId = process.env.metadata_spreadsheet_id
  const sheetName = process.env.metadata_sheet_name

  return sheets.getValues(spreadsheetId, sheetName)
}

function keyingReducer (keyed, company) {
  // key by company ticker (assumed unique)
  keyed[company.ticker] = company
  return keyed
}

function parse (values) {
  const headings = {
    'Oil & Gas': 'oilGas',
    'Coal': 'coal',
    'Ticker': 'ticker',
    'Note': 'note',
    'News #1': 'news1',
    'News #2': 'news2',
    'Dossier Link': 'link'
  }

  return sheets.parseValues(values, headings)
    .filter(company => company.ticker)
    .reduce(keyingReducer, {})
}

async function get () {
  try {
    return await cache.get('parsed-metadata')
  } catch (err) {
    return cache.set('parsed-metadata', parse(await getRaw()))
  }
}

module.exports = { get: get }
