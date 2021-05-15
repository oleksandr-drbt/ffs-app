<template>
  <div>
    <div class="card delete-account">
      <div class="card-body d-flex justify-content-center">
        <button @click="showConfirmDeleteModal" class="text-center mb-0 delete-btn">
          Delete your account
        </button>
      </div>
    </div>
    <modal-window v-if="isConfirmDeleteModalShown" :width="'25%'">
      <h3 slot="body" class="pt-5">Do you really want to delete your account?</h3>
      <button slot="footer" class="btn btn-secondary modal-default-button" @click="hideConfirmDeleteModal">
        No
      </button>
      <button slot="footer" class="btn btn-danger modal-default-button" @click="deleteAccount">
        Yes
      </button>
    </modal-window>
  </div>
</template>

<script>
import ModalWindow from "../../components/ModalWindow";
import { deleteCurrentUser } from "../../api/userApi";
import { LOGOUT } from "../../store/actionsTypes";

export default {
  name: "DeleteAccountForm",
  data: () => ({
    isConfirmDeleteModalShown: false,
  }),
  components: {
    ModalWindow,
  },
  methods: {
    showConfirmDeleteModal() {
      this.isConfirmDeleteModalShown = true;
    },
    hideConfirmDeleteModal() {
      this.isConfirmDeleteModalShown = false;
    },
    deleteAccount() {
      deleteCurrentUser().then(() => {
        this.$store.dispatch(LOGOUT);
      }).catch(({ response: { data } }) => {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: data.message || 'Something went wrong...',
        });
      });
      this.hideConfirmDeleteModal();
    },
  },
}
</script>
