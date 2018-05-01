const sheets = require('./sheets')
const cache = require('./cache')

const suffixes = {
  'Australia': 'AX',
  'Belgium': 'BR',
  'Bermuda': 'L',
  'Canada': 'TO',
  'Denmark': 'CO',
  'Finland': 'HE',
  'France': 'PA',
  'Germany': 'DE',
  'Hong Kong': 'HK', // pad to 4 digits
  'Israel': 'TA',
  'Italy': 'MI',
  'Japan': 'T',
  'Luxemburg': 'F',
  'Netherlands': 'AS',
  'New Zealand': 'NZ',
  'Norway': 'OL',
  'Portugal': 'LS',
  'Spain': 'MC',
  'Sweden': 'ST',
  'Switzerland': 'VX',
  'United Kingdom': 'L'
}

async function getRaw () {
  const spreadsheetId = process.env.raw_spreadsheet_id
  const sheetName = process.env.raw_sheet_name

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
  let { ticker, country } = holding

  // for Canadian tickers like BAM/A
  ticker = ticker.replace('/', '-')

  // pad numeric tickers
  if (!isNaN(ticker)) {
    while (ticker.length < 4) {
      ticker = '0' + ticker
    }
  }

  if (suffixes[country]) {
    return `${ticker}.${suffixes[country]}`
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

module.exports = { get, getCsv }
