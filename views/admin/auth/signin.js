const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ errors, flashSuccess, flashError, currentUser }) => {
  return layout({
    content: `
<section>
  <ul
    class="nav c-text-lg nav-pills py-5 d-flex justify-content-center"
    id="pills-tab"
    role="tablist"
  >
    <li class="nav-item" role="presentation">
      <button
        class="nav-link active px-3 px-md-5"
        id="pills-signup-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-signup"
        type="button"
        role="tab"
        aria-controls="pills-signup"
        aria-selected="true"
      >
        Sign Up
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button
        class="nav-link"
        id="pills-signin-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-signin"
        type="button"
        role="tab"
        aria-controls="pills-signin"
        aria-selected="false"
      >
        Sign In
      </button>
    </li>
  </ul>
  <div class="tab-content" id="pills-tabContent">
    <div
      class="tab-pane fade show active"
      id="pills-signup"
      role="tabpanel"
      aria-labelledby="pills-signup-tab"
      tabindex="0"
    >
      <div class="container">
        <div class="row">
          <div class="col-md-4 offset-md-4">
            <form method="POST" action="/signup" class="mt-5 pb-3 validated-form" novalidate>
              <h1 class="title mb-2 mb-lg-3">Sign Up</h1>
              <div class="field">
                <label class="label">Email</label>
                <input class="input" type="email" placeholder="Email" name="email" required />
                <p class="help is-danger">${getError(errors, 'email')}</p>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <input class="input" placeholder="Password" name="password" type="password" required />
                <p class="help is-danger">${getError(errors, 'password')}</p>
              </div>
              <div class="field">
                <label class="label">Password Confirmation</label>
                <input class="input" placeholder="Password Confirmation" name="passwordConfirmation" type="password" required />
                <p class="help is-danger">${getError(
                  errors,
                  'passwordConfirmation'
                )}</p>
              </div>
              <button class="btn btn-primary btn-xl w-100">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div
      class="tab-pane fade"
      id="pills-signin"
      role="tabpanel"
      aria-labelledby="pills-signin-tab"
      tabindex="0"
    >
      <div class="container">
        <div class="row">
          <div class="col-md-4 offset-md-4">
            <form method="POST" action="/signin" class="mt-5 pb-3 validated-form" novalidate>
              <h1 class="title mb-2 mb-lg-3">Sign In</h1>
              <div class="field">
                <label class="label">Email</label>
                <input class="input" type="email" placeholder="Email" name="email" required />
                <p class="help is-danger">${getError(errors, 'email')}</p>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <input class="input" placeholder="Password" name="password" type="password" required />
                <p class="help is-danger">${getError(errors, 'password')}</p>
              </div>
              <button class="btn btn-primary btn-xl w-100">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    `,
    flashSuccess,
    flashError,
    currentUser
  });
};
