const express = require('express');
const app = express();
app.use(express.static('public'));
const layout = require('../layout');

module.exports = ({ product, cartItemCount }) => {
  const renderedProductHTML = `
  <div class="col col-md-3 product text-center">
  <figure>
    <img src="${product.images[0].url}" />
  </figure>
  <form action="/cart/products" method="POST">
    <input hidden value="${product.id}" name="productId" />
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
    <p>${product.title}</p>
    <h5>$${product.price}</h5>
    <form method="POST" action="/admin/products/${product.id}?_method=DELETE" method=POST>
      <button class="button is-danger">Delete</button>
    </form>
    <a href="/admin/products">Back to All Products</a>
  </div>
</div>
      `;

  return layout({
    content: `
    <section id="showcase" class="py-5 text-center">
        <div class="primary-overlay">
    <div class="container">
      <div class="row">
        <div class="col-6 offset-3">
          <h1 class="display-1 mt-5 pt-5">Style Made Simple</h1>
          <p class="lead">
            Your one-stop fashion destination. Discover the latest
            trends and timeless classics for a wardrobe that's always on
            point.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

    </section>    
    <section>
      <div class="container-fluid">
        <div class="row">
            <div class="col px-5">
              <h2 class="pt-5 pb-4 text-center">Featured Items</h2>
              <div class="row products">
                ${renderedProductHTML}  
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
