<template>
  <div class="form-container">
      <form action="" class="login">
          <p class="login-register">
              No account ? =>
              <router-link class="router-link" :to="{ name:'Signup' }">Go to Signup</router-link>
          </p>
          <h2>Login to Groupomania imagebord</h2>
          <div class="inputs">
              <div class="input">
                  <input type="text" placeholder="Email" v-model="email">
              </div>
              <div class="input">
                  <input type="password" placeholder="Password" v-model="password">
              </div>
          </div>
          <input class="login-btn btn" type="submit" value="Login" />
      </form>
  </div>
</template>

<script>
export default {
    name: "Login",

    data() {
        return {
            email: null,
            password: null,
        }
    }
};

</script>

<style lang="scss" scoped>

</style>