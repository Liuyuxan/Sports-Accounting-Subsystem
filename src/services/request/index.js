import axios from 'axios'
import { BASE_URL, TIMEOUT } from './config'

class YXRequest {
  constructor(baseURL, timeout=10000) {
    this.instance = axios.create({          // 创建实例并配置baseURL，timeout
      baseURL,
      timeout
    })

  }

  request(config) {
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  get(config) {
    return this.request({ ...config, method: "get" })         // method:请求类型
  }

  post(config) {
    return this.request({ ...config, method: "post" })
  }
}

export default new YXRequest(BASE_URL, TIMEOUT)


