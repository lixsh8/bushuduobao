// import wx from 'wx';
// import api from "@/utils/api";

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
    path: link
  };
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
  getUserInfo
};

export default util;
