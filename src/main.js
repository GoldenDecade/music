// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import mmToast from 'base/mm-toast'
//toast 插件
Vue.use(mmToast);
Vue.config.productionTip = false
import '@/assets/css/index.styl'


// 版权信息
const pkg = require('../package.json');
window.mmPlayer = window.mmplayer = `欢迎使用 mmPlayer!
当前版本为：V${pkg.version}
作者：GoldenDecade
Github：https://github.com/GoldenDecade/music
歌曲来源于网易云音乐 (http://music.163.com)`;
console.info(`%c${mmPlayer}`, `color:blue`);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
