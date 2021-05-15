<template>
  <section class="dashboard">
    <div class="bottom-margin">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div class="app-card-header mb-2">
                <h6 class="card-title">
                  Welcome, {{ user.first_name }} {{ user.last_name }}!
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isStudent && acceptedProjects.length" class="row mt-4">
      <div class="col-12 mb-2 mt-2">
        <h4 class="dashboard-block-title">
          The next {{ acceptedProjects.length }} requested projects were accepted:
        </h4>
      </div>
      <project-card
          v-for="project in acceptedProjects"
          :project="project"
          :key="project.id"
          class="col-12"
      />
    </div>
    <div v-if="isStudent && requestedProjects.length" class="row">
      <div class="col-12 mb-2 mt-2">
        <h4 class="dashboard-block-title">
          You've requested next {{ requestedProjects.length }} following projects:
        </h4>
      </div>
      <project-card
          v-for="project in requestedProjects"
          :project="project"
          :key="project.id"
          class="col-12"
          @onCloseModal="fetchDashboard"
      />
    </div>
    <div v-if="isTeacher && requestedProjects.length" class="row mt-4">
      <div class="col-12 mb-2 mt-2">
        <h4 class="dashboard-block-title">
          The next {{ requestedProjects.length }} projects have requests from students:
        </h4>
      </div>
      <project-card
          v-for="project in requestedProjects"
          :project="project"
          :key="project.id"
          is-acceptable
          class="col-12"
          @onCloseModal="fetchDashboard"
      />
    </div>
    <div v-if="isTeacher && completedProjects.length" class="row">
      <div class="col-12 mb-2 mt-2">
        <h4 class="dashboard-block-title">
          Completed projects ({{ completedProjects.length }}):
        </h4>
      </div>
      <project-card
          v-for="project in completedProjects"
          :project="project"
          :key="project.id"
          class="col-12"
      />
    </div>
  </section>
</template>

<script>
import ProjectCard from "../components/projects/ProjectCard";
import { SET_TITLE } from "../store/mutationsTypes";
import { getDashboard } from "../api/userApi";

export default {
  name: "Dashboard",
  data: () => ({
    acceptedProjects: [],
    requestedProjects: [],
    completedProjects: [],
  }),
  components: {
    ProjectCard,
  },
  created() {
    this.$store.commit(SET_TITLE, 'Dashboard');
  },
  mounted() {
    this.fetchDashboard();
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    isStudent() {
      return this.$store.getters.isStudent;
    },
    isTeacher() {
      return this.$store.getters.isTeacher;
    },
  },
  methods: {
    fetchDashboard() {
      getDashboard().then(({ data }) => {
        this.acceptedProjects = data.acceptedProjects;
        this.requestedProjects = data.requestedProjects;
        this.completedProjects = data.completedProjects;
      });
    },
  },
}
</script>

<style lang="scss" scoped>
.main-panel .content-wrapper .app-card-header {
  .card-title {
    font-weight: 100;
  }
}
.dashboard-block-title {
  font-size: 14px;
}
</style>
