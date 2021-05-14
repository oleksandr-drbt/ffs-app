<template>
  <section class="my-projects">
    <div class="row bottom-margin">
      <div class="col-12 mb-3">
        <div class="card">
          <div class="card-body">
            <div class="app-card-header">
              <h6 class="card-title">Project</h6>
              <p v-if="isCreateMode" class="card-text">Create new project</p>
              <p v-else-if="isEditMode" class="card-text">Edit project</p>
            </div>
            <div class="create-project-form mt-4">
              <form id="create-project" enctype="multipart/form-data">
                <div class="form-group">
                  <label for="projectTitle">Title</label>
                  <input v-model="title" v-validate="'required|min:2|max:200'"
                         data-vv-validate-on="change" :class="{'error-input': errors.first('title')}"
                         type="text" class="form-control" id="projectTitle" name="title"
                         maxlength="200" placeholder="Title" required>
                  <small v-show="errors.has('title')" id="titleHelp" class="form-text">
                    {{ errors.first('title') }}
                  </small>
                </div>
                <div class="form-group">
                  <label for="projectDescription">Description</label>
                  <textarea v-model="description" v-validate="'required|max:1000'"
                            data-vv-validate-on="change" :class="{'error-input': errors.first('description')}"
                            rows="9" class="form-control" id="projectDescription" name="description"
                            placeholder="Description..." required></textarea>
                  <small v-show="errors.has('description')" id="descriptionHelp" class="form-text">
                    {{ errors.first('description') }}
                  </small>
                </div>
                <div class="form-group">
                  <label>Skills</label>
                  <multiselect v-model="skills" @tag="addSkill" tag-placeholder="Add this as new skill"
                               placeholder="Search a skill" :options="skillsList" :multiple="true"
                               :taggable="true" :max-height="250" :closeOnSelect="false"
                               :class="{'error-input': !isSkillValid}">
                  </multiselect>
                </div>
                <div class="form-group">
                  <label for="projectType">Project Type</label>
                  <div id="projectType">
                    <div v-for="[key, name] in projectTypes" :key="key" class="custom-control custom-radio custom-control-inline">
                      <input type="radio" v-model="type" name="projectType" :value="key"
                             data-vv-validate-on="change" v-validate="'required'" class="custom-control-input"
                             :id="`projectType-${key}`" required>
                      <label class="custom-control-label" :for="`projectType-${key}`">
                        {{ name }}
                      </label>
                    </div>
                  </div>
                  <small v-show="errors.has('projectType')" id="projectTypeHelp" class="form-text">
                    {{ errors.first('projectType') }}
                  </small>
                </div>
                <div class="form-group">
                  <label for="projectNumberOfStudents">Number of Students</label>
                  <div id="projectNumberOfStudents">
                    <div v-for="[key, name] in studentsCounts" :key="key"
                         class="custom-control custom-radio custom-control-inline">
                      <input type="radio" v-model="studentsCount" name="studentsCounts"
                             :value="key" v-validate="'required'" :id="`studentsCount-${key}`"
                             data-vv-validate-on="change" class="custom-control-input" required>
                      <label class="custom-control-label" :for="`studentsCount-${key}`">
                        {{ name }}
                      </label>
                    </div>
                  </div>
                  <small v-show="errors.has('studentsCounts')" id="numberOfStudentsHelp" class="form-text">
                    {{ errors.first('studentsCounts') }}
                  </small>
                </div>
                <div class="form-group">
                  <label for="durations">Duration</label>
                  <div id="durations">
                    <div v-for="[key, name] in durations" :key="key"
                         class="custom-control custom-radio custom-control-inline">
                      <input type="radio" v-model="duration" name="duration"
                             :value="key" v-validate="'required'" :id="`duration-${key}`" data-vv-validate-on="change"
                             class="custom-control-input">
                      <label class="custom-control-label" :for="`duration-${key}`">
                        {{ name }}
                      </label>
                    </div>
                  </div>
                  <small v-show="errors.has('duration')" id="durationHelp" class="form-text">
                    {{ errors.first('duration') }}
                  </small>
                </div>
                <div class="form-group">
                  <label for="btnAddFile">Additional project files</label>
                  <div class="project-file-list mt-1 mb-3">
                    <div v-if="isCreateMode">
                      <div v-for="(file, index) in files" :key="index" class="project-file mb-2 d-flex align-items-center">
                        <i class="bi bi-paperclip mr-1"></i>
                        {{ file.name }}
                        <i @click="removeFile(index)" class="bi bi-x ml-2 delete-project-btn"></i>
                      </div>
                    </div>
                    <div v-else-if="isEditMode">
                      <div v-for="({ name, original_name, fileUrl }, index) in files" :key="index"
                           class="project-file mb-2 d-flex align-items-center">
                        <i class="bi bi-paperclip mr-1"></i>
                        <a :href="fileUrl" target="_blank">
                          {{ original_name || name }}
                        </a>
                        <i @click="removeFile(index)" class="bi bi-x ml-2 delete-project-btn"></i>
                      </div>
                    </div>
                  </div>
                  <small v-show="errors.has('files[]')" id="projectFilesHelp" class="form-text mb-2">
                    {{ errors.first('files[]') }}
                  </small>
                  <div id="btnAddFile">
                    <input type="file" id="addProjectFile" class="custom-file-input d-none"
                           v-validate="'size:20480|mimes:application/*,image/*,text/*,document/*'"
                           data-vv-as="file" @change="uploadFiles" name="files[]" multiple :disabled="files.length >= 5">
                    <label class="add-project-file-label mb-0" :class="{'disabled': files.length >= 5}" for="addProjectFile">
                      Upload project files
                    </label>
                  </div>
                  <p class="form-text">
                    You may attach up to {{ maxCountFiles }} files under
                    <span>{{ maxFileSize }} MB</span> each
                  </p>
                </div>
                <div v-if="isEditMode" class="form-group d-flex justify-content-end">
                  <button @click="editProject" type="button" class="btn btn-secondary d-flex">
                    Save
                  </button>
                  <button @click="disableEditMode" type="button" class="btn btn-danger d-flex ml-2">
                    Cancel
                  </button>
                </div>
                <div v-else class="form-group">
                  <button @click="createProject" type="button" class="btn btn-primary d-flex ml-auto my-3">
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <project-card
        v-for="project in projects"
        :key="project.id"
        :project="project"
        :is-editable="true"
        @onEdit="enableEditMode"
        @onDelete="deleteProject"
    />
  </section>
