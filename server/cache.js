const NodeCache = require('node-cache')

const cache = new NodeCache({
  stdTTL: 600,
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

function set (key, value) {
  cache.set(key, value, err => err && console.error(err))
  return value
}

module.exports = {
  get: get,
  set: set
}
