import axios from 'axios'
import { BASE_URL, TIMEOUT } from './config'  // 导入定义的BASE_URL与TIMEOUT

class YXRequest {
  constructor(baseURL, timeout) {
    this.instance = axios.create({          // 创建实例并配置baseURL，timeout
      baseURL,
      timeout
    })

  }

  // 封装axios
  request(config) {
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  // 封装get请求
  get(config) {
    return this.request({ ...config, method: "get" })
  }

  // 封装post请求
  post(config) {
    return this.request({ ...config, method: "post" })
  }
  
}

// 导出类的实例，并在实例中传入参数
export default new YXRequest(BASE_URL, TIMEOUT)


