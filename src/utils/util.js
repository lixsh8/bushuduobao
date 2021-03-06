// import wx from 'wx';
import api from "@/utils/api";

function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return (
    [year, month, day].map(formatNumber).join("-") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
}

function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : "0" + n;
}

/**
 * json 转化为url参数
 * @param {json} data
 * @return {string} url
 */
function parseParams(data) {
  try {
    var tempArr = [];
    for (var i in data) {
      var key = encodeURIComponent(i);
      var value = encodeURIComponent(data[i]);
      tempArr.push(key + "=" + value);
    }
    var urlParamsStr = tempArr.join("&");
    return urlParamsStr;
  } catch (err) {
    return "";
  }
}

/**
 * 封封微信的的request
 */
function request(url, data = {}, method = "GET") {
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Authorization: "cjt " + wx.getStorageSync("token")
      },
      success: function(res) {
        // console.log('请求成功，url:', url);
        // console.log("请求参数，data:", JSON.stringify(res));
        if (res.statusCode === 200) {
          console.log(res.data);

          if (res.data.code === 401) {
            // 需要登录后才可以操作
            wx.removeStorageSync("code");
            wx.removeStorageSync("token");
            wx.removeStorageSync("register_code");
            console.log("即将调用login函数");
            wx.navigateTo({
              url: "/pages/login/main"
            });

            // let code = null;
            // return login()
            //   .then(res => {
            //     console.log("调用login函数回调1");
            //     code = res.code;
            //     return getUserInfo();
            //   })
            //   .then(userInfo => {
            //     // 登录远程服务器
            //     console.log("userInfo的回调");
            //     request(
            //       api.AuthLoginByWeixin,
            //       {
            //         code: code,
            //         userInfo: userInfo
            //       },
            //       "POST"
            //     )
            //       .then(res => {
            //         console.log("调用login函数回调2");
            //         if (res.code === 0) {
            //           // 存储用户信息
            //           console.log("重新登录后的token", res.data.token);

            //           wx.setStorageSync("userInfo", res.data.userInfo);
            //           wx.setStorageSync("token", res.data.token);
            //           resolve(res);
            //         } else {
            //           reject(res);
            //         }
            //       })
            //       .catch(err => {
            //         reject(err);
            //       });
            //   })
            //   .catch(err => {
            //     reject(err);
            //   });
          } else {
            resolve(res.data);
          }
        } else {
          reject(res.errMsg);
        }
      },
      fail: function(err) {
        wx.navigateTo({
          url: "/pages/page_error/main"
        });
        reject(err);
        console.log("请求失败，url", url);
        // console.log('请求参数，data:', data);
      }
    });
  });
}
// function request(url, data = {}, method = "GET", page, type) {
//   var isOne = true;
//   var cachFn = function() {
//     return new Promise(function(resolve, reject) {
//       wx.request({
//         url: url,
//         data: data,
//         method: method,
//         header: {
//           "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
//           Authorization: "cjt " + wx.getStorageSync("token")
//         },
//         success: function(res) {
//           // console.log('请求成功，url:', url);
//           // console.log('请求参数，data:', data);
//           if (res.statusCode === 200) {
//             if (res.data.errno === 401) {
//               // 需要登录后才可以操作
//               let code = null;
//               return login()
//                 .then(res => {
//                   code = res.code;
//                   return getUserInfo();
//                 })
//                 .then(userInfo => {
//                   // 登录远程服务器
//                   request(
//                     api.AuthLoginByWeixin,
//                     {
//                       code: code,
//                       userInfo: userInfo
//                     },
//                     "POST"
//                   )
//                     .then(res => {
//                       if (res.errno === 0) {
//                         // 存储用户信息
//                         wx.setStorageSync("userInfo", res.data.userInfo);
//                         wx.setStorageSync("token", res.data.token);
//                         resolve(res);
//                       } else {
//                         reject(res);
//                       }
//                     })
//                     .catch(err => {
//                       reject(err);
//                     });
//                 })
//                 .catch(err => {
//                   reject(err);
//                 });
//             } else {
//               resolve(res.data);
//             }
//           } else {
//             reject(res.errMsg);
//           }
//           if (!page.isNet) {
//             page.isNet = true;
//           }
//         },
//         fail: function(err) {
//           console.log("11");
//           reject(err);
//           if (!isOne) {
//             return;
//           }
//           page.isNet = false;
//           page.isRequested = false;
//           // 记录本次请求，加载时，执行page实例的reloadFn即可
//           // page.reloadFn = request(url, data, method, page, 1);
//           var requests = page.reloadFn;
//           console.log(page.reloadFn)
//           requests.push(request(url, data, method, page, 1));
//           page.reloadFn = requests
//           isOne = false;
//         }
//       });
//     });
//   };

