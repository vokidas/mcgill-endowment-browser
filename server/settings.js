const database = require('./database')

const table = 'settings'

async function get (key) {
  const db = await database.open()
  const row = await db.getRow(table, 'key', key)

  if (!row) {
    throw new Error(`${key} is not set`)
  }

  return row.value
}

async function set (key, value) {
  const db = await database.open()
  return db.insertRow(table, [ key, value ])
}

module.exports = { get: get, set: set }
