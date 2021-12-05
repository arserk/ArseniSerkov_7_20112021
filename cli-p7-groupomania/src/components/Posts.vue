<template>
<div>
    <div class="posts" :key="post.id" v-for="post in posts">
        <h3>{{ post.title }}</h3>
        <div class="image-crop">
            <img :src="post.mediaURL" alt="" />
        </div>
        <div class="posts__text">
            <p>{{ post.text }}</p>
        </div>
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
        display: flex;
        flex-direction: column;
        background: #f4f4f4;
        margin: 5px;
        padding: 10px 20px;
        max-height: 450px;
        text-align: center;
        border: solid 1px #404040;
        border-radius: 20px;
        &__text {
            overflow: hidden;
        }
        h3 {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
    .image-crop {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        img {
            max-width: 100%;
            height: auto;
        }
    }
</style>