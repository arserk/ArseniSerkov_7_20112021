<template>
  <div class="home">
    <AddPost v-show="showAddPost" @add-post="addPost"/>
    <Posts :posts="posts" />
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
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
    addPost(post) {
      let myFormData = {
      post: JSON.stringify(post),
      };

      let formData = new FormData();
      for (let key in myFormData) {
        formData.append(key, myFormData[key]);
      }
      axios.post('api/post', formData)
      .then((res) => {
        alert(res.data.message);
        }
      )
      .catch((err) => console.log(err));
    },
    
    async fetchPost(id) {
      const res = await fetch(`api/post/${id}`)
      const data = await res.json()

      return data
    },
  },
  
  async created() {
    axios.get('api/post')
    .then((res) => {
      this.posts = res.data;
    })
  }
}
</script>