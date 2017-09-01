const sqlite = require('sqlite3')

const filename = 'settings.db'
const wrapper = { db: null }

wrapper.createTable = (table, columns) => {
  return new Promise((resolve, reject) => this.db.run(
    `create table if not exists ${table} (${columns.join()})`,
    [],
    err => err ? reject(err) : resolve(this.db)
  ))
}

wrapper.getRow = (table, key, value) => {
  return new Promise((resolve, reject) => this.db.get(
    `select * from ${table} where ${key} = ?`,
    [ value ],
    (err, row) => err ? reject(err) : resolve(row)
  ))
}

wrapper.insertRow = (table, fields) => {
  const placeholders = Array(fields.length).fill('?')
  return new Promise((resolve, reject) => this.db.run(
    `insert or replace into ${table} values (${placeholders.join()})`,
    fields,
    err => err ? reject(err) : resolve()
  ))
}

function open () {
  if (wrapper.db && wrapper.db.open) {
    return Promise.resolve(wrapper)
  }

  return new Promise((resolve, reject) => {
    wrapper.db = new sqlite.Database(
      filename,
      sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE,
      err => err ? reject(err) : resolve(wrapper)
    )
  })
}

module.exports = { open: open }
