const colors = ["green", "red", "rgba(133,122,200)", "#f15025", "purple", "mustard"];
const btn1 = document.querySelector('.btn1');
const btn2 = document.querySelector('.btn2');
const btn3 = document.querySelector('.btn3');
const colorBackg = document.querySelector('#colorPanel');
const colorText = document.querySelector('#colorCode');

// console.log('random math numbers',Math.random()); // values between 0-1
// event listenser
function randomColor(){
    console.log('1st button clicked!');
    let colorIndex = Math.floor(Math.random()*colors.length);
    console.log('color index',colorIndex);
    colorBackg.style.backgroundColor = colors[colorIndex];
    colorText.innerText = colors[colorIndex];
}
btn1.addEventListener('click',randomColor) // do not add () when calling random color func to not call function unless btn is clicked

// hw - practice rgba (n,n,n) range 0-255
btn2.addEventListener('click',randomColor)
// hex range 0-9,A-F,10
btn3.addEventListener('click',randomColor)
