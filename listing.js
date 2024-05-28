// ---------------- Home Page(index.html)----------------

// session storage
const userId = sessionStorage.getItem("ID");
const fname = sessionStorage.getItem("firstName");
const lname = sessionStorage.getItem("lastName");
const login = sessionStorage.getItem("login");


// console.log(firstLetterFname, firstLetterLname);
// console.log(fname,lname,login);

const loginBtn = document.getElementById("login");
const userProfile = document.getElementById("user-profile");
const profileImg = document.getElementById("profileImg");

if(login=='active'){
    const firstLetterFname = fname.charAt(0).toUpperCase();
    const firstLetterLname = lname.charAt(0).toUpperCase();
    profileImg.innerText = `${firstLetterFname}${firstLetterLname}`;
    userProfile.style.display = "block";
    loginBtn.innerText = 'Logout';
}else{
    loginBtn.innerText = 'Login';
}

// Login Button
document.getElementById('login').addEventListener('click', ()=>{
    // destory all session storage
    sessionStorage.clear();
    
    // change login to 'inactive' in formData Local Storage.
    if(login=='active'){
        let formData = JSON.parse(localStorage.getItem('formData'))
        console.log(formData);
        formData[userId].login = 'inactive'
        localStorage.setItem('formData', JSON.stringify(formData));
    }
    window.location.href = "./logIn.html";
}); 

// Get the URL
const url = window.location.href;
const parts = url.split('/');
const pageName = parts[parts.length - 1];
const page = pageName.split('.')[0];

//Using this to store the price of the products
let priceArr=[];
let catArr=[];
const all=document.getElementById("All");
const def=document.getElementById("Default");

// This will only render on the index page.
if(page=='index'){
// get categories container to display products
const categoriesContainer = document.getElementById("categories-container");

    // fetch product categories, it return array of categories
    // fetch('https://dummyjson.com/products/categories')
    fetch('https://dummyjson.com/products/category-list')
    .then((res) => res.json())
    .then((categories) => {
        categories.forEach(element => {
            // create parent div
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            
            // fetch each category of first product.
            fetch(`https://dummyjson.com/products/category/${element}`)
            .then(res => res.json())
            .then((data) => {
                //here used a array to store the price 
                let low=[];
                let d=data.products.forEach((prod)=> {low.push(prod.price)});
                
                //and we get the lowest price from the array
                let lowp=Math.min.apply(null,low)
                // create img tag and set src to append to parent div
                const img = document.createElement('img');
                img.src = `${data.products[0].thumbnail}`;
                cardDiv.append(img);

                // create div tag and set inner Text 'price' to append to parent div
                const price = document.createElement('div');
                price.innerText = `From $${lowp}`
                price.style.fontWeight = '500';
                cardDiv.append(price);
            });

            // create div tag and set inner Text 'category' to append to parent div
            const category = document.createElement('div');
            category.innerText = `${element.charAt(0).toUpperCase() + element.slice(1).toLowerCase()}`;
            cardDiv.appendChild(category);

            // last append the parent div to Categories container
            categoriesContainer.appendChild(cardDiv);

            // When the user clicks the product card, it return what product category they clicked. 
            cardDiv.addEventListener('click', () => sendValue(element));
        });
    });
}

// ---------------- Listing Page(listing.html)----------------

// Hamburger toggle
if(page!='index'){
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".filters");

    hamburger.addEventListener('click', ()=>{
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    })
}

// Save user selected product category in this variable form URL
const searchParams = new URLSearchParams(window.location.search);
let productCategory =  searchParams.get('productCategory'); // Assuming 'productCategory' is the parameter name in the URL
console.log(productCategory);
searchCategory(productCategory);

function sendValue(category){
    productCategory = category;         //assign user selected category in productCategory
    console.log(category)
    window.location.href = `./listing.html?productCategory=${productCategory}`;
    
     searchCategory(productCategory);
}


// get product container form listing.html to display products
const productContainer = document.getElementById('listing-container');

