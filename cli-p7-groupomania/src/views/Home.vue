<template>
  <div class="home">
    <AddPost v-show="showAddPost" @add-post="addPost"/>
    <Posts :posts="posts" />
  </div>
</template>

<script>
// @ is an alias to /src
import Posts from '../components/Posts'
import AddPost from '../components/AddPost'

export default {
  name: 'Home',
  props: {
    showAddPost: Boolean,
  },
  components: {
    Posts,
    AddPost,
  },
  data() {
    return {
      posts: []
    }
  },
  methods : {
    //example of call without axios
    /*async addPost(post) {
      //const temp = { post: JSON.stringify(post) };
      //console.log("temp =",temp);
      const res = await fetch('api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(post),
      })
      const data = await res.json()

      return data
    },*/
    addPost(newPost) {
      let formData = new FormData();
      for (let key in newPost) {
        formData.append(key, newPost[key]);
      }
      this.$http.post('api/post', formData)
      .then((res) => {
        alert(res.data.message);
        }
      )
      .catch((err) => console.log(err));
    },
    
    async fetchPost(id) {
      const res = await this.$http.get(`api/post/${id}`)
      const data = await res.data;

      return data
    },
  },
  
  async created() {
    this.$http.get('api/post')
    .then((res) => {
      this.posts = res.data;
    })
    .catch((err) => console.log(err));
  },
}
</script>