<template>
  <transition name="toast-fade">
    <section v-show="visible" class="mm-toast" :class="positionClasses">{{message}}</section>
  </transition>
</template>

<script>
  export default {
    name: 'mm-toast',
    data() {
      return {
        position: 'center', // 默认 显示在中间
        message: '', //默认 文本
        duration: 1500, // 默认 1500ms
        visible: false, //默认  隐藏
      }
    },
    computed: {
      positionClass() {
        return 'mm-toast-' + this.position;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet">
  .mm-toast
    position: fixed
    left: 50%
    z-index: 1996
    max-width: 80%
    box-sizing: border-box
    border-radius: 5px
    padding: 10px 20px
    overflow: hidden
    text-align: center
    min-height: 40px
    line-height: 20px
    font-size: 14px
    color: #fff
    background: rgba(0, 0, 0, .5)
    user-select: none
    transform: translateX(-50%)
    &.mm-toast-top
        top: 10%
    &.mm-toast-center
      top: 50%
      margin-top: -20px
    &.mm-toast-bottom
      bottom: 10%
  .toast-fade-enter
    opacity 0
    transform translated3d(-50%, -10px, 0)
  .toast-fade-enter-active
    will-change transform
    transition all .2s
  .toast-fade-enter-to
    opacity 1
    transform translate3d(-50%, 0, 0)
</style>
