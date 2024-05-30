module.exports = ({ content, cartItemCount }) => {
  return `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Shop</title>
        
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"></link>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css">
        <link href="/css/main.css" rel="stylesheet">
      </head>

      <body>
        <header>
          <nav class="navbar py-3">
            <div class="container-fluid navbar-container px-5">
              <div>
                <a href="/products">
                  <h3 class="title mb-0">LUMOS</h3>
                </a>
              </div>
              <div class="navbar-item">
                <div class="navbar-buttons">
                  <div class="navbar-item">
                    <a href="/signin"><i class="fa fa-star"></i>Sign In</a>
                  </div>
                  <div class="navbar-item">
                    <a href="/cart"><i class="fa fa-shopping-cart"></i> ${cartItemCount}</a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
        ${content}
        <footer class="mt-3 mt-md-5 px-3 px-md-5">
          <div class="container-fluid">
  <div class="row border-top py-4 py-md-5">
    <div class="site-info col-md-6">
      <div class="copyright">©2024 Lumos</div>
      <nav class="footer-menu">
        <ul id="footer-menu" class="menu">
          <li
            id="menu-item-1894"
            class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1894"
          >
            <a href="/blog/">Blog</a>
          </li>
          <li
            id="menu-item-1895"
            class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1895"
          >
            <a href="/faqs/">FAQs</a>
          </li>
          <li
            id="menu-item-1896"
            class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1896"
          >
            <a href="/contact-us/">Contact us</a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="footer-social col-md-6">
      <div class="socials-menu">
        <ul id="footer-socials" class="menu">
          <li
            id="menu-item-1969"
            class="menu-item menu-item-type-custom menu-item-object-custom menu-item-1969"
          >
            <a href="https://google.com/"><span><i class="fab fa-google"></i></span></a>
          </li>
          <li
            id="menu-item-1970"
            class="menu-item menu-item-type-custom menu-item-object-custom menu-item-1970"
          >
            <a href="https://facebook.com/"><span><i class="fab fa-facebook"></i></span></a>
          </li>
          <li
            id="menu-item-1971"
            class="menu-item menu-item-type-custom menu-item-object-custom menu-item-1971"
          >
            <a href="https://instagram.com/"><span><i class="fab fa-instagram"></i></span></a>
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
