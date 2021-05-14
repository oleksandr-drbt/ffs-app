<template>
  <div class="error-404">
    <div class="container-fluid full-page-wrapper px-0">
      <div class="content-wrapper d-flex align-items-center text-center">
        <div class="row flex-grow-1 mx-0">
          <div class="col-lg-7 mx-auto">
            <div class="row align-items-center d-flex flex-row">
              <div class="col-lg-6 text-lg-right pr-lg-4">
                <h1 class="mb-0">404</h1>
              </div>
              <div class="col-lg-6 error-page-divider text-lg-left pl-lg-4">
                <h2>SORRY!</h2>
                <h3 class="font-weight-light">The page you’re looking for was not found.</h3>
              </div>
            </div>
            <div class="row mt-5">
              <div class="col-12 text-center mt-xl-2">
                <a class="back-home-btn" href="/">Back to main</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
}
</script>
