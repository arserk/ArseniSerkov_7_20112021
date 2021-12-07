<template>
  <header>
    <div class="nav">
      <router-link to='/' class="image-container">
        <img src="@/assets/logos/icon-left-font-monochrome-black.svg" alt="icon groupomania left front black" />
      </router-link>
      <div class="nav__user-controls">
        <router-link class="router-link" to='/'>{{ username }}</router-link>
        <p>&nbsp;/&nbsp;</p>
        <div class="logout" @click="logout">Logout</div>
      </div>
    </div>
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
  data() {
    return {
      username: JSON.parse(localStorage.getItem('userInfo')).username
    }
  },
  computed: {
    homePage() {
      if (this.$route.path === '/') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    logout() {
      console.log("Need to log out !");
      this.$router.push({ name: 'Login' });
      return;
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}
.nav {
  display: flex;
  justify-content: space-between;
  width: 80%;
  &__user-controls {
    display: flex;
    align-items: center;
  }
};
.image-container {
  position: relative;
  left: -2%;
  width: 50%;
  img {
    object-fit: cover;
    width: 100%;
  }
}
.router-link, .logout {
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
  &:active {
    color: blue;
  }
}

</style>