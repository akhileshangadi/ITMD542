var express = require('express');
var router = express.Router();
const contactController = require('../controllers/contactController');
const { body } = require('express-validator');


/* GET contacts listing. */
router.get('/', contactController.contacts_list);

/* GET create contact form. */
router.get('/add', contactController.contacts_create_get);

/* POST create contact. */
router.post('/add', 
  body('firstName').trim().notEmpty().withMessage('First Name can not be empty!'), 
  body('lastName').trim().notEmpty().withMessage('Last Name can not be empty!'),
  body('emailAddress').trim().notEmpty().withMessage('Email address can not be empty!')
    .isEmail().withMessage('Email must be a valid email address!'), 
    contactController.contacts_create_post);

/* GET single contact. */
router.get('/:uuid', contactController.contacts_detail);

/* GET delete contact form. */
router.get('/:uuid/delete', contactController.contacts_delete_get);

/* POST delete contact. */
router.post('/:uuid/delete', contactController.contacts_delete_post);

/* GET edit contact form. */
router.get('/:uuid/edit', contactController.contacts_edit_get);

/* POST edit contact. */
router.post('/:uuid/edit', contactController.contacts_edit_post);

module.exports = router;