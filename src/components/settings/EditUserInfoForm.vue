<template>
  <div class="card bottom-margin">
    <div class="card-body">
      <div class="edit-header">
        <h6 class="card-title">Edit Profile</h6>
        <p class="card-text">Complete your profile</p>
      </div>
      <div class="edit-user-form mt-4">
        <form id="editUser" @submit.prevent="updateProfile">
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="firstName">First Name</label>
              <input v-model="firstName.value" @input="setIsChanged(firstName)"
                     :class="{'change-input': firstName.isChanged, 'error-input': errors.first('firstName')}"
                     type="text" class="form-control" v-validate="'max:60'" pattern="^[A-Za-zА-Яа-яЁё\s\-]+$"
                     id="firstName" name="firstName" maxlength="60" placeholder="First name">
              <small v-if="errors.has('firstName')" class="form-text">
                {{ errors.first('firstName') }}
              </small>
            </div>
            <div class="form-group col-md-6">
              <label for="lastName">Last Name</label>
              <input v-model="lastName.value" @input="setIsChanged(lastName)"
                     :class="{'change-input': lastName.isChanged, 'error-input': errors.first('lastName')}"
                     type="text" class="form-control" v-validate="'max:60'" pattern="^[A-Za-zА-Яа-яЁё\s\-]+$"
                     id="lastName" name="lastName" maxlength="60" placeholder="Last name">
              <small v-if="errors.has('lastName')" class="form-text">
                {{ errors.first('lastName') }}
              </small>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="email">Email</label>
              <input v-model="email.value" @input="setIsChanged(email)"
                     :class="{'change-input': email.isChanged, 'error-input': errors.first('email')}"
                     type="email" class="form-control"
                     v-validate="'email|max:60'"
                     id="email" name="email" maxlength="60" placeholder="Email">
              <small v-if="errors.has('email')" class="form-text">
                {{ errors.first('email') }}
              </small>
            </div>
            <div class="form-group col-md-6">
              <label for="phone">Phone</label>
              <input v-model="phone.value" @input="setIsChanged(phone)"
                     :class="{'change-input': phone.isChanged, 'error-input': errors.first('phone')}"
                     type="tel" class="form-control" v-validate="'max:20'" pattern="^[0-9\s\-\+\(\)]+$"
                     id="phone" name="phone" maxlength="20" placeholder="Phone">
              <small v-if="errors.has('phone')" class="form-text">
                {{ errors.first('phone') }}
              </small>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-12">
              <label for="phone">Position</label>
              <input v-model="position.value" @change="setIsChanged(position)"
                     :class="{'change-input': position.isChanged, 'error-input': errors.first('position')}"
                     type="text" class="form-control" id="position" name="position" maxlength="80"
                     v-validate="'max:80'" pattern="^[A-Za-zА-Яа-яЁё\s\-\(\)]+$" placeholder="Developer, Designer, QA...">
              <small v-if="errors.has('position')" class="form-text">
                {{ errors.first('position') }}
              </small>
            </div>
          </div>
          <div v-if="isStudent" class="form-group">
            <label>Skills</label>
            <multiselect v-model="skills.value" @tag="addSkill" tag-placeholder="Add this as new skill"
                         placeholder="Search a skill" :options="skillsList" :multiple="true"
                         :taggable="true" @input="setIsChanged(skills)" @select="setIsChanged(skills)"
                         :max-height="250" @search-change="setIsChanged(skills)" :closeOnSelect="false"
                         :class="{'change-input': skills.isChanged, 'error-input': !skills.isValid}">
            </multiselect>
          </div>
          <div class="form-row">
            <div class="form-group col-12">
              <label for="phone">About</label>
              <textarea v-model="description.value" @change="setIsChanged(description)"
                        :class="{'change-input': description.isChanged, 'error-input': errors.first('description')}"
                        v-validate="'max:255'" data-vv-validate-on="change" rows="4"
                        class="form-control" id="description" name="description" maxlength="255"
                        placeholder="Tell something about you..."></textarea>
              <small v-if="errors.has('description')" class="form-text">
                {{ errors.first('description') }}
              </small>
            </div>
          </div>
          <button type="submit" class="btn btn-primary d-flex ml-auto my-3">
            Save changes
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import { editCurrentUser } from "../../api/userApi";
import { ADD_SKILL, SET_USER } from "../../store/mutationsTypes";

export default {
  name: "EditUserInfoForm",
  data: () => ({
    firstName: {
      value: '',
      isChanged: false,
    },
    lastName: {
      value: '',
      isChanged: false,
    },
    email: {
      value: '',
      isChanged: false,
    },
    phone: {
      value: '',
      isChanged: false,
    },
    position: {
      value: '',
      isChanged: false,
    },
    skills: {
      value: [],
      isChanged: false,
      isValid: true,
    },
    description: {
      value: '',
      isChanged: false,
    },
  }),
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    skillsList() {
      return this.$store.getters.getSkillsList;
    },
    isStudent() {
      return this.$store.getters.isStudent;
    },
  },
  components: {
    Multiselect,
  },
  mounted() {
    this.setInitialUserData();
  },
  methods: {
    setInitialUserData() {
      const {
        email,
        phone,
        position,
        skills,
        description,
        first_name: firstName,
        last_name: lastName,
      } = this.user;

      this.firstName.value = firstName;
      this.lastName.value = lastName;
      this.email.value = email;
      this.phone.value = phone;
      this.position.value = position;
      this.description.value = description;
      this.skills.value = skills.map(({ name }) => name);
    },
    setIsChanged(field) {
      field.isChanged = true;
    },
    addSkill(skillName) {
      if (skillName.length > 50) {
        this.skills.isValid = false;
        return;
      }

      this.skills.value.push(skillName);
      this.$store.commit(ADD_SKILL, skillName);
    },
    updateProfile() {
      editCurrentUser({
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        phone: this.phone.value,
        position: this.position.value,
        description: this.description.value,
        skills: this.skills.value,
      }).then(({ data }) => {
        this.$store.commit(SET_USER, data);
        this.$notify({
          type: 'success',
          title: 'Success',
          text: 'Profile information has been updated',
        });
        this.clearIsChanged();
      }).catch(({ response: { data } }) => {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: data.message || 'Something went wrong...',
        });
      });
    },
    clearIsChanged() {
      this.firstName.isChanged = false;
      this.lastName.isChanged = false;
      this.email.isChanged = false;
      this.phone.isChanged = false;
      this.position.isChanged = false;
      this.description.isChanged = false;
      this.skills.isChanged = false;
    },
  }
}
</script>
