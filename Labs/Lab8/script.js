/*
// Grade calculator
const marks = prompt("Enter the grade");
console.log("marks are as follows:");
console.log(marks);
// grade 100-90 = A, 89-80 = B, else F

// use if()
if (marks > 89 ) {
  grade = "A";
} else if (marks > 79) {
  grade = "B";
} else {
  grade = "F";
}
console.log("grade is as follows:");
console.log(grade);
*/
let grades = [50,89,75,84,99];
let sum=0;
for(let i=0; i<5; i++){
    sum+=grades[i];
}
console.log(sum);
let result = sum / 5;
console.log(result);