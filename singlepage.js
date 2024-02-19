
// Creating the required variables
const sliderMainImage = document.getElementById("product-main-image");
let title = document.getElementById("title");
let description = document.getElementById("description");
let addCart = document.querySelector(".add-cart");
let price1 = document.getElementById("price");
let discount = document.getElementById("discount");
let imageListContainer = document.querySelector(".product-image-slider"); 
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let products = [];
let cart = [];
let totprice=0;
let total = 0;
let fin = 0;

let dataset_id ;
const checkout =document.getElementById("checkout")
const total_price = document.getElementById("total-price")
const tot = document.getElementById("tot")
const check_final = document.getElementById("check-final")
const sessionId = sessionStorage.getItem('ID');


// Event listener for showing/hiding cart when icon is clicked


const fname = sessionStorage.getItem("firstName");
const lname = sessionStorage.getItem("lastName");
const login = sessionStorage.getItem("login");
const loginBtn = document.getElementById("login");
const userProfile = document.getElementById("user-profile");
const profileImg = document.getElementById("profileImg");

if(sessionStorage.getItem("login")=='active'){
    const firstLetterFname = fname.charAt(0).toUpperCase();
    const firstLetterLname = lname.charAt(0).toUpperCase();
    profileImg.innerText = `${firstLetterFname}${firstLetterLname}`;
    userProfile.style.display = "block";
    loginBtn.innerText = 'Logout';
}else{
    // userProfile.style.display = "none";
    loginBtn.innerText = 'Login';
}

// Login Button
document.getElementById('login').addEventListener('click', ()=>{
    sessionStorage.clear();
    if(login=='active'){
        let formData = JSON.parse(localStorage.getItem('formData'))
        console.log(formData);
        formData[sessionId].login = 'inactive'

        localStorage.setItem('formData', JSON.stringify(formData));
    }
    window.location.href = "./logIn.html";
}); 


iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

// Function to get product ID from URL query params

function getSearchParams() {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get('productId'); 
}

// Function to fetch and display single product
function singleItem(productId) {
  fetch(`https://dummyjson.com/products/${productId}`)
    .then(res => res.json())
    .then((single) => {
      // Update UI with product details
      sliderMainImage.src = single.thumbnail;
      title.innerText = single.title;
      price1.innerText = single.price;
      discount.innerText = single.discountPercentage;
      description.innerText = single.description;

      // Display product images
      imageListContainer.innerHTML = '';
      single.images.forEach((imageURL, index) => {
        const imageElement = document.createElement('img');
        imageElement.src = imageURL;
        imageElement.alt = `Image ${index + 1}`;
        imageListContainer.appendChild(imageElement);

        // Event listener to switch main image on thumbnail click
        imageElement.addEventListener('click', function () {
          sliderMainImage.src = imageElement.src;
        });
      });

      console.log(single);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Fetch single product based on product ID from URL
const productId = getSearchParams();
if (productId) {
  singleItem(productId);
} else {
  console.error('Product ID not found in URL.');
}

// Event listener for adding item to cart
addCart.addEventListener('click', () => {


    // if user dosen't login it will alert
    
    if(login=='active'){
        addToCart(productId);
            addCartToHTML();

    }else{
        alert("Please login to AddCart")
    }
            
        
    })




// Function to add item to cart
const addToCart = (productId) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == productId);
    if(cart.length <= 0){
        cart = [{
            product_id: productId,
            quantity: 1,
        }];
    }else if(positionThisProductInCart < 0){
        cart.push({
            product_id: productId,
            quantity: 1,
        });
    }else{
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    
    addCartToMemory();
}

// Function to add cart data to local storage
const addCartToMemory = () => {
    const cartCopy = cart.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity
    }));
    if(sessionId!=null){
        localStorage.setItem('acc-cart-' + sessionId, JSON.stringify(cartCopy));
    }
}

