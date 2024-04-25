const express = require('express');
const app = express();
app.use(express.static('public'));
const layout = require('../layout');

module.exports = ({ products }) => {
  const renderedProducts = products
    .map((product) => {
      return `
        <div class="column is-one-quarter">
          <div class="card product-card text-center">
            <figure>
              <img src="data:image/png;base64, ${product.image}"/>
            </figure>
            <div class="card-content">
              <p>${product.title}</p>
              <h5>$${product.price}</h5>
            </div>
            <div class="buttons-1">
  <a
    href="?add-to-cart=77"
    data-quantity="1"
    class="button add-to-cart"
    data-product_id="77"
    data-product_sku=""
    aria-label="Add “Cotton Hat” to your cart"
    rel="nofollow"
  >
    <svg role="img" viewBox="0 0 20 20" width="20" height="20">
      <use href="#basket-addtocart" xlink:href="#basket-addtocart"></use>
    </svg>
    <span class="screen-reader-text">Add to cart</span> </a
  ><a
    href="/sober/?utm_source=landing&amp;add_to_wishlist=77"
    data-product_id="77"
    data-product_type="simple"
    class="button add-to-wishlist-button add-to-wishlist-77"
    rel="nofollow"
  >
    <svg role="img" viewBox="0 0 20 20" width="20" height="20" class="like">
      <use
        href="#heart-wishlist-like"
        xlink:href="#heart-wishlist-like"
      ></use></svg
    ><svg role="img" viewBox="0 0 20 20" width="20" height="20" class="liked">
      <use
        href="#heart-wishlist-liked"
        xlink:href="#heart-wishlist-liked"
      ></use>
    </svg>
    <span class="indent-text">Add to wishlist</span>
  </a>
</div>
            <footer class="card-footer">
              <form action="/cart/products" method="POST">
                <input hidden value="${product.id}" name="productId" />
                <button class="button has-icon is-inverted">
                  <i class="fa fa-shopping-cart"></i> Add to cart
                </button>
              </form>
            </footer>
          </div>
        </div>
      `;
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
      <div class="container">
        <div class="row">
            <div class="col px-5">
              <h2 class="pt-5 pb-4 text-center">Featured Items</h2>
              <div class="columns products">
                ${renderedProducts}  
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    `
  });
};
