const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ errors }) => {
  return layout({
    content: `
      <div class="container">
        <div class="row">
          <div class="col-md-4 offset-md-4">
            <form method="POST" class="mt-5 pb-3">
              <h1 class="title">Sign in</h1>
              <div class="field">
                <label class="label">Email</label>
                <input required class="input" placeholder="Email" name="email" />
                <p class="help is-danger">${getError(errors, 'email')}</p>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <input required class="input" placeholder="Password" name="password" type="password" />
                <p class="help is-danger">${getError(errors, 'password')}</p>
              </div>
              <button class="button is-primary w-100">Submit</button>
            </form>
            <a href="/signup">Need an account? Sign Up</a>
          </div>
        </div>
      </div>
    `
  });
};
