
// Creating the required variables
const sliderMainImage = document.getElementById("product-main-image");
let title = document.getElementById("title");
let description = document.getElementById("description");
let addCart = document.querySelector(".add-cart");
let price1 = document.getElementById("price");
let discount = document.getElementById("discount");
let imageListContainer = document.querySelector(".product-image-slider"); // Updated to use the product-image-slider class
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
const total_price = document.getElementById("total-price")
const tot = document.getElementById("tot")
const check_final = document.getElementById("check-final")
const sessionId = sessionStorage.getItem('ID');

// Event listener for showing/hiding cart when icon is clicked
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
    addToCart(productId);
    addCartToHTML();
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
                    localStorage.setItem('Total', JSON.stringify(fin));
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}

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
            addCartToHTML();
        }
    });
}

initApp(); // Call the initialization function
