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
      <div class="col-6 g-0"><img src="${productType.images[0].url}" /></div>
      <div class="col-6">
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
           <p class="price mt-3 mb-5 fs-2">$${parseFloat(
             productType.price
           ).toFixed(2)}</p>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Product -->
  <div class="col col-md-3 product text-center">
  <figure class="product-header" data-bs-toggle="modal" data-bs-target="#${collection}Modal-${count}">
    <img src="${productType.images[0].url}" />
    <img class="product-hover-image" src="${productType.images[1].url}" />
  </figure>
  <form action="/cart/products" method="POST">
    <input hidden value="${productType.id}" name="cart[productId]" />
    <input type="hidden" name="cart[quantity]" value="1" /> 
    <div class="buttons-1">
      <button class="button has-icon is-inverted">
        <i class="fas fa-shopping-cart"></i>
        <span class="sr-only sr-only-focusable">Add to cart</span>
      </button>
      <button class="button has-icon is-inverted add-to-wishlist-button">
        <i class="fas fa-heart"></i>
        <span class="sr-only sr-only-focusable">Add to wishlist</span>
      </button>
    </div>
  </form>
  <div class="card-content">
    <p>${productType.title}</p>
    <h5>$${parseFloat(productType.price).toFixed(2)}</h5>
  </div>
</div>
      `;
}

module.exports = ({ allProducts, featuredProducts, cartItemCount }) => {
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
  <div class="primary-overlay">
    <div class="container">
      <div class="row">
        <div class="col-6 offset-3">
          <h1 class="display-1 mt-5 pt-5">Style Made Simple</h1>
          <p class="lead">
            Your one-stop fashion destination. Discover the latest trends and
            timeless classics for a wardrobe that's always on point.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<section>
      <ul class="nav nav-pills pt-5 pb-4 d-flex justify-content-center" id="pills-tab" role="tablist">
  <li class="nav-item" role="presentation">
    <button
      class="nav-link active"
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
    `,
    cartItemCount
  });
};
