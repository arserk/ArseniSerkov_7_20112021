<template>
<div class="comments">
    <div :key="comment.id" v-for="comment in comments">
        <Comment :comment="comment" />
    </div>
</div>
</template>

<script>
import Comment from './Comment.vue'

export default {
    name: 'Comments',
    props: {
        comments: Array
    },
    components: {
        Comment,
    }
}
</script>

<style lang="scss" scoped>
    .comments {
        margin-top: 10px;
    }
</style>