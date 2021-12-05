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
        margin: auto;
        padding: 0 30px;
        background-color: #fff;
        color: #404040;
        border: 1px solid transparent;
        border-top: solid 1px #dddddd;
        font-size: 17px;
}
</style>