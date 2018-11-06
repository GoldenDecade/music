<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
  //  首次加载完成移除动画
    if(document.querySelector('#appLoading')) {
      document.querySelector('#appLoading').classList.add('removeAnimate');
      setTimeout(()=> {
        document.body.removeChild(document.getElementById('appLoading'));
        let version = getVersion(), newVersion = pkg.version;
      }, 500)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
