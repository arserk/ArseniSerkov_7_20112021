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
        /* //add comment without axios, example
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
        },*/
        async fetchComments() {
            const res = await this.$http.get('api/comment');
            return await res.data;
        },
        addComment(comment) {
            this.$http.post('api/comment', comment)
            .then((res) => {
                alert(res.data.message);
                location.reload();
                }
            )
            .catch((err) => console.log(err));
        },
        async deletePost(id) {
            console.log("post to delete id=", id);
            if (confirm("Delete this post ?")) {
                const res = await this.$http.delete(`api/post/${id}`)
                const data = await res.data;
                if (res.status === 200) {
                    alert(data.message);
                    this.$router.push({ name: 'Home' });
                }
                else alert("Could not delete post")
            }
        }
    },
    async created() {
        //gets correct post
        this.$http.get(`api/post/` + this.$route.params.id)
        .then((res) => {
        this.post = res.data;
        })
        .catch((err) => err);

        //gets comments for the corresponding post
        const allComments = await this.fetchComments();
        this.comments = allComments.filter(comment => comment.postId === this.post.id);
    }
}
</script>