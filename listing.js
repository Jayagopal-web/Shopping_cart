// Home page 


// Login Button
document.getElementById('login').addEventListener('click', ()=>{
    window.location.href = "./logIn.html";
}); 
// login logic need to improve.




// const listingContainer = document.getElementById("listing");
// listingContainer.classList.add('hide');

const categoriesContainer = document.getElementById("categories-container");

fetch('https://dummyjson.com/products/categories')
.then((res) => res.json())
.then((categories) => {
    categories.forEach(element => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        
        fetch(`https://dummyjson.com/products/category/${element}?limit=1`)
        .then(res => res.json())
        .then((data) => {
            // console.log(data.products[0].thumbnail);
            const img = document.createElement('img');
            img.src = `${data.products[0].thumbnail}`;
            cardDiv.append(img);

            const price = document.createElement('div');
            price.innerText = `From $${data.products[0].price}`
            price.style.fontWeight = '500';
            cardDiv.append(price);
        });

        const cagetoryDiv = document.createElement('div');
        cagetoryDiv.innerText = `${element}`;
        cardDiv.append(cagetoryDiv);

        categoriesContainer.appendChild(cardDiv);

        cardDiv.addEventListener('click', () => sendValue(element));
    });
});

// Save user selected product category in this variable
let productCategory = window.location.search.substring(1);
searchCategory(productCategory);

function sendValue(category){
    productCategory = category;         //assign user selected category in productCategory

    window.location.href = `./listing.html?${productCategory}`;
    
    // searchCategory(productCategory);
}

const productContainer = document.getElementById('listing-container');

function searchCategory(category){
    fetch(`https://dummyjson.com/products/category/${category}`)
    .then(res => res.json())
    .then((data) => {
        data.products.forEach(element => {
        console.log(element);
        
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        const img = document.createElement('img');
        img.src = `${element.thumbnail}`;
        cardDiv.append(img);

        const productName = document.createElement('div');
        productName.innerText = `${element.title}`;
        cardDiv.appendChild(productName);

        const price = document.createElement('h5');
        price.innerText = `$${element.price}`;
        cardDiv.appendChild(price);

        const discount = document.createElement('span');
        discount.innerText = `${element.discountPercentage}% off`;
        discount.style.color = '#388e3c';
        discount.style.fontWeight = '500';
        cardDiv.appendChild(discount);

        productContainer.appendChild(cardDiv);

        cardDiv.addEventListener('click', () => singleProduct(element.id));
        });
    });
}

function singleProduct(id){
    window.location.href = `./single.html?${id}`;
}
