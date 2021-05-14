<template>
  <div class="container-scroller">
    <div class="container-fluid w-100 px-0 d-flex flex-row full-page-wrapper">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
}
</script>
