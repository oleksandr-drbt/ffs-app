<template>
  <section class="search">
    <div class="bottom-margin">
      <search-form :search-type="searchType" @onSearch="search"/>
      <div v-if="!results.length" class="col-12 mt-2">
        <p class="empty-search-results text-center">
          Nothing found so far...
        </p>
      </div>
      <div class="search-results">
        <div v-if="results.length" class="search-results-count col-12">
          <p class="text-right">
            Found {{ searchType }}: <strong>{{ results.length }}</strong>
          </p>
        </div>
        <div v-if="searchType === 'users'" class="row">
          <user-card
              v-for="user in results"
              :user="user"
              :key="user.id"
              class="col-12 col-md-6 user-card mb-3"
          />
        </div>
        <div v-if="searchType === 'projects'" class="row">
          <project-card
              v-for="project in results"
              :project="project"
              :key="project.id"
              class="col-12 project-card"
              @onCloseModal="search"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SearchForm from "../components/search/SearchForm";
import UserCard from "../components/users/UserCard";
import ProjectCard from "../components/projects/ProjectCard";
import { searchForProjects, searchForUsers } from "../api/searchApi";
import { SET_TITLE } from "../store/mutationsTypes";

const USERS_SEARCH = "users";
const PROJECTS_SEARCH = "projects";

export default {
  name: "Search",
  data: () => ({
    results: [],
  }),
  computed: {
    isStudent() {
      return this.$store.getters.isStudent;
    },
    isTeacher() {
      return this.$store.getters.isTeacher;
    },
    searchApi() {
      return this.$store.getters.isTeacher ? searchForUsers : searchForProjects;
    },
    searchType() {
      return this.$store.getters.isTeacher ? USERS_SEARCH : PROJECTS_SEARCH;
    },
  },
  created() {
    this.$store.commit(SET_TITLE, 'Search');
  },
  components: {
    ProjectCard,
    SearchForm,
    UserCard,
  },
  methods: {
    search(value, skills) {
      this.searchApi(value, skills).then(({ data }) => {
        this.results = data;
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
