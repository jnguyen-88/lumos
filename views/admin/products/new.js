const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ errors, flashSuccess, flashError, currentUser }) => {
  return layout({
    content: `
      <div class="container">
        <div class="row">
          <div class="col-8 offset-2">
            <h1 class="subtitle mt-4 mb-3">Create a Product</h1>

            <form class="needs-validation" method="POST" enctype="multipart/form-data" action="/admin/products/new" novalidate>
              <div class="field mb-3">
                <label class="label">Title</label>
                <input class="form-control" placeholder="Title" name="product[title]" required>
              </div>
              
              <div class="field mb-3">
                <label class="label">Price</label>
                <input class="form-control" placeholder="Price" name="product[price]" required>
              </div>

              <div class="field mb-3">
                <label class="label">Description</label>
                <input class="form-control" placeholder="Description" name="product[description]" required>
              </div>

              <div class="field my-3">
                <label for="isFeatured">Featured Product?</label>
                <input type="checkbox" id="isFeatured" name="product[isFeatured]">
              </div>

              <div class="field mb-3">
                <label class="label">Images</label>
                <input class="form-control" type="file" name="images" multiple required>
              </div>
              
              <button class="btn btn-primary btn-xl">Create</button>
            </form>
          </div>
        </div>
      </div>
    `,
    flashSuccess,
    flashError,
    currentUser
  });
};
