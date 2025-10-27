// objects
const student = {
  name: "Maria Garcia",
  contact: {
    email: "maria@email.com",
    phone: "555-1234",
    address: {
      street: "123 Main St",
      city: "Toronto",
      country: "Canada"
    }
  },
  courses: ["Math", "Science", "History"]
};

console.log(student.contact.email)
console.log(student.contact.address.city)
//console.log(student.emergency.phone) //JS errors break code

// optional chaining
console.log(student.contact?.address?.city);
console.log(student.emergency?.phone);