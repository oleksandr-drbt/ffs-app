<template>
  <div :class="{'works-border': isBorderShown}" class="works-item px-5 pb-4">
    <div class="work-badge">
      <i class="bi bi-check-circle"></i>
    </div>
    <div class="d-flex align-items-center mb-2 justify-content-between">
      <h5 class="work-name" @click="openProjectModal">
        {{ project.title }}
      </h5>
      <small class="work-date">{{ project.completed_at | moment('DD-MM-YYYY')}}</small>
    </div>
    <p class="pr-5 mr-3 mb-1">{{ project.review }}</p>
    <router-link :to="'/user/' + project.user.id" target="_blank">
      <p class="owner">{{ project.user.first_name }} {{ project.user.last_name }}</p>
    </router-link>
    <project-modal v-if="isProjectModalShown" :project="project" @onClose="closeProjectModal" />
  </div>
</template>

<script>
import ProjectModal from "./ProjectModal";

export default {
  name: "CompletedProjectCard",
  props: {
    project: {
      type: Object,
    },
    isBorderShown: {
      type: Boolean,
      default: false,
    }
  },
  data: () => ({
    isProjectModalShown: false,
  }),
  components: { ProjectModal },
  methods: {
    openProjectModal() {
      this.isProjectModalShown = true;
    },
    closeProjectModal() {
      this.isProjectModalShown = false;
    },
  }
}
</script>
