'use strict';

//-----------------------------
// Global Variables
//-----------------------------

var total_clicks = 0;
var all_product_images = [];

//-----------------------------
// Constructors and Associated Methods
//-----------------------------

var Product_image = function(url, product_name) {
  this.url = url;
  this.product_name = product_name;
  this.id = product_name.toLowerCase().replace(/\s/g, '');
  this.clicks = 0;
  this.times_shown_on_page = 0;

  all_product_images.push(this);
};


//-----------------------------
// Stand Alone Functions
//-----------------------------

function select_random_image() {
  var random_image_index = Math.floor(Math.random() * all_product_images.length);
  return random_image_index;
}

function image_was_clicked(event) {
  console.log(event.target);
  console.log(event.target.src);
}

//-----------------------------
// Runtime
//-----------------------------
new Product_image('./img/bag.jpg', 'R2-D2 Bag');
new Product_image('./img/banana.jpg', 'Banana Slicer');
new Product_image('./img/bathroom.jpg', 'Bathroom Tablet Stand');
new Product_image('./img/boots.jpg', 'Rubberboot Sandals');
new Product_image('./img/breakfast.jpg', 'All-In-One Breakfast Maker');
new Product_image('./img/bubblegum.jpg', 'Meatball Bubblegum');
new Product_image('./img/chair.jpg', 'Chair');
new Product_image('./img/cthulhu.jpg', 'Cthulhu Action Figure');
new Product_image('./img/dog-duck.jpg', 'Doggy Duckbill');
new Product_image('./img/dragon.jpg', 'Tinned Dragon Meat');
new Product_image('./img/pen.jpg', 'Silverware Pen Set');
new Product_image('./img/pet-sweep.jpg', 'Pet Dustmop Footies');
new Product_image('./img/scissors.jpg', 'Pizza Slice Scissors');
new Product_image('./img/shark.jpg', 'Shark Sleeping Bag');
new Product_image('./img/sweep.jpg', 'Baby Onesie Dustmop');
new Product_image('./img/tauntaun.jpg', 'Tauntaun Sleeping Bag');
new Product_image('./img/unicorn.jpg', 'Tinned Unicorn Meat');
new Product_image('./img/usb.jpg', 'Tentacle USB Drive');
new Product_image('./img/water-can.jpg', 'Watering Can');
new Product_image('./img/wine-glass.jpg', 'Wine Glass');


console.log(all_product_images);

var product_choices = document.getElementById('product-choices');
console.log(product_choices);

product_choices.addEventListener('click', image_was_clicked);
