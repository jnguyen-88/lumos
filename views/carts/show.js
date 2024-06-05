const layout = require('../layout');

module.exports = ({
  cart,
  flashSuccess,
  flashError,
  cartItemCount,
  currentUser
}) => {
  const renderedItems = cart.items
    .map((item) => {
      return `
        <li class="list-group-item d-flex py-4">
          <h3 class="subtitle">${item.product.title}</h3>
          <div class="cart-right ms-auto">
            <div class="fs-4">
             $${item.price}  X  ${item.quantity} =  
            </div>
            <div class="card-text-price fs-4">
              $${item.price * item.quantity}
            </div>
            <div class="remove ms-4 md-lg-5">
              <form method="POST" action="/cart/${item._id}?_method=DELETE">
                <button class="btn btn-primary btn-md w-100" type="submit">                  
                  Remove
                </button>
              </form>
            </div>
          </div>
        </li>
      `;
    })
    .join('');

  return layout({
    content: `
      <div id="cart" class="container my-5">
        <div class="columns">
          <div class="column"></div>
          <div class="column is-four-fifths">
            <h3 class="subtitle"><b>Shopping Cart</b></h3>
            <ul class="list-group list-group-flush mt-4 mt-md-5">
              ${renderedItems}
            </ul>
            <div class="total message is-info text-end mt-5 mb-2">
              <div class="message-header fs-3">
                Total
              </div>
              <h1 class="title"> $${cart.total} </h1>
              <button class="btn btn-primary btn-xl">Buy</button>
            </div>
          </div>
          <div class="column"></div>
        </div>
      </div>
    `,
    cartItemCount,
    currentUser,
    flashError,
    flashSuccess
  });
};
