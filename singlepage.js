const sliderMainImage = document.getElementById("product-main-image");
let title = document.getElementById("title");
let description = document.getElementById("description");
let price1 = document.getElementById("price");
let discount = document.getElementById("discount");
let sideImage = document.querySelectorAll("#image-list");

function getSearchParams() {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get('productId'); // Assuming 'productId' is the parameter name in the URL
}

function singleItem(productId) {
  fetch(`https://dummyjson.com/products/${productId}`)
    .then(res => res.json())
    .then((single) => {
      sliderMainImage.src = `${single.thumbnail}`;
      title.innerText = `${single.title}`;
      price1.innerText = `${single.price}`;
      discount.innerText = `${single.discountPercentage}`;
      description.innerText = `${single.description}`;

      single.images.forEach((imageURL, index) => {
        
        if (sideImage[index]) {
          sideImage[index].src = imageURL;

          // Add event listener to each side image
          sideImage[index].addEventListener('click', function () {
            sliderMainImage.src = sideImage[index].src;
            console.log(sliderMainImage.src);
          });
        }
      });

      console.log(single);
    });
}

const productId = getSearchParams();

console.log(productId);
singleItem(productId);
/* if (productId) {
  singleItem(productId);
} else {
  console.error('Product ID not found in URL.');
}
 */