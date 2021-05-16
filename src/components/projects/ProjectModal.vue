<template>
  <modal-window :width="'60%'">
    <div slot="body" class="card open-project-card w-100">
      <div class="card-body">
        <div class="mb-3">
          <h1 class="card-title">{{ project.title }}</h1>
        </div>
        <router-link :to="`/user/${project.user.id}`" target="_blank">
          <p class="owner mb-0">
            {{ project.user.first_name }} {{ project.user.last_name }}
          </p>
        </router-link>
        <p class="posted-date">
          Posted at {{ project.created_at | moment('DD MMM YYYY') }}
        </p>
        <hr />
        <p class="card-description">
          {{ project.description }}
        </p>
        <ul class="card-additional d-flex flex-wrap py-4">
          <li>
            <i class="bi bi-list-task"></i>
            <strong>{{ projectTypes.get(project.type) }}</strong>
            <small>Project type</small>
          </li>
          <li>
            <i class="bi bi-people"></i>
            <strong>{{ studentsCounts.get(project.students_count) }}</strong>
            <small>Number of students</small>
          </li>
          <li>
            <i class="bi bi-calendar3"></i>
            <strong>{{ durations.get(project.duration) }}</strong>
            <small>Project length</small>
          </li>
        </ul>
        <div v-if="project.files.length" class="attachments pt-2 pb-3">
          <h6>Attachments ({{ project.files.length }}):</h6>
          <div v-for="{ id, original_name, fileUrl } in project.files" :key="id" class="project-file mb-2">
            <i class="bi bi-paperclip mr-2"></i>
            <a :href="fileUrl" target="_blank">
              {{ original_name }}
            </a>
          </div>
        </div>
        <div v-if="project.skills.length" class="skills py-4">
          <h6>Skills:</h6>
          <div class="tags">
            <span v-for="{ id, name } in project.skills" :key="id" class="tag-skills">
              {{ name }}
            </span>
          </div>
        </div>
        <div v-if="project.participants.length" class="users py-4">
          <h6>Requested students:</h6>
          <p class="m-0" v-for="{ id, first_name, last_name, is_accepted } in project.participants" :key="id">
            <a :href="'/user/' + id" target="_blank">{{ first_name }} {{ last_name }}</a>
            <i class="bi ml-2" :class="`${is_accepted ? 'bi-check-circle text-info' : 'bi-clock text-warning'}`"></i>
          </p>
        </div>
      </div>
    </div>
    <button v-if="!isCurrentUserProject && !isRequested && !isTaken"
            slot="footer" class="btn btn-primary modal-default-button"
            @click="requestProject(project.id)">
      Request
    </button>
    <button v-if="!isCurrentUserProject && isRequested && !isTaken"
            slot="footer" class="btn btn-danger modal-default-button"
            @click="cancelRequestProject(project.id)">
      Cancel request
    </button>
    <button slot="footer" class="btn btn-secondary modal-default-button" @click="$emit('onClose')">
      Close
    </button>
  </modal-window>
</template>

<script>
import ModalWindow from '../ModalWindow';
import { cancelRequestProject, requestProject } from "../../api/projectApi";

export default {
  name: "ProjectModal",
  props: {
    project: {
      type: Object,
    },
  },
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
    isCurrentUserProject() {
      return this.project.user.id === this.user.id;
    }
  },
  components: {
    ModalWindow,
  },
  methods: {
    requestProject(id) {
     requestProject(id).then(({ data }) => {
       this.$notify({
         type: 'success',
         title: 'Success',
         text: data.message,
       });
       this.$emit('onClose');
     }).catch(({ response: { data } }) => {
       this.$notify({
         type: 'error',
         title: 'Error',
         text: data.message || 'Something went wrong...',
       });
     });
    },
    cancelRequestProject(id) {
      cancelRequestProject(id).then(({ data }) => {
        this.$notify({
          type: 'success',
          title: 'Success',
          text: data.message,
        });
        this.$emit('onClose');
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
