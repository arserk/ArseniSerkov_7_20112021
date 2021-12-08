<template>
    <div class="comment">
        <h4>{{ user }} :</h4>
        <p>{{ comment.comment }}</p>
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
    methods: {
        async getCommentUser(userId) {
            const res = await this.$http.get(`api/user/${userId}`);
            return await res.data.username;
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
}
h4 {
    font-weight: normal;
    font-style: italic;
    color: #404040ce;
}
</style>