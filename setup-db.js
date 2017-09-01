require('./server/database').open()
  .then(db => db.createTable(
    'settings',
    [
      'key text primary key',
      'value text'
    ]
  ))
  .catch(err => console.error(err))
