const express = require('express');
const app = express();
app.use(express.static('public'));
const layout = require('../layout');

function renderProductType(productType, count, collection) {
  return `
<!-- Modal Box -->
<div
  class="modal fade"
  id="${collection}Modal-${count}"
  tabindex="-1"
  aria-labelledby="${collection}ModalLabel-${count}"
  aria-hidden="true"
>
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content row">
      <div class="col-12 col-lg-6 g-0 modal-img"><img src="${
        productType.images[0].url
      }" /></div>
      <div class="col-12 col-lg-6">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body text-center">
          <h1 class="modal-title mb-3" id="${collection}ModalLabel">
            ${productType.title}
          </h1>
           <p class="lead fs-6">${productType.description}</p>
           <p class="price mt-3 mb-3 mb-md-4 fs-2">$${parseFloat(
             productType.price
           ).toFixed(2)}</p>
           <form action="/cart/products" method="POST" onsubmit="return handleAddToCart()">
            <input hidden value="${productType.id}" name="cart[productId]" />
            <div class="buttons-1 buttons-modal">
            <div class="d-flex justify-content-center mb-3 mb-md-6">
              <span class="input-number-decrement">–</span>
               <input name="cart[quantity]" class="input-number" value="1" min="1" max="10">
              <span class="input-number-increment">+</span>
            </div>
            <button class="button" style="width:45%;border-style: none;line-height: 50px;">
              <i class="fi fi-rs-shopping-cart me-1"></i> Add to cart
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Product -->
  <div class="col col-4 col-md-3 product text-center mb-5 mb-lg-6">
  <figure class="product-header" data-bs-toggle="modal" data-bs-target="#${collection}Modal-${count}">
    <img src="${productType.images[0].url}" />
    <img class="product-hover-image" src="${productType.images[1].url}" />
  </figure>
  <form action="/cart/products" method="POST" onsubmit="return handleAddToCart()">
    <input hidden value="${productType.id}" name="cart[productId]" />
    <input type="hidden" name="cart[quantity]" value="1" /> 
    <div class="buttons-1">
      <button class="button has-icon">
        <i class="fi fi-rs-shopping-cart"></i>
        <span class="sr-only sr-only-focusable">Add to cart</span>
      </button>
      <button class="button has-icon add-to-wishlist-button">
        <i class="fi fi-rs-heart"></i>
        <span class="sr-only sr-only-focusable">Add to wishlist</span>
      </button>
    </div>
  </form>
  <div class="card-content my-lg-5">
    <p class="card-text-title mb-2 mb-lg-3">${productType.title}</p>
    <p class="card-text-price">$${parseFloat(productType.price).toFixed(2)}</p>
  </div>
</div>
      `;
}

module.exports = ({
  allProducts,
  featuredProducts,
  cartItemCount,
  flashSuccess,
  flashError,
  currentUser
}) => {
  const renderedAllProducts = allProducts
    .map((product, count) => {
      return renderProductType(product, count, 'allCollection');
    })
    .join('\n');

  const renderedFeaturedProducts = featuredProducts
    .map((featProduct, count) => {
      return renderProductType(featProduct, count, 'featuredCollection');
    })
    .join('\n');

  return layout({
    content: `
    <section id="showcase" class="py-5 text-center">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-8 offset-lg-2">
          <h1 class="display-3 mt-2 pt-2 mt-sm-5 mt-lg-0">Style Made Simple</h1>
          <p class="lead mt-3">
            Your one-stop fashion destination. Discover the latest trends and
            timeless classics for a wardrobe that's always on point.
          </p>
        </div>
      </div>
    </div>
</section>

<section>
      <ul class="nav c-text-lg nav-pills py-5 d-flex justify-content-center" id="pills-tab" role="tablist">
  <li class="nav-item" role="presentation">
    <button
      class="nav-link active px-3 px-md-5"
      id="pills-collection-tab"
      data-bs-toggle="pill"
      data-bs-target="#pills-collection"
      type="button"
      role="tab"
      aria-controls="pills-collection"
      aria-selected="true"
    >
      Our Collection
    </button>
  </li>
  <li class="nav-item" role="presentation">
    <button
      class="nav-link"
      id="pills-featured-product-tab"
      data-bs-toggle="pill"
      data-bs-target="#pills-featured-product"
      type="button"
      role="tab"
      aria-controls="pills-featured-product"
      aria-selected="false"
    >
      Featured Products
    </button>
  </li>
</ul>
<div class="tab-content" id="pills-tabContent">
  <div
    class="tab-pane fade show active"
    id="pills-collection"
    role="tabpanel"
    aria-labelledby="pills-collection-tab"
    tabindex="0"
  >
      <div class="container-fluid">
    <div class="row">
      <div class="col px-5">
        <div class="row products">
          ${renderedAllProducts}  
        </div>
      </div>
    </div>
  </div>
  </div>
  <div
    class="tab-pane fade"
    id="pills-featured-product"
    role="tabpanel"
    aria-labelledby="pills-featured-product-tab"
    tabindex="0"
  >
      <div class="container-fluid">
    <div class="row">
      <div class="col px-5">
        <div class="row products">
          ${renderedFeaturedProducts}  
        </div>
      </div>
    </div>
  </div>
  </div>
</div>
</section>

  <script>
  function handleAddToCart() {
  if (${!currentUser}) {
    window.location.href = '/signin';
    return false;
  }
  return true; 
}</script>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const inputFields = document.querySelectorAll('.input-number');
    
    inputFields.forEach(function(inputField) {
        const decrementBtn = inputField.previousElementSibling;
        const incrementBtn = inputField.nextElementSibling;
        const minValue = inputField.min;

        decrementBtn.addEventListener('click', function() {
            let currentValue = parseInt(inputField.value);
            if(inputField.value > minValue){inputField.value = currentValue - 1;}
        });

        incrementBtn.addEventListener('click', function() {
            let currentValue = parseInt(inputField.value);
            inputField.value = currentValue + 1;
        });
    });
});

</script>
    `,
    cartItemCount,
    flashError,
    flashSuccess,
    currentUser
  });
};
