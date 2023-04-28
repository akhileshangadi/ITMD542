var express = require('express');
var router = express.Router();
const studentController = require('../controllers/studentController');
const { body } = require('express-validator');


/* GET students listing. */
router.get('/', studentController.students_list);

/* GET create student form. */
router.get('/add', studentController.students_create_get);

/* POST create student. */
router.post('/add', 
  body('firstName').trim().notEmpty().withMessage('First Name can not be empty!'), 
  body('lastName').trim().notEmpty().withMessage('Last Name can not be empty!'),
  body('emailAddress').trim().notEmpty().withMessage('Email address can not be empty!')
    .isEmail().withMessage('Email must be a valid email address!'),
  body('fatherName').trim().notEmpty().withMessage('Father Name can not be empty!'),
  body('motherName').trim().notEmpty().withMessage('Mother Name can not be empty!'),
  body('dateOfBirth').trim().notEmpty().withMessage('Date of Birth can not be empty!'),
    studentController.students_create_post);

/* GET single student. */
router.get('/:uuid', studentController.students_detail);

/* GET delete student form. */
router.get('/:uuid/delete', studentController.students_delete_get);

/* POST delete student. */
router.post('/:uuid/delete', studentController.students_delete_post);

/* GET edit student form. */
router.get('/:uuid/edit', studentController.students_edit_get);

/* POST edit student. */
router.post('/:uuid/edit', studentController.students_edit_post);

module.exports = router;