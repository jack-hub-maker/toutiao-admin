/* axios请求模块封装 */
import axios from 'axios'

// 创建一个axios实例 赋值一个axios实例
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net/' // 请求的基础路径
})
// 导出请求方法
export default request
