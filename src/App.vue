<!--
 * @Author      : Mr.bin
 * @Date        : 2024-02-07 14:19:10
 * @LastEditTime: 2024-12-16 17:51:50
 * @Description : 根组件
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',

  created() {
    this.initLocalStorage()
    this.initSessionStorage()
  },

  methods: {
    /**
     * @description: 软件启动后，初始化localStorage的一些值
     */
    initLocalStorage() {
      /* 初始化API的IP地址 */
      if (!window.localStorage.getItem('ip')) {
        window.localStorage.setItem('ip', '192.168.1.100')
      }

      /* 初始化传感器K1~K4 */
      const sensor_k = [
        {
          gg: '15', // 规格
          k1: 0.01, // 应变片
          k2: 155.6, // 2号压力传感器
          k3: 146.1, // 3号压力传感器
          k4: 156.6 // 4号压力传感器
        },
        {
          gg: '20',
          k1: 0.014,
          k2: 152.8,
          k3: 152.7,
          k4: 132.6
        },
        {
          gg: '25',
          k1: 0.017,
          k2: 153.6,
          k3: 149.4,
          k4: 135.5
        },
        {
          gg: '30',
          k1: 0.016,
          k2: 125.4,
          k3: 141.0,
          k4: 141.0
        },
        {
          gg: '35',
          k1: 0,
          k2: 129.5,
          k3: 139.4,
          k4: 143.4
        },
        {
          gg: '45',
          k1: 0,
          k2: 86.1,
          k3: 138.0,
          k4: 145.9
        }
      ]
      if (!window.localStorage.getItem('sensor_k')) {
        window.localStorage.setItem('sensor_k', JSON.stringify(sensor_k))
      }

      /* 初始化3个常数项：等高常数、到A常数、到B常数 */
      const cs = [
        {
          gg: '15', // 规格
          xh: 'AA', // 型号
          QRCode: '', // 标准滑块二维码编号
          dgCS: 5, // 等高常数
          toACS: -12, // 到A常数
          toBCS: 26 // 到B常数
        },
        {
          gg: '15',
          xh: 'AN',
          QRCode: '',
          dgCS: -4,
          toACS: 11,
          toBCS: 2
        },
        {
          gg: '15',
          xh: 'DA',
          QRCode: '',
          dgCS: 5,
          toACS: -12,
          toBCS: 26
        },
        {
          gg: '20',
          xh: 'AA',
          QRCode: '',
          dgCS: -1,
          toACS: 10,
          toBCS: 3
        },
        {
          gg: '20',
          xh: 'EA',
          QRCode: '',
          dgCS: 1,
          toACS: -11,
          toBCS: -7
        },
        {
          gg: '20',
          xh: 'HAA',
          QRCode: '',
          dgCS: -1,
          toACS: 10,
          toBCS: 3
        },
        {
          gg: '20',
          xh: 'HEA',
          QRCode: '',
          dgCS: 1,
          toACS: -11,
          toBCS: -7
        },
        {
          gg: '25',
          xh: 'AA',
          QRCode: '',
          dgCS: 0,
          toACS: 14,
          toBCS: 4
        },
        {
          gg: '25',
          xh: 'EA',
          QRCode: '',
          dgCS: 0,
          toACS: 10,
          toBCS: 0
        },
        {
          gg: '25',
          xh: 'AN',
          QRCode: '',
          dgCS: 2,
          toACS: 19,
          toBCS: 10
        },
        {
          gg: '25',
          xh: 'HAA',
          QRCode: '',
          dgCS: 0,
          toACS: 14,
          toBCS: 4
        },
        {
          gg: '25',
          xh: 'HEA',
          QRCode: '',
          dgCS: 0,
          toACS: 10,
          toBCS: 0
        },
        {
          gg: '25',
          xh: 'HAN',
          QRCode: '',
          dgCS: 2,
          toACS: 19,
          toBCS: 10
        },
        {
          gg: '30',
          xh: 'AA',
          QRCode: '',
          dgCS: 4,
          toACS: 8,
          toBCS: 18
        },
        {
          gg: '30',
          xh: 'EA',
          QRCode: '',
          dgCS: -1,
          toACS: -6,
          toBCS: -3
        },
        {
          gg: '30',
          xh: 'AN',
          QRCode: '',
          dgCS: -2,
          toACS: -13,
          toBCS: 6
        },
        {
          gg: '30',
          xh: 'HAA',
          QRCode: '',
          dgCS: 4,
          toACS: 8,
          toBCS: 18
        },
        {
          gg: '30',
          xh: 'HEA',
          QRCode: '',
          dgCS: -1,
          toACS: -6,
          toBCS: -3
        },
        {
          gg: '30',
          xh: 'HAN',
          QRCode: '',
          dgCS: -2,
          toACS: -13,
          toBCS: 6
        }
      ]
      if (!window.localStorage.getItem('cs')) {
        window.localStorage.setItem('cs', JSON.stringify(cs))
      }
    },

    /**
     * @description: 软件启动后，初始化sessionStorage的一些值
     */
    initSessionStorage() {
      /* 初始化标准滑块的标定值 */
      if (!window.sessionStorage.getItem('standard_slider_value')) {
        window.sessionStorage.setItem(
          'standard_slider_value',
          JSON.stringify([])
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
