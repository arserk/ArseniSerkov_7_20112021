<template>
    <form @submit="onSubmit" class="add-form" autocomplete="off">
    <div class="form-control">
      <label>Title</label>
      <input type="text" v-model="title" name="post-title" placeholder="Title" />
    </div>
    <div class="form-control">
      <label>Your post</label>
      <textarea v-model="text" name="post-text" rows="4">
      </textarea>
    </div>
    <div class="form-control form-control__file">
      <label>Put Image Here => </label>
      <input type="file" name="post-image" />
    </div>

    <input type="submit" value="Save Post" class="btn btn-block" />
  </form>
</template>

<script>
  export default {
    name: 'AddPost',
    data () {
      return {
        title: '',
        text: ''
      }
    },
    methods: {
      onSubmit() {
        //e.preventDefault()

        if(!this.text) {
          alert('Add a post, please !')
          return
        }
        const newPost = {
          title: this.title,
          text: this.text,
          username: "Serk",
          userId: 1
        }

        this.$emit('add-post', newPost)

        this.title = '',
        this.text = ''
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
      width: 100%;
      height: 40px;
      margin: 5px;
      padding: 3px 7px;
      font-size: 17px;
    }
    textarea {
      width: 100%;
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
</style>