const path = require('path');
const betterSqlite3 = require('better-sqlite3');

const db = new betterSqlite3(path.join(__dirname, '../data/databaseUsers.sqlite'), {verbose: console.log});

/* GET users listing. */
const repoUsers = {
  save: (name, email) => {
    const stmt = db.prepare("INSERT INTO USER_LOGIN_CREDENTIALS (NAME, EMAIL) SELECT * FROM (SELECT '"+name+"', '"+email+"') AS tmp WHERE NOT EXISTS (SELECT EMAIL FROM USER_LOGIN_CREDENTIALS WHERE EMAIL = '"+email+"') LIMIT 1;")
    const row = stmt.run();
    if(row === undefined){
      return false;
    }
    return true;
  },
};

module.exports = repoUsers;