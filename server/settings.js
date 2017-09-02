const database = require('./database')

const table = 'settings'

function get (key) {
  return database.open()
    .then(db => db.getRow(table, 'key', key))
    .then(row => row ? Promise.resolve(row.value)
      : Promise.reject(new Error(`${key} is not set`)))
}

function set (key, value) {
  return database.open()
    .then(db => db.insertRow(table, [ key, value ]))
}

module.exports = {
  get: get,
  set: set
}
