/*
 * @Author      : Mr.bin
 * @Date        : 2024-02-07 14:56:46
 * @LastEditTime: 2024-03-18 15:23:53
 * @Description : 封装axios
 */
import axios from 'axios'

const instance = axios.create({
  baseURL: '', // 局域网
  timeout: 8000
})

export { instance }
