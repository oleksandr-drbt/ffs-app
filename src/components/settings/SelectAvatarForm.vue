<template>
  <form>
    <div class="input-group">
      <div class="custom-file justify-content-center">
        <input @change="chooseAvatar" accept="image/*" type="file"
               v-validate="'image'" data-vv-as="image" name="avatar"
               class="custom-file-input d-none" id="uploadAvatar">
        <label class="btn btn-primary photo" for="uploadAvatar">Choose avatar</label>
      </div>
    </div>
  </form>
</template>

<script>
import { uploadAvatar } from "../../api/userApi";
import { SET_USER } from "../../store/mutationsTypes";

export default {
  name: "SelectAvatarForm",
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    chooseAvatar(e) {
      const formData = new FormData();
      formData.append('avatar', e.target.files[0]);

      uploadAvatar(formData).then(({ data }) => {
        this.$store.commit(SET_USER, {
          ...this.user,
          avatarUrl: data.avatarUrl,
        });
        this.$notify({
          type: 'success',
          title: 'Success',
          text: data.message,
        });
      }).catch(({ response: { data } }) => {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: data.message || 'Something went wrong...',
        });
      });
    },
  },
}
</script>
