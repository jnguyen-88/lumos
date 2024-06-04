module.exports = ({ content, flashSuccess, flashError, currentUser }) => {
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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css">
        <link href="/css/main.css" rel="stylesheet">
      </head>

      <body class="admin">
        <header>
          <nav class="navbar py-3 py-md-4">
            <div class="container px-md-5">
              <div>
                <a href="/products">
                  <h3 class="title mb-0">LUMOS</h3>
                </a>
              </div>
              <div class="navbar-items d-flex">
                  <div class="navbar-item me-2 me-sm-4">
                    
                    ${
                      currentUser
                        ? '<a href="/signout">Signout</a>'
                        : '<a href="/signin"><i class="fi fi-rs-user"></i></a>'
                    }
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
         <script>
        // Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()
</script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
      </body>

    </html>
  `;
};
