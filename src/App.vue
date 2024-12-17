<!--
 * @Author      : Mr.bin
 * @Date        : 2024-02-07 14:19:10
 * @LastEditTime: 2024-12-17 17:14:32
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
          gx: '15AA', // 规格型号
          QRCode: 'S3042218', // 标准滑块二维码号
          dgCS: 5, // 等高常数
          toACS: -12, // 到A常数
          toBCS: 26 // 到B常数
        },
        {
          gg: '15',
          xh: 'AN',
          gx: '15AN',
          QRCode: 'S3150157',
          dgCS: -4,
          toACS: 11,
          toBCS: 2
        },
        {
          gg: '15',
          xh: 'DA',
          gx: '15DA',
          QRCode: 'S3042218',
          dgCS: 5,
          toACS: -12,
          toBCS: 26
        },
        {
          gg: '20',
          xh: 'AA',
          gx: '20AA',
          QRCode: 'S2902341',
          dgCS: -1,
          toACS: 10,
          toBCS: 3
        },
        {
          gg: '20',
          xh: 'EA',
          gx: '20EA',
          QRCode: 'S3145435',
          dgCS: 1,
          toACS: -11,
          toBCS: -7
        },
        {
          gg: '20',
          xh: 'HAA',
          gx: '20HAA',
          QRCode: 'S2902341',
          dgCS: -1,
          toACS: 10,
          toBCS: 3
        },
        {
          gg: '20',
          xh: 'HEA',
          gx: '20HEA',
          QRCode: 'S3145435',
          dgCS: 1,
          toACS: -11,
          toBCS: -7
        },
        {
          gg: '25',
          xh: 'AA',
          gx: '25AA',
          QRCode: 'S2776468',
          dgCS: 0,
          toACS: 14,
          toBCS: 4
        },
        {
          gg: '25',
          xh: 'EA',
          gx: '25EA',
          QRCode: 'S3118440',
          dgCS: 0,
          toACS: 10,
          toBCS: 0
        },
        {
          gg: '25',
          xh: 'AN',
          gx: '25AN',
          QRCode: 'S3038146',
          dgCS: 2,
          toACS: 19,
          toBCS: 10
        },
        {
          gg: '25',
          xh: 'HAA',
          gx: '25HAA',
          QRCode: 'S2776468',
          dgCS: 0,
          toACS: 14,
          toBCS: 4
        },
        {
          gg: '25',
          xh: 'HEA',
          gx: '25HEA',
          QRCode: 'S3118440',
          dgCS: 0,
          toACS: 10,
          toBCS: 0
        },
        {
          gg: '25',
          xh: 'HAN',
          gx: '25HAN',
          QRCode: 'S3038146',
          dgCS: 2,
          toACS: 19,
          toBCS: 10
        },
        {
          gg: '30',
          xh: 'AA',
          gx: '30AA',
          QRCode: 'S2778639',
          dgCS: 4,
          toACS: 8,
          toBCS: 18
        },
        {
          gg: '30',
          xh: 'EA',
          gx: '30EA',
          QRCode: 'S3090119',
          dgCS: -1,
          toACS: -6,
          toBCS: -3
        },
        {
          gg: '30',
          xh: 'AN',
          gx: '30AN',
          QRCode: 'S2749178',
          dgCS: -2,
          toACS: -13,
          toBCS: 6
        },
        {
          gg: '30',
          xh: 'HAA',
          gx: '30HAA',
          QRCode: 'S2778639',
          dgCS: 4,
          toACS: 8,
          toBCS: 18
        },
        {
          gg: '30',
          xh: 'HEA',
          gx: '30HEA',
          QRCode: 'S3090119',
          dgCS: -1,
          toACS: -6,
          toBCS: -3
        },
        {
          gg: '30',
          xh: 'HAN',
          gx: '30HAN',
          QRCode: 'S2749178',
          dgCS: -2,
          toACS: -13,
          toBCS: 6
        }
      ]
      if (!window.localStorage.getItem('cs')) {
        window.localStorage.setItem('cs', JSON.stringify(cs))
      }

      /* 初始化中心距评定的上下限 */
      const centerSpacing_min_max = [
        {
          gx: '15',
          centerSpacing_min: -1,
          centerSpacing_max: 5
        },
        {
          gx: '20', // 非加长
          centerSpacing_min: -3,
          centerSpacing_max: 2
        },
        {
          gx: '20H', // 加长
          centerSpacing_min: -4,
          centerSpacing_max: 0
        },
        {
          gx: '25',
          centerSpacing_min: -3,
          centerSpacing_max: 1
        },
        {
          gx: '25H',
          centerSpacing_min: 0,
          centerSpacing_max: 4
        },
        {
          gx: '30',
          centerSpacing_min: -1,
          centerSpacing_max: 5
        },
        {
          gx: '30H',
          centerSpacing_min: -1,
          centerSpacing_max: 4
        }
      ]
      if (!window.localStorage.getItem('centerSpacing_min_max')) {
        window.localStorage.setItem(
          'centerSpacing_min_max',
          JSON.stringify(centerSpacing_min_max)
        )
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
