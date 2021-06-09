<template>
  <div class="row w-100 d-flex align-items-stretch">
    <div
        class="col-md-4 h-100 d-none d-md-flex align-items-stretch justify-content-center p-0 auth-banner-container">
      <div class="auth-banner register-bg"></div>
    </div>
    <div class="col-12 col-md-8 h-100 auth-form-wrapper">
      <div class="h-100 d-flex align-items-center justify-content-center flex-column px-5">
        <div class="nav-auth d-flex align-items-center justify-content-end">
          <p>Already have an account?</p>
          <router-link to="/login" class="btn nav-auth-btn">Login</router-link>
        </div>
        <form @submit.prevent="register" method="post" class="auth-form">
          <h3 class="mr-auto auth-title">Register</h3>
          <p class="mb-5 mr-auto">Enter your details below.</p>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" :class="{'error-input': errors.first('firstName') || isRegisterError}">
                  <i class="bi bi-person"></i>
                </span>
              </div>
              <input v-model="firstName" v-validate="'required|max:60'"
                     :class="{'error-input': errors.first('firstName') || isRegisterError}" name="firstName" type="text"
                     class="form-control" aria-describedby="fistNameHelp" maxlength="60" pattern="^[A-Za-zА-Яа-яЁё\-]+$"
                     placeholder="First Name" required>
            </div>
            <small v-if="errors.has('firstName')" id="fistNameHelp" class="form-text">
              {{ errors.first('firstName') }}
            </small>
          </div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text"
                      :class="{'error-input': errors.first('lastName') || isRegisterError}">
                  <i class="bi bi-person"></i>
                </span>
              </div>
              <input v-model="lastName" v-validate="'required|max:60'"
                     :class="{'error-input': errors.first('lastName') || isRegisterError}" name="lastName" type="text"
                     class="form-control" aria-describedby="lastNameHelp" maxlength="60"
                     pattern="^[A-Za-zА-Яа-яЁё\-]+$"
                     placeholder="Last Name" required>
            </div>
            <small v-if="errors.has('lastName')" id="lastNameHelp" class="form-text">
              {{ errors.first('lastName') }}
            </small>
          </div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text"
                      :class="{'error-input': errors.first('email') || isRegisterError}">
                  <i class="bi bi-envelope"></i>
                </span>
              </div>
              <input v-model="email" v-validate="'required|email|max:255'"
                     :class="{'error-input': errors.first('email') || isRegisterError}" name="email" type="email"
                     class="form-control" aria-describedby="emailHelp" maxlength="60"
                     placeholder="Email" required>
            </div>
            <small v-if="errors.has('email')" id="emailHelp" class="form-text">
              {{ errors.first('email') }}
            </small>
          </div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text"
                      :class="{'error-input': errors.first('role') || isRegisterError}">
                  <i class="bi bi-person-bounding-box"></i>
                </span>
              </div>
              <select v-model="role" v-validate="'required|max:60'"
                     :class="{'error-input': errors.first('role') || isRegisterError, 'placeholder': !role}"
                      name="role" type="text" class="form-control" aria-describedby="roleHelp" required>
                <option value selected disabled>
                  Role
                </option>
                <option v-for="(roleName, index) in rolesList" :key="index" :value="roleName">
                  {{ roleName }}
                </option>
              </select>
            </div>
            <small v-if="errors.has('role')" id="roleHelp" class="form-text">
              {{ errors.first('role') }}
            </small>
          </div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" :class="{'error-input': errors.first('password') || isRegisterError}">
                  <i class="bi bi-lock"></i>
                </span>
              </div>
              <input v-model="password" v-validate="'required|min:6'" ref="password"
                     :class="{'error-input': errors.first('password') || isRegisterError}" name="password"
                     type="password" class="form-control" aria-describedby="passwordHelp"
                     placeholder="Password" maxlength="100" required>
            </div>
            <small v-if="errors.has('password')" id="passwordHelp" class="form-text">
              {{ errors.first('password') }}
            </small>
          </div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" :class="{'error-input': errors.first('passwordConfirm') || isRegisterError}">
                  <i class="bi bi-lock"></i>
                </span>
              </div>
              <input v-model="passwordConfirm" v-validate="'required|confirmed:password'"
                     :class="{'error-input': errors.first('passwordConfirm') || isRegisterError}" name="passwordConfirm"
                     type="password" class="form-control" aria-describedby="passwordConfirmHelp"
                     placeholder="Confirm Password" data-vv-as="password" maxlength="100" required>
            </div>
            <small v-if="errors.has('passwordConfirm')" id="passwordConfirmHelp" class="form-text">
              {{ errors.first('passwordConfirm') }}
            </small>
            <small v-if="isRegisterError" class="form-text">
              Oops! Something went wrong. Perhaps the email is already registered.
            </small>
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary submit-btn">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from "../../api/authApi";
import { LOGIN_SUCCESS } from "../../store/mutationsTypes";
import { FETCH_SKILLS } from "../../store/actionsTypes";

export default {
  name: "Register",
  data: () => ({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    password: '',
    passwordConfirm: '',
    isRegisterError: false,
    rolesList: ['student', 'teacher'],
  }),
  methods: {
    register() {
      this.isRegisterError = false;

      this.$validator.validateAll().then((isValid) => {
        if (!isValid) return;

        register(this.firstName, this.lastName, this.email, this.role, this.password, this.passwordConfirm)
            .then(({ data }) => {
              this.$store.commit(LOGIN_SUCCESS, data);
              this.$store.dispatch(FETCH_SKILLS);
              this.$router.push('/');
            })
            .catch(() => {
              this.isRegisterError = true;
            });
      });
    },
  },
}
</script>
