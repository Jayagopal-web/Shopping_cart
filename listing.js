// ---------------- Home Page(index.html)----------------


// Login Button
document.getElementById('login').addEventListener('click', ()=>{
    window.location.href = "./logIn.html";
}); 
// login logic need to improve.


// get categories container to display products
const categoriesContainer = document.getElementById("categories-container");

// fetch product categories, it return array of categories
fetch('https://dummyjson.com/products/categories')
.then((res) => res.json())
.then((categories) => {
    categories.forEach(element => {
        // create parent div
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        
        // fetch each category of first product.
        fetch(`https://dummyjson.com/products/category/${element}?limit=1`)
        .then(res => res.json())
        .then((data) => {

            // create img tag and set src to append to parent div
            const img = document.createElement('img');
            img.src = `${data.products[0].thumbnail}`;
            cardDiv.append(img);

            // create div tag and set inner Text 'price' to append to parent div
            const price = document.createElement('div');
            price.innerText = `From $${data.products[0].price}`
            price.style.fontWeight = '500';
            cardDiv.append(price);
        });

        // create div tag and set inner Text 'Category' to append to parent div
        const categoryDiv = document.createElement('div');
        categoryDiv.innerText = `${element}`;
        cardDiv.append(categoryDiv);

        // last append the parent div to Categories container
        categoriesContainer.appendChild(cardDiv);

        // When the user clicks the product card, it return what product category they clicked. 
        cardDiv.addEventListener('click', () => sendValue(element));
    });
});


// ---------------- Listing Page(listing.html)----------------

// Save user selected product category in this variable form URL
const searchParams = new URLSearchParams(window.location.search);
let productCategory =  searchParams.get('productCategory'); // Assuming 'productCategory' is the parameter name in the URL
console.log(productCategory);
searchCategory(productCategory);

function sendValue(category){
    productCategory = category;         //assign user selected category in productCategory

    window.location.href = `./listing.html?productCategory=${productCategory}`;
    
    // searchCategory(productCategory);
}


// get product container form listing.html to display products
const productContainer = document.getElementById('listing-container');

// fetch products based on the user-selected category
function searchCategory(category){
    fetch(`https://dummyjson.com/products/category/${category}`)
    .then(res => res.json())
    .then((data) => {
        data.products.forEach(element => {
        
        // create parent div and add CSS 'card' class.
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');

        // create img tag and set src to append to the parent div
        const img = document.createElement('img');
        img.src = `${element.thumbnail}`;
        cardDiv.append(img);

        // Create a div tag and set the inner text 'Product Name' to append to the parent div.
        const productName = document.createElement('div');
        productName.innerText = `${element.title}`;
        cardDiv.appendChild(productName);

        // create a h5 tag and set the inner text 'Price' to append to the parent div
        const price = document.createElement('h5');
        price.innerText = `$${element.price}`;
        cardDiv.appendChild(price);

        // Create a span tag and set the inner text 'Discount' to append to the parent div.
        const discount = document.createElement('span');
        discount.innerText = `${element.discountPercentage}% off`;
        discount.style.color = '#388e3c';
        discount.style.fontWeight = '500';
        cardDiv.appendChild(discount);

        productContainer.appendChild(cardDiv);

        // When the user clicks the product card, it return what product ID they clicked. 
        cardDiv.addEventListener('click', () => singleProduct(element.id));
        });
    });
}

// Redirect to individual product page
function singleProduct(id){
    window.location.href = `./singlepage.html?productId=${id}`;
}
