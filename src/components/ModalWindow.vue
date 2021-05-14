<template>
  <transition name="modal">
    <div class="modal-mask d-flex">
      <div class="modal-wrapper w-100 h-100">
        <div class="modal-container" :style="{ width }">
          <div class="modal-header d-flex justify-content-center">
            <slot name="header"/>
          </div>
          <div class="modal-body d-flex justify-content-center">
            <slot name="body"/>
          </div>
          <div class="modal-footer">
            <slot name="footer"/>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ModalWindow",
  props: {
    width: {
      default: '25%',
    },
  },
}
</script>
