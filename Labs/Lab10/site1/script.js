const daysElement = document.getElementById('days');
const hoursElement = document.querySelector('#hours'); //'.BigText' if class
const minsElement = document.getElementById('minutes');
const secsElement = document.querySelector('#seconds');

//daysElement.innerHTML = '5'; assign value 5 on screen for days
function countDown(){
    const endDate = new Date(2026,0,1);
    console.log('end date',endDate);

    const currentDate = new Date();
    console.log('current date+time/1000',currentDate.getTime()/1000); // output in miliseconds divided by 1000, so seconds

    const totalSeconds = (endDate - currentDate)/1000;
    console.log('total seconds',totalSeconds);

    const days = Math.floor(totalSeconds/(3600*24));
    console.log('day',days);

    const hours = Math.floor((totalSeconds % (3600*24))/3600);
    console.log('hours',hours);

    const minutes = Math.floor(totalSeconds%(24*3600)%3600/60);
    console.log('minutes',minutes);

    const seconds = Math.floor(totalSeconds%(24*3600)%3600%60);
    console.log('seconds',seconds);

    daysElement.innerHTML=days;
    hoursElement.innerHTML=hours;
    minsElement.innerHTML=minutes;
    secsElement.innerHTML=seconds;
}

countDown();
setInterval(countDown,1000);