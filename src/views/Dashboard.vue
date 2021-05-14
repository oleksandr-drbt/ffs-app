<template>
  <section class="home">
    <div class="row bottom-margin">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="app-card-header mb-2">
              <h6 class="card-title">
                Welcome, {{ user.first_name }} {{ user.last_name }}!
              </h6>
            </div>
            <div v-if="projects.length > 0" class="recommended-block mt-4">
              <h6 class="card-text">Recommended projects for You:</h6>
              <div class="row">
                <div v-for="(project, index) in projects" :key="index" class="col-12 col-md-6 project-card mb-3">
                  <div class="card" @click="openProject(index)">
                    <div class="card-body">
                      <div class="app-card-header mb-2">
                        <h6 class="card-title">{{ project.title }}</h6>
                        <p class="card-text">Posted {{ project.posted_date }}</p>
                      </div>
                      <p class="card-description">{{ project.short_description }}</p>
                      <div class="tags">
                        <span v-for="(skill, index) in project.skills" :key="index" class="tag-skills">
                          {{ skill }}
                        </span>
                      </div>
                      <div class="card-additional">
                        <p>Project type: <span>{{ project.project_type }}</span></p>
                        <p>Number of students: <span>{{ project.number_of_students }}</span></p>
                        <p>Project length: <span>{{ project.project_length }}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <project-modal v-if="showModalWindow"
                  :project="project"
                  @close-modal-window="showModalWindow = false"
                  @update="fetchRecommendedProjects">
    </project-modal>
  </section>
</template>

<script>
import axios from "axios";
import ProjectModal from '../components/Projects/ProjectModal';

export default {
  name: "Dashboard",
  data: () => ({
    project: {},
    projects: [],
    showModalWindow: false,
  }),
  components: {
    ProjectModal,
  },
  created() {
    this.$store.commit('setTitle', 'Dashboard');
  },
  mounted() {
    // this.fetchRecommendedProjects();
  },
  computed: {
    title() {
      return this.$store.getters.getTitle;
    },
    user() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    fetchRecommendedProjects() {
      axios({
        method: 'get',
        url: '/api/get-recommended-projects',
        headers: {
          "Authorization": `Bearer ${this.$store.getters.currentToken.access_token}`,
        },
      }).then((res) => {
        this.projects = res.data;
      });
    },
    openProject(index) {
      this.showModalWindow = true;
      this.project = this.projects[index];
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
</style>
