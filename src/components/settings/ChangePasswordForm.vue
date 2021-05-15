<template>
  <div class="card change-password bottom-margin">
    <div class="card-body">
      <div class="edit-header">
        <h6 class="card-title">Change Password</h6>
      </div>
      <div class="change-password-form mt-4">
        <form @submit.prevent="changePassword" id="changePassword">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="oldPassword">Old Password</label>
              <input v-model="oldPassword" :class="{'error-input': errors.first('oldPassword')}"
                     v-validate="'min:6|max:255'" type="password" data-vv-validate-on="change"
                     class="form-control" id="oldPassword" name="oldPassword"
                     aria-describedby="oldPasswordHelp" placeholder="Old password" required>
              <small v-if="errors.has('oldPassword')" id="oldPasswordHelp" class="form-text">
                {{ errors.first('oldPassword') }}
              </small>
            </div>
            <div class="form-group col-md-6">
              <label for="newPassword">New Password</label>
              <input v-model="newPassword" :class="{'error-input': errors.first('newPassword')}"
                     v-validate="'min:6|max:255'" type="password" data-vv-validate-on="change"
                     class="form-control" id="newPassword" name="newPassword"
                     aria-describedby="newPasswordHelp" placeholder="New password" required>
              <small v-if="errors.has('newPassword')" id="newPasswordHelp" class="form-text">
                {{ errors.first('newPassword') }}
              </small>
            </div>
            <button type="submit" class="btn btn-primary d-flex ml-auto">
              Change password
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { changePassword } from "../../api/userApi";

export default {
  name: "ChangePasswordForm",
  data: () => ({
    oldPassword: '',
    newPassword: '',
  }),
  methods: {
    changePassword() {
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) return;

        changePassword(this.oldPassword, this.newPassword)
            .then(({ data }) => {
              this.$notify({
                type: 'success',
                title: 'Success',
                text: data.message,
              });
              this.clearFields();
            })
            .catch(({ response: { data } }) => {
              this.$notify({
                type: 'error',
                title: 'Error',
                text: data.message || 'Something went wrong...',
              });
            });
      });
    },
    clearFields() {
      this.oldPassword = '';
      this.newPassword = '';
    }
  },
}
</script>
