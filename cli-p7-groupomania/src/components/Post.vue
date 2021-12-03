<template>
    <div>
        <div class="post">
            <h3>
                {{ post.title }}
                <button @click="$emit('delete-post', post.id)">Delete Post</button>
            </h3>
            <p>{{ post.text }}</p>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Post',
    props: {
        post: Object,
    }
}
</script>

<style lang="scss" scoped>
    .post {
        background: beige;
        margin: 5px;
        padding: 10px 20px;
        h3 {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
</style>