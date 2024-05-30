const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ errors }) => {
  return layout({
    content: `
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="subtitle">Create a Product</h1>

          <form class="needs-validation" method="POST" enctype="multipart/form-data" action="/admin/products/new" novalidate>
            <div class="field">
              <label class="label">Title</label>
              <input class="form-control" placeholder="Title" name="product[title]" required>
              <p class="help is-danger">${getError(errors, 'title')}</p>
            </div>
            
            <div class="field">
              <label class="label">Price</label>
              <input class="form-control" placeholder="Price" name="product[price]" required>
              <p class="help is-danger">${getError(errors, 'price')}</p>
            </div>

            <div class="field">
              <label class="label">Description</label>
              <input class="form-control" placeholder="Description" name="product[description]" required>
              <p class="help is-danger">${getError(errors, 'description')}</p>
            </div>

            <div class="field">
              <label for="isFeatured">Featured Product?</label>
              <input type="checkbox" id="isFeatured" name="product[isFeatured]">
            </div>

             <div class="field">
              <label class="label">Images</label>
              <input class="form-control" type="file" name="images" multiple required>
              <p class="help is-danger">${getError(errors, 'images')}</p>
            </div>
            
            <br />
            <button class="button is-primary">Create</button>
          </form>
        </div>
      </div>
    `
  });
};
