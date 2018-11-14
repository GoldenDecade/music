<template>
  <div class="playList">
    <music-list
      :list="playlist"
      :listType="1"
      @select="selectItem"
      @del="deleteItem"
    >
      <div slot="listBtn" class="list-btn">
        <span @click="$refs.dialog.show()">清空列表</span>
      </div>
    </music-list>
    <mm-dialog ref="dialog"
               @confirm="clearList"
               bodyText="是否清空正在播放列表"
               confirmBtnText="清空"/>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import MusicList from 'components/music-list/music-list'
  import MmDialog from 'base/mm-dialog/mm-dialog'
  export default {
    name: 'play-list',
    data () {
      return {

      }
    },
    computed: {
      ...mapGetters([
        'playing',
        'playlist',
        'currentMusic',
        'audioEle'
      ])
    },
    methods: {
      clearList() {//清空列表事件
        this.clearPlayList();
        this.$mmToast('列表清空成功');
      },
      selectItem(item, index) {
        if(item.id === this.currentMusic.id && !this.playing) {
          this.setPlaying(true);
        }else {
          this.setCurrentIndex(index);
          this.setPlaying(true);
        }
      },
      deleteItem(index) {// 删除事件
        let list = [...this.playlist];
        list.splice(index, 1);
        this.removerPlayListItem({list, index});
        this.$mmToast('删除成功');
      },
      ...mapMutations({
        setPlaying: 'SET_PLAYING',
        setCurrentIndex: 'SET_CURRENTINDEX'
      }),
      ...mapActions([
        'removerPlayListItem',
        'clearPlayList'
      ])

    },
    mounted () {
    },
    beforeDestroy () {
    },
    components: {MusicList, MmDialog}
  }
</script>
<style rel="stylesheet" lang="stylus">
  @import "~assets/css/var";
  .playList
    position: relative
    width: 100%
    height: 100%
    .musicList
      width: 100%
      height: 100%
      .list-btn
        display: flex
        justify-content: center
        align-items: center
        height: 50px
        span
          padding: 5px 20px
          cursor: pointer
          user-select: none
          &:hover
            color: text_color_active
</style>
