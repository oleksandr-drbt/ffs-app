<template>
  <section class="portfolio settings">
    <div class="row bottom-margin edit-user">
      <div class="col-12">
        <div class="card bottom-margin">
          <div class="card-body">
            <div class="edit-header">
              <h6 class="card-title">Work</h6>
              <p v-if="isCreateMode" class="card-text">Add new work</p>
              <p v-else-if="isEditMode" class="card-text">Edit work</p>
            </div>
            <div class="add-portfolio-form mt-4">
              <form @submit.prevent="submitWork" id="portfolio-form" enctype="multipart/form-data">
                <div class="form-group">
                  <label for="portfolioTitle">Title</label>
                  <input v-model="title" v-validate="'max:100|required'" data-vv-validate-on="change"
                         :class="{'error-input': errors.first('title')}"
                         type="text" class="form-control" id="portfolioTitle" name="title"
                         maxlength="100" pattern="^[A-Za-zА-Яа-яЁё0-9\s]+$"
                         placeholder="Title" required>
                  <small v-if="errors.has('title')" class="form-text">
                    {{ errors.first('title') }}
                  </small>
                </div>
                <div class="form-group">
                  <label for="portfolioDescription">Description</label>
                  <textarea v-model="description" v-validate="'max:255'" data-vv-validate-on="change"
                            :class="{'error-input': errors.first('description')}"
                            rows="4" class="form-control" id="portfolioDescription" name="description"
                            placeholder="Description..."></textarea>
                  <small v-if="errors.has('description')" class="form-text">
                    {{ errors.first('description') }}
                  </small>
                </div>
                <div v-if="isLinkFieldShown" class="form-group">
                  <label for="portfolioTitle">Link</label>
                  <input v-model="link" v-validate="'url|max:255'" data-vv-validate-on="change"
                         :class="{'error-input': errors.first('link')}"
                         type="text" class="form-control" name="link"
                         maxlength="255" placeholder="Website, GitHub etc...">
                  <small v-if="errors.has('link')" class="form-text">
                    {{ errors.first('link') }}
                  </small>
                </div>
                <div class="form-row d-flex justify-content-between">
                  <div class="add-content-portfolio d-flex align-items-center">
                    <div>
                      <input @change="uploadImage" name="portfolioImage" accept="image/*"
                             type="file" id="portfolioImage" ref="workImage"
                             v-validate="'image'" data-vv-as="image" class="d-none">
                      <label class="btn btn-outline-secondary" for="portfolioImage">
                        <i class="bi bi-image"></i>
                      </label>
                    </div>
                    <div>
                      <label class="btn btn-outline-secondary" @click="toggleLinkField">
                       <i class="bi bi-link-45deg"></i>
                      </label>
                    </div>
                  </div>
                  <span v-if="isEditMode" class="portfolio-status d-flex align-items-center justify-content-center">
                    {{ status }}
                  </span>
                  <div class="d-flex flex-row">
                    <button @click="setIsPublished(false)" type="submit" class="btn btn-secondary d-flex my-3 mx-1">
                      Save
                    </button>
                    <button @click="setIsPublished(true)" type="submit" class="btn btn-primary d-flex my-3 mx-1">
                      Publish
                    </button>
                    <button v-if="isEditMode" @click.prevent="disableEditMode" class="btn btn-danger d-flex my-3 ml-1">
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
              <transition name="fade-in">
                <div v-if="image" class="image-preview">
                  <img class="w-100 h-auto" :src="image">
                  <button @click="removePreviewImage" class="btn delete-photo">
                    <i class="bi bi-x"></i>
                  </button>
                </div>
              </transition>
            </div>
          </div>
        </div>
        <div v-if="works.length" class="card bottom-margin">
          <div class="card-body">
            <div class="edit-header">
              <h6 class="card-title">Works ({{ works.length }}):</h6>
            </div>
            <div class="portfolio-works-list my-4 mx-3">
              <carousel :perPageCustom="[[0, 1], [600, 2], [1250, 3], [1700, 4]]" :navigationEnabled="true"
                        :paginationEnabled="true" :scrollPerPage="true">
                <slide v-for="({ id, title, description, link, imageUrl }, index) in works" :key="id">
                  <img :src="imageUrl || '/img/portfolio_default.jpg'" onerror="this.src = '/img/portfolio_default.jpg'"
                       class="img-fluid px-2" alt="portfolio-work">
                  <div class="work-pop-up">
                    <p class="h-100 d-flex align-items-center justify-content-center px-2 text-center">
                      {{ description }}</p>
                    <div class="portfolio-group-btn d-flex">
                      <button @click="enableEditMode(works[index])" class="btn btn-secondary d-flex ml-auto">
                        <i class="bi bi-pencil-square"></i>
                      </button>
                      <button @click="deleteWork(id)" class="btn btn-secondary d-flex ml-1">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                  <component :is="link ? 'a' : 'div'" target="_blank" :href="link" :class="{'disable': !link}">
                    <h4 class="portfolio-title px-1">{{ title }}</h4>
                  </component>
                </slide>
              </carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { createWork, fetchCurrentUserWorks, removeWork, updateWork } from "../api/worksApi";
