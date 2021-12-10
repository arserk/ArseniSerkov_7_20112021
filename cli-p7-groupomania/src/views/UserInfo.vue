<template>
  <div>
      <router-link class="back-arrow" to="/"> &larr; Back to Posts &larr;</router-link>
      <h2>{{ userInfo.username }}'s Info</h2>
      <p>Hello {{ userInfo.fullName }} </p>
      <p>Your registered email is : {{ userInfo.email }}</p>
      <button v-show="isCreator" @click="deleteUser(userInfo.id)" class="btn delete-btn">Delete Account</button>
  </div>
</template>

<script>

export default {
    name: "UserInfo",

    data() {
        return {
            userInfo: [],
        }
    },
    computed: {
        isCreator() { //verifies if the user is allowed to see parts of the page
            if ((JSON.parse(localStorage.getItem('userInfo')).isAdmin == true) ||
             (JSON.parse(localStorage.getItem('userInfo')).userId === this.userInfo.id)) {
                 return true
             }
            else return false
        }
    },
    methods: {
        async getUserInfo() {
            const res = await this.$http.get(`api/user/${this.$route.params.id}`)
            const data = await res.data;
            
            return data
        },
        async deleteUser(id) {
            //console.log("user to delete id=", id);
            if (confirm("Are you sur you want to delete your account ?")) {
                const res = await this.$http.delete(`api/user/${id}`)
                const data = await res.data;
                if (res.status === 200) {
                    alert(data.message);
                    localStorage.removeItem('user-token');
                    localStorage.removeItem('userInfo');
                    this.$router.replace({ name: 'Signup' });
                }
                else alert("Could not delete account")
            }
        },
    },
    async created() {
        this.userInfo = await this.getUserInfo();
    }
}
</script>

<style lang="scss" scoped>
    .delete-btn {
        background-color: red;
        border: 3px solid rgb(179, 0, 0);
    }
    .back-arrow {
        display: flex;
        justify-content: flex-start;
        font-size: large;
        margin-left: 10px;
        &:hover {
            transform: scale(1.1);
            transform-origin: center left;
        }
    }
</style>