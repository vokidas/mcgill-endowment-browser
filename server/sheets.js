const google = require('googleapis')
const sqlite = require('sqlite')

const sheets = google.sheets('v4')

/* create table if not exists settings (
  id integer,
  key text unique,
  value text
) */

// http://sqlite.org/lang_createtable.html
