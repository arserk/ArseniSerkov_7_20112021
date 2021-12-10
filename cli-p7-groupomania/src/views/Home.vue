<template>
  <div class="home">
    <AddPost v-show="showAddPost" @add-post="addPost"/>
    <h1>Imageboard</h1>
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
    addPost(newPost) {
      let formData = new FormData();
      for (let key in newPost) {
        formData.append(key, newPost[key]);
      }
      //if glogal header connection issues in main.js, implement individual headers :
      //const token = localStorage.getItem('user-token');
      this.$http.post('api/post', formData, 
      /*{ headers: { 
      'Authorization': `Bearer ${token}` }
      }*/
      )
      .then((res) => {
        alert(res.data.message);
        this.$router.go();
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