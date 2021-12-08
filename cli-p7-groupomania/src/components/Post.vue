<template>
    <div>
        <router-link class="back-arrow" to="/"> &larr; Back to Posts &larr;</router-link>
        <div class="post">
            <p class="post__user">posted by {{ post.username }}</p>
            <h3>
                {{ post.title }}
                <button v-show="isCreator" class="btn" @click="$emit('delete-post', post.id)">Delete Post</button>
            </h3>
            <div class="image-crop">
                <img :src="post.mediaURL" alt="" />
            </div>
            <p>{{ post.text }}</p>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Post',
    props: {
        post: Object,
    },
    computed: {
        isCreator() {
            if ((JSON.parse(localStorage.getItem('userInfo')).isAdmin == true) ||
             (JSON.parse(localStorage.getItem('userInfo')).userId === this.post.userId)) {
                 return true
             }
            else return false
        }
    }
}
</script>

<style lang="scss" scoped>
    .back-arrow {
        display: flex;
        justify-content: flex-start;
        font-size: large;
        margin-left: 10px;
        &:hover {
            transform: scale(1.1);
            transform-origin: center left;
        }
    }
    .post {
        background: #f4f4f4;
        margin: 5px;
        padding: 10px 20px;
        border: solid 1px black;
        border-radius: 10px;
        &__user {
            font-style: italic;
            margin: 0;
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
        img {
            max-width: 100%;
            height: auto;
        }
    }
</style>