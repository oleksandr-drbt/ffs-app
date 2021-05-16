<template>
  <modal-window :width="'60%'">
    <div slot="body" class="card open-project-card w-100">
      <div class="card-body">
        <div class="mb-3">
          <h1 class="card-title">{{ project.title }}</h1>
        </div>
        <p class="card-description">
          <i class="bi bi-info-circle mr-1"></i>
          write review for each student who worked on this project
        </p>
        <hr />
        <form class="review-form py-2">
          <div v-for="({ id, first_name, last_name }, index) in project.participants" :key="id" class="form-group">
            <label :for="`review-${index}`">
              <router-link :to="'/user/' + id" target="_blank">
                {{ first_name }} {{ last_name }}
              </router-link>
            </label>
            <textarea @input="inputReview(id, $event.target.value)" :class="{'error-input': errors.first(`review-${index}`)}"
                      v-validate="'required|max:2000'" data-vv-validate-on="change" rows="4"
                      class="form-control" :id="`review-${index}`" :name="`review-${index}`" maxlength="2000"
                      placeholder="Tell something about student's work..."></textarea>
            <small v-if="errors.has(`review-${index}`)" class="form-text">
              {{ errors.first(`review-${index}`) }}
            </small>
          </div>
        </form>
      </div>
    </div>
    <button slot="footer" class="btn btn-secondary modal-default-button" @click="$emit('onClose')">
      Cancel
    </button>
    <button slot="footer" class="btn btn-success modal-default-button" @click="completeProject(project.id)">
      Confirm
    </button>
  </modal-window>
</template>

<script>
import ModalWindow from '../ModalWindow';
import { completeProject } from "../../api/projectApi";

export default {
  name: "ReviewModal",
  props: {
    project: {
      type: Object,
    }
  },
  data: () => ({
    reviews: new Map,
  }),
  components: {
    ModalWindow,
  },
  methods: {
    inputReview(userId, value) {
      this.reviews.set(userId, value);
    },
    completeProject(id) {
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) return;

        const reviews = Array.from(this.reviews).map(([key, value]) => ({
          userId: key,
          review: value,
        }));

        completeProject(id, reviews).then(({ data }) => {
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
      });
    }
  },
}
</script>