</template>

<script>
import Multiselect from "vue-multiselect";
import ProjectCard from "../components/Projects/ProjectCard";
import { createProject, fetchCurrentUserProjects, removeProject, updateProject } from "../api/projectApi";
import { ADD_SKILL, SET_TITLE } from "../store/mutationsTypes";

const CREATE_MODE = 'create';
const EDIT_MODE = 'edit';

export default {
  name: "Projects",
  data: () => ({
    projects: [],
    mode: CREATE_MODE,

    id: null,
    title: '',
    description: '',
    skills: [],
    type: '',
    studentsCount: '',
    duration: '',
    files: [],
    removedFiles: [],

    maxCountFiles: 5,
    maxFileSize: 20,

    isSkillValid: true,

    project: {},
  }),
  computed: {
    isCreateMode() {
      return this.mode === CREATE_MODE;
    },
    isEditMode() {
      return this.mode === EDIT_MODE;
    },
    skillsList() {
      return this.$store.getters.getSkillsList;
    },
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
  components: {
    ProjectCard,
    Multiselect,
  },
  created() {
    this.$store.commit(SET_TITLE, 'Projects');
  },
  mounted() {
    this.fetchProjects();
  },
  methods: {
    fetchProjects() {
      fetchCurrentUserProjects().then(({ data }) => {
        this.projects = data;
      });
    },
    addSkill(skillName) {
      if (skillName.length > 50) {
        this.isSkillValid = false;
        return;
      }

      this.skills.push(skillName);
      this.$store.commit(ADD_SKILL, skillName);
    },
    uploadFiles(e) {
      const uploadedFiles = e.target.files;

      Array.from(uploadedFiles).forEach((file) => {
        if (this.files.length < this.maxCountFiles) {
          this.files.push(file);
        }
      });
    },
    removeFile(index) {
      if (this.isEditMode) {
        this.removedFiles.push(this.files[index]);
      }
      this.files.splice(index, 1);
    },
    createProject() {
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) return;

        const formData = new FormData();
        formData.append('title', this.title);
        formData.append('description', this.description);
        formData.append('type', this.type);
        formData.append('students_count', this.studentsCount);
        formData.append('duration', this.duration);
        this.skills.forEach((skill) => {
          formData.append('skills[]', skill);
        });
        this.files.forEach((file) => {
          formData.append('files[]', file);
        });

        createProject(formData).then(({ data }) => {
          this.projects.unshift(data);
          this.clearFields();
          this.$validator.reset();
          this.$notify({
            type: 'success',
            title: 'Success',
            text: 'Project has been created',
          });
        }).catch(({ response: { data } }) => {
          this.$notify({
            type: 'error',
            title: 'Error',
            text: data.message || 'Something went wrong...',
          });
        });
      });
    },
    editProject() {
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('type', this.type);
      formData.append('students_count', this.studentsCount);
      formData.append('duration', this.duration);
      this.skills.forEach((skill) => {
        formData.append('skills[]', skill);
      });
      this.removedFiles.forEach((file) => {
        formData.append('removedFiles[]', file.id);
      });
      this.files.forEach((file) => {
        formData.append('files[]', file);
      });

      updateProject(this.id, formData).then(({ data }) => {
        const projectIndex = this.projects.findIndex(({ id }) => id === this.id);
        this.projects[projectIndex] = data;
        this.disableEditMode();
        this.clearFields();
        this.$notify({
          type: 'success',
          title: 'Success',
          text: 'Project has been updated',
        });
      }).catch(({ response: { data } }) => {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: data.message || 'Something went wrong...',
        });
      });
    },
    deleteProject(id) {
      removeProject(id).then(({ data }) => {
        this.projects = this.projects.filter(project => project.id !== id);
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
    enableEditMode(project) {
      this.mode = EDIT_MODE;
      this.clearFields();
      this.$validator.reset();

      this.id = project.id;
      this.title = project.title;
      this.description = project.description;
      this.skills = project.skills.map(({ name }) => name);
      this.type = project.type;
      this.studentsCount = project.students_count;
      this.duration = project.duration;
      this.files = project.files;
    },
    disableEditMode() {
      this.mode = CREATE_MODE;
      this.clearFields();
      this.$validator.reset();
    },
    clearFields() {
      this.id = null;
      this.title = '';
      this.description = '';
      this.skills = [];
      this.type = '';
      this.studentsCount = '';
      this.duration = '';
      this.files = [];
      this.removedFiles = [];
    },
  },
}
</script>
