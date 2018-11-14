export let uid = state => state.uid;
//audio元素
export const audioEle = state => state.audioEle;
//播放状态
export const playing = state => state.playing;
//播放列表
export const playlist = state => state.playlist;
//当前音乐
export const currentMusic = state => state.playlist[state.currentIndex] || {};
//顺序列表
export const orderList = state => state.orderList;
//播放模式
export const mode = state => state.mode;
//当前音乐索引
export const currentIndex = state => state.currentIndex;
