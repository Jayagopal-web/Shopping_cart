// Home page 
const display = document.getElementById("diplay-container");

fetch('https://dummyjson.com/products/categories')
.then((res) => res.json())
.then((categories) => {
    categories.forEach(element => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');


        fetch(`https://dummyjson.com/products/category/${element}?limit=1`)
        .then(res => res.json())
        .then((data) => {
            console.log(data.products[0].thumbnail);
            const img = document.createElement('img');
            img.src = `${data.products[0].thumbnail}`;
            cardDiv.appendChild(img);
        });


       
        cardDiv.innerHTML = `${element}`;
        display.appendChild(cardDiv);
    });
});
