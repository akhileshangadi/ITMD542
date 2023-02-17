var express = require('express');
var router = express.Router();
const contactsRepo = require('../src/contactsFileRepository');
var dateTime = require('node-datetime');

/* GET contacts listing. */
router.get('/', function(req, res, next) {
  const contacts = contactsRepo.findAll();
  res.render('contacts', {title: 'My Contacts', contacts: contacts});
});

/* GET create contact form. */
router.get('/add', function(req, res, next) {
  res.render('contacts_add', {title: 'Add a Contact'});
});

/* POST create contact. */
router.post('/add', function(req, res, next) {
  if(req.body.firstName.trim() === ''){
    res.render('contacts_add', {title: 'Add a Contact', msg: 'First Name cannot be empty...!!!'});
  }
  else if(req.body.lastName.trim() === ''){
    res.render('contacts_add', {title: 'Add a Contact', msg: 'Last Name cannot be empty...!!!'});
  }
  else{
    contactsRepo.create({firstName: req.body.firstName.trim(), lastName: req.body.lastName.trim(), emailAddress: req.body.emailAddress.trim(), notes: req.body.notes.trim()});
    res.redirect('/contacts')
  }
});

/* GET single contact. */
router.get('/:uuid', function(req, res, next) {
  const contact = contactsRepo.findById(req.params.uuid);
  if(contact){
    res.render('contact', {title: 'Contact', contact: contact});
  }else{
    res.redirect('/contacts');
  }
});

/* GET delete contact form. */
router.get('/:uuid/delete', function(req, res, next) {
  const contact = contactsRepo.findById(req.params.uuid);
  res.render('contacts_delete', {title: 'Delete Contact', contact: contact});
});

/* POST delete contact. */
router.post('/:uuid/delete', function(req, res, next) {
  contactsRepo.deleteById(req.params.uuid);
  res.redirect('/contacts');
});

/* GET edit contact form. */
router.get('/:uuid/edit', function(req, res, next) {
  const contact = contactsRepo.findById(req.params.uuid);
  res.render('contacts_edit', {title: 'Edit Contact', contact: contact});
});

/* POST edit contact. */
router.post('/:uuid/edit', function(req, res, next) {
  const contact = contactsRepo.findById(req.params.uuid);
  if(req.body.firstName.trim() === ''){
    res.render('contacts_edit', {title: 'Edit Contact', msg: 'First Name cannot be empty...!!!', contact: contact});
  }
  else if(req.body.lastName.trim() === ''){
    res.render('contacts_edit', {title: 'Edit Contact', msg: 'Last Name cannot be empty...!!!', contact: contact});
  }
  else{
    const updateContact = {
      id:req.params.uuid,
      firstName: req.body.firstName.trim(),
      lastName: req.body.lastName.trim(),
      emailAddress: req.body.emailAddress.trim(),
      notes: req.body.notes.trim(),
      date: dateTime.create().format('Y-m-d H:M:S'),
    };
    contactsRepo.update(updateContact);
    res.redirect(`/contacts/${contact.id}`)
  }
});

module.exports = router;