//   if (type) {
//     page.isRequested = true;
//   }

//   return type ? cachFn : cachFn();
// }

/**
 * 检查微信会话是否过期
 */
function checkSession() {
  return new Promise(function(resolve, reject) {
    wx.checkSession({
      success: function() {
        resolve(true);
      },
      fail: function() {
        resolve(false);
      }
    });
  });
}
/**
 * 调用微信登录
 */
function login() {
  return new Promise(function(resolve, reject) {
    wx.login({
      success: function(res) {
        if (res.code) {
          console.log("login函数");

          // 登录远程服务器
          // request(api.Login, { code: res.code });
          // console.log('微信登陆成功', res)
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function(err) {
        reject(err);
      }
    });
  });
}
/**
 * 调用微信获取用户信息接口，需要button授权
 */
function getUserInfo() {
  return new Promise(function(resolve, reject) {
    // 查看button是否授权
    wx.getSetting({
      success: function(res) {
        console.log("getUserInfo函数");
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            withCredentials: true,
            success: function(res) {
              console.log("获取用户信息成功", res);
              resolve(res);
            },
            fail: function(err) {
              console.log("获取用户信息失败", err);
              reject(err);
            }
          });
        } else {
          // 没有授权
          console.log("但获取用户信息失败，未同意button授权");
        }
      }
    });
  });
}

function redirect(url) {
  // 判断页面是否需要登录
  // if (false) {
  //   wx.redirectTo({
  //     url: '/pages/auth/login/login'
  //   });
  //   return false;
  // } else {
  wx.redirectTo({
    url: url
  });
  // }
}

function showErrorToast(msg) {
  wx.showToast({
    title: msg,
    image: "/static/images/icon_error.png"
  });
}

/**
 * obj  request请求参数
 * cb   requrst请求成功回掉
 * page 当前page实例
 **/

function wxRequest(obj, cb, page, type) {
  var isOne = true;
  var cachFn = function() {
    wx.request({
      url: obj.url,
      data: obj.data || {},
      method: obj.method || "GET",
      success: function(res) {
        cb.call(page, res);
        if (!page.isNet) {
          page.isNet = true;
          // page.setData({
          //   isNet: true
          // });
        }
      },
      // fail执行时当断网处理
      fail: function() {
        // 防止fail 有时会执行两次，影响渲染
        if (!isOne) {
          return;
        }
        page.isNet = false;
        page.isRequested = false;
        // 记录本次请求，加载时，执行page实例的reloadFn即可
        // page.reloadFn = request(url, data, method, page, 1);
        var requests = page.reloadFn;
        // console.log(page.reloadFn)
        requests.push(request(obj, cb, page, 1));
        page.reloadFn = requests;
        isOne = false;
      }
    });
  };

  if (type) {
    page.isRequested = true;
  }

  return type ? cachFn : cachFn();
}

/**
 *
 * @param {String} title 分享标题
 * @param {String} image 分享图片
 * @param {String} link  分享跳转链接
 */
function getCommonShareData(title, image, link) {
  return {
    title: title,
    imageUrl: image,
    success: function(res) {
      // 转发成功之后的回调
      if (res.errMsg == "shareAppMessage:ok") {
        console.log("分享成功");
      } else {
        console.log("分享失败");
      }
    },
    fail: function() {
      console.log("分享失败");
    },
    path: link
  };
}

/**
 * 跳转
 * @param {event} e
 */
