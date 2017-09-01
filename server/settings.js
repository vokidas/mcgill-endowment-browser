const database = require('./database')

const table = 'settings'

function get (key) {
  return database.open()
    .then(db => db.getRow(table, 'key', key))
    .then(row => row ? row.value : null)
}

function set (key, value) {
  return database.open()
    .then(db => db.insertRow(table, [ key, value ]))
}

module.exports = {
  get: get,
  set: set
}
