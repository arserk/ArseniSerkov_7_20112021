<template>
    <div class="comment">
        <h4>{{ user }} :</h4>
        <div class="comment__body">
            <p>{{ comment.comment }}</p>
            <div v-show="isCreator" @click="deleteComment(comment.id)" class="comment__body__trash-comment">
            <img src="@/assets/iconmonstr-trash-can-30.svg" alt="trash comment" class="comment__body__trash-comment--img">
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "Comment",
    props: {
        comment: Object
    },
    data() {
        return {
            user: Object,
        }
    },
    computed: {
        isCreator() { //verifies if the user is allowed to see parts of the page
            if ((JSON.parse(localStorage.getItem('userInfo')).isAdmin == true) ||
             (JSON.parse(localStorage.getItem('userInfo')).userId === this.comment.userId)) {
                 return true
             }
            else return false
        }
    },
    methods: {
        async getCommentUser(userId) {
            const res = await this.$http.get(`api/user/${userId}`);
            return await res.data.username;
        },
        async deleteComment(commentId) {
            if (confirm("delete comment ?")) {
                const res = await this.$http.delete(`api/comment/${commentId}`);
                const data = await res.data;
                if (res.status === 200) {
                    alert(data.message);
                    this.$router.go();
                }
                else alert("Could not delete comment")
            }
        }
    },
    async mounted() {
        const username = await this.getCommentUser(this.comment.userId);
        this.user = username;
    }
}
</script>

<style lang="scss" scoped>
.comment {
    margin: auto;
    padding: 0 30px;
    background-color: #fff;
    color: #404040;
    border: 1px solid transparent;
    border-top: solid 1px #dddddd;
    font-size: 17px;
    &__body {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &__trash-comment--img:active {
            background-color: red;
        }
    }
}
h4 {
    font-weight: normal;
    font-style: italic;
    color: #404040ce;
}
</style>