const contactsRepo = require('../src/contactsMongoRepository');
const { validationResult } = require('express-validator');
const Contact = require('../src/Contact');
var dateTime = require('node-datetime');

/* GET users listing. */
exports.contacts_list = async function(req, res, next) {
    const contacts = await contactsRepo.findAll();
    res.render('contacts', {title: 'My Contacts', contacts: contacts});
};

/* GET create contact form. */
exports.contacts_create_get = async function(req, res, next) {
    res.render('contacts_add', {title: 'Add a Contact'});
};

/* POST create contact. */
exports.contacts_create_post = async function(req, res, next) {
    const result = validationResult(req);
    if(!result.isEmpty()){
        res.render('contacts_add', {title: 'Add a Contact', msg: result.array()});
    }
    else{
        let currentDateTime = dateTime.create().format('Y-m-d H:M:S');
        const contact = new Contact('', req.body.firstName.trim(), req.body.lastName.trim(), req.body.emailAddress.trim(), req.body.notes.trim(), currentDateTime)
        await contactsRepo.create(contact);
        res.redirect('/contacts')
    }
};

/* GET single contact. */
exports.contacts_detail = async function(req, res, next) {
    const contact = await contactsRepo.findById(req.params.uuid);
    res.render('contact', {title: 'Contact', contact: contact});
};

/* GET delete contact form. */
exports.contacts_delete_get = async function(req, res, next) {
    const contact = await contactsRepo.findById(req.params.uuid);
    res.render('contacts_delete', {title: 'Delete Contact', contact: contact});
};

/* POST delete contact. */
exports.contacts_delete_post = async function(req, res, next) {
    await contactsRepo.deleteById(req.params.uuid);
    res.redirect('/contacts');
};

/* GET edit contact form. */
exports.contacts_edit_get = async function(req, res, next) {
    const contact = await contactsRepo.findById(req.params.uuid);
    res.render('contacts_edit', {title: 'Edit Contact', contact: contact});
};

/* POST edit contact. */
exports.contacts_edit_post = async function(req, res, next) {
    const contact = contactsRepo.findById(req.params.uuid);
    if(req.body.firstName.trim() === ''){
        res.render('contacts_edit', {title: 'Edit Contact', msg: 'First Name cannot be empty...!!!', contact: contact});
    }
    else if(req.body.lastName.trim() === ''){
        res.render('contacts_edit', {title: 'Edit Contact', msg: 'Last Name cannot be empty...!!!', contact: contact});
    }
    else{
        let currentDateTime = dateTime.create().format('Y-m-d H:M:S');
        const updateContact = new Contact(req.params.uuid, req.body.firstName.trim(), req.body.lastName.trim(), req.body.emailAddress.trim(), req.body.notes.trim(), currentDateTime);
        await contactsRepo.update(updateContact);
        res.redirect(`/contacts/${updateContact.id}`)
    }
};