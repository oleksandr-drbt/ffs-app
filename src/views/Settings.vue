<template>
  <section class="settings">
    <div class="row bottom-margin" style="margin-top: 2rem">
      <div class="col-xl-8 padding-x edit-user order-2 order-sm-2 order-xl-1">
        <edit-user-info-form/>
        <change-password-form/>
        <delete-account-form/>
      </div>
      <div class="col-xl-4 padding-x order-1 order-sm-1 order-xl-2">
        <user-info-card/>
      </div>
    </div>
  </section>
</template>

<script>
import EditUserInfoForm from "../components/Settings/EditUserInfoForm";
import DeleteAccountForm from "../components/Settings/DeleteAccountForm";
import ChangePasswordForm from "../components/Settings/ChangePasswordForm";
import UserInfoCard from "../components/Settings/UserInfoCard";
import { SET_TITLE } from "../store/mutationsTypes";

export default {
  name: "Settings",
  components: {
    ChangePasswordForm,
    DeleteAccountForm,
    EditUserInfoForm,
    UserInfoCard,
  },
  created() {
    this.$store.commit(SET_TITLE, 'Settings');
  },
}
</script>
