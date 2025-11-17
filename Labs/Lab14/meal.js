//1- Link to get a random meal
let randomMealURL = 'https://www.themealdb.com/api/json/v1/1/random.php';

//2- Link to lookup a specific meal with an id
//https://www.themealdb.com/api/json/v1/1/lookup.php?i=

//3- Link to search for meals using a keyword
//https://www.themealdb.com/api/json/v1/1/search.php?s=

const mealsElement = document.getElementById("meals");

//async function getRadnomMeal() {
const getRandomMeal = async ()=> {
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
         //updateFavoriteMeals
      })
   }
   mealsElement.appendChild(meal);
   //updateFavoriteMeals
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

const updateFavoriteMeals = ()=>{
   favorites.innerHTML = "";
   const mealIds = getMealsFromLocalStorage();
   console.log(mealIds);

   let meals = [];
   mealIds.forEach(async(meal)=>{
      //console.log(meal);
      let tmpMeal = await getMealByID(meal);
      addMealToFaves(tmpMeal);
   })
}
const getMealByID = async(id) =>{
   const rep = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i="+id);
   
   const data = await rep.json();
   console.log(data);
   //based on result of console.log(data.meals[0]) do the following
   const output = data.meals[0];
   console.log(output);
   return output;
   //addID()
}
const addMealToFaves = (mealData)=>{
   let faveMeal = document.createElement('li');
   faveMeal.innerHTML = `
                           <img id="fav-img"
                              src="${mealData.strMealThumb}"
                              alt="${mealData.strMeal}">
                           <span>${mealData.strMeal}</span>
                           <button class="clear">
                           <i class="fas fa-window-close"></i>
                           </button>`;
   const clearBtn = faveMeal.querySelector('.clear');
   clearBtn.addEventLisitner('click', ()=>{
      removeMealsFromLocalStorage(meal.idMeal);
      updateFaveMeals();
   })
   favorites.appendChild(faveMeal);
}
getRadnomMeal();