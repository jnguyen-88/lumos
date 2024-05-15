const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ product, errors }) => {
  return layout({
    content: `
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="subtitle">Edit a Product</h1>

          <form method="POST" action="/admin/products/${
            product._id
          }?_method=PUT">
            <div class="field">
              <label class="label">Title</label>
              <input value="${
                product.title
              }" class="input" placeholder="Title" name="product[title]">
              <p class="help is-danger">${getError(errors, 'title')}</p>
            </div>
            
            <div class="field">
              <label class="label">Price</label>
              <input value="${
                product.price
              }" class="input" placeholder="Price" name="product[price]">
              <p class="help is-danger">${getError(errors, 'price')}</p>
            </div>
            

            <br />
            <button class="button is-primary">Edit</button>
          </form>
        </div>
      </div>
    `
  });
};
