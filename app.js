'use strict';

//-----------------------------
// Global Variables
//-----------------------------

var total_clicks = 0;
var total_current_clicks = 0;
var allowed_number_of_clicks = 25;
var all_product_images = [];
var products_on_page = [];

//-----------------------------
// Global DOM References
//-----------------------------

var product_choices = document.getElementById('product_choices');
var number_of_products_on_the_page = document.getElementsByClassName('product');
var total_clicks_chart_element = document.getElementById('total_clicks_chart').getContext('2d');
var picked_when_on_page_chart_element = document.getElementById('percentages_chart').getContext('2d');


//-----------------------------
// Constructors and Associated Methods
//-----------------------------

//Product_image constructor
//takes the image path and the name of the product
//sets all starting clicks and times shown on page to 0
//assigns an element name (product name, all lowercase, with whitespce removed) that can be used to identify it when it's on the page
//adds each Product_image instance to the all_product_images array
var Product_image = function(url, product_name) {
  this.url = url;
  this.product_name = product_name;
  this.element_name = product_name.toLowerCase().replace(/\s|-/g, '');
  this.clicks = 0;
  this.times_shown_on_page = 0;

  all_product_images.push(this);
};


//-----------------------------
// Stand Alone Functions
//-----------------------------


//function to generate a random number
//range set by length of all_product_images array
function select_random_image() {
  var random_image_index = Math.floor(Math.random() * all_product_images.length);
  return random_image_index;
}

function new_image_set() {
  var new_images_to_render_to_page = [];

  //selects random images to render using the select_random_image function
  //number of images to select is based on how many elements have the 'product' class
  for (var i = 0; i < number_of_products_on_the_page.length; i++) {
    //prevent duplicate images by checking if the image's index has already been generated and generating a new index until they are all unique
    do {
      var new_image = select_random_image();
    } while (new_images_to_render_to_page.includes(new_image) || products_on_page.includes(new_image));
    //push to the new_images_to_render array
    new_images_to_render_to_page.push(new_image);

  }
  return new_images_to_render_to_page;

}

//renders new images to the page
function render_new_images() {
  var new_image_set_to_render = new_image_set();

  //for each product element on the page, update the 'src' and 'name' attributes
  //use the values stored in the 'url' and 'element_name' properties of the replacement image object
  for (var j = 0; j < number_of_products_on_the_page.length; j++) {
    //the newly generated index
    var new_image = new_image_set_to_render[j];
    products_on_page[j] = all_product_images[new_image];

    all_product_images[new_image].times_shown_on_page++;

    //target the specific image element
    //update the 'src' and 'name' attributes with the new information
    var image_element = number_of_products_on_the_page[j].childNodes[1];
    image_element.src = products_on_page[j].url;
    image_element.name = products_on_page[j].element_name;

    //target the image caption and update the text content
    var caption = number_of_products_on_the_page[j].childNodes[3];
    caption.textContent = products_on_page[j].product_name;
  }

  //update the products_on_page array with the newly rendered products' indexes
  products_on_page = new_image_set_to_render;
}


function calculate_array_based_percentages(data_array, divisor_array) {
  for (var q in data_array) {
    data_array[q] = Math.round((data_array[q] / divisor_array[q]) * 100);
  }
  console.log(data_array);
  return data_array;
}

function render_totals() {
  product_choices.innerHTML = '';
  render_total_clicks_chart();
  render_percentages_chart();
}

//-----------------------------
// Chart Functions
//-----------------------------

