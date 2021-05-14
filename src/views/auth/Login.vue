<template>
  <div class="row w-100 d-flex align-items-stretch">
    <div class="col-md-4 h-100 d-none d-md-flex align-items-stretch justify-content-center p-0 auth-banner-container">
      <div class="auth-banner login-bg"></div>
    </div>
    <div class="col-12 col-md-8 h-100 auth-form-wrapper">
      <div class="h-100 d-flex align-items-center justify-content-center flex-column px-5">
        <div class="nav-auth d-flex align-items-center justify-content-end">
          <p>Don't have an account?</p>
          <router-link to="/register" class="btn nav-auth-btn">Get started</router-link>
        </div>
        <form @submit.prevent="login" method="post" class="auth-form">
          <h3 class="mr-auto auth-title">Hello! let's get started</h3>
          <p class="mb-5 mr-auto">Enter your details below.</p>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-prepend">
                <span :class="{'error-input': errors.first('email') || isNotAuthorized}" class="input-group-text">
                  <i class="bi bi-envelope"></i>
                </span>
              </div>
              <input v-model="email" v-validate="'required|email'"
                     :class="{'error-input': errors.first('email') || isNotAuthorized}" name="email"
                     type="email" class="form-control" aria-describedby="emailHelp"
                     placeholder="Email" required>
            </div>
            <small v-show="errors.has('email')" id="emailHelp" class="form-text">
              {{ errors.first('email') }}
            </small>
            <transition name="error">
              <small v-if="isNotAuthorized" class="form-text">
                These credentials do not match our records.
              </small>
            </transition>
          </div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-prepend">
                <span :class="{'error-input': errors.first('password') || isNotAuthorized}" class="input-group-text">
                  <i class="bi bi-lock"></i>
                </span>
              </div>
              <input v-model="password" v-validate="'required|min:6'"
                     :class="{'error-input': errors.first('password') || isNotAuthorized}"
                     name="password" minlength="6" type="password" class="form-control"
                     aria-describedby="passwordHelp" placeholder="Password" required>
            </div>
            <small v-show="errors.has('password')" id="passwordHelp" class="form-text">
              {{ errors.first('password') }}
            </small>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary submit-btn">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "../../api/authApi";
import { LOGIN_SUCCESS } from "../../store/mutationsTypes";

export default {
  name: "Login",
  data: () => ({
    email: '',
    password: '',
    isNotAuthorized: false,
  }),
  methods: {
    login() {
      this.isNotAuthorized = false;

      this.$validator.validateAll().then((isValid) => {
        if (!isValid) return;

        login(this.email, this.password)
            .then(({ data }) => {
              this.$store.commit(LOGIN_SUCCESS, data);
              this.$router.push('/');
            })
            .catch(() => {
              this.isNotAuthorized = true;
            })
      });
    },
  },
}
</script>

<style scoped>
.error {
  transition: all .3s linear;
}
</style>
