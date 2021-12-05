<template>
    <form @submit="onSubmit" class="add-comment" autocomplete="off">
    <div class="form-control">
      <label>Please leave a comment</label>
      <input type="text" v-model="comment" name="comment" placeholder="Comment" />
    </div>
    <input type="submit" value="Save Comment" class="btn btn-block" />
  </form>
</template>

<script>
  export default {
    name: 'AddComment',
    data () {
      return {
        comment: ''
      }
    },
    methods: {
      onSubmit() {
        //e.preventDefault()

        if(!this.comment) {
          alert('Add a comment, please !')
          return
        }
        const newComment = {
          comment: this.comment,
          userId: 1,
          postId: this.$route.params.id
        }

        this.$emit('add-comment', newComment)

        this.comment = ''
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
      width: 97%;
      height: 40px;
      margin: 5px;
      padding: 3px 7px;
      font-size: 17px;
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
.btn {
  background-color: white;
  color: black;
  border: 1px solid black;
}
</style>