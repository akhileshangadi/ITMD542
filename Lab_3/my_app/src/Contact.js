class Contact {
    constructor(id, firstName, lastName, emailAddress, notes, currentDate) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.emailAddress = emailAddress;
      this.notes = notes;
      this.currentDate = currentDate;
    }
}
  
module.exports = Contact;