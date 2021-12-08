<template>
  <div>
      <h2>{{ userInfo.username }}'s Info</h2>
      <p>Hello {{ userInfo.fullName }} </p>
      <p>Your registered email is : {{ userInfo.email }}</p>
      <button @click="deleteUser(null)" class="btn delete-btn">Delete Account</button>
  </div>
</template>

<script>
//import axios from 'axios'

export default {
    name: "UserInfo",

    data() {
        return {
            userInfo: [],
        }
    },
    methods: {
        async getUserInfo() {
            const res = await fetch(`api/user/${this.$route.params.id}`)
            const data = await res.json()
            
            return data
        },
        async deleteUser(id) {
            console.log("user to delete id=", id);
            if (confirm("Are you sur you want to delete your account")) {
                const res = await fetch(`api/user/${id}`, {
                    method: 'DELETE',
                })
                const data = await res.json()
                if (res.status === 200) {
                    alert(data.message);
                    this.$router.push({ name: 'Signup' });
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
</style>