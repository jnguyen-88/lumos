const layout = require('../layout');

module.exports = ({ products, flashSuccess, flashError, currentUser }) => {
  const renderedProducts = products
    .map((product) => {
      return `
      <tr>
        <td>${product.title}</td>
        <td>$${product.price}</td>
        <td>
          <a href="/admin/products/${product.id}/edit">
            <button class="btn btn-primary btn-md w-100">
              Edit
            </button>
          </a>
        </td>
        <td>
          <form method="POST" action="/admin/products/${product.id}?_method=DELETE" method=POST>
            <button class="btn btn-primary btn-md w-100">Delete</button>
          </form>
        </td>
      </tr>
    `;
    })
    .join('');

  return layout({
    content: `
      <div class="control container">
      <div class="upper">
        <h1 class="subtitle d-inline-block">Listed Products</h1>  
        <a href="/admin/products/new" class="btn btn-primary btn-xl w-100 my-3 my-lg-4">Create New Product</a>
      </div>
      </div>
      <table class="table container">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          ${renderedProducts}
        </tbody>
      </table>
    `,
    flashSuccess,
    flashError,
    currentUser
  });
};
