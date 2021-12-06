<template>
  <div class="form-container">
      <form action="" class="signup">
          <p class="login-register">
              Already have an account ? =>
              <router-link class="router-link" :to="{ name:'Login' }">Go to Login</router-link>
          </p>
          <h2>Signup to Groupomania imagebord</h2>
          <div class="inputs">
              <div class="input">
                  <input type="text" placeholder="Username" v-model="username">
              </div>
              <div class="input">
                  <input type="text" placeholder="First and Last Name" v-model="fullName">
              </div>
              <div class="input">
                  <input type="text" placeholder="Email" v-model="email">
              </div>
              <div class="input">
                  <input type="password" placeholder="Password" v-model="password">
              </div>
              <div v-show="error" class="error">{{ this.errorMsg }}</div>
          </div>
          <input @click="signup" class="login-btn btn" type="submit" value="Sign Up" />
      </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "Signup",

    data() {
        return {
            username: "",
            fullName: "",
            email: "",
            password: "",
            error: null,
            errorMsg: ""
        };
    },
    methods: {
        signup() {
            if (
                this.email !== "" &&
                this.password !== "" &&
                this.userName !== ""
            ) {
                this.error = false;
                this.errorMsg = "";
                const newUser = {
                    username: this.username,
                    fullName: this.fullName,
                    email: this.email,
                    password: this.password
                };
                axios.post('api/user/signup', newUser)
                .then((res) => {
                    alert(res.data.message);
                    this.$router.push({ name: 'Home' });
                })
                .catch((err) => { 
                    console.log(err);
                    this.error = true;
                    this.errorMsg = "Username or mail already taken"
                });
                return;
            }
            this.error = true;
            this.errorMsg = "Please fill the required fields"
            return;
        }
    }
};
</script>

<style lang="scss" scoped>

</style>