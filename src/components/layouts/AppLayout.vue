<template>
  <div class="wrapper" ref="wrapper">
    <sidebar/>
    <div class="main-panel">
      <navigation-bar :wrapperRef="wrapperRef"/>
      <div class="content-wrapper">
        <slot/>
        <app-footer/>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../Sidebar";
import NavigationBar from "../NavigationBar";
import AppFooter from "../AppFooter";

export default {
  name: "AppLayout",
  data: () => ({
    wrapperRef: '',
  }),
  mounted() {
    this.wrapperRef = this.$refs.wrapper;
  },
  components: {
    AppFooter,
    NavigationBar,
    Sidebar,
  },
}
</script>
