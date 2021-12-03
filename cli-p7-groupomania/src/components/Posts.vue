<template>
<div>
    <div class="posts" :key="post.id" v-for="post in posts">
        <h3>{{ post.title }}</h3>
        <p>{{ post.text }}</p>
        <router-link :to="'/post/' + post.id">See Post & comments</router-link>
    </div>
</div>
</template>

<script>

export default {
    name: 'Posts',
    props: {
        posts: Array
    }
}
</script>

<style lang="scss" scoped>
    .posts {
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