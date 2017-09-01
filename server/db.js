const sqlite = require('sqlite3')

const filename = 'settings.db'
const settingsTable = 'settings'
// const usersTable = 'users'

function getDatabase () {
  return new Promise((resolve, reject) => {
    if (getDatabase.db && getDatabase.db.open) {
      return resolve(getDatabase.db)
    }

    getDatabase.db = new sqlite.Database(
      filename,
      sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE,
      err => err ? reject(err) : resolve(getDatabase.db)
    )
  })
}

function createSettingsTable (db) {
  return new Promise((resolve, reject) => db.run(
    `create table if not exists ${settingsTable} (
      key text primary key,
      value text
    )`,
    null,
    err => err ? reject(err) : resolve(db)
  ))
}

/* function createUsersTable (db) {
  return new Promise((resolve, reject) => db.run(
    `create table if not exists ${usersTable} (
      id integer primary key,
      username text unique not null,
      password text,
      last_logged_in text
    )`,
    null,
    err => err ? reject(err) : resolve(db)
  ))
} */

function getSetting (db, key) {
  return new Promise((resolve, reject) => db.get(
    `select * from ${settingsTable} where key = ?`,
    [ key ],
    (err, row) => err ? reject(err) : resolve(row)
  ))
}

function setSetting (db, key, value) {
  return new Promise((resolve, reject) => db.run(
    `insert or replace into ${settingsTable} values (?, ?)`,
    [ key, value ],
    err => err ? reject(err) : resolve()
  ))
}

module.exports = {
  getDatabase: getDatabase,
  createSettingsTable: createSettingsTable,
  getSetting: getSetting,
  setSetting: setSetting
}
