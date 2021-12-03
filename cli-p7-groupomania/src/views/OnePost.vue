<template>
    <div class="post">
        <Post @delete-post="deletePost" :post="post"/>
        <AddComment @add-comment="addComment" />
        <Comments :comments="comments" />
    </div>
</template>

<script>
    import Post from '../components/Post.vue'
    import AddComment from '../components/AddComment.vue'
    import Comments from '../components/Comments.vue'
    import axios from 'axios'

    export default {
    name: 'OnePost',
    components: {
        Post,
        AddComment,
        Comments
    },
    data() {
        return {
            post: [],
            comments: []
        }
    },
    methods: {
        async addComment(comment) {
            const res = await fetch('api/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comment),
            })
            const data = await res.json()
            console.log(data.message)
            location.reload()
        },
        async fetchComments() {
            const res = await fetch('api/comment')
            const data = await res.json()
            
            return data
        },
        async deletePost(id) {
            console.log("post to delete id=", id);
            if (confirm("Delete this post ?")) {
                const res = await fetch(`api/post/${id}`, {
                    method: 'DELETE',
                })
                const data = await res.json()
                if (res.status === 200) {
                    alert(data.message);
                    this.$router.push({ name: 'Home' });
                }
                else alert("Could not delete post")
            }
        }

    },
    async created() {
    axios.get(`api/post/` + this.$route.params.id)
    .then((res) => {
      this.post = res.data;
    })
    .catch((err) => err);
    
    const allComments = await this.fetchComments();
    this.comments = allComments.filter(comment => comment.postId === this.post.id);
    }
}
</script>