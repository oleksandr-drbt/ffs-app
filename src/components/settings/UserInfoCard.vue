<template>
  <div class="card view-user bottom-margin">
    <div class="card-avatar">
      <img :src="user.avatarUrl" onerror="this.src = '/img/default.png'">
    </div>
    <div class="card-body text-center">
      <select-avatar-form/>
      <h4 class="card-title mt-3 mb-1">{{ user.first_name }} {{ user.last_name }}</h4>
      <h6 class="role mb-2">{{ user.role }}</h6>
      <div class="card-description my-3">
        <span v-for="{ name, id } in user.skills" :key="id" class="tag-skills">
          {{ name }}
        </span>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p v-if="user.phone"><strong>Phone:</strong> {{ user.phone }}</p>
        <p v-if="user.position"><strong>Position:</strong> {{ user.position }}</p>
      </div>
      <p class="card-about mx-3">{{ user.description }}</p>
    </div>
  </div>
</template>

<script>
import SelectAvatarForm from "./SelectAvatarForm";

export default {
  name: "UserInfoCard",
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
  },
  components: { SelectAvatarForm },
}
</script>
