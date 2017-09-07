const sheets = require('./sheets')
const settings = require('./settings')
const cache = require('./cache')

async function getRaw () {
  const spreadsheetId = await settings.get('raw-spreadsheet-id')
  const sheetName = await settings.get('raw-sheet-name')

  return sheets.getValues(spreadsheetId, sheetName)
}

function groupingReducer (grouped, holding) {
  let key

  switch (holding.assetCategory) {
    case 'EQUITY':
    case 'PREFERRED SECURITIES':
      // group by description (company name)
      key = holding.description1
      break
    case 'FIXED INCOME SECURITIES':
      // group by asset type name
      key = holding.assetType
      break
    default:
      // discard other asset categories
      return grouped
  }

  (grouped[key] = grouped[key] || []).push(holding)
  return grouped
}

function parse (values) {
  // map column headings to object field names
  const headings = {
    'Reporting Account Name': 'account',
    'Asset Type Name': 'assetType',
    'Asset Type Category': 'assetCategory',
    'Security Description 1': 'description1',
    'Security Description 2': 'description2',
    'Ticker': 'ticker',
    'ISIN': 'isin',
    'Country of Issue Name': 'country',
    'Units': 'units',
    'Market Value': 'marketValue'
  }

  // convert column headings to field names (undefined if dne)
  const fieldNames = values[0].map(heading => headings[heading.trim()])

  const createHolding = (row, i) => {
    const holding = { id: i }

    // set field value for each field not undefined
    fieldNames.forEach((field, i) => {
      if (field !== void 0) {
        holding[field] = row[i]
      }
    })

    // ticker can be a number – convert it to string
    if (typeof holding.ticker === 'number') {
      holding.ticker = holding.ticker.toString()

      while (holding.ticker.length < 4) {
        holding.ticker = '0' + holding.ticker
      }
    }

    return holding
  }

  return Object.entries(
    values.slice(1) // ignore header row
      .map(createHolding)
      .reduce(groupingReducer, {})
  ).map(([ name, holdings ]) => ({
    name: name,
    holdings: holdings,
    id: holdings[0].id,
    assetType: holdings[0].assetType,
    assetCategory: holdings[0].assetCategory,
    marketValue: holdings.reduce((sum, h) => sum + h.marketValue, 0)
  }))
}

async function get () {
  try {
    return await cache.get('parsed-holdings')
  } catch (err) {
    return cache.set('parsed-holdings', parse(await getRaw()))
  }
}

module.exports = { get: get }
