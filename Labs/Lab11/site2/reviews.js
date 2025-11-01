// local reviews data
const reviews = [
    {
      id: 1,
      name: 'susan smith',
      job: 'web developer',
      img: 'https://images2.imgbox.com/e0/57/qI5bbwvg_o.jpeg',
      text: "Twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry",
    },
    {
      id: 2,
      name: 'anna johnson',
      job: 'web designer',
      img: 'https://images2.imgbox.com/2e/6e/JAMvTZ56_o.jpeg',
      text: 'Helvetica artisan kinfolk thundercats lumbersexual blue bottle. Disrupt glossier gastropub deep v vice franzen hell of brooklyn twee enamel pin fashion axe.photo booth jean shorts artisan narwhal.',
    },
    {
      id: 3,
      name: 'peter jones',
      job: 'intern',
      img: 'https://images2.imgbox.com/56/88/oJvFN3l5_o.jpeg',
      text: 'Sriracha literally flexitarian irony, vape marfa unicorn. Glossier tattooed 8-bit, fixie waistcoat offal activated charcoal slow-carb marfa hell of pabst raclette post-ironic jianbing swag.',
    },
    {
      id: 4,
      name: 'bill anderson',
      job: 'the boss',
      img: 'https://images2.imgbox.com/8b/1c/vwWNTsCd_o.jpeg',
      text: 'Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic. ',
    },
  ];

const reviewAuthor = document.getElementById("reviewAuthor");
const job = document.getElementById("job");
const comment = document.getElementById("comment");
const personImage = document.getElementById("person-img");

const randomBtn = document.querySelector('.random-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

const ids = [1,2,3,4];

const showReview = (id) => {
  reviewAuthor.textContent = reviews[id].name;
  job.textContent = reviews[id].job;
  comment.textContent = reviews[id].text;
  personImage.src = reviews[id].img;
}

randomBtn.addEventListener('click',()=>{
  let index = Math.floor(Math.random() * reviews.length);
  console.log(`index`,index);
  showReview(index);
});

// Option B (Loop Continuously)
let index = 0; // for prev & next btn

//hw - prev btn
prevBtn.addEventListener('click',()=>{
  index = (index - 1 + ids.length) % ids.length;
  console.log(`index`,index);
  showReview(index);
});

//hw - next btn
nextBtn.addEventListener('click',()=>{
  index = (index + 1) % ids.length;
  console.log(`index`,index);
  showReview(index);
});