function searchCategory(category) {
    //first we will check the category is array or not because we will stipulate data based on all product
    //this if is used to display individual items that are sended in array format.
    if (Array.isArray(category)) {
        productContainer.innerHTML = "";
        if (category.length > 0) {
            priceArr = [];
            category.forEach(categoryItem => {
                // Find products belonging to each id.
                const productsInCategory = Aproduct.filter(product => product.id === categoryItem.id);
                console.log(productsInCategory)
                console.log(Aproduct)
                // Displaying each product based on the id.
                productsInCategory.forEach(element => {
                    //first we will create a div to display the product.
                    const cardDiv = document.createElement('div');
                    cardDiv.classList.add('card');
                    cardDiv.classList.add('products_card');
                    const img = document.createElement('img');
                    // setting the image for the product
                    img.src = `${element.thumbnail}`;
                    cardDiv.append(img);
    
                    const productName = document.createElement('div');
                    productName.innerText = `${element.title}`;
                    cardDiv.appendChild(productName);
    
                    const price = document.createElement('h3');
                    price.innerText = `$${element.price}`;
                    //we store this price and id for sorting purposes.
                    let priId={price:element.price,id:element.id,title:element.title,brand:element.brand};
                    priceArr.push(priId);
                    cardDiv.appendChild(price);
    
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
        } else {
            //while searching when there is no items we will display some message here
            productContainer.innerHTML = "";
            let notFound = document.createElement("section");
            notFound.classList.add("notFound");
            notFound.innerHTML = "No Matching Products found";
            productContainer.appendChild(notFound);
        }
    }
    //this if else is used to stipulate data based on the categories.
    else if(category !== "All"){
    fetch(`https://dummyjson.com/products/category/${category}`)
    
    .then(res => res.json())
    .then((data) => {
        data.products.forEach(element => {
        
        // create parent div and add CSS 'card' class.
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.classList.add('products_card');

        // create img tag and set src to append to the parent div
        const img = document.createElement('img');
        img.src = `${element.thumbnail}`;
        cardDiv.append(img);

        // Create a div tag and set the inner text 'Product Name' to append to the parent div.
        const productName = document.createElement('div');
        productName.innerText = `${element.title}`;
        cardDiv.appendChild(productName);

        // create a h5 tag and set the inner text 'Price' to append to the parent div
        const price = document.createElement('h3');
        price.innerText = `$${element.price}`;
        let priId={price:element.price,id:element.id,title:element.title,brand:element.brand};
        priceArr.push(priId);
        catArr.push(priId);
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
    //else is used to stipulate all the items
    else{
        const productContainer1=document.getElementById("listing-container");
        productContainer1.innerHTML = "";
        fetch(`https://dummyjson.com/products?limit=100`)
        .then(res => res.json())
        .then((data) => {
        data.products.forEach(element => {
        //each items is appended in the div and data is added to html
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.classList.add('products_card');
        const img = document.createElement('img');
        img.src = `${element.thumbnail}`;
        cardDiv.append(img);

        const productName = document.createElement('div');
        productName.innerText = `${element.title}`;
        cardDiv.appendChild(productName);

        const price = document.createElement('h3');
        price.innerText = `$${element.price}`;
        //here we store the id,price to sorting based on price
        let priId={price:element.price,id:element.id,title:element.title,brand:element.brand};
        priceArr.push(priId);
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
    
}

// Redirect to individual product page
function singleProduct(id){
    window.location.href = `./singlepage.html?productId=${id}`;
}
//guru code 
//used to list the categories in the filter
let select=document.getElementById("categories")

//this is used to get all the categories for dropdown list
function categorydropdown(){
    fetch('https://dummyjson.com/products/categories')
    .then((res) => res.json())
    .then((categories) => {
        displaydropdown(categories);
        
    })
}

//this is used to display all the categories in dropdown list
function displaydropdown(categories) {
    let opt = categories;
    //Here we are getting the url to get the category and display in the category checkbox 
    const product = window.location.search.substring(17);
    for (let i in opt) {
        let option = document.createElement('option');
        option.value = opt[i];
        option.textContent = opt[i];

        if(opt[i]==product){
            option.selected = true;
        }
        select.appendChild(option);
        // console.log(select);
    }
    //whe the category is selected we will send the value to get the specified data.
    select.addEventListener('change', () => {
        sendValue(select.value);
    });

}

categorydropdown();

//getValue function is used to sort the values of present items list
function getValue(selectObject) {
    var value = selectObject.value;  
    if(value == "LowToHigh"){
        lowToHigh();
    }
    else if(value == "HighToLow"){
        highToLow();
    }
    }
  //this is used to sort price from low to high
  function lowToHigh(){
    priceArr.sort((a,b)=>{
        const a1 = a.price; 
        const b1 = b.price; 

        if (a1 < b1) {
            return -1;
        }
        if (a1 > b1) {
            return 1;
        }
        return 0; 
    })
    searchCategory(priceArr)
  }
  //this is used to sort price from high to low
  function highToLow(){
    priceArr.sort((a,b)=>{
        const a1 = a.price; 
        const b1 = b.price; 
        if (a1 < b1) {
            return 1;
        }
        if (a1 > b1) {
            return -1;
        }
        return 0;

    });
    searchCategory(priceArr);
  }

//this is used to store all the products to make the search more efficiently.
let Aproduct; 

let allProd=fetch(`https://dummyjson.com/products?limit=100`)
    .then(res => res.json())
    .then((data) => {
        Aproduct = data.products;
    });

//this is used to target the search bar 
const txtSearch = document.querySelector("#txtSearch");

txtSearch.addEventListener('keyup', (e) => {
    const value = e.target.value.toLowerCase().trim();
    if (value) {
        if(productCategory !== "All"){
        //this is used to store all the matching items price and id.
        let searchprod=[];

        //we filter based on brand/title
        //catArr has all the values of particular category
        catArr.filter((prod) => {
            console.log(prod.title.toLowerCase().includes(value),prod.title)
            return (prod.title.toLowerCase().includes(value) || prod.brand.toLowerCase().includes(value));
        }).forEach((prod)=>{
            let val={price:prod.price,id:prod.id};
            searchprod.push(val);
        });
         console.log(searchprod)   
        //and we send the array to searchCategory to display the filtered items
        searchCategory(searchprod)
    }
     else {
        console.log(Aproduct)
        let searchprod=[];
        //we filter based on brand/title
        Aproduct.filter((prod) => {
            console.log(prod.title.toLowerCase().includes(value),prod.title)
            return (prod.title.toLowerCase().includes(value) || prod.brand.toLowerCase().includes(value));
        }).forEach((prod)=>{
            let val={price:prod.price,id:prod.id};
            searchprod.push(val);
        });
         console.log(searchprod)   
        //and we send the array to searchCategory to display the filtered items
        searchCategory(searchprod)
    }
    }
    else{
        if(productCategory !== "All"){
            searchCategory(catArr)
        }
        else{
            searchCategory("All")
        }
    }
});