import { SET_TITLE } from "../store/mutationsTypes";

const CREATE_MODE = 'create';
const EDIT_MODE = 'edit';

export default {
  name: "Portfolio",
  data: () => ({
    works: [],
    mode: CREATE_MODE,

    id: null,
    title: '',
    description: '',
    link: '',
    image: null,
    isPublished: false,

    isLinkFieldShown: false,
    shouldDeleteImage: false,
  }),
  computed: {
    isCreateMode() {
      return this.mode === CREATE_MODE;
    },
    isEditMode() {
      return this.mode === EDIT_MODE;
    },
    status() {
      return this.isPublished ? 'published' : 'saved';
    },
  },
  created() {
    this.$store.commit(SET_TITLE, 'Portfolio');
  },
  mounted() {
    this.fetchPortfolioWorks();
  },
  methods: {
    fetchPortfolioWorks() {
      fetchCurrentUserWorks().then(({ data }) => {
        this.works = data;
      }).catch(({ response: { data } }) => {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: data.message || 'Validation error',
        });
      });
    },
    uploadImage({ target }) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.image = e.target.result;
      };
      reader.readAsDataURL(target.files[0]);
    },
    removePreviewImage() {
      this.image = null;
      this.$refs.workImage.value = null;
      if (this.isEditMode) {
        this.shouldDeleteImage = true;
      }
    },
    toggleLinkField() {
      this.link = '';
      this.isLinkFieldShown = !this.isLinkFieldShown;
    },
    setIsPublished(status) {
      this.isPublished = status;
    },
    submitWork() {
      if (this.isCreateMode) this.createWork();
      if (this.isEditMode) this.editWork();
    },
    createWork() {
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('link', this.link);
      formData.append('is_published', this.isPublished);
      formData.append('image', this.$refs.workImage.files[0] || null);

      createWork(formData).then(({ data }) => {
        this.works.unshift(data);
        this.clearFields();
        this.$notify({
          type: 'success',
          title: 'Success',
          text: 'Work has been created',
        });
      }).catch(({ response: { data } }) => {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: data.message || 'Something went wrong...',
        });
      });
    },
    editWork() {
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('link', this.link);
      formData.append('is_published', this.isPublished);
      formData.append('image', this.$refs.workImage.files[0] || null);
      formData.append('is_image_removed', this.shouldDeleteImage);

      updateWork(this.id, formData).then(({ data }) => {
        const workIndex = this.works.findIndex(({ id }) => id === this.id);
        this.works[workIndex] = data;
        this.disableEditMode();
        this.clearFields();
        this.$notify({
          type: 'success',
          title: 'Success',
          text: 'Work has been updated',
        });
      }).catch(({ response: { data } }) => {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: data.message || 'Something went wrong...',
        });
      });
    },
    deleteWork(id) {
      removeWork(id).then(({ data }) => {
        this.works = this.works.filter(work => work.id !== id);
        if (this.id === id && this.isEditMode) {
          this.disableEditMode();
        }
        this.$notify({
          type: 'success',
          title: 'Success',
          text: data.message,
        });
      }).catch(({ response: { data } }) => {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: data.message || 'Something went wrong...',
        });
      });
    },
    enableEditMode(work) {
      this.mode = EDIT_MODE;
      this.clearFields();

      const {
        id,
        title,
        description,
        link,
        imageUrl,
        is_published: isPublished,
      } = work;

      this.id = id;
      this.title = title;
      this.description = description;
      this.link = link;
      this.image = imageUrl;
      this.isPublished = isPublished;
      this.isLinkFieldShown = !!link;
      this.shouldDeleteImage = false;
    },
    disableEditMode() {
      this.mode = CREATE_MODE;
      this.clearFields();
    },
    clearFields() {
      this.id = null;
      this.title = '';
      this.description = '';
      this.link = '';
      this.image = null;
      this.isPublished = false;
      this.isLinkFieldShown = false;
      this.shouldDeleteImage = false;
      this.$refs.workImage.value = null;
    },
  },
}
</script>
