
const sliderMainImage = document.getElementById("product-main-image");
let title = document.getElementById("title");
let description = document.getElementById("description");
let price1 = document.getElementById("price");
let discount = document.getElementById("discount");
let imageListContainer = document.querySelector(".product-image-slider"); // Updated to use the product-image-slider class
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