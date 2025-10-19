const colors = ["green", "red", "rgba(133,122,200)", "#f15025", "purple", "mustard"];
const btn1 = document.querySelector('.btn1');
const btn2 = document.querySelector('.btn2');
const btn3 = document.querySelector('.btn3');
const colorBackg = document.querySelector('#colorPanel');
const colorText = document.querySelector('#colorCode');

// console.log('random math numbers',Math.random()); // values between 0-1
// event listenser

function randomColor(){ //button 1 func
    console.log('1st button clicked!');
    let colorIndex = Math.floor(Math.random()*colors.length);
    console.log('color index',colorIndex);
    colorBackg.style.backgroundColor = colors[colorIndex];
    colorText.innerText = colors[colorIndex];
}

// BUTTON 1
btn1.addEventListener('click',randomColor);
// do not add () when calling random color func
// to not call function unless btn is clicked

//BUTTON 2: rgba (n,n,n) range 0-255
btn2.addEventListener('click',RGB);

// hex range 0-9,A-F,10
btn3.addEventListener('click',HEX);

// generate a number between 0 and 255 (inclusive) 
function RGB() { //button2 func
    console.log('RBG button clicked!');
    let r = Math.floor(Math.random()*(255 + 1));
    let g = Math.floor(Math.random()*(255 + 1));
    let b = Math.floor(Math.random()*(255 + 1));
    console.log('r=',r,'g=',g,'b=',b);
    colorBackg.style.backgroundColor = `rgb(${r},${g},${b})`;
    colorText.innerText = `rgb(${r},${g},${b})`;
}
//console.log('random integer 255',randomRGB(255));

// generate a number between 0 and F (inclusive) 
function HEX() { //button3 func
    console.log('HEX button clicked!');
    // multiply with 16777215 (which is 0xFFFFFF - the total number of colors)
    //convert to hexadecimal
    let oneH = Math.floor(Math.random() * 16).toString(16);
    let twoH = Math.floor(Math.random() * 16).toString(16);
    let threeH = Math.floor(Math.random() * 16).toString(16);
    let fourH = Math.floor(Math.random() * 16).toString(16);
    let fiveH = Math.floor(Math.random() * 16).toString(16);
    let sixH = Math.floor(Math.random() * 16).toString(16);
    console.log('oneH =',oneH,'twoH =',twoH,'threeH =',threeH,'fourH =',fourH,'fiveH =',fiveH,'sixH =',sixH);
    let hexColor = `#${oneH}${twoH}${threeH}${fourH}${fiveH}${sixH}`;
    console.log('Hex color:', hexColor);
    colorBackg.style.backgroundColor = hexColor;
    colorText.innerText = hexColor;
}