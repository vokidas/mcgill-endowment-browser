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

function wrapGroup ([ key, holdings ]) {
  return {
    name: key,
    holdings: holdings,
    id: holdings[0].id,
    assetType: holdings[0].assetType,
    assetCategory: holdings[0].assetCategory,
    country: holdings[0].country,
    marketValue: holdings.reduce((sum, h) => sum + h.marketValue, 0)
  }
}

function parse (values) {
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

  const grouped = sheets.parseValues(values, headings)
    .reduce(groupingReducer, {})

  return Object.entries(grouped).map(wrapGroup)
}

async function get () {
  try {
    return await cache.get('parsed-holdings')
  } catch (err) {
    return cache.set('parsed-holdings', parse(await getRaw()))
  }
}

module.exports = { get: get }
