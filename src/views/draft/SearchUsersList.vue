<template>
  <section class="users-list">
    <div class="row bottom-margin">
      <div class="col-12 mb-3">
        <multiselect v-model="selectedSkill" :options="skills" @input="searchByTag(selectedSkill)"
                     placeholder="Search users by tag" :multiple="false" :taggable="true">
        </multiselect>
      </div>

      <div v-for="user in users.data" :key="user.id" class="col-12 col-md-6 user-card mb-3">
        <div class="card">
          <div class="card-body">
            <div class="d-flex flex-row align-items-center">
              <router-link :to="'/user/' + user.id">
                <div class="user-card-photo">
                  <img :src="'/upload/users/' + user.avatarUrl" onerror="this.src = '/img/default.png'" class="img-fluid"
                       alt="profile image">
                </div>
              </router-link>
              <div class="ml-3 d-flex flex-column justify-content-around">
                <h6>{{ user.name }} {{ user.surname }}</h6>
                <div class="tags">
                  <span v-for="(skill, index) in user.skills" :key="index" class="tag-skills"
                        @click="selectedSkill = skill; searchByTag(skill)">{{ skill }}</span>
                </div>
                <p class="designation mb-0">{{ user.position }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <pagination v-if="users" :data="users" @pagination-change-page="getUsersList">
          <span slot="prev-nav">Назад</span>
          <span slot="next-nav">Далее</span>
        </pagination>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import Multiselect from "vue-multiselect";

export default {
  name: "UsersList",
  components: {
    Multiselect,
  },
  data() {
    return {
      users: '',
      skills: [],
      selectedSkill: '',
    }
  },
  created() {
    this.$store.commit('setTitle', 'Users');
    document.title = this.$store.getters.title;
    this.getUsersList();
  },
  mounted() {
    this.fetchSkillsList();
  },
  methods: {
    getUsersList(page = 1) {
      axios({
        method: 'get',
        url: `/api/get-users-list?page=${page}`,
        headers: {
          "Authorization": `Bearer ${this.$store.getters.currentToken.access_token}`,
        },
      }).then((res) => {
        this.users = res.data;
      });
    },
    fetchSkillsList() {
      axios({
        method: 'get',
        url: '/api/get-skill-list',
        headers: {
          "Authorization": `Bearer ${this.$store.getters.currentToken.access_token}`,
        },
      }).then((res) => {
        this.skills = res.data;
      });
    },
    searchByTag(tag) {
      axios({
        method: 'post',
        url: '/api/get-users-by-tag',
        headers: {
          "Authorization": `Bearer ${this.$store.getters.currentToken.access_token}`,
        },
        data: {
          tag: tag,
        },
      }).then((res) => {
        this.users = res.data;
      });
    },
  },
}
</script>

<style>
.multiselect--active .multiselect__input {
  padding: 5px !important;
}
</style>
