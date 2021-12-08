<template>
<div>
    <div class="posts" :key="post.id" v-for="post in posts">
        <div class="posts__title">
            <h3>{{ post.title }}</h3>
            <div class="posts__title__postedby">Posted by <router-link :to="'/user/' + post.userId">{{ post.username }}</router-link></div>
        </div>
        <div class="image-crop">
            <img :src="post.mediaURL" alt="" />
        </div>
        <div class="posts__text">
            <p>{{ post.text }}</p>
        </div>
        <router-link :to="'/post/' + post.id">Click to see Post with comments</router-link>
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
        &__title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            &__postedby {
                font-style: italic;
            }
        }
        &__text {
            overflow: hidden;
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