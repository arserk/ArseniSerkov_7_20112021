<template>
  <div class="form-container">
      <form @submit="login" class="login">
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
            email: "",
            password: ""
        }
    },
    methods: {
        login(e) {
            e.preventDefault()
            
            if (this.email !== "" && this.password !== "") {
                const userLogin = {
                    email: this.email,
                    password: this.password
                }
                this.$http.post('api/user/login', userLogin)
                .then((res) => {
                    const token = res.data.token;
                    const userInfo = {
                        username: res.data.username,
                        fullName: res.data.fullName,
                        userId: res.data.userId,
                        isAdmin: res.data.isAdmin
                    };
                    localStorage.setItem('user-token', token);
                    localStorage.setItem('userInfo', JSON.stringify(userInfo));
                    this.$http.defaults.headers.common = {'Authorization':`Bearer ${token}`};
                    this.$router.push({ name: 'Home' });
                })
                .catch((err) => {
                    localStorage.removeItem('user-token');
                    localStorage.removeItem('userInfo');
                    console.log(err);
                    alert(err.response.data.error);
                })
            }
            else {
                alert("Please enter email and password");
                return;
            }
        }
    },
};

</script>

<style lang="scss" scoped>

</style>