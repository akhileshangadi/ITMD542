class Student {
    constructor(id, firstName, lastName, emailAddress, fatherName, motherName, dateOfBirth, currentDate) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.emailAddress = emailAddress;
      this.fatherName = fatherName;
      this.motherName = motherName;
      this.dateOfBirth = dateOfBirth;
      this.currentDate = currentDate;
    }
}
  
module.exports = Student;