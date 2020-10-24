

// LIVETICKER //

const liveticker = document.querySelectorAll('#liveticker__red p');
const livetickerPurple = document.querySelectorAll('#liveticker__purple p')
const livetickerRedSize = document.querySelector('#liveticker__red p span')

const livetickerRedSizeWidth = livetickerRedSize.clientWidth + 15;
const livetickerPurpleSizeWidth = livetickerRedSize.clientWidth + 15;


const movementTimeline = gsap.timeline({
    repeat: -1
})

const movementTimeline2 = gsap.timeline({
    repeat: -1
})

movementTimeline
    .set(liveticker, { x: 0 })
    .to(liveticker, { x: -livetickerRedSizeWidth, duration: 5, ease: "linear" })

movementTimeline2
    .set(livetickerPurple, { x: 0 })
    .to(livetickerPurple, { x: -livetickerPurpleSizeWidth, duration: 4, ease: "linear" })


// SCROLL HEADER //

const navigation = document.querySelector('#navigation');
const logo = document.querySelector('#link__logo');
const burger = document.querySelector('.link__burger');

let windowWidth = window.innerWidth
let scrollPosition = 0;
let ticking = false;

const resizingHeaderData = () => {

    if (scrollPosition > 50) {

        navigation.style.top = "-10px"
        logo.style.width = '150px'


        if (windowWidth < 780) {
            navigation.style.top = "15px"
            logo.style.width = '140px'
            burger.style.marginTop = '10px'
        }

        if (windowWidth < 550) {
            navigation.style.top = "15px"
            logo.style.width = '120px'
            burger.style.marginTop = '10px'
        }

    } else {

        if (windowWidth > 1098) {
            navigation.style.top = "50px"
            logo.style.width = '240px'
        }

        if (windowWidth < 1098) {
            navigation.style.top = "50px"
            logo.style.width = '200px'
        }

        if (windowWidth < 780) {
            navigation.style.top = "50px"
            logo.style.width = '200px'
            burger.style.marginTop = '20px'
        }
   
        if (windowWidth < 550) {
            navigation.style.top = "50px"
            logo.style.width = '150px'
            burger.style.marginTop = '20px'
        }


    }

}

window.addEventListener('resize', function (e) {
    windowWidth = window.innerWidth

    resizingHeaderData()
 
});

window.addEventListener('scroll', function (e) {

    scrollPosition = window.scrollY;
    
    resizingHeaderData()

});

//HEAD ROTATION ON SCROLL//

const head = document.querySelector('#intro__head--container')
const intro = document.querySelector('#intro')

gsap.registerPlugin(ScrollTrigger);
gsap.set(head, { xPercent: 0 });

var rotate = gsap.timeline({
    scrollTrigger: {
        trigger: "#products",
        scrub: 0.2,
        // start: 'top top',
    }
})
    .to(head, {
        rotation: 360 * 2,
        duration: 1, ease: 'none',
    })





// PRODUCT IMAGE ROTATION //

const products = document.querySelectorAll('.product')
var index = 0;

//add event listeners to all product objects in the array:
for (var i = 0; i < products.length; i++) {
    products[i].addEventListener("mousemove", function (event) {
        let allImages = this.querySelectorAll('.product__image');
        const allImagesLength = allImages.length

        const x = event.offsetX
        const width = this.offsetWidth
        const percentage = x / width

        const imageNumber = Math.floor(percentage * allImagesLength)

        allImages.forEach(image => {
            image.style.opacity = 0;
        })

        if (imageNumber < allImagesLength) {
            allImages[imageNumber].style.opacity = 1
        }


        index = imageNumber
    }, false);

    products[i].addEventListener("touchmove", function (e) {
        console.log('fired');
        let allImages = this.querySelectorAll('.product__image');
        const x = e.touches[0].clientX
        const width = e.currentTarget.offsetWidth
        const percentage = x / width
        const imageNumber = Math.floor(percentage * allImages.length)

        allImages.forEach(image => {
            image.style.opacity = 0;
        })

        if (imageNumber < allImages.length) {
            allImages[imageNumber].style.opacity = 1
        }

    }, false);

    products[i].addEventListener("mouseleave", function (event) {
        let allImages = this.querySelectorAll('.product__image');
        allImages.forEach(image => {
            image.style.opacity = 0;
        })

        allImages[0].style.opacity = 1


    }, false);
    products[i].addEventListener("touchend", function (event) {
        let allImages = this.querySelectorAll('.product__image');
        allImages.forEach(image => {
            image.style.opacity = 0;
        })

        allImages[0].style.opacity = 1


    }, false);
}





