<template>
  <header>
    <router-link to='/' class="image-container">
    <img src="@/assets/logos/icon-left-font-monochrome-black.svg" alt="icon groupomania left front black" />
    </router-link>
    <Button
      v-show="homePage"
      @btn-click="$emit('toggle-add-post')"
      :text="showAddPost ? 'Close' : 'Add Post'"
      :color="showAddPost ? 'red' : 'green'"
    />
  </header>
</template>

<script>
import Button from './Button'
export default {
  name: 'Header',
  props: {
    title: String,
    showAddPost: Boolean,
  },
  components: {
    Button,
  },
  computed: {
    homePage() {
      if (this.$route.path === '/') {
        return true
      } else {
        return false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  .image-container {
    position: relative;
    left: -2%;
   }
  img {
      object-fit: cover;
      max-width: 100%;
  }
}
</style>