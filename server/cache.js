const NodeCache = require('node-cache')

const cache = new NodeCache({
  useClones: false
})

function get (key) {
  return new Promise((resolve, reject) => {
    cache.get(key, (err, value) => {
      if (err) {
        console.error(err)
        reject(err)
      } else if (value === void 0) {
        reject(new Error(`${key} is not in cache`))
      } else {
        resolve(value)
      }
    })
  })
}

function set (key, value, ttl) {
  if (typeof ttl === 'undefined') {
    ttl = 600
  }

  cache.set(key, value, ttl, err => err && console.error(err))
  return value
}

module.exports = { get: get, set: set }
