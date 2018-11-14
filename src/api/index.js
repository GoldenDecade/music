import axios from 'axios'
import {URL, defaultLimit} from 'assets/js/config'

//获取用户歌单详情
export function getUserPlaylist(uid) {
  const url = `${URL}/user/playlist`;
  return axios.get(url, {
    params: {
      uid
    }
  })
}

//获取音乐地址
export function getMusicUrl(id) {
  const url = `${URL}/music/url`;
  return axios.get(url, {
    params: {
      id
    }
  })
}

//排行榜详情
export function topList(idx) {
  const url = `${URL}/top/list`;
  return axios.get(url, {
    params: {
      idx
    }
  })
}

//获取歌词
export function getLyric(id) {
  const url = `${URL}/lyric`;
  return axios.get(url, {
    params: {
      id
    }
  })
}
