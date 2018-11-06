<template>
  <div id="app">
    <!--更新说明-->
    <m-Dialog ref="versionDialog"
               :dialogType="1"
               headText="更新提示"
               :bodyText="versionBody"
    />
    <router-view/>
  </div>
</template>

<script>
  const pkg = require('../package.json') // 引用package.json文件
  import mDialog from 'base/mm-dialog/mm-dialog'
  import {getVersion, setVersion} from 'assets/js/storage'

  export default {
    name: 'App',
    components: {mDialog },
    created () {
      /*首次加载完成移除动画~~*/
      if (document.querySelector('#appLoading')) {
        document.querySelector('#appLoading').classList.add('removeAnimate')
        setTimeout(() => {
          document.body.removeChild(document.getElementById('appLoading'))
          let version = getVersion(), newVersion = pkg.version
          console.log(`version: ${version}; newVersion: ${newVersion}`)
          if (version !== null) {
            setVersion(newVersion)
            if (version !== newVersion) {
              //  版本提示框
              this.$refs.versionDialog.show();
            }
          } else {
            setVersion(newVersion)
            //  版本提示框
            this.$refs.versionDialog.show();
          }
        }, 500)
      }
    },
    computed: {
      versionBody () {
        return `<div class="mm-dialog-text text-left">
版本号：${pkg.version}<br/>
1、 修复列表只有一首歌时的 BUG<br>
2、 去除无关请求操作<br>
3、 优化请求播放列表逻辑
</div>`
      }
    },
  }
</script>
<style rel="stylesheet" lang="stylus" >
  @import '~assets/css/var.styl'
  #app
    position: relative
    width: 100%
    height: 100%
    color: text_color
    font-size: font_size_medium
    .router-view
      width: 100%
      height: 100%
    audio
      position: fixed
</style>

