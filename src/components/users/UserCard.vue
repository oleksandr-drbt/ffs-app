<template>
  <div>
    <div class="card">
      <router-link :to="'/user/' + user.id" target="_blank">
        <div class="card-body">
          <div class="d-flex flex-row align-items-center">
            <div class="user-card-photo">
              <img :src="user.avatarUrl || '/img/default.png'" onerror="this.src = '/img/default.png'"
                   class="img-fluid" alt="avatar">
            </div>
            <div class="ml-3 d-flex flex-column justify-content-around">
              <h6>{{ user.first_name }} {{ user.last_name }}</h6>
              <div class="tags">
              <span v-for="{ id, name } in user.skills" :key="id" class="tag-skills">
                {{ name }}
              </span>
              </div>
              <p class="designation mb-0">
                {{ user.position }}
              </p>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserCard",
  props: {
    user: {
      type: Object,
    },
  },
}
</script>
