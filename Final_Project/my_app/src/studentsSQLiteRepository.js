const path = require('path');
const betterSqlite3 = require('better-sqlite3');
const Student = require('./Student');

const db = new betterSqlite3(path.join(__dirname, '../data/students.sqlite'), {verbose: console.log});
const createStmt = db.prepare("CREATE TABLE IF NOT EXISTS STUDENTS (ID	INTEGER PRIMARY KEY AUTOINCREMENT, FIRST_NAME TEXT, LAST_NAME TEXT, EMAIL_ADDRESS TEXT, FATHER_NAME TEXT, MOTHER_NAME TEXT, DATE_OF_BIRTH TEXT, CURRENT_DATE TEXT)")
createStmt.run();

const repo = {
    findAll: () => {
        const stmt = db.prepare("SELECT * FROM STUDENTS");
        const rows = stmt.all();
        let students = [];
        rows.forEach((row) => {
            const student = new Student(row.ID, row.FIRST_NAME, row.LAST_NAME, row.EMAIL_ADDRESS, row.FATHER_NAME, row.MOTHER_NAME, row.DATE_OF_BIRTH, row.CURRENT_DATE);
            students.push(student);
        });
        return students;
    },
    findById: (uuid) => {
        const stmt = db.prepare("SELECT * FROM STUDENTS WHERE ID = ?")
        const row = stmt.get(uuid);
        if(row === undefined){
            return new Student();
        }
        return new Student(row.ID, row.FIRST_NAME, row.LAST_NAME, row.EMAIL_ADDRESS, row.FATHER_NAME, row.MOTHER_NAME, row.DATE_OF_BIRTH, row.CURRENT_DATE);
    },
    create: (student) => {
       const stmt = db.prepare("INSERT INTO STUDENTS (FIRST_NAME, LAST_NAME, EMAIL_ADDRESS, FATHER_NAME, MOTHER_NAME, DATE_OF_BIRTH, CURRENT_DATE) VALUES ('"+student.firstName+"', '"+student.lastName+"', '"+student.emailAddress+"', '"+student.fatherName+"', '"+student.motherName+"', '"+student.dateOfBirth+"', datetime('now', 'localtime'))");
       console.log(stmt);
       const info = stmt.run();
       console.log(`Contact Created with ID: ${info.lastInsertRowId}`);
    },
    deleteById: (uuid) => {
        const stmt = db.prepare("DELETE FROM STUDENTS WHERE ID = ?");
        const info = stmt.run(uuid);
        console.log(`rows affected: ${info.changes}`);
    },
    update: (student) => {
        const stmt = db.prepare("UPDATE STUDENTS SET FIRST_NAME = '"+student.firstName+"', LAST_NAME = '"+student.lastName+"', EMAIL_ADDRESS = '"+student.emailAddress+"', FATHER_NAME = '"+student.fatherName+"', MOTHER_NAME = '"+student.motherName+"', DATE_OF_BIRTH = '"+student.dateOfBirth+"', CURRENT_DATE = datetime('now', 'localtime') WHERE ID = '"+student.id+"'");
        const info = stmt.run();
        console.log(`rows affected: ${info.changes}`);
    },
};

module.exports = repo;