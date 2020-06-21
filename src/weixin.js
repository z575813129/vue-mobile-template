/**
 * Created by zack on 2016/11/17.
 */
// 此模块需要在index.html中先引入http://res.wx.qq.com/open/js/jweixin-1.0.0.js

import api from './api'

let wx = window.wx

const setAuth = () => {
  return new Promise((resolve, reject) => {
    if (typeof (wx) !== 'undefined') {
      wx.ready(function () {
        resolve()
      })
      api.fetch_weixin_auth().then((r) => {
        let res = r.data
        if (res.code === 200) {
          let data = res.data
          wx.config({
            debug: false,
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
          })
        } else {
          console.error(res)
          reject('fetch weixin auth error ' + res.code)
        }
      })
    } else {
      console.error('wx is not defined')
      reject('wx is not defined')
    }
  })
}

const setShare = (title, desc, link, imgUrl) => {
  return new Promise((resolve, reject) => {
    if (typeof (wx) !== 'undefined') {
      wx.onMenuShareTimeline({
        title: title,
        link: link,
        imgUrl: imgUrl,
        success: function () {
          resolve()
        },
        cancel: function () {
          reject('user cancel')
        }
      })
      wx.onMenuShareAppMessage({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        type: 'link',
        dataUrl: '',
        success: function () {
          resolve()
        },
        cancel: function () {
          reject('user cancel')
        }
      })
      wx.onMenuShareQQ({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        success: function () {
          resolve()
        },
        cancel: function () {
          reject('user cancel')
        }
      })
      wx.onMenuShareWeibo({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        success: function () {
          resolve()
        },
        cancel: function () {
          reject('user cancel')
        }
      })
      wx.onMenuShareQZone({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        success: function () {
          resolve()
        },
        cancel: function () {
          reject('user cancel')
        }
      })
    } else {
      console.error('wx is not defined')
      reject('wx is not defined')
    }
  })
}

export default {
  setAuth, setShare
}
