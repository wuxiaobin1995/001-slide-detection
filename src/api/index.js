/*
 * @Author      : Mr.bin
 * @Date        : 2024-02-07 14:56:46
 * @LastEditTime: 2024-02-07 14:56:51
 * @Description : 封装axios
 */
import axios from 'axios'

const instance = axios.create({
  // baseURL: 'http://192.168.1.233/energy_t6_m5_pps_v3/public/index.php/api', // 本地
  baseURL: 'http://106.52.43.100/energy_t6_m5_pps_v3/public/index.php/api', // 云端
  timeout: 10000
})

export { instance }
