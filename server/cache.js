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
        return reject(err)
      }

      value === void 0 ? reject(value) : resolve(value)
    })
  })
}

function set (key, value) {
  return new Promise((resolve, reject) => {
    cache.set(key, value, err => {
      if (err) {
        console.error(err)
      }

      resolve(value)
    })
  })
}

module.exports = {
  get: get,
  set: set
}
