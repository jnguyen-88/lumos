module.exports = ({
  content,
  cartItemCount,
  flashSuccess,
  flashError,
  currentUser
}) => {
  return `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Shop</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
        <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/2.4.0/uicons-regular-straight/css/uicons-regular-straight.css'>
        <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/2.4.0/uicons-brands/css/uicons-brands.css'>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css">
        <link href="/css/main.css" rel="stylesheet">
      </head>

      <body>
       <header>
          <nav class="navbar py-3 py-md-4">
            <div class="container-fluid px-md-5">
              <div>
                <a href="/">
                  <h3 class="title mb-0">LUMOS</h3>
                </a>
              </div>
              <div class="navbar-items d-flex">
                  <div class="navbar-item me-2 me-sm-4">
                    ${
                      currentUser
                        ? '<a href="/signout" class="text-primary me-3">Signout</a> <a href="/admin/products" class="text-primary">Dashboard</a>'
                        : '<a href="/signin"><i class="fi fi-rs-user"></i></a>'
                    }
                  </div>
                  <div class="navbar-item">
                    <a class="position-relative" href="${
                      currentUser ? '/cart' : '/signin'
                    }">
                      <i class="fi fi-rs-shopping-cart me-1"></i>
                      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                        ${cartItemCount}
                        <span class="visually-hidden">number of items in cart</span>
                      </span>
                    </a>
                  </div>
              </div>
            </div>
          </nav>
        </header>
        ${
          flashSuccess && flashSuccess.length
            ? `<div class="alert alert-success alert-dismissible fade show" role="alert">${flashSuccess}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
            : ''
        }
        ${
          flashError && flashError.length
            ? `<div class="alert alert-warning alert-dismissible fade show" role="alert">${flashError}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
            : ''
        }
        ${content}
<footer class="py-4">
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6">
        <p>
          Copyright ©
          <script
            type="text/javascript"
            async=""
            src="https://www.google-analytics.com/analytics.js"
          ></script>
          <script>
            document.write(new Date().getFullYear());
          </script>
          All rights reserved
        </p>
      </div>
      <div class="footer-social col-md-6 d-flex">
        <div class="socials-menu ms-md-auto">
          <ul id="footer-socials" class="list-group list-unstyled d-flex flex-row justify-content-start">
            <li class="me-3">
              <a href="https://X.com"><i class="fi fi-brands-twitter-alt"></i></a>
            </li>
            <li class="me-3">
              <a href="https://facebook.com"
                ><span><i class="fi fi-brands-facebook"></i></span
              ></a>
            </li>
            <li class="me-3">
              <a href="https://instagram.com"
                ><span><i class="fi fi-brands-instagram"></i></span
              ></a>
            </li>
            <li class="">
              <a href="https://pinterest.com"
                ><span><i class="fi fi-brands-pinterest"></i></span
              ></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</footer>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
      </body>
    </html>
  `;
};