function jump(e, _this) {
  var url = e.currentTarget.dataset.link || e.currentTarget.dataset.url;
  var appid = e.currentTarget.dataset.appid;
  var id = e.currentTarget.dataset.id;
  var type = e.currentTarget.dataset.type;

  // 点击统计
  console.log(1111);
  
  clickLog("click", id);

  if (type === "address") {
    console.log("address");

    wx.getSetting({
      success(res) {
        if (!res.authSetting["scope.address"]) {
          wx.authorize({
            scope: "scope.address",
            success() {
              wx.chooseAddress({
                success(res) {},
                fail: function() {}
              });
            },
            fail() {
              console.log("系统自带的授权弹窗点了拒绝授权");
              // 自定义地址授权按钮弹窗
              _this.dialogTitle = "通讯地址授权失败，请重新授权";
              _this.dialogContent =
                "为了方便你管理收货地址，步数换商品申请获取你的通讯地址";
              _this.confirmText = "去授权";
              _this.cancelText = "取消";
              _this.singleBtn = false;
              _this.openType = "openSetting";
              _this.showDialog = true;
            }
          });
        } else {
          wx.chooseAddress({
            success(res) {},
            fail: function() {}
          });
        }
      }
    });
  } else if (appid) {
    console.log("跳转小程序");

    // 跳转小程序
    wx.navigateToMiniProgram({
      appId: appid,
      path: url,
      extraData: {
        id: id
      },
      envVersion: api.mienvVersion,
      success(res) {
        console.log("跳转成功");
        // 跳转小程序统计
        clickLog("jump", id)
      }
    });
  } else if (
    url.indexOf("/index") > 0 ||
    url.indexOf("/duobao") > 0 ||
    url.indexOf("/invite") > 0 ||
    url.indexOf("/mine") > 0
  ) {
    // tab页面跳转
    wx.switchTab({
      url: url
    });
  } else {
    // 其他页面跳转
    wx.navigateTo({
      url: url
    });
  }
}

/**
 * 连接socket
 */
function connectSocket() {
  wx.connectSocket({
    url: api.SocketRootUrl,
    header: {
      Authorization: "cjt " + wx.getStorageSync("token")
      // "X-TOKEN": "854f671efa14b949e75a91616d878e20",
      // "X-M": "qq_9339c4b5e8a00a73c25667ae07f67624"
    },
    success(res) {
      console.log("连接成功");
    }
  });
}
/**
 * 微信websocket
 * @param {function} cb 回调函数
 */
var socketTimer = null;

function socket(cb) {
  connectSocket();

  wx.onSocketOpen(function(res) {
    console.log("WebSocket连接已打开！");

    // wx.sendSocketMessage({
    //   data: "Hello,World:" + Math.round(Math.random() * 1000)
    // });

    // wx.closeSocket()
  });

  wx.onSocketMessage(function(res) {
    // 接收到消息
    cb && cb(res);
    console.log("正在接收数据...");
  });

  wx.onSocketClose(function(res) {
    if (socketTimer) clearTimeout(socketTimer);
    socketTimer = setTimeout(connectSocket, 3000);
    console.log("WebSocket连接已关闭！");
    console.log(res.code + "   socket关闭原因：" + res.reason);
  });
}

/**
 *  更新
 */
function updataNumByid(arr1, arr2, cb) {
  for (var i = 0, len = arr1.length; i < len; i++) {
    for (var j = 0, len2 = arr2.length; j < len2; j++) {
      if (arr1[i].id == arr2[j].is_id) {
        cb && cb();
        // arr2[j].is_oddnum = arr1[i].n;
        // arr2[j].is_rate = arr1[i].r;
      }
    }
  }
}
/**
 * 广告点击统计
 * @param {*} type
 * @param {*} id
 */
function clickLog(type, id) {
  console.log(222);
  
  request(api.AdReport, { type: type, advertid: id }, "GET", null).then(
    function(res) {
      if (res.code === 0) {
      } else {
      }
    }
  );
}

const util = {
  formatTime,
  request,
  wxRequest,
  redirect,
  showErrorToast,
  checkSession,
  login,
  parseParams,
  getCommonShareData,
  jump,
  clickLog,
  socket,
  updataNumByid,
  getUserInfo
};

export default util;
