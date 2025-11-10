const menuList = [
    {
      id: 1,
      title: "buttermilk pancakes",
      category: "breakfast",
      price: 15.99,
      img: "./images/item-1.jpeg",
      desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
    },
    {
      id: 2,
      title: "diner double",
      category: "lunch",
      price: 13.99,
      img: "./images/item-2.jpeg",
      desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
    },
    {
      id: 3,
      title: "godzilla milkshake",
      category: "shakes",
      price: 6.99,
      img: "./images/item-3.jpeg",
      desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
    },
    {
      id: 4,
      title: "country delight",
      category: "breakfast",
      price: 20.99,
      img: "./images/item-4.jpeg",
      desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
    },
    {
      id: 5,
      title: "egg attack",
      category: "lunch",
      price: 22.99,
      img: "./images/item-5.jpeg",
      desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
    },
    {
      id: 6,
      title: "oreo dream",
      category: "shakes",
      price: 18.99,
      img: "./images/item-6.jpeg",
      desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
    },
    {
      id: 7,
      title: "bacon overflow",
      category: "breakfast",
      price: 8.99,
      img: "./images/item-7.jpeg",
      desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
    },
    {
      id: 8,
      title: "american classic",
      category: "lunch",
      price: 12.99,
      img: "./images/item-8.jpeg",
      desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
    },
    {
      id: 9,
      title: "quarantine buddy",
      category: "shakes",
      price: 16.99,
      img: "./images/item-9.jpeg",
      desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
    },
    {
      id: 10,
      title: "dino nuggets",
      category: "kids",
      price: 5.99,
      img: "./images/item-10.jpeg",
      desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
    },
  ];

let sectionCenter = document.querySelector(".menu-wrap-section");
const btnContainer = document.querySelector(".btn-container");

window.addEventListener("DOMContentLoaded", function () {
  displayMenuItems(menuList); // display all upon initial landing
});

const displayMenuItems = (menuArr) => {
  // let menuItem = menuList [2];
  // console.log(menuItem);

  let displayMenu = menuArr.map((menuItem) =>{
    return  `<div class="menu-item-col">
      <img src=${menuItem.img} alt=${menuItem.title}>
      <div class="item-info">
          <header>
              <h4>${menuItem.title}</h4>
              <h4 class="price">$${menuItem.price}</h4>
          </header>
          <p class="item-text">${menuItem.desc}</p>
      </div>
    </div>`
  })

  console.log('display menu',displayMenu);
  displayMenu = displayMenu.join(""); //to hide "," below btns
  sectionCenter.innerHTML = displayMenu;
}

const displayMenuBtns = ()=>{
  const categories = menuList.reduce((accumulator,currentItem)=>{
    if(accumulator.includes(currentItem.category))
      console.log('category exists');
    else{
      console.log('category missing !');
      accumulator.push(currentItem.category);
    }
    console.log('accumulator',accumulator);
    return accumulator; //multi line function
  },["all"])

  console.log(categories);

  const categoryBtn = categories.map((itemCategory)=>{
    return `<button class="filter-btn" type="button" data-id=${itemCategory}>${itemCategory}</button>`
  }).join("");
  btnContainer.innerHTML = categoryBtn;
  
  const filterBtns = document.querySelectorAll('.filter-btn');
  console.log('filer btns',filterBtns);
  filterBtns.forEach((button)=>{
    button.addEventListener('click',(event)=>{
      console.log('event listener',event.currentTarget.dataset.id);
      const category = event.currentTarget.dataset.id;
      const menuSubList = menuList.filter((menuItem) => menuItem.category === category)
      console.log('menu sub list',menuSubList);
      if(category === 'all')
        displayMenuItems(menuList);
      else
        displayMenuItems(menuSubList);
    })
  })
}
displayMenuBtns();