// Function to update cart UI
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(cart.length > 0){
        total = 0;
        cart.forEach(item => {
            totalQuantity = totalQuantity +  item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;
            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            listCartHTML.appendChild(newItem);
            totprice=info.price * item.quantity;

            total = total+totprice;
            newItem.innerHTML = `
            <div class="image">
                    <img src="${info.thumbnail}">
                </div>
                <div class="name">
                ${info.title}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
        })
        tot.innerText = 'TOTAL : $'
        total_price.innerText= total;
        if(sessionId!=null){
            if(cart.length>=1){
                fin=total;
            }
            localStorage.setItem('Total', JSON.stringify(fin));
        }
        checkCartitems()
    }
       
    if(sessionId!=null){
        iconCartSpan.innerText = totalQuantity;
    }
}

// Event listener for cart item quantity change
listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})

// Function to change cart item quantity
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                }else{
                    cart.splice(positionItemInCart, 1);
                    tot.innerText= ''
                    total_price.innerText=''
                    fin=0
                    total=0
                    checkCartitems()

                    localStorage.setItem('Total', JSON.stringify(fin));
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}
//  assigning checkout based on total value

function checkCartitems(){
    
    if(total>0){
        checkout.href="checkout.html"
    
    }else{
        checkout.href="#"
    }
}
checkCartitems()




// Function to initialize the app
const initApp = () => {
    // Fetch product data
    fetch('https://dummyjson.com/products?limit=100')
    .then(response => response.json())
    .then(data => {
        products = data.products;
        dataset_id = products.id;

        // Get cart data from local storage based on session ID
        const cartKey = 'acc-cart-' + sessionId;
        if (localStorage.getItem(cartKey)) {
            cart = JSON.parse(localStorage.getItem(cartKey));
            if(sessionId!=null){
                addCartToHTML();

            }
           
        }
    });
}


initApp(); // Call the initialization function



// ------------------------------------------------------poovarasan review local storage to store and retrive_________------------------------------------------------------------------

const star= document.querySelectorAll('.star i');
const rateno = document.getElementById('rateno');

  fetch(`https://dummyjson.com/products/${productId}`)
    .then(res => { return res.json()})
    .then(data => {
      rateno.innerText = `${data.rating} out of 5 `;
      star.forEach((rate, index1) => {            
        if (index1 <= (data.rating - 1)) {
          rate.classList.add("active");
        } else {
          rate.classList.remove("active");
        }
      });
    });

// Poovarasan review

// Function to display product reviews
function displayProductReviews(productId) {
    const reviewsSection = document.getElementById("customerReviews");
    reviewsSection.innerHTML = ""; // Clear existing reviews

    // Retrieve reviews for this product from local storage
    const productReviews = JSON.parse(localStorage.getItem(`productReviews_${productId}`)) || [];

    // Display each customer review
    productReviews.forEach(review => {
        const reviewDiv = document.createElement("div");
        reviewDiv.innerHTML = `
            <div id="username">${review.username}</div>
            <div class="star" id="userstar">
                ${generateStarIcons(review.rating)}
                <p>${review.rating} rating</p>
            </div>
            <p>${review.description}</p>`;
        reviewsSection.appendChild(reviewDiv);
    });
}

// Function to submit a review
function submitReview() {

    const productId = getSearchParams(); // Get the current product ID
    const popstar = document.querySelectorAll('.popstar i');
    const popdescription = document.getElementById('popdescription');
    let rating = 0;
    
    // Calculate the rating based on the selected stars
    popstar.forEach((rate, index) => {
        if (rate.classList.contains("active")) {
            rating = index + 1;
        }
    });
    if(!rating || !popdescription.value){

        alert("Please leave a review.");}
        else{
    const username = sessionStorage.getItem("firstName"); // Replace with the actual username (retrieve from user authentication)
    if (username) {
    const review = {
        username: username,
        rating: rating,
        description: popdescription.value
    };
    
    // Retrieve existing reviews from local storage
    const existingReviews = JSON.parse(localStorage.getItem(`productReviews_${productId}`)) || [];

    // Add the new review to the existing reviews
    existingReviews.push(review);

    // Save the updated reviews back to local storage
    localStorage.setItem(`productReviews_${productId}`, JSON.stringify(existingReviews));

    // Display the updated reviews
    displayProductReviews(productId);

    // Clear the popup content after submission
    clearPopup();
    }
    else {
    alert("Please log in to leave a review.");
      }  
    }
}
displayProductReviews(productId);
// Function to clear the popup content
function clearPopup() {
    const popstar = document.querySelectorAll('.popstar i');
    const popdescription = document.getElementById('popdescription');
    const poprateno = document.getElementById('poprateno');

    // Remove the "active" class from all stars
    popstar.forEach(rate => {
        rate.classList.remove("active");
    });

    // Clear the description input
    popdescription.value = '';

    // Clear the rating display
    poprateno.innerHTML = '';
}

// Function to generate star icons based on the rating
function generateStarIcons(rating) {
    let stars = "";
    for (let i = 0; i < rating; i++) {
        stars += '<i class="fa-solid fa-star"></i>';
    }
    return stars;
}

// Display popup
document.getElementById('openReviewPopup').addEventListener("click", () => {
    const productId = getSearchParams(); // Get the current product ID
    document.getElementById('popupContainer').style.display = 'block';

    // Display existing reviews when the popup is opened
   
});

// Close popup
document.getElementById('close').addEventListener("click", () => {
    document.getElementById('popupContainer').style.display = 'none';

    // Clear the popup content when closing
    clearPopup();
});

// Handle review submission
document.getElementById('popsubmitrev').addEventListener("click", () => {
    // Submit the review and close the popup
    submitReview();
    document.getElementById('popupContainer').style.display = 'none';
});



// copy code upon
const popstar = document.querySelectorAll('.popstar i');
    const poprateno = document.getElementById('poprateno');

    popstar.forEach((rate, index) => {
        rate.addEventListener('click', () => {
            // Remove "active" class from all stars
            popstar.forEach((star, i) => {
                star.classList.remove("active");
            });

            // Add "active" class to clicked star and stars before it
            for (let i = 0; i <= index; i++) {
                popstar[i].classList.add("active");
            }

            // Update the rating description based on the selected stars
            switch (index + 1) {
                case 1:
                    poprateno.innerHTML = `Very Bad`;
                    poprateno.style.color = "#ff0000";
                    break;
                case 2:
                    poprateno.innerHTML = `Bad`;
                    poprateno.style.color = "#ff8c00";
                    break;
                case 3:
                    poprateno.innerHTML = `Good`;
                    poprateno.style.color = "#008000";
                    break;
                case 4:
                    poprateno.innerHTML = `Very Good`;
                    poprateno.style.color = "#008000";
                    break;
                case 5:
                    poprateno.innerHTML = `Excellent !`;
                    poprateno.style.color = "#006400";
                    break;
            }
        });
    });


