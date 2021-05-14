<template>
  <div class="sidebar d-flex flex-column justify-content-between">
    <div>
      <div class="logo">
        <router-link to="/" class="navbar-brand">
          University <strong>Freelance</strong>
        </router-link>
      </div>
      <ul class="nav">
        <li class="nav-profile pt-3 pb-4">
          <router-link :to="'/user/' + user.id" class="profile">
            <div class="profile-image">
              <img :src="user.avatarUrl" onerror="this.src = '/img/default.png'" class="img-fluid" alt="profile">
            </div>
            <div class="profile-name text-center mt-3">
              <p class="name">{{ user.first_name }} {{ user.last_name }}</p>
              <p class="profile-name-sub pt-1">{{ user.role }}</p>
            </div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link exact to="/" class="nav-link">
            <i class="bi bi-columns"></i>
            Dashboard
          </router-link>
        </li>
        <li v-if="isStudent" class="nav-item">
          <router-link to="/portfolio" class="nav-link">
            <i class="bi bi-list-stars"></i>
            Portfolio
          </router-link>
        </li>
        <li v-else-if="isTeacher" class="nav-item">
          <router-link to="/projects" class="nav-link">
            <i class="bi bi-list-task"></i>
            Projects
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/search" class="nav-link">
            <i class="bi bi-search"></i>
            Search
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/settings" class="nav-link">
            <i class="bi bi-gear"></i>
            Settings
          </router-link>
        </li>
      </ul>
    </div>
    <div class="logout-btn-wrapper" @click="logout">
      <div class="d-flex justify-content-center">
        <button class="logout-btn" type="button">
          Log out
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { LOGOUT } from "../store/actionsTypes";

export default {
  name: "Sidebar",
  computed: {
    user() {
      return this.$store.getters.getUser || {};
    },
    isStudent() {
      return this.$store.getters.isStudent;
    },
    isTeacher() {
      return this.$store.getters.isTeacher;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT);
    },
  },
}
</script>
