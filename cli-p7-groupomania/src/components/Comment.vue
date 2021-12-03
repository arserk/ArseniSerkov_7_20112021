<template>
    <div class="comment">
        <p>{{ comment.comment }}</p>
    </div>
</template>

<script>
    export default {
        name: "Comment",
        props: {
            comment: Object
        }
    }
</script>

<style lang="scss" scoped>
    .comment {
        background: whitesmoke;
        margin: 2px;
        padding: 10px 20px;
    }
</style>