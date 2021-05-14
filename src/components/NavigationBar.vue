<template>
  <nav class="navbar navbar-expand-lg navbar-light pr-0 pl-4">
    <h1 class="navbar-brand mb-0 p-0">{{ title }}</h1>
    <button id="toggler" ref="toggler" class="navbar-toggler collapsed" type="button" data-toggle="collapse"
            aria-expanded="false" aria-label="Toggle navigation" @click="toggle">
      <span class="icon-bar top-bar"></span>
      <span class="icon-bar middle-bar"></span>
      <span class="icon-bar bottom-bar"></span>
    </button>
    <div class="collapse navbar-collapse mr-3">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="dropdownMenuLink" role="button"
             data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="bi bi-person"></i>
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <router-link to="/settings" class="dropdown-item">
              <i class="bi bi-gear mr-1"></i>
              Settings
            </router-link>
            <div class="dropdown-divider"></div>
            <a @click.prevent="logout" class="dropdown-item" href="/">
              <i class="bi bi-box-arrow-right mr-1"></i>
              Logout
            </a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { LOGOUT } from "../store/actionsTypes";

export default {
  name: "NavigationBar",
  inheritAttrs: true,
  props: {
    wrapperRef: {
      type: [HTMLDivElement, String],
    },
  },
  computed: {
    title() {
      return this.$store.getters.getTitle;
    },
    user() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT);
    },
    toggle() {
      const links = document.querySelectorAll('.sidebar .nav .nav-link');

      this.wrapperRef.classList.toggle('open-sidebar');
      this.$refs.toggler.classList.toggle('collapsed');
      Array.from(links).forEach((element) => {
        element.addEventListener("click", () => {
          this.wrapperRef.classList.remove('open-sidebar');
          this.$refs.toggler.classList.add('collapsed');
        });
      });
      document.querySelector('.sidebar .nav .profile').addEventListener("click", () => {
        this.wrapperRef.classList.remove('open-sidebar');
        this.$refs.toggler.classList.add('collapsed');
      });
    },
  },
}
</script>
