// hack for global nextTick
// https://www.imooc.com/article/21499
function noop() {

}
window.MessageChannel = noop;
window.setImmediate = noop;
