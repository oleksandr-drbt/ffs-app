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
        <div class="card" :class="{'done': project.status === 'done'}">
          <div class="card-body">
            <div class="app-card-header mb-2">
              <h6 class="card-title" @click="openProjectModal">{{ project.title }}</h6>
              <p class="card-text">Posted at {{ project.created_at | moment('DD MMM YYYY') }}</p>
              <p v-if="isRequested && !isTaken" class="card-text-event text-warning d-flex align-items-center">
                <i class="bi bi-clock mr-1"></i>
                Requested
              </p>
              <p v-if="isTaken" class="card-text-event text-info d-flex align-items-center">
                <i class="bi bi-check-circle mr-1"></i>
                Accepted
              </p>
            </div>
            <p class="card-description">{{ project.description.substr(1, 250) }}</p>
            <div class="tags">
              <span v-for="({ id, name }) in project.skills" :key="id" class="tag-skills">
                {{ name }}
              </span>
            </div>
            <div v-if="isAcceptable && project.participants.length" class="requested-users py-2">
              <h6 class="requested-users-title">Requested users:</h6>
              <p class="requested-users-item m-0 mb-1 d-flex align-items-center"
                 v-for="{ id, first_name, last_name, is_accepted } in project.participants" :key="id">
                <a :href="'/user/' + id" target="_blank">{{ first_name }} {{ last_name }}</a>
                <span v-if="!is_accepted" class="accept-btn text-success ml-2" @click="acceptUser(project.id, id)">
                  Accept
                </span>
                <i v-else class="bi bi-check-circle text-info ml-2"></i>
                <span v-if="!is_accepted" class="reject-btn text-danger ml-2" @click="cancelUserRequest(project.id, id)">
                  Cancel
                </span>
              </p>
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
import { acceptUser, removeUserRequest } from "../../api/projectApi";

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
    },
    isAcceptable: {
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
    user() {
      return this.$store.getters.getUser;
    },
    isRequested() {
      return !!this.project.participants.find(({ id, is_accepted }) => this.user.id === id && !is_accepted);
    },
    isTaken() {
      return !!this.project.participants.find(({ id, is_accepted }) => this.user.id === id && is_accepted);
    },
  },
  methods: {
    openProjectModal() {
      this.isProjectModalShown = true;
    },
    closeProjectModal() {
      this.isProjectModalShown = false;
      this.$emit('onCloseModal');
    },
    acceptUser(projectId, userId) {
      acceptUser(projectId, userId).then(({ data }) => {
        this.$notify({
          type: 'success',
          title: 'Success',
          text: data.message,
        });
        this.$emit('onCloseModal');
      }).catch(({ response: { data } }) => {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: data.message || 'Something went wrong...',
        });
      });
    },
    cancelUserRequest(projectId, userId) {
      removeUserRequest(projectId, userId).then(({ data }) => {
        this.$notify({
          type: 'success',
          title: 'Success',
          text: data.message,
        });
        this.$emit('onCloseModal');
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
