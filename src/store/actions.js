import * as types from './mutation-types'
import {setUserId } from '../assets/js/storage'

//设置网易云用户UID
export const setUid = ({commit}, uid)=> {
  commit(types.SET_UID, setUserId(uid));
}
//清空播放列表
export const clearPlayList = function({ commit }) {
  commit(types.SET_PLAYING, false);
  commit(types.SET_CURRENTINDEX, -1);
  commit(types.SET_PLAYLIST, []);
  commit(types.SET_ORDERLIST, []);
};
//删除正在播放列表中的歌曲
export const removerPlayListItem = function({commit, state}, {list, index}) {
  let currentIndex = state.currentIndex;
  //如果当前播放的歌曲是最后一个； 删除播放的歌曲之后，要播放他的上一首
  //如果删除的这一首在当前播放之前,那么当前播放的索引就要更新
  if(index < state.currentIndex || list.length === state.currentIndex) {
    currentIndex--;
    commit(types.SET_CURRENTINDEX, currentIndex)
  }
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_PLAYING, false)
  if(!list.length) {
    commit(types.SET_PLAYING, false)
  }else {
    commit(types.SET_PLAYING, true)
  }
}
//设置播放列表
export const setPlaylist = function({ commit }, { list }) {
  console.log('setPlaylist')
  commit(types.SET_PLAYLIST, list);
  commit(types.SET_ORDERLIST, list);
  console.log(list)
};
//设置播放模式
export const setPlayMode = function({commit}, mode) {
  commit(types.SET_PLAYMODE, mode);
}
