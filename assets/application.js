// Put your application javascript here


let svgContainer = document.querySelector('#lottie');
let animItem = bodymovin.loadAnimation({
  wrapper: svgContainer,
  animType: 'svg',
  //   preserveAspectRatio: 'none',
  loop: true,
  path: "https://assets4.lottiefiles.com/packages/lf20_NZLrr8.json"
});

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

const impressum = document.querySelector('#impressum-password-container')
var link = document.querySelector('.link')
var links = document.querySelector('.links')


// Get the button that opens the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.querySelector(".close");

// When the user clicks on the button, open the modal
link.onclick = function (event) {

  event.preventDefault();
  modal.style.display = "block";
}
links.onclick = function (event) {

  event.preventDefault();
  modal.style.display = "block";
}


// When the user clicks on <span> (x), close the modal
span.onclick = function () {

  modal.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


// Set the date we're counting down to
var countDownDate = new Date("Nov 12, 2020 18:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("demo").innerHTML = hours + "h "
  + minutes + "m " + seconds + "s ";
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);