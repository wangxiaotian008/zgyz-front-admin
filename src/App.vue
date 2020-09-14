<template>
  <div id="app">
      <!--为了加深项目层级，App.vue 只是作为一个存放组件的容器，其中 <router-view> 是用来渲染通过路由映射过来的组件，当路径更改时，<router-view> 中的内容也会发生更改。
      例如，如果访问的是login.vue那么router-view就会被渲染为login.vue-->
    <router-view/>
  </div>
</template>

<script>

</script>