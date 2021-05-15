<template>
  <div>
    <div class="row bottom-margin">
      <div class="col-12 mb-3 project-card">
        <div v-if="isEditable" class="project-btn-group d-flex">
          <button class="btn d-flex" @click="$emit('onEdit', project)">
            <i class="bi bi-pencil-square"></i>
          </button>
          <button class="btn d-flex" @click="$emit('onDelete', project.id)">
            <i class="bi bi-trash"></i>
          </button>
        </div>
        <div class="card" @click="openProjectModal">
          <div class="card-body">
            <div class="app-card-header mb-2">
              <h6 class="card-title">{{ project.title }}</h6>
              <p class="card-text">Posted at {{ project.created_at | moment('DD MMM YYYY') }}</p>
            </div>
            <p class="card-description">{{ project.description.substr(1, 250) }}</p>
            <div class="tags">
              <span v-for="({ id, name }) in project.skills" :key="id" class="tag-skills">
                {{ name }}
              </span>
            </div>
            <div class="card-additional">
              <p>Project type: <span>{{ projectTypes.get(project.type) }}</span></p>
              <p>Number of students: <span>{{ studentsCounts.get(project.students_count) }}</span></p>
              <p>Project length: <span>{{ durations.get(project.duration) }}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <project-modal v-if="isProjectModalShown" :project="project" @onClose="closeProjectModal" />
  </div>
</template>

<script>
import ProjectModal from "./ProjectModal";

export default {
  name: "ProjectCard",
  components: { ProjectModal },
  props: {
    project: {
      type: Object,
    },
    isEditable: {
      type: Boolean,
      default: false,
    }
  },
  data: () => ({
    isProjectModalShown: false,
  }),
  computed: {
    projectTypes() {
      return this.$store.getters.getProjectTypes;
    },
    studentsCounts() {
      return this.$store.getters.getStudentsCounts;
    },
    durations() {
      return this.$store.getters.getDurations;
    },
  },
  methods: {
    openProjectModal() {
      this.isProjectModalShown = true;
    },
    closeProjectModal() {
      this.isProjectModalShown = false;
    },
  },
}
</script>
