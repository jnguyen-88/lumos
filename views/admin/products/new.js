const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ errors }) => {
  return layout({
    content: `
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="subtitle">Create a Product</h1>

          <form method="POST" action="/admin/products/new">
            <div class="field">
              <label class="label">Title</label>
              <input class="input" placeholder="Title" name="product[title]">
              <p class="help is-danger">${getError(errors, 'title')}</p>
            </div>
            
            <div class="field">
              <label class="label">Price</label>
              <input class="input" placeholder="Price" name="product[price]">
              <p class="help is-danger">${getError(errors, 'price')}</p>
            </div>
            
            <br />
            <button class="button is-primary">Create</button>
          </form>
        </div>
      </div>
    `
  });
};
