const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ req, flashSuccess, flashError, errors, currentUser }) => {
  return layout({
    content: `
      <div class="container">
        <div class="row">
          <div class="col-md-4 offset-md-4">
            <form method="POST" action="/signup" class="mt-5 pb-3 validated-form" novalidate>
              <h1 class="title mb-2 mb-lg-3">Sign Up</h1>
              <div class="field">
                <label class="label">Email</label>
                <input class="input" type="email" placeholder="Email" name="email" / required>
                <p class="help is-danger">${getError(errors, 'email')}</p>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <input class="input" placeholder="Password" name="password" type="password" />
                <p class="help is-danger">${getError(errors, 'password')}</p>
              </div>
              <div class="field">
                <label class="label">Password Confirmation</label>
                <input class="input" placeholder="Password Confirmation" name="passwordConfirmation" type="password" />
                <p class="help is-danger">${getError(
                  errors,
                  'passwordConfirmation'
                )}</p>
              </div>
              <button class="btn btn-primary btn-xl w-100">Submit</button>
            </form>
            <a href="/signin" class="link-primary">Have an account? Sign In</a>
          </div>
        </div>
      </div>
    `,
    flashSuccess,
    flashError,
    currentUser
  });
};
