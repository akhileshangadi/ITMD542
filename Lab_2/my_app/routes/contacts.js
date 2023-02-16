var express = require('express');
var router = express.Router();
const contactsRepo = require('../src/contactsFileRepository');

/* GET contacts listing. */
router.get('/', function(req, res, next) {
  const contacts = contactsRepo.findAll();
  res.render('contacts', {title: 'My Contacts', contacts: contacts});
});
module.exports = router;