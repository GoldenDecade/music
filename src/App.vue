<template>
  <div id="app">
    <mm-header/>
    <router-view class="router-view" />
    <!--更新说明-->
    <m-Dialog ref="versionDialog"
               :dialogType="1"
               headText="更新提示"
               :bodyText="versionBody"
    />
    <!--播放器-->
    <audio ref="mmPlayer"></audio>
  </div>
</template>

<script>
  const pkg = require('../package.json') // 引用package.json文件
  import {mapMutations,mapActions} from 'vuex'
  import {topList} from 'api'
  import {defaultSheetId} from 'assets/js/config'
  import {createTopList} from 'assets/js/song'
  import mDialog from 'base/mm-dialog/mm-dialog'
  import mmHeader from 'components/mm-header/mm-header'
  import {getVersion, setVersion} from 'assets/js/storage'

  export default {
    name: 'App',
    components: {mDialog, mmHeader },
    created () {
      //设置audio元素
      //nextTick 将回调延迟到下次DOM更新循环之后执行。在修改数据之后立即使用它，然后等待DOM更新。
      //vue观察到数据变化并不是直接更新DOM，而是开启一个队列，并缓冲在同一个事件循环中发生的所有数据改变，在缓冲时会去除重复的数据，从而避免不必要的计算和DOM操作。
      this.$nextTick(()=> {
        this.setAudioele(this.$refs.mmPlayer);
      })
      //获取正在播放列表
      topList(defaultSheetId)
        .then(res=> {
          if(res.status === 200) {
            let list = this._formatSongs(res.data.playlist.tracks.slice(0, 100));
            this.setPlaylist({list});// 设置第一个playlist
          }
        })

      //设置title
      let OriginTitle = document.title, titleTime;
      document.addEventListener('visibilitychange', ()=> {
        if(document.hidden) {
          document.title = '死鬼去哪里了！';
          clearTimeout(titleTime);
        }else {
          document.title = '(つェ⊂)咦!又好了!';
          titleTime = setTimeout(()=> {
            document.title = OriginTitle;
          }, 500)
        }
      })
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
    methods: {
      _formatSongs(list) {
        let ret = [];
        list.forEach(item => {
          const musicData = item;
          if(musicData.id) {
            ret.push(createTopList(musicData));
          }
        })
        return ret;
      },
      ...mapMutations({
        setAudioele: 'SET_AUDIOELE'
      }),
      ...mapActions([
        'setPlaylist'
      ])
    }
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

