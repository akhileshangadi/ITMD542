const { MongoClient, ObjectId } = require('mongodb');
const Contact = require('./Contact');

//const url = 'mongodb://localhost:27017';
const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

async function run() {
  await client.connect();
  return 'Connected to the MongoDB server...';
}

run()
  .then(console.log)
  .catch(console.error);

const repo = {
  findAll: async () => {
    let contacts = [];
    const contactColl = client.db('express-contacts').collection('contacts');
    const cursor = contactColl.find({});
    await cursor.forEach(row => {
      console.log(row)
      const contact = new Contact(row._id.toString(), row.firstName, row.lastName, row.emailAddress, row.notes, row.currentDate);
      contacts.push(contact);
    });
    return contacts;
  },

  findById: async (uuid) => {
    const contactColl = client.db('express-contacts').collection('contacts');
    const filter = {
      '_id': new ObjectId(uuid)
    };
    const row = await contactColl.findOne(filter);
    console.log(row);
    return new Contact(row._id.toString(), row.firstName, row.lastName, row.emailAddress, row.notes, row.currentDate);
  },

  create: async (contact) => {
    const row = {firstName: contact.firstName, lastName: contact.lastName, emailAddress: contact.emailAddress, notes: contact.notes, currentDate: contact.currentDate};
    const contactColl = client.db('express-contacts').collection('contacts');
    const result = await contactColl.insertOne(row);
    console.log(`A contact was inserted with the _id: ${result.insertedId}`);
  },

  deleteById: async (uuid) => {
    const contactColl = client.db('express-contacts').collection('contacts');
    const filter = {
      '_id': new ObjectId(uuid)
    };
    const result = await contactColl.deleteOne(filter);
    if (result.deletedCount === 1) {
      console.log("Successfully deleted a contact.");
    } else {
      console.log("No contact matched the query. Deleted 0 contact.");
    }
  },

  update: async (contact) => { 
    const contactColl = client.db('express-contacts').collection('contacts');
    const filter = {
      '_id': new ObjectId(contact.id)
    };
    const updateDoc = {
      $set: {
        firstName: contact.firstName,
        lastName: contact.lastName,
        emailAddress: contact.emailAddress,
        notes: contact.notes,
        currentDate: contact.currentDate
      }
    };
    const result = await contactColl.updateOne(filter, updateDoc);
    console.log(`${result.matchedCount} contact matched the filter, updated ${result.modifiedCount} contact(s)`);
  },
};

module.exports = repo;