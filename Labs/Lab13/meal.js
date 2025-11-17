//1- Link to get a random meal
let randomMealURL = 'https://www.themealdb.com/api/json/v1/1/random.php';

//2- Link to lookup a specific meal with an id
//https://www.themealdb.com/api/json/v1/1/lookup.php?i=

//3- Link to search for meals using a keyword
//https://www.themealdb.com/api/json/v1/1/search.php?s=

const getRandomMeal = () => {
    fetch(randomMealURL)
    .then((response) => response.json())
    .then((data) => console.log(data.meals[0]))
    .catch((error) => console.log('there is an error fecthing',err));
    
    //async fucntion getrandomMeal()
    //const resp1 = await fetch(randomMealURL);
    //const data = await resp1.json();

}