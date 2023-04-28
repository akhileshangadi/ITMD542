const studentsRepo = require('../src/studentsSQLiteRepository');
const { validationResult } = require('express-validator');
const Student = require('../src/Student');

/* GET users listing. */
exports.students_list = function(req, res, next) {
    const students = studentsRepo.findAll();
    res.render('students', {title: 'All Students Details', students: students});
};

/* GET create student form. */
exports.students_create_get = function(req, res, next) {
    res.render('students_add', {title: 'Add Student Details'});
};

/* POST create student. */
exports.students_create_post = function(req, res, next) {
    const result = validationResult(req);
    if(!result.isEmpty()){
        res.render('students_add', {title: 'Add Student Details', msg: result.array()});
    }
    else{
        const student = new Student('', req.body.firstName.trim(), req.body.lastName.trim(), req.body.emailAddress.trim(), req.body.fatherName.trim(), req.body.motherName.trim(), req.body.dateOfBirth.trim(), '')
        studentsRepo.create(student);
        res.redirect('/students')
    }
};

/* GET single student. */
exports.students_detail = function(req, res, next) {
    const student = studentsRepo.findById(req.params.uuid);
    res.render('student', {title: 'Student Details', student: student});
};

/* GET delete student form. */
exports.students_delete_get = function(req, res, next) {
    const student = studentsRepo.findById(req.params.uuid);
    res.render('students_delete', {title: 'Student Contact', student: student});
};

/* POST delete student. */
exports.students_delete_post = function(req, res, next) {
    studentsRepo.deleteById(req.params.uuid);
    res.redirect('/students');
};

/* GET edit student form. */
exports.students_edit_get = function(req, res, next) {
    const student = studentsRepo.findById(req.params.uuid);
    res.render('students_edit', {title: 'Edit Student Details', student: student});
};

/* POST edit student. */
exports.students_edit_post = function(req, res, next) {
    const student = studentsRepo.findById(req.params.uuid);
    if(req.body.firstName.trim() === ''){
        res.render('students_edit', {title: 'Edit Student Details', msg: 'First Name cannot be empty...!!!', student: student});
    }
    else if(req.body.lastName.trim() === ''){
        res.render('contacts_edit', {title: 'Edit Student Details', msg: 'Last Name cannot be empty...!!!', student: student});
    }
    else if(req.body.emailAddress.trim() === ''){
        res.render('contacts_edit', {title: 'Edit Student Details', msg: 'Email Address cannot be empty...!!!', student: student});
    }
    else if(req.body.fatherName.trim() === ''){
        res.render('contacts_edit', {title: 'Edit Student Details', msg: 'Father Name cannot be empty...!!!', student: student});
    }
    else if(req.body.motherName.trim() === ''){
        res.render('contacts_edit', {title: 'Edit Student Details', msg: 'Mother Name cannot be empty...!!!', student: student});
    }
    else if(req.body.dateOfBirth.trim() === ''){
        res.render('contacts_edit', {title: 'Edit Student Details', msg: 'Date of Birth cannot be empty...!!!', student: student});
    }
    else{
        const updateStudent = new Student(req.params.uuid, req.body.firstName.trim(), req.body.lastName.trim(), req.body.emailAddress.trim(), req.body.fatherName.trim(), req.body.motherName.trim(), req.body.dateOfBirth.trim(), '');
        studentsRepo.update(updateStudent);
        res.redirect(`/students/${student.id}`)
    }
};