<template>
  <div id="nav">
    <Header
      v-if="loggedIn"
      @toggle-add-post="toggleAddPost"
      title="Groupomania"
      :showAddPost="showAddPost"
    />
    <router-view :showAddPost="showAddPost"/>
    <Footer v-if="loggedIn"/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      showAddPost: false,
      loggedIn: null,
    }
  },
  methods: {
    toggleAddPost() {
      this.showAddPost = !this.showAddPost
    },
    checkRoute() {
      if (this.$route.name === 'Login' || this.$route.name === 'Signup') {
        this.loggedIn = false;
        return;
      }
      this.loggedIn = true;
    }
  },
  created() {
    this.checkRoute();
  },
  watch: {
    $route() {
      this.checkRoute();
    }
  }
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    }
}


/*
.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}
*/
.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
    &:active {
      filter: invert(1);
    }
}
.btn-block {
  display: block;
  width: 100%;
}

.error {
  text-align: center;
  color: red;
}

// Login / Signup pages styles
.form-container {
        overflow: hidden;
        display: flex;
        justify-content: center;
        text-align: center;
        height: 90vh;
        margin: 0 auto;
    .login-register {
        margin-bottom: 50px;
        font-size: small;
        .router-link {
            text-decoration: none;
            &:hover {
                text-decoration: underline;
                }
            }
        }
    form {
        padding: 0 10px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        @media(min-width: 900px) {
            padding: 0 50px;
        }
    }
    h2 {
        margin-bottom: 40px;
        @media(min-width: 900px) {
           font-size: 40px;
        }
    }
    .inputs {
        margin-bottom: 25px;
        input {
        width: 100%;
        border: none;
        background-color: #f2f2f2;
        height: 25px;
        margin: 8px;
        }
    }
}

</style>
