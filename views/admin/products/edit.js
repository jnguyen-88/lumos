const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({
  product,
  errors,
  flashSuccess,
  flashError,
  currentUser
}) => {
  return layout({
    content: `
      <div class="container">
        <div class="row">
          <div class="col-8 offset-2">
            <h1 class="subtitle mt-4 mb-3">Edit a Product</h1>

            <form class="needs-validation" method="POST" enctype="multipart/form-data" action="/admin/products/${
              product._id
            }?_method=PUT" novalidate>
              <div class="field mb-3">
                <label class="label">Title</label>
                <input value="${
                  product.title
                }" class="form-control" placeholder="Title" name="product[title]" >
              </div>
              
              <div class="field mb-3">
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

              <div class="field my-3">
                <label for="isFeatured">Featured Product?</label>
                <input type="checkbox" id="isFeatured" name="product[isFeatured]" ${
                  product.isFeatured ? 'checked' : ''
                }>

              </div>

              <div class="field mb-3">
                <label class="label">Images</label>
                <input class="form-control" type="file" name="images" multiple>
                <p class="help is-danger">${getError(errors, 'images')}</p>
              </div>
              
              <button class="btn btn-primary btn-xl">Edit</button>
            </form>
          </div>
        </div>
      </div>
    `,
    currentUser,
    flashSuccess,
    flashError
  });
};
