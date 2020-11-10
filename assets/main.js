$(document).ready(function () {

    if (typeof jQuery == 'undefined') {
        console.log("Jquery not available");
    }
    else {
        console.log('Jquery Ver:' + jQuery.fn.jquery);
    }


    // LIVETICKER //

    const liveticker = document.querySelectorAll('#liveticker__red p');
    const livetickerPurpleSize = document.querySelector('#liveticker__purple p span')
    const livetickerPurple = document.querySelector('#liveticker__purple p')
    const livetickerRedSize = document.querySelector('#liveticker__red p span')

    const livetickerRedSizeWidth = livetickerRedSize.clientWidth + 20;
    const livetickerPurpleSizeWidth = livetickerPurpleSize.clientWidth + 20;


    const movementTimeline = gsap.timeline({
        repeat: -1
    })

    const movementTimeline2 = gsap.timeline({
        repeat: -1
    })

    movementTimeline
        .set(liveticker, { x: 0 })
        .to(liveticker, { x: -livetickerRedSizeWidth, duration: 4, ease: "linear" })

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

    const head = document.querySelector('#intro__head--container img')
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
    var indexRotation = 0;

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


            indexRotation = imageNumber
        }, false);

        products[i].addEventListener("touchmove", function (e) {
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


    // IMAGE HEIGHT FIX //

    let
        $productImages = $('.product__image'),
        $imagesContainer = $('.product__image__wrapper')

    if ($productImages.length > 0) {

        const changeContainerHeight = () => {
            let imageHeight = $productImages[0].clientHeight
            $imagesContainer.css('height', imageHeight)

        }

        changeContainerHeight()

        $(window).resize(function () {
            changeContainerHeight()
        });

    }


    // ACCORDEON //

    const panels = document.querySelectorAll('.product__page__panel__container')
    const plusIcons = document.querySelectorAll('.product__page__panel__more')


    for (var i = 0; i < panels.length; i++) {
        panels[i].addEventListener("click", function (event) {
            let plusIcon = this.querySelector('.product__page__panel__more');
            let panel = this.querySelector('.product__page__panel')



            if (panel.style.display == 'block') {
                panel.style.display = 'none'
                plusIcon.style.transform = 'rotate(0deg)'
            } else {
                panel.style.display = 'block'
                plusIcon.style.transform = 'rotate(45deg)'
            }

        }, false);
    }

    // CART SLIDE OUT //

    const cartIcon = document.querySelector('.link__cart')
    const cartIconMobile = document.querySelector('.link__cart--mobile')
    const cartCloseIcon = document.querySelector('#cart__close')
    const cart = document.querySelector('#cart')
    const cartContainer = document.querySelector('.cart__products__container')


    const toggleCart = () => {
        let cartTop = cart.style.top

        if (cartTop == '0px') {
            cart.style.top = '-120%'
        } else {
            cart.style.top = 0
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0;
        }
    }

    const openCartOnAdd = () => {
        cart.style.top = 0
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0;
    }




    cartIcon.addEventListener('click', function (event) {
        event.preventDefault();
        toggleCart()
    }, false)

    cartIconMobile.addEventListener('click', function (event) {
        event.preventDefault();
        toggleCart()
    }, false)

    cartCloseIcon.addEventListener('click', function (event) {
        event.preventDefault();
        toggleCart()
    }, false)




    // MOBILE NAVIGATION //

    const $burger = $('.link__burger')
    const $mobileMenu = $('#header--mobile')
    const $xMobile = $('#link__burger--mobile')

    $burger.on('click', function (e) {
        e.preventDefault()
        $mobileMenu.css('left', '0%');
    })

    $xMobile.on('click', function (e) {
        e.preventDefault()
        $mobileMenu.css('left', '100%');
    })


    // QUANTITY  //

    const quantityField = document.querySelector('.quantity__field')
    const quantityButtons = document.querySelectorAll('.js-button-quantity')
    const quantityTextField = document.querySelector('.quantitiy__button--text')
    const sizesFields = document.querySelectorAll('#product__page__sizes .select__sizes')
    const addToCartButton = document.querySelector('.button__addToCart')

    let maxValue;
    let minValue = 1;

    for (var i = 0; i < quantityButtons.length; i++) {

        quantityButtons[i].addEventListener("click", function (event) {
            let includesPlus = this.classList.value.includes('plus');

            if (includesPlus) {
                if (parseInt(quantityField.value) >= maxValue) {
                    return
                }
                quantityField.value = parseInt(quantityField.value) + 1
            } else {
                if (parseInt(quantityField.value) <= minValue) {

                    return
                }
                quantityField.value = parseInt(quantityField.value) - 1
            }

            quantityTextField.innerHTML = quantityField.value;
            ;
        }, false);
    }



    for (var i = 0; i < sizesFields.length; i++) {
        sizesFields[i].addEventListener("change", function (event) {

            maxValue = this.getAttribute('data-inventory-quantity');
            quantityField.setAttribute("max", maxValue);
            addToCartButton.disabled = false;

            if (parseInt(quantityField.value) > maxValue) {
                quantityField.value = maxValue
                quantityTextField.innerHTML = maxValue

            }

            if (parseInt(quantityField.value) < minValue) {
                quantityField.value = minValue
                quantityTextField.innerHTML = minValue

            }


        }, false);
    }


    // ADD TO CART / UPDATE CART //

    onAddToCart = function (event) {
        event.preventDefault();

        $.ajax({
            type: 'POST',
            url: '/cart/add.js',
            data: $(this).serialize(),
            dataType: 'json',
            success: onCartUpdated, //what happens in success case
            error: onError, //what happens in error case
        });

        openCartOnAdd()
   
    },
        onLineRemoved = function (event) {

            event.preventDefault()
            event.stopPropagation()
            let
                $removeLink = $(this),
                removeQuery = $removeLink.attr('href').split('change?')[1]
            $.post('/cart/change.js', removeQuery, onCartUpdated, 'json')
        },
        onCartUpdated = function (event) {
            //jQuery Ajax Call
            $.ajax({
                type: 'GET', //method
                url: '/cart',
                context: document.body,
                success: function (context) {
                    let
                        $dataCartContents = $(context).find('.cart__page--content'),
                        dataCartHtml = $dataCartContents.html(),
                        dataCartItemCount = $dataCartContents.attr('data-cart-item-count'),
                        $miniCartContents = $('.cart__content');

                    $miniCartContents.html(dataCartHtml)

                },
                error: onError,
            });


        },
        onError = function (XMLHttpRequest, message) {
            let data = XMLHttpRequest.responseJSON
        }


    const addToCartForm = document.querySelector('#AddToCartForm');
    const removeButtons = document.querySelectorAll('.cart__content .cart__remove__button')


    if (addToCartForm) {
        addToCartForm.addEventListener('submit', onAddToCart, false);
    }


    $(document).on('click', '.cart__content .cart__remove__button', onLineRemoved);



    //BUY NOW //

    $('#product__page__sizes .js-buy-now').on('click', function (e) {
        e.preventDefault()

        //add to cart + send to checkout page
        $.ajax({
            type: 'POST',
            url: '/cart/add.js',
            data: $(this).serialize(),
            dataType: 'json',
            success: onCartUpdated,
            error: function (data) {
                return;
            },
        })

        openCartOnAdd()
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0;

        onCartUpdated = function (event) {
            //jQuery Ajax Call
            $.ajax({
                type: 'GET', //method
                url: '/cart',
                context: document.body,
                success: function (context) {
                    let
                        $dataCartContents = $(context).find('.cart__page--content'),
                        dataCartHtml = $dataCartContents.html(),
                        dataCartItemCount = $dataCartContents.attr('data-cart-item-count'),
                        $miniCartContents = $('.cart__content');

                    $miniCartContents.html(dataCartHtml)

                },
                error: onError,
            });


        },
            onError = function (XMLHttpRequest, message) {
                let data = XMLHttpRequest.responseJSON

            }
    });

    // CART QUANTITY //

    let
        quantityCartField = '.js-cart-quantity',
        quantityButtons2 = '.js-cart-quantity-button',
        quantityPickerContainer = '.cart__quantity--container'

    quantityPicker = {

        handleButtonClick: function (event) {
            let
                $button = $(this),
                $pickerContainer = $button.closest('.cart__quantity--container'),
                $quantity = $pickerContainer.find('.js-cart-quantity'),
                quantityValue = parseInt($quantity.val()),
                includesPlus = $button.attr('class').includes('plus'),
                includesMinus = $button.attr('class').includes('minus');

            if (includesPlus) {
                $quantity.val(quantityValue + 1).change()
            }
            if (includesMinus) {
                if (quantityValue === 1) {
                    return
                } 
                $quantity.val(quantityValue - 1).change()
            }
            console.log(quantityValue);
        },

        handleFieldChange: function (event) {
            let
                $field = $(this),
                $pickerContainer = $field.closest('.cart__quantity--container'),
                $quantityText = $pickerContainer.find('.quantitiy_cart_button--text'),
                shouldDisableMinus = parseInt(this.value) === 1,
                shouldDisablePlus = parseInt(this.value) === parseInt($field.attr('max')),
                $minusButton = $pickerContainer.find('.cart__button--minus'),
                $plusButton = $pickerContainer.find('.cart__button--plus');

            $quantityText.text(this.value);

            if (shouldDisableMinus) {
                $minusButton.prop('disabled', true)
            }
            else if ($minusButton.prop('disabled') === true) {
                $minusButton.prop('disabled', false)
            }

            if (shouldDisablePlus) {
                $plusButton.prop('disabled', true)
            }
            else if ($plusButton.prop('disabled') === true) {
                $plusButton.prop('disabled', false)
            }

        },
        init: function () {
            $(document).on('click', quantityButtons2, quantityPicker.handleButtonClick)
            $(document).on('change', quantityCartField, quantityPicker.handleFieldChange)
        }

    }

    quantityPicker.init()




    // PRODUCT SLIDESHOW //

    const productImages = $('.product__page__img')
    const arrowLeft = $('.gallery-arrow-left')
    const arrowRight = $('.gallery-arrow-right')

    let index = 0;

    arrowRight.on('click', function (event) {
        event.preventDefault();
        if (index >= productImages.length - 1) {
            productImages[index].style.display = "none";
            index = 0;
            productImages[index].style.display = "block";
        } else {
            productImages[index].style.display = "none";
            index++
            productImages[index].style.display = "block";
        }
    })

    arrowLeft.on('click', function (event) {
        event.preventDefault();
        if (index == 0) {
            return;
        }
        if (index <= 0) {
            productImages[index].style.display = "none";
            index = 0;
            productImages[index].style.display = "block";
        } else {
            productImages[index].style.display = "none";
            index--
            productImages[index].style.display = "block";
        }

    })




    //NOTIFY ME BUTTON INTEGRATION PRODUCT PAGE  https://help.backinstock.org/article/1588-using-a-custom-product-page-button//


    let
        addToCartButtonNotify = $('.button__addToCart'),
        notifyMeButton = $('.BIS_trigger'),
        selectButton = $('.select__sizes'),
        quantityInputButton = $('.product__page__form__quantity--field')


    selectButton.on('click', function (event) {
        let inventory = $(this).attr("data-inventory-quantity");
        if (inventory == 0) {

            addToCartButtonNotify.css('display', 'none')
            notifyMeButton.removeClass('inactive-notify')
            notifyMeButton.addClass('active-notify')
            quantityInputButton.addClass('inactive-quantity')
        } else {
            addToCartButtonNotify.css('display', 'block')
            notifyMeButton.removeClass('active-notify')
            notifyMeButton.addClass('inactive-notify')
            quantityInputButton.removeClass('inactive-quantity')
        }

    })


    //PASSWORD RECOVERY

    let
        $passwordResetLink = $('.reset__pw__link'),
        $passwordResetForm = $('.login__register--forgotPW'),
        $registerForm = $('.login__register--form');

    $passwordResetLink.on('click', function (event) {
        event.preventDefault()
        $passwordResetForm.css('display', 'block');
        $registerForm.css('display', 'none');
    })

    //LOTTIE //



    let svgContainer2 = document.querySelector('#lottieLogo');
    let animItem2 = bodymovin.loadAnimation({
      wrapper: svgContainer2,
      animType: 'svg',
    //   preserveAspectRatio: 'none',
      loop: true,
      path: "https://assets4.lottiefiles.com/packages/lf20_NZLrr8.json"
    });
    

})