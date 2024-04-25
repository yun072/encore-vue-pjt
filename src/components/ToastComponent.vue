<template>
  <div class="alert toast-box" role="alert">
     A simple primary alert—check it out!
  </div>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            required: true
        }
    }

}
</script>

<style>
    .toast-box{
        position : fixed ;
        top: 10px;
        right: 10px;
    }
</style>