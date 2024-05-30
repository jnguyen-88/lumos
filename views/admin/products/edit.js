const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ product, errors }) => {
  return layout({
    content: `
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="subtitle">Edit a Product</h1>

          <form class="needs-validation" method="POST" enctype="multipart/form-data" action="/admin/products/${
            product._id
          }?_method=PUT" novalidate>
            <div class="field">
              <label class="label">Title</label>
              <input value="${
                product.title
              }" class="form-control" placeholder="Title" name="product[title]" >
            </div>
            
            <div class="field">
              <label class="label">Price</label>
              <input value="${
                product.price
              }" class="form-control" placeholder="Price" name="product[price]" >
            </div>

            <div class="field">
              <label class="label">Description</label>
              <input class="form-control" value="${
                product.description
              }" placeholder="Description" name="product[description]" >
              <p class="help is-danger">${getError(errors, 'description')}</p>
            </div>

            <div class="field">
              <label for="isFeatured">Featured Product?</label>
              <input type="checkbox" id="isFeatured" name="product[isFeatured]" ${
                product.isFeatured ? 'checked' : ''
              }>

            </div>

             <div class="field">
              <label class="label">Images</label>
              <input class="form-control" type="file" name="images" multiple>
              <p class="help is-danger">${getError(errors, 'images')}</p>
            </div>
            
            <br />
            <button class="button is-primary">Edit</button>
          </form>
        </div>
      </div>
    `
  });
};
