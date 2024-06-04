const layout = require('./layout');

module.exports = ({ err }) => {
  return layout({
    content: `
      <div class="container">
        <div class="row">
          <div class="col-md-4 offset-md-4">
            <div class="alert alert-danger" role="alert">
                <h4 class="alert-heading">${err.message}</h4>
                <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
                <hr>
                <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
            </div>
          </div>
        </div>
      </div>
    `
  });
};