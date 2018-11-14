<template>
  <!--进度条拖动-->
  <div class="mmProgress" ref="mmProgress" @click="barClick">
    <div class="mmProgress-bar"></div>
    <div class="mmProgress-outer" ref="mmPercentProgress"></div>
    <div class="mmProgress-inner" ref="mmProgressInner">
      <div class="mmProgress-dot" @mousedown="barDown" @touchstart.prevent="barDown"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const dotWidth = 10;
  export default {
    name: 'mmProgress',
    data () {
      return {
        move: {
          status: false, //是否可以拖动； 在不播放的时候不可以拖动
          startX: 0,// 记录最开始点击的X坐标
          left: 0, // 记录当前已经移动的距离
        }
      }
    },
    props: {
      percent: {// 进度值
        type: [Number],
        default: 0
      },
      percentProgress: {// 进度值（缓冲用）
        type: [Number],
        default: 0
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.bindEvents();
        const barWidth = this.$refs.mmProgress.clientWidth - dotWidth;
        const offsetWidth = this.percent * barWidth;
        this.moveSlide(offsetWidth);
      })
    },
    methods: {
      bindEvents() {
        document.addEventListener('mousemove', this.barMove);
        document.addEventListener('mouseup', this.barUp);

        document.addEventListener('touchmove', this.barMove);
        document.addEventListener('touchend', this.barUp);
      },
      unbindEvents() {
        document.removeEventListener('mousemove', this.barMove);
        document.removeEventListener('mouseup', this.barUp);

        document.removeEventListener('touchmove', this.barMove);
        document.removeEventListener('touchend', this.barUp);
      },
      barClick(e) {
        console.log('click')
        let rect = this.$refs.mmProgress.getBoundingClientRect();
        let offsetWidth = Math.min(this.$refs.mmProgress.clientWidth - dotWidth, Math.max(0, e.clientX - rect.left)); //点击位置  e.clientX;   offsetWidth = contentWidth + padding + borderWidth + 滚动条Width
        this.moveSlide(offsetWidth);
        this.commitPercent();
      },
      barDown(e) { // 鼠标按下事件
        this.move.status = true;
        this.move.startX = e.clientX || e.touches[0].pageX;
        this.move.left = this.$refs.mmProgressInner.clientWidth;
      },
      barMove(e) {// 鼠标移动事件
        //鼠标移动的时候，要实时改变mmProgressInner的宽度
        //e.clientX - this.move.startX + this.$refs.mmProgressInner.clientWidth; 移动的距离 + 原来mmProgressInner的宽度
        if(!this.move.status) {
          return false;
        }
        let endX = e.clientX || e.touches[0].pageX;
        let dist = endX - this.move.startX;
        let offsetWidth = Math.min(this.$refs.mmProgress.clientWidth - dotWidth, Math.max(0, this.move.left + dist));
        console.log(offsetWidth)
        this.moveSlide(offsetWidth);
        this.commitPercent();
      },
      barUp(e) {// 鼠标 释放事件
        e.stopPropagation();
        this.move.status = false;
      },
      moveSlide(offsetWidth){// 移动滑块
        this.$refs.mmProgressInner.style.width = `${offsetWidth}px`;
      },
      commitPercent(){// 修改percent
        let lineWidth = this.$refs.mmProgress.clientWidth - dotWidth;
        let percent = this.$refs.mmProgressInner.clientWidth / lineWidth;
        this.$emit('percentChange', percent);
      }
    },
    watch: {
      percent(newPercent) {
        if(newPercent >= 0 && !this.move.status) {
          const barWidth = this.$refs.mmProgress.clientWidth - dotWidth;
          const offsetWidth = newPercent * barWidth;
          this.moveSlide(offsetWidth);
        }
      },
      percentProgress(newValue){
        let offsetWidth = this.$refs.mmProgress.clientWidth * newValue;
        this.$refs.mmPercentProgress.style.width = `${offsetWidth}px`;
      }
    },
    beforeDestroy () {
      this.unbindEvents();
    },
    components: {}
  }
</script>
<style rel="stylesheet" lang="stylus">
  @import '~assets/css/var'
  .mmProgress
    position relative
    padding 5px
    user-select none
    cursor pointer
    overflow hidden
    .mmProgress-bar
      height 2px
      width: 100%
      background-color: bar_color
    .mmProgress-outer
      position absolute
      top 50%
      left 5px
      width: 0
      height: 2px
      margin-top -1px
      background-color: rgba(255, 255, 255, .2)
    .mmProgress-inner
      position absolute
      top 50%
      left 5px
      width: 0
      height: 2px
      margin-top -1px
      background-color: line_color
      .mmProgress-dot
        position absolute
        top 50%
        right -5px
        width 10px
        height 10px
        border-radius 50%
        background-color: dot_color
        transform translateY(-50%)
</style>
