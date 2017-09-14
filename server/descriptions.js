const https = require('https')
const jsdom = require('jsdom')
const cache = require('./cache')

function fetchSingle (ticker) {
  return new Promise((resolve, reject) => {
    https.get(`https://finance.google.com/finance?q=${ticker}`, res => {
      if (res.statusCode !== 200) {
        console.error(new Error(res.statusMessage))
        return resolve(null)
      }

      let data = ''

      res.on('data', chunk => { data += chunk })
      res.on('end', () => {
        const dom = new jsdom.JSDOM(data)
        const el = dom.window.document.querySelector('.companySummary')
        const description = el && el.firstChild.textContent.trim()

        resolve(cache.set(`description-${ticker}`, description))
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
