import { getUserId, getMode } from 'assets/js/storage'
import {playMode} from 'assets/js/config';
const state = {
  uid: getUserId() || null, // 网易云用户UID
  audioEle: null, //audio元素
  playing: false, // 播放状态
  playlist: [], // 播放列表
  currentIndex: -1,//当前音乐索引
  orderList: [], // 顺序列表
  mode: Number(getMode()) || playMode.listLoop, // 播放模式， 默认列表循环
}

export default state;
