
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

// creating  click functionality to cart icon
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

function getSearchParams() {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get('productId'); 
}
function singleItem(productId) {
  fetch(`https://dummyjson.com/products/${productId}`)
    .then(res => res.json())
    .then((single) => {
      sliderMainImage.src = single.thumbnail;
      title.innerText = single.title;
      price1.innerText = single.price;
      discount.innerText = single.discountPercentage;
      description.innerText = single.description;

      
      imageListContainer.innerHTML = '';

      
      single.images.forEach((imageURL, index) => {
        const imageElement = document.createElement('img');
        imageElement.src = imageURL;
        imageElement.alt = `Image ${index + 1}`;
        imageListContainer.appendChild(imageElement);

  
        imageElement.addEventListener('click', function () {
          sliderMainImage.src = imageElement.src;
          console.log(sliderMainImage.src);
        });
      });
      console.log(single);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}
const productId = getSearchParams();
if (productId) {
  singleItem(productId);
} else {
  console.error('Product ID not found in URL.');
}

//
addCart.addEventListener('click', () => {
    
            addToCart(productId);
            addCartToHTML();
            
        
    })


// adding cart in local storage 
const addToCart = (productId) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == productId);
    // checking local storage cart length before adding  
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
    // calling the function to store value in local storage 
    addCartToMemory();

}
// creating  the function to store value in local storage 
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}
// creating a function to show the stored products 

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    // to display the total  quantity in add to cart
    let totalQuantity = 0;
    if(cart.length > 0){
         total = 0;
        cart.forEach(item => {
            totalQuantity = totalQuantity +  item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;
           console.log(item.product_id);

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            listCartHTML.appendChild(newItem);
            totprice=info.price * item.quantity;
            console.log(totprice)

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
        console.log(total);
        tot.innerText = 'TOTAL :'
        // calculating the total price
        total_price.innerText= total;
        console.log(cart.length)
        if(cart.length>=1){
            fin=total;
        }
        // creating a local stoarge of total to store the total price 
        localStorage.setItem('Total', JSON.stringify(fin));

      
           
    }
    iconCartSpan.innerText = totalQuantity;
}
// function to get increase / decrease event for  the quantity 
listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        console.log(positionClick.parentElement.parentElement);
        console.log(product_id)
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})
// function to change the quantity 
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart];
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
    // calling the function to display CART area and adding those values to the local storage .
    addCartToHTML();
    addCartToMemory();
}
const initApp = () => {
    // getting the  product details from api 
    fetch('https://dummyjson.com/products?limit=100')
    .then(response => response.json())
    .then(data => {
        products = data.products;
        dataset_id=products.id
        console.log(products.cat)
        

        // get data cart from memory
        if(localStorage.getItem('cart')){

            cart = JSON.parse(localStorage.getItem('cart'));
            console.log(cart)
            addCartToHTML();
        }
    })
}

initApp();
