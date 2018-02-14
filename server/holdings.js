const sheets = require('./sheets')
const settings = require('./settings')
const cache = require('./cache')

const exchanges = {
  'Australia': 'ASX',
  'Belgium': 'EBR',
  'Bermuda': 'BSX',
  'Canada': 'TSE',
  'Cayman Islands': 'CSX',
  'Denmark': 'CPH',
  'Finland': 'HEL',
  'France': 'EPA',
  'Germany': 'ETR',
  'Hong Kong': 'HKG',
  'Ireland': 'ISE',
  'Israel': 'TLV',
  'Italy': 'BIT',
  'Japan': 'TYO',
  'Luxemburg': 'EPA',
  'Netherlands': 'AMS',
  'New Zealand': 'NZE',
  'Portugal': 'ELI',
  'Spain': 'BME',
  'Sweden': 'STO',
  'United Kingdom': 'LON'
}

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

function searchableTicker (holding) {
  const { ticker, country, description1 } = holding

  if (country === 'Singapore' || country === 'Norway') {
    // tickers are wrong, search by name
    return description1
  } else if (exchanges[country]) {
    return `${exchanges[country]}:${ticker}`
  }

  return ticker
}

function wrapGroup ([ key, holdings ]) {
  const wrapped = {
    name: key,
    holdings: holdings,
    id: holdings[0].id,
    assetType: holdings[0].assetType,
    assetCategory: holdings[0].assetCategory,
    country: holdings[0].country,
    marketValue: holdings.reduce((sum, h) => sum + h.marketValue, 0)
  }

  if (wrapped.assetCategory === 'FIXED INCOME SECURITIES') {
    // fixed income securities may have multiple countries
    wrapped.country = holdings.reduce(
      (country, h) => country === h.country ? country : 'World',
      wrapped.country
    )
  } else if (holdings[0].ticker) {
    // set ticker for equity holdings, if present
    wrapped.ticker = holdings[0].ticker
    wrapped.searchableTicker = searchableTicker(holdings[0])
  }

  return wrapped
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

  return Object.entries(grouped).map(wrapGroup).sort((a, b) =>
    a.marketValue > b.marketValue ? -1 : a.marketValue < b.marketValue ? 1 : 0
  )
}

async function getSummaryByAssetType () {
  const grouped = await get()
  return grouped.reduce((summary, group) => {
    let key = group.assetType
    let value = (summary[key] || 0) + group.marketValue
    summary[key] = Math.round(value * 100) / 100
    return summary
  }, {})
}

async function get () {
  try {
    return await cache.get('parsed-holdings')
  } catch (err) {
    return cache.set('parsed-holdings', parse(await getRaw()))
  }
}

async function getCsv () {
  const raw = await getRaw()
  return raw
    .map(row => row.map(cell => String(cell).trim()).join(','))
    .join('\n')
}

async function getSummary () {
  try {
    return await cache.get('holdings-summary')
  } catch (err) {
    return cache.set('holdings-summary', await getSummaryByAssetType())
  }
}

module.exports = { get, getSummary, getCsv }
