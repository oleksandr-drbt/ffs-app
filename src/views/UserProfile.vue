<template>
  <section class="open-user">
    <div class="row bottom-margin">
      <div class="col-12 mb-3">
        <div class="card">
          <div class="card-body">
            <div :class="`profile-header ${isStudent ? 'blue-bg' : 'default-bg'}`">
              <div class="d-flex justify-content-around">
                <div class="profile-info d-flex align-items-center">
                  <div class="profile-img-wrapper">
                    <img class="profile-img img-fluid" :src="user.avatarUrl"
                         onerror="this.src = '/img/default.png'" alt="avatar">
                  </div>
                  <div class=" pl-4">
                    <p class="profile-user-name mb-0">{{ user.first_name }} {{ user.last_name }}</p>
                    <div class=" d-flex align-items-center">
                      <p class="profile-user-designation mb-0">{{ user.role }}</p>
                    </div>
                  </div>
                </div>
                <div class="details d-flex align-items-center">
                  <div v-if="isStudent" class="detail">
                    <p>Portfolio</p>
                    <p>{{ countWorks }}</p>
                  </div>
                  <div v-if="isStudent" class="detail">
                    <p>Projects</p>
                    <p>{{ countProjects }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="profile-body">
              <div v-if="isStudent" class="profile-tags text-center">
                <span v-for="{ name, id } in user.skills" :key="id" class="tag-skills">
                  {{ name }}
                </span>
              </div>
              <div class="profile-information mt-2 pb-4">
                <div class="d-flex flex-md-row flex-column justify-content-around">
                  <div>
                    <p><strong>Full name:</strong> {{ user.first_name }} {{ user.last_name }}</p>
                    <p v-if="user.position"><strong>Position:</strong> {{ user.position }}</p>
                  </div>
                  <div>
                    <p><strong>Email:</strong> {{ user.email }}</p>
                    <p v-if="user.phone"><strong>Phone:</strong> {{ user.phone }}</p>
                  </div>
                </div>
                <div v-if="user.description" class="profile-description pt-2 px-md-5">
                  <p>{{ user.description }}</p>
                </div>
              </div>
              <div v-if="isStudent" class="profile-portfolio mt-5 pb-5">
                <h5 class="profile-title mb-5">Portfolio</h5>
                <div v-if="!countWorks" class="w-100">
                  <p class="empty-projects">
                    Student doesn't have any portfolio work for now
                  </p>
                </div>
                <div v-else class="row">
                  <div v-for="({ id, title, description, link, imageUrl }) in user.works" :key="id"
                       class="col-12 col-md-6 col-lg-4 col-xl-3 d-flex justify-content-center">
                    <component :is="link ? 'a' : 'div'" :href="link || ''" target="_blank" :class="{ 'pointer': link }">
                      <figure class="portfolio-card slide-up" :class="{ 'slide-up-hover': description }">
                        <img :src="imageUrl || '/img/portfolio_default.jpg'" alt="work"
                             onerror="this.src = '/img/portfolio_default.jpg'">
                        <figcaption>
                          <h4>{{ title }}</h4>
                          <p>{{ description }}</p>
                        </figcaption>
                      </figure>
                    </component>
                  </div>
                </div>
              </div>
              <div v-if="isStudent" class="profile-works mt-5 mb-5">
                <h5 class="profile-title mb-5">Projects</h5>
                <div v-if="!countProjects" class="w-100">
                  <p class="empty-projects">
                    Student haven't ever done any project for now
                  </p>
                </div>
                <div class="works-list px-4">
                  <div v-for="({ id, title, completed_date, review, owner }) in user.projects" :key="id"
                       :class="{'works-border': index !== countProjects - 1 && countProjects !== 1}"
                       class="works-item px-5 pb-4">
                    <div class="work-badge">
                      <i class="bi bi-check-circle"></i>
                    </div>
                    <div class="d-flex align-items-center mb-2 justify-content-between">
                      <h5 class="work-name">{{ title }}</h5>
                      <small class="work-date">{{ completed_date }}</small>
                    </div>
                    <p class="pr-5 mr-3 mb-1">{{ review }}</p>
                    <router-link :to="'/user/' + owner.id">
                      <p class="owner">{{ owner.first_name }} {{ owner.last_name }}</p>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getUserById } from "../api/userApi";
import { SET_TITLE } from "../store/mutationsTypes";

export default {
  name: "UserProfile",
  data: () => ({
    user: {},
    countWorks: 0,
    countProjects: 0,
  }),
  computed: {
    isStudent() {
      return this.user.role === 'student';
    },
  },
  created() {
    this.fetchUser();
  },
  watch: {
    '$route'() {
      this.fetchUser();
    },
  },
  methods: {
    async fetchUser() {
      const { data } = await getUserById(this.$route.params.id);
      this.user = {
        ...data,
        avatarUrl: data.avatarUrl || '/img/default.png',
      };
      this.countWorks = data.works.length;
      const title = `${data.first_name} ${data.last_name}`;
      this.$store.commit(SET_TITLE, title);
    },
  },
}
</script>
