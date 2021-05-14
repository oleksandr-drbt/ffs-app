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
        <div v-if="interestedUsers && interestedUsers.length > 0" class="users py-4">
          <h6>Interested users:</h6>
          <a v-for="user in interestedUsers" :key="user.id" :href="'/user/' + user.id" target="_blank">
            <p class="m-0">{{ user.name }} {{ user.surname }}</p>
          </a>
        </div>
      </div>
    </div>
    <button v-if="project.user.id !== user.id && (typeof interestedUsers.find((x) => x.id === user.id) === 'undefined')"
            slot="footer" class="btn btn-primary modal-default-button"
            @click="toBeInterested(project.id)">
      Interested
    </button>
    <button v-if="project.user.id !== user.id && interestedUsers.find((x) => x.id === user.id)"
            slot="footer" class="btn btn-danger modal-default-button"
            @click="notInterested(project.id)">
      Not interested
    </button>
    <button slot="footer" class="btn btn-secondary modal-default-button" @click="$emit('onClose')">
      Close
    </button>
  </modal-window>
</template>

<script>
import axios from "axios";
import ModalWindow from '../ModalWindow';

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
    interestedUsers: {
      get() {
        return this.project.interested_users;
      },
      set(data) {
        this.project.interested_users = data;
        return this.project.interested_users;
      },
    },
  },
  components: {
    ModalWindow,
  },
  methods: {
    toBeInterested(id) {
      axios({
        method: 'post',
        url: '/api/to-be-interested',
        headers: {
          "Authorization": `Bearer ${this.$store.getters.currentToken.access_token}`,
        },
        data: {
          id: id,
        },
      }).then((res) => {
        this.$emit('update');
        this.interestedUsers = res.data.interested_users;
      });
    },
    notInterested(id) {
      axios({
        method: 'post',
        url: '/api/not-interested',
        headers: {
          "Authorization": `Bearer ${this.$store.getters.currentToken.access_token}`,
        },
        data: {
          id: id,
        },
      }).then((res) => {
        this.$emit('update');
        this.interestedUsers = res.data.interested_users;
      });
    },
  },
}
</script>
