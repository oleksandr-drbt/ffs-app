<template>
  <div class="row">
    <div class="col-12 mb-2">
      <form @submit.prevent="$emit('onSearch', searchValue, selectedSkills)" class="input-group search-form">
        <input v-model="searchValue" type="text" class="form-control search-input" id="search" name="search"
               maxlength="150" v-validate="'max:150'" :placeholder="`Search for ${searchType}...`">
        <div v-if="searchValue" class="input-group-append">
          <button @click="clearSearchValue" class="search-clear-btn px-3" type="button">
            <i class="bi bi-x"></i>
          </button>
        </div>
        <div class="input-group-append">
          <button class="btn btn-secondary search-btn px-3" type="submit">
            <i class="bi bi-search pr-1"></i>
            Search
          </button>
        </div>
      </form>
    </div>
    <div class="col-12 mb-5">
      <label for="tags-select">Additionally select skills:</label>
      <multiselect v-model="selectedSkills" :options="skillsList" placeholder="Select skills"
                   id="tags-select" :multiple="true" :taggable="true"
                   :max-height="250" :closeOnSelect="false">
      </multiselect>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  name: "SearchForm",
  props: {
    searchType: {
      type: String,
    }
  },
  data: () => ({
    searchValue: '',
    selectedSkills: [],
  }),
  computed: {
    skillsList() {
      return this.$store.getters.getSkillsList;
    },
  },
  components: {
    Multiselect,
  },
  methods: {
    clearSearchValue() {
      this.searchValue = '';
    },
  },
}
</script>
