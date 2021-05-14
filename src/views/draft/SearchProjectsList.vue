<template>
  <section class="project-list">
    <div class="row bottom-margin">
      <div class="col-12 mb-3">
        <multiselect v-model="selectedSkill" :options="skills" @input="searchByTag(selectedSkill)"
                     placeholder="Search projects by tag" :multiple="false" :taggable="true">
        </multiselect>
      </div>

      <div v-for="(project, index) in projects.data" :key="index" class="col-12 project-card mb-3">
        <div class="card" @click="openProject(index)">
          <div class="card-body">
            <div class="app-card-header mb-2">
              <h6 class="card-title">{{ project.title }}</h6>
              <p class="card-text">Posted {{ project.posted_date }}</p>
            </div>
            <p class="card-description">{{ project.short_description }}</p>
            <div class="tags">
              <span v-for="(skill, index) in project.skills" :key="index" class="tag-skills">{{ skill }}</span>
            </div>
            <div class="card-additional">
              <p>Project type: <span>{{ project.project_type }}</span></p>
              <p>Number of students: <span>{{ project.number_of_students }}</span></p>
              <p>Project length: <span>{{ project.project_length }}</span></p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <pagination v-if="projects" :data="projects" @pagination-change-page="getProjectsList">
          <span slot="prev-nav">Назад</span>
          <span slot="next-nav">Далее</span>
        </pagination>
      </div>
    </div>
    <open-project v-if="showModalWindow"
                  :project="project"
                  @close-modal-window="showModalWindow = false"
                  @update="getProjectsList">
    </open-project>
  </section>
</template>

<script>
import axios from "axios";
import Multiselect from "vue-multiselect";
import OpenProject from '../../components/Projects/ProjectModal';

export default {
  name: "ProjectsList",
  data() {
    return {
      projects: '',
      skills: [],
      selectedSkill: '',
      project: {},
      showModalWindow: false,
    }
  },
  components: {
    OpenProject,
    Multiselect,
  },
  mounted() {
    this.fetchSkillsList();
  },
  created() {
    this.$store.commit('setTitle', 'Projects');
    this.getProjectsList();
  },
  methods: {
    getProjectsList(page = 1) {
      axios({
        method: 'get',
        url: `/api/get-projects-list?page=${page}`,
        headers: {
          "Authorization": `Bearer ${this.$store.getters.getToken}`,
        },
      }).then((res) => {
        this.projects = res.data;
      });
    },
    openProject(index) {
      this.showModalWindow = true;
      this.project = this.projects.data[index];
    },
    fetchSkillsList() {
      axios({
        method: 'get',
        url: '/api/get-skill-list',
        headers: {
          "Authorization": `Bearer ${this.$store.getters.getToken}`,
        },
      }).then((res) => {
        this.skills = res.data;
      });
    },
    searchByTag(tag) {
      axios({
        method: 'post',
        url: '/api/get-projects-by-tag',
        headers: {
          "Authorization": `Bearer ${this.$store.getters.getToken}`,
        },
        data: {
          tag: tag,
        },
      }).then((res) => {
        this.projects = res.data;
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
