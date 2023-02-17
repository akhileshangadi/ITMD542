const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
var dateTime = require('node-datetime');

const db = new Map();

const loadData = () => {
    const jsonData = fs.readFileSync(path.join(__dirname, '../data/contacts.json'));
    const contactsArray = JSON.parse(jsonData);
    contactsArray.forEach(element => {
        db.set(element[0], element[1], element[2], element[3], element[4]); 
    });
};

const saveData = () => {
    const stringifyData = JSON.stringify(Array.from(db));
    fs.writeFileSync(path.join(__dirname, '../data/contacts.json'), stringifyData);
};

const repo = {
    findAll: () => Array.from(db.values()),
    findById: (uuid) => db.get(uuid),
    create: (contacts) => {
        var currentDateTime = dateTime.create().format('Y-m-d H:M:S');
        const newContact = {
            id: crypto.randomUUID(),
            firstName: contacts.firstName,
            lastName: contacts.lastName,
            emailAddress: contacts.emailAddress,
            notes: contacts.notes,
            date: currentDateTime
        };
        db.set(newContact.id, newContact);
        saveData();
    },
    deleteById: (uuid) => {
        db.delete(uuid)
        saveData();
    },
    update: (contact) => {
        db.set(contact.id, contact)
        saveData();
    },
};

loadData();

module.exports = repo;