<template>
    <div>
        <h1>欢迎用户{{name}}使用云平台管理系统</h1>
    </div>
</template>

<script>
export default {
  name: "index",
  // data: ()=>{
  //   return {
  //     name: '',//this.$store.state.user.name
  //   }
  // },
  computed:{
    name(){
      return this.$store.state.user.name;
    }
  },
  created() {
    console.log(this.$store.state.user.name)
  }
}
</script>

<style scoped>

</style>