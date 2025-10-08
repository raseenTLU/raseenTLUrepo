let grades = [50,89,75,84,99];
let sum = 0;

//indexing for loop
for(let i = 0; i < grades.length; i++){
  if(i%3 == 0)
  {
    sum += grades[i];
    console.log(`grade index in sum`,grades[i]);
  }
  console.log(`grade index`,grades[i]);
}
  console.log(`sum`,sum);
//mean
let mean = sum / grades.length;
console.log(`mean`, mean);

sum = 0; mean = 0; // reset values
//item for loop
for (let item of grades) {
  sum += item;
}

console.log(`sum`,sum);
mean = sum / grades.length;
console.log(`mean`,mean);

const countries = [`germany`,`france`,`italy`,`usa`,`canada`];
// let country1 = countries[0];
// let country2 = countries[1];
// let country3 = countries[2];
let [country1, ,...country2] = countries; // skip 2nd index, store 3rd item as array
console.log(`1st cntry=`,country1,`2nd cntry=`,country2);

/*
array methods
- forEach(), find(), filter(), map(), reduce(), sort()
arrow functions
*/

//FOR EACH
// countries.forEach((value, index) => {
//   console.log(`this is`,value,`of index`,index);
// })

countries.forEach(printNum);
function printNum(value,index) {
  console.log(`this is`,value,`of index`,index);
}

//FIND
const numbers = [15,23,8,42,4];
const firstLargeNum = numbers.find(num => num > 20);
console.log(`first Large Number`,firstLargeNum);

// if(!firstLargeNum){
//   console.log(`sorry cudnt find the number u r looking for`);
// }

if(firstLargeNum){
  console.log(`hey we found ur number`);
}
else{
  console.log(`sorry cudnt find the number u r looking for`); // good for checks + warnings
}

//MAP
const numbers2 = [1,2,3,4];
const squares2 = numbers.map(num => num*num);
console.log(`squares`,squares2);
//return item to add into array after computation

//REDUCE

//SORT