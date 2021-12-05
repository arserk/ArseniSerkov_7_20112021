<template>
  <form @submit="onSubmit" class="add-form" autocomplete="off">
    <div class="form-control">
      <label>Title</label>
      <input type="text" v-model="title" name="post-title" placeholder="Title" />
    </div>
    <div class="form-control">
      <label>Your post</label>
      <textarea v-model="text" name="post-text" rows="4"></textarea>
    </div>
    <div class="form-control form-control__file">
      <label>Put Image Here => </label>
      <input type="file" @change="handleFileUpload( $event )" name="post-image" accept="image/png,image/jpeg"/>
    </div>
    <input class="submit-btn btn" type="submit" value="Save Post" />
  </form>
</template>

<script>
  export default {
    name: 'AddPost',
    data () {
      return {
        title: '',
        text: '',
        image: ''
      }
    },
    methods: {
      onSubmit(e) {
        e.preventDefault()

        if (!this.title) {
          alert('You must add a title to your post')
          return
        }
        if(!this.text || !this.image) {
          alert('Write a post, or add an image, please !')
          return
        }

        const postData = {
            title: this.title,
            text: this.text,
            username: "Serk",
            userId: 1,
        };

        let newPost = {
          post: JSON.stringify(postData),
          image: this.image
        };
        //console.log("newPost", newPost);

        this.$emit('add-post', newPost)

        this.title = '',
        this.text = ''
      },
      handleFileUpload(event) {
        this.image = event.target.files[0];
      }
    }
  }
</script>

<style lang="scss" scoped>
.add-form {
  margin-bottom: 40px;
}
.form-control {
  margin: 20px 0;
    label {
      display: block;
    }
    input {
      width: 95%;
      height: 40px;
      margin: 5px;
      padding: 3px 7px;
      font-size: 17px;
    }
    textarea {
      width: 95%;
      height: 70px;
      margin: 5px;
      padding: 3px 7px;
      font-size: 15px;
    }
  &__file {
  display: flex;
  align-items: center;
  justify-content: space-between;
    label {
    flex: 1;
    }
    input {
    flex: 2;
    height: 25px;
    }
  }
}
.submit-btn {
  position: relative;
  left: auto;
  background-color: blue;
}
</style>