function render_total_clicks_chart() {
  var product_names = [];
  var number_of_times_product_was_clicked = [];
  var number_of_times_the_product_was_shown = [];

  for (var m = 0; m < all_product_images.length; m++) {
    product_names.push(all_product_images[m].product_name);
    number_of_times_product_was_clicked.push(all_product_images[m].clicks);
    number_of_times_the_product_was_shown.push(all_product_images[m].times_shown_on_page);
  }

  var green_gradient = total_clicks_chart_element.createLinearGradient(0, 0, 0, 600);
  green_gradient.addColorStop(0.0, 'whitesmoke');
  green_gradient.addColorStop(0.7, 'lightgreen');
  green_gradient.addColorStop(1.0, 'darkgreen');

  var blue_gradient = total_clicks_chart_element.createLinearGradient(0, 0, 0, 600);
  blue_gradient.addColorStop(0.0, 'whitesmoke');
  blue_gradient.addColorStop(0.5, 'lightblue');
  blue_gradient.addColorStop(1.0, 'darkblue');

  var clicks_chart = new Chart(total_clicks_chart_element, {
    type: 'bar',
    data: {
      labels: product_names,
      datasets: [{
        label: '# of Votes',
        data: number_of_times_product_was_clicked,
        backgroundColor: [
          green_gradient,
          green_gradient,
          green_gradient,
          green_gradient,
          green_gradient,
          green_gradient,
          green_gradient,
          green_gradient,
          green_gradient,
          green_gradient,
          green_gradient,
          green_gradient,
          green_gradient,
          green_gradient,
          green_gradient,
          green_gradient,
          green_gradient,
          green_gradient,
          green_gradient,
          green_gradient,
          green_gradient,
        ],
        borderColor: 'darkgreen',
        borderWidth: 1
      },
      {
        label: '# of times shown',
        data: number_of_times_the_product_was_shown,
        backgroundColor: [
          blue_gradient,
          blue_gradient,
          blue_gradient,
          blue_gradient,
          blue_gradient,
          blue_gradient,
          blue_gradient,
          blue_gradient,
          blue_gradient,
          blue_gradient,
          blue_gradient,
          blue_gradient,
          blue_gradient,
          blue_gradient,
          blue_gradient,
          blue_gradient,
          blue_gradient,
          blue_gradient,
          blue_gradient,
          blue_gradient,
          blue_gradient,
        ],
        borderColor: 'darkblue',
        borderWidth: 1
      }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Times Voted on a Product vs. Times Product was Shown on Page',
        fontSize: 20
      },
      layout: {
        padding: 20
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function render_percentages_chart() {
  var product_names = [];
  var number_of_times_product_was_clicked = [];
  var number_of_times_the_product_was_shown = [];

  for (var m = 0; m < all_product_images.length; m++) {
    product_names.push(all_product_images[m].product_name);
    number_of_times_product_was_clicked.push(all_product_images[m].clicks);
    number_of_times_the_product_was_shown.push(all_product_images[m].times_shown_on_page);
  }
  var percentages = calculate_array_based_percentages(number_of_times_product_was_clicked, number_of_times_the_product_was_shown);

  var purple_gradient = total_clicks_chart_element.createLinearGradient(0, 0, 0, 600);
  purple_gradient.addColorStop(0.0, 'whitesmoke');
  purple_gradient.addColorStop(1.0, '#7b27c4');

  var myChart = new Chart(picked_when_on_page_chart_element, {
    type: 'line',
    data: {
      labels: product_names,
      datasets: [{
        label: 'Percentage',
        data: percentages,
        fill: true,
        backgroundColor: purple_gradient,
        borderColor: '#531a84',
        borderWidth: 1
      }]
    },
    options: {
      title: {
        display: true,
        text: '% of Times Picked When Item was Shown on Page',
        fontSize: 20
      },
      scales: {
        yAxes: [{
          ticks: {
            max: 100,
            beginAtZero: true
          }
        }]
      }
    }
  });
}

//-----------------------------
// Event Functions
//-----------------------------

function image_was_clicked(event) {

  //limit number of clicks
  if (total_current_clicks < allowed_number_of_clicks) {
    var clicked;
    for (var k = 0; k < number_of_products_on_the_page.length; k++) {
      var possible_targeted_product = products_on_page[k];
      if (all_product_images[possible_targeted_product].element_name === event.target.name) {
        clicked = all_product_images[possible_targeted_product];
        clicked.clicks++;
        total_current_clicks++;
        render_new_images();
      }
    }
  } else {
    product_choices.removeEventListener('click', image_was_clicked);
    render_totals();
    total_clicks += total_current_clicks;
    localStorage.setItem('total_clicks', total_clicks);
    var stringified_all_product_images = JSON.stringify(all_product_images);
    localStorage.setItem('all_product_images', stringified_all_product_images);
  }
}

//-----------------------------
// Runtime
//-----------------------------

if (localStorage.getItem('all_product_images') === null) {
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
} else {
  var all_product_images_from_local_storage = localStorage.getItem('all_product_images');
  all_product_images = JSON.parse(all_product_images_from_local_storage);

  total_clicks = parseInt(localStorage.getItem('total_clicks'));
}

//starts page with random images
render_new_images();


//clicking
product_choices.addEventListener('click', image_was_clicked);
