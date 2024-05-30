const layout = require('../layout');

module.exports = ({ cart, cartItemCount }) => {
  const renderedItems = cart.items
    .map((item) => {
      return `
        <div class="cart-item message">
          <h3 class="subtitle">${item.product.title}</h3>
          <div class="cart-right">
            <div>
             $${item.price}  X  ${item.quantity} = 
            </div>
            <div class="price is-size-4">
             $${item.price * item.quantity}
            </div>
            <div class="remove">
              <form method="POST" action="/cart/${item._id}?_method=DELETE">
                <button class="button is-danger" type="submit">                  
                  <span class="icon is-small">
                    <i class="fas fa-times"></i>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      `;
    })
    .join('');

  return layout({
    content: `
      <div id="cart" class="container">
        <div class="columns">
          <div class="column"></div>
          <div class="column is-four-fifths">
            <h3 class="subtitle"><b>Shopping Cart</b></h3>
            <div>
              ${renderedItems}
            </div>
            <div class="total message is-info">
              <div class="message-header">
                Total
              </div>
              <h1 class="title"> $${cart.total} </h1>
              <button class="button is-primary">Buy</button>
            </div>
          </div>
          <div class="column"></div>
        </div>
      </div>
    `,
    cartItemCount
  });
};
