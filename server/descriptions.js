const https = require('https')
const cache = require('./cache')

const re = /^root\.App\.main = (.*);$/m

function fetchSingle (ticker) {
  return new Promise((resolve, reject) => {
    const url = `https://finance.yahoo.com/quote/${ticker}`
    https.get(url, res => {
      if (res.statusCode !== 200) {
        console.error(`Failed to fetch ${url}: ${res.statusMessage}`)
        return resolve(cache.set(`description-${ticker}`, null, 600))
      }

      let data = ''

      res.on('data', chunk => { data += chunk })
      res.on('end', () => {
        const match = re.exec(data)
        let description = null

        if (match !== null) {
          try {
            const obj = JSON.parse(match[1])
            description = obj.context.dispatcher.stores.QuoteSummaryStore.summaryProfile.longBusinessSummary
          } catch (err) {
            console.error(`Failed to fetch ${url}`, err)
          }
        }

        resolve(cache.set(`description-${ticker}`, description, 0))
      })
    })
  })
}

function getSingle (ticker) {
  return cache.get(`description-${ticker}`)
    .catch(() => fetchSingle(ticker))
}

async function get (tickers) {
  const descriptions = await Promise.all(tickers.map(getSingle))
  return descriptions.reduce((acc, description, i) => {
    acc[tickers[i]] = description
    return acc
  }, {})
}

module.exports = { get: get }
