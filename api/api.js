const baseUrl = 'http://192.168.10.81:8089';
const app = getApp();

const http = ({
                  url = '',
                  accessToken = '',
                  param = {},
                  ...other
              } = {}) => {
    wx.showLoading({
        title: '请求中，请耐心等待..'
    });
    let timeStart = Date.now();
    return new Promise((resolve, reject) => {
        wx.request({
            url: getUrl(url),
            data: param,
            header: {
                'content-type': 'application/x-www-form-urlencoded', // 默认值 ,另一种是 "content-type": "application/x-www-form-urlencoded"
                'accessToken': accessToken
            },
            ...other,
            complete: (res) => {
                wx.hideLoading();
                console.log(`耗时${Date.now() - timeStart}`);
                if (res.statusCode == 200) {
                    resolve(res.data)
                } else {
                    reject(res)
                }
            }
        })
    })
}

const getUrl = (url) => {
    if (url.indexOf('://') == -1) {
        url = baseUrl + url;
    }
    return url
}

// get方法
const _get = (url, param = {}) => {
    return http({
        url,
        param
    })
}

const _post = (url,accessToken, param = {}) => {
    return http({
        url,
        accessToken,
        param,
        method: 'post'
    })
}

const _put = (url, param = {}) => {
    return http({
        url,
        param,
        method: 'put'
    })
}

const _delete = (url, param = {}) => {
    return http({
        url,
        param,
        method: 'put'
    })
}
module.exports = {
    baseUrl,
    _get,
    _post,
    _put,
    _delete
}
