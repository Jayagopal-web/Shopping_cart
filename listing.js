// Home page 


// Login Button
document.getElementById('login').addEventListener('click', ()=>{
    window.location.href = "./logIn.html";
}); 
// login logic need to improve.

//Using this to store the price of the products
let priceArr=[];
let defaultPrice;
const all=document.getElementById("All");
const def=document.getElementById("Default");


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

function searchCategory(category) {
    //first we will check the category is array or not bcoz we will stipulate data based on all or category.
    //this if is used to display individual items iems are sended in array format.
    if (Array.isArray(category)) {
        productContainer.innerHTML = "";
        if(category.length !=0){
        priceArr=[];
        let promises = category.map(categoryItem => {
            return fetch(`https://dummyjson.com/products/${categoryItem.id}`)
                .then(res => res.json());
        });

        Promise.all(promises)
            .then(products => {
                products.forEach(element => {
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
                    let priId={price:element.price,id:element.id}
                    priceArr.push(priId);
                    defaultPrice=[...priceArr];
                    cardDiv.appendChild(price);

                    const discount = document.createElement('span');
                    discount.innerText = `${element.discountPercentage}% off`;
                    discount.style.color = '#388e3c';
                    discount.style.fontWeight = '500';
                    cardDiv.appendChild(discount);

                    productContainer.appendChild(cardDiv);

                    cardDiv.addEventListener('click', () => singleProduct(element.id));
                });
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
        }
        else{
            productContainer.innerHTML = "";
            let notFound=document.createElement("section")
            notFound.classList.add("notFound")
            notFound.innerHTML="No Matching Products found";
            productContainer.appendChild(notFound);
        }
    }
    //this if else is used to stipulate data based on the categories.
    else if(category !== "All"){
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
        let priId={price:element.price,id:element.id}
        priceArr.push(priId);
        defaultPrice=[...priceArr];
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
    //else is used to stipulate all the items
    else{
        fetch(`https://dummyjson.com/products?limit=100`)
        .then(res => res.json())
        .then((data) => {
        data.products.forEach(element => {
        //each items is appended in the div and data is added to html
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
        //here we store the id,price to sorting based on price
        let priId={price:element.price,id:element.id}
        priceArr.push(priId);
        defaultPrice=[...priceArr];
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

function singleProduct(id){
    window.location.href = `./single.html?${id}`;
}
//guru code 
//used to list the categories in the filter
let select=document.getElementById("categories")

function categorydropdown(){
    fetch('https://dummyjson.com/products/categories')
    .then((res) => res.json())
    .then((categories) => {
        displaydropdown(categories);
        
    })
}


function displaydropdown(categories) {
    let opt = categories;
    //Here we are getting the url to get the category and display in the category checkbox 
    const product = window.location.search.substring(1);
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
    select.addEventListener('change', () => {
        sendValue(select.value);
    });

}

categorydropdown();

function getValue(selectObject) {
    var value = selectObject.value;  
    if(value == "LowToHigh"){
        lowToHigh();
    }
    else if(value == "HighToLow"){
        highToLow();
    }
    else{
        searchCategory(defaultPrice);
    }
    }
  
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


let Aproduct; 

let allProd=fetch(`https://dummyjson.com/products?limit=100`)
    .then(res => res.json())
    .then((data) => {
        Aproduct = data.products;
    });

const txtSearch = document.querySelector("#txtSearch");

txtSearch.addEventListener('keyup', (e) => {
    const value = e.target.value.toLowerCase().trim();
    if (value) {
        let searchprod=[];
        Aproduct.filter((prod) => {
            return prod.title.toLowerCase().includes(value);
        }).forEach((prod)=>{
            let val={price:prod.price,id:prod.id};
            searchprod.push(val);
        });
        searchCategory(searchprod)
        all.selected = true;
        def.selected = true;
    } else {
        // If search input is empty, display all products
        searchCategory("All");
        console.log(defaultPrice);
        all.selected = true;
        def.selected = true;
    }
});
