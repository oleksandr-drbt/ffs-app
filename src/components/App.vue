<template>
  <component :is="layout">
    <router-view/>
    <notifications class="mt-3 app-notification"/>
  </component>
</template>

<script>
import { loadProgressBar } from "axios-progress-bar";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import DefaultLayout from "./layouts/DefaultLayout";
import { FETCH_SKILLS } from "../store/actionsTypes";

export default {
  name: "App",
  computed: {
    layout() {
      return `${this.$route.meta.layout || 'default'}-layout`;
    }
  },
  components: {
    AppLayout,
    AuthLayout,
    DefaultLayout,
  },
  mounted() {
    loadProgressBar();
    this.$store.dispatch(FETCH_SKILLS);
  },
}
</script>

<style lang="scss">
@import "../assets/styles/main";
</style>
