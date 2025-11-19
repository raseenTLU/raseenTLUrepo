//1- Link to get a random meal
let randomMealURL = 'https://www.themealdb.com/api/json/v1/1/random.php';

//2- Link to lookup a specific meal with an id
let mealURL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

//3- Link to search for meals using a keyword
let searchURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const mealsElement = document.getElementById("meals");
const favorites = document.querySelector(".favorites");
const searchTerm = document.querySelector("#search-term");
const searchBtn = document.querySelector("#search");



//async function getRadnomMeal() {
const getRadnomMeal = async ()=> {
   /* fetch(randomMealURL)
    .then((item)=> item.json())
    .then((data)=>console.log(data.meals[0]))
    .catch((err)=>console.log("There was an issue in the fetching ",err));
    */
   const resp = await fetch(randomMealURL);
   const data = await resp.json();
   //console.log(data.meals[0]);
   const randomMeal = data.meals[0];

   addMeal(randomMeal);
}

const addMeal = (mealData)=> {
   const meal = document.createElement('div');
   meal.classList.add('meal');

   meal.innerHTML = `
               <div class="meal-header">
                        <span class="random">Meal of the Day</span>
                        <img 
                        src="${mealData.strMealThumb}" 
                        alt="${mealData.strMeal}">
                </div>
                <div class="meal-body">
                    <h3>${mealData.strMeal}</h3>
                    <button class="fav-btn">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>`;

   const favoriteButton = meal.querySelector(".fav-btn");
   if(favoriteButton)
   {
      favoriteButton.addEventListener('click', ()=>{
         
         //check if meal is favorite
         if(favoriteButton.classList.contains('active'))
         {
            //remove from local storage
            removeMealsFromLocalStorage(mealData.idMeal);
         }
         else //not favorite
         {
            //add to local storage
            addMealsToLocalStorage(mealData.idMeal);
         }
         
         //This will automatically change the state
         favoriteButton.classList.toggle('active');
         updateFavoriteMeals();

      })
   }
   mealsElement.appendChild(meal);
   updateFavoriteMeals();

}

const addMealsToLocalStorage = (mealId)=> {
   const mealIds = getMealsFromLocalStorage();
   //console.log(mealIds);
   localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}

const removeMealsFromLocalStorage = (mealId)=> {
   const mealIds = getMealsFromLocalStorage();
   localStorage.setItem('mealIds', JSON.stringify(
      mealIds.filter(id => id !== mealId)
   ));
}

const getMealsFromLocalStorage = () => {
   const mealIds = JSON.parse(localStorage.getItem('mealIds'));

   return mealIds === null? []: mealIds;
}

const updateFavoriteMeals = ()=> {
   favorites.innerHTML = "";
   const mealIds = getMealsFromLocalStorage();
   console.log(mealIds);

   let meals = [];
   mealIds.forEach(async (meal) => {
      //console.log(meal);
      let tmpMeal = await getMealByID(meal);
      //meals.push(tmpMeal);

      addMealToFavorites(tmpMeal);
   })
}

const getMealByID = async (id) => {
   const resp = await fetch(mealURL+id);

   const data = await resp.json();
   //console.log(data);
   //console.log(data.meals[0]);
   const output = data.meals[0];
   console.log(output)

   return output;
}

const addMealToFavorites = (meal)=> {
   let favoriteMeal = document.createElement('li');
   console.log(meal);
   favoriteMeal.innerHTML = `
                           <img id="fav-img" 
                              src="${meal.strMealThumb}" 
                              alt="${meal.strMeal}">
                            <span>${meal.strMeal}</span>
                            <button class="clear">
                            <i class="fas fa-window-close"></i>
                            </button>`;
   const clearButton = favoriteMeal.querySelector('.clear');
   clearButton.addEventListener('click', ()=>{
      removeMealsFromLocalStorage(meal.idMeal);
      updateFavoriteMeals();
   })
   favorites.appendChild(favoriteMeal);
}


getRadnomMeal();
updateFavoriteMeals();

searchBtn.addEventListener('click',()=>{
   const searchWord = searchTerm.value;
   console.log(searchWord);
   
   searchForMeal(searchWord);
   
});

//displaying the search meals
const searchForMeal = (word)=>{
   getMealBySearch(word);
}

//searching the meals
const getMealBySearch = async (word)=>{
   const resp = await fetch(searchURL+word);

   const data = await resp.json();

   const output = data.meals;
   console.log(output)

   return output; 
}