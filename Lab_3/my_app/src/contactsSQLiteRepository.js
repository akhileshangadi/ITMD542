const path = require('path');
const betterSqlite3 = require('better-sqlite3');
const Contact = require('./Contact');

const db = new betterSqlite3(path.join(__dirname, '../data/contacts.sqlite'), {verbose: console.log});

const createStmt = db.prepare("CREATE TABLE IF NOT EXISTS CONTACTS (ID	INTEGER PRIMARY KEY AUTOINCREMENT, FIRST_NAME TEXT, LAST_NAME TEXT, EMAIL_ADDRESS TEXT, NOTES BLOB, CURRENT_DATE TEXT)")
createStmt.run();

const repo = {
    findAll: () => {
        const stmt = db.prepare("SELECT * FROM CONTACTS");
        const rows = stmt.all();
        let contacts = [];
        rows.forEach((row) => {
            const contact = new Contact(row.ID, row.FIRST_NAME, row.LAST_NAME, row.EMAIL_ADDRESS, row.NOTES, row.CURRENT_DATE);
            contacts.push(contact);
        });
        return contacts;
    },
    findById: (uuid) => {
        const stmt = db.prepare("SELECT * FROM CONTACTS WHERE ID = ?")
        const row = stmt.get(uuid);
        if(row === undefined){
            return new Contact();
        }
        return new Contact(row.ID, row.FIRST_NAME, row.LAST_NAME, row.EMAIL_ADDRESS, row.NOTES, row.CURRENT_DATE);
    },
    create: (contact) => {
       const stmt = db.prepare("INSERT INTO CONTACTS (FIRST_NAME, LAST_NAME, EMAIL_ADDRESS, NOTES, CURRENT_DATE) VALUES ('"+contact.firstName+"', '"+contact.lastName+"', '"+contact.emailAddress+"', '"+contact.notes+"', datetime('now', 'localtime'))");
       console.log(stmt);
       const info = stmt.run();
       console.log(`Contact Created with ID: ${info.lastInsertRowId}`);
    },
    deleteById: (uuid) => {
        const stmt = db.prepare("DELETE FROM CONTACTS WHERE id = ?");
        const info = stmt.run(uuid);
        console.log(`rows affected: ${info.changes}`);
    },
    update: (contact) => {
        const stmt = db.prepare("UPDATE CONTACTS SET FIRST_NAME = '"+contact.firstName+"', LAST_NAME = '"+contact.lastName+"', EMAIL_ADDRESS = '"+contact.emailAddress+"', NOTES = '"+contact.notes+"', CURRENT_DATE = datetime('now', 'localtime') WHERE ID = '"+contact.id+"'");
        const info = stmt.run();
        console.log(`rows affected: ${info.changes}`);
    },
};

module.exports = repo;