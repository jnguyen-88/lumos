const layout = require('./layout');

module.exports = ({ err }) => {
  return layout({
    content: `
      <div class="container">
        <div class="row">
          <div class="col-md-4 offset-md-4">
            <div class="alert alert-danger" role="alert">
                <h4 class="alert-heading">${err.message}</h4>
            </div>
          </div>
        </div>
      </div>
    `
  });
};
