'use strict';

//-----------------------------
// Global Variables
//-----------------------------

var total_clicks = 0;
var all_product_images = [];
var left_image_on_page;
var center_image_on_page;
var right_image_on_page;
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
  all_product_images[random_image_index].times_shown_on_page++;
  return random_image_index;
}

function set_all_images() {
  var new_images_to_render_to_page = [];
  for (var i = 0; i < 3; i++) {
    var new_image = select_random_image();
    while (new_images_to_render_to_page.includes(new_image)) {
      new_image = select_random_image();
    }
    new_images_to_render_to_page.push(new_image);
  }

  console.log(new_images_to_render_to_page);

  left_image_on_page = all_product_images[new_images_to_render_to_page[0]];
  center_image_on_page = all_product_images[new_images_to_render_to_page[1]];
  right_image_on_page = all_product_images[new_images_to_render_to_page[2]];


  var left_image = document.getElementById('left_product_image');
  var center_image = document.getElementById('center_product_image');
  var right_image = document.getElementById('right_product_image');

  left_image.src = left_image_on_page.url;
  center_image.src = center_image_on_page.url;
  right_image.src = right_image_on_page.url;
}

function image_was_clicked(event) {
  total_clicks++;

  if (event.target.id === 'left_product_image') {
    left_image_on_page.clicks++;
    // console.log(left_image_on_page);
    // console.log(left_image_on_page.clicks);
  }
  if (event.target.id === 'center_product_image') {
    center_image_on_page.clicks++;
    // console.log(center_image_on_page);
    // console.log(center_image_on_page.clicks);
  }
  if (event.target.id === 'right_product_image') {
    right_image_on_page.clicks++;
    // console.log(right_image_on_page);
    // console.log(right_image_on_page.clicks);
  }
  set_all_images();
}

//-----------------------------
// Runtime
//-----------------------------

//populate array with images
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
new Product_image('./img/sweep.png', 'Baby Onesie Dustmop');
new Product_image('./img/tauntaun.jpg', 'Tauntaun Sleeping Bag');
new Product_image('./img/unicorn.jpg', 'Tinned Unicorn Meat');
new Product_image('./img/usb.gif', 'Tentacle USB Drive');
new Product_image('./img/water-can.jpg', 'Watering Can');
new Product_image('./img/wine-glass.jpg', 'Wine Glass');


//starts page with three random images
set_all_images();





//clicking
var product_choices = document.getElementById('product_choices');
// console.log(product_choices);

product_choices.addEventListener('click', image_was_clicked);
