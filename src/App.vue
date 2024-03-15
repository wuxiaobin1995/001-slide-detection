<!--
 * @Author      : Mr.bin
 * @Date        : 2024-02-07 14:19:10
 * @LastEditTime: 2024-03-15 10:45:03
 * @Description : 根组件
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
/* 串口通信库 */
import SerialPort from 'serialport'

export default {
  name: 'App',

  created() {
    this.initSessionStorage()

    this.initVuex()

    this.initSerialPort() // 检测串口通信是否正常
  },

  methods: {
    /**
     * @description: 软件启动后，初始化sessionStorage的一些值
     */
    initSessionStorage() {
      /* 初始化标准滑块的基准值 */
      if (!window.sessionStorage.getItem('standard_slider_value')) {
        window.sessionStorage.setItem(
          'standard_slider_value',
          JSON.stringify([])
        )
      }
    },

    /**
     * @description: 软件启动后，初始化Vuex的一些值
     */
    initVuex() {
      // 规格，默认是'15'
      this.$store.dispatch('changeSpec', '15').then(() => {
        this.$message({
          message: `初始化 Vuex 规格成功，为：15`,
          type: 'success',
          duration: 5000
        })
      })
      // 型号，默认是'AA'
      this.$store.dispatch('changeModel', 'AA').then(() => {
        this.$message({
          message: `初始化 Vuex 型号成功，为：AA`,
          type: 'success',
          duration: 5000,
          offset: 60
        })
      })
    },

    /**
     * @description: 初始化串口对象
     */
    initSerialPort() {
      SerialPort.list()
        .then(ports => {
          /* 遍历设备的USB串口，目标设备需安装驱动 */
          let comPath = ''
          for (const port of ports) {
            if (/^USB/.test(port.pnpId)) {
              comPath = port.path
              break
            }
          }

          /* 验证USB有没有连接到电脑，但不能验证有无数据发送给上位机 */
          if (comPath) {
            this.$notify({
              title: '通知',
              message: `连接到串口：${comPath}`,
              type: 'success',
              position: 'bottom-right',
              duration: 8000
            })
          } else {
            this.$alert(
              `请重新连接USB线，然后点击"刷新页面"按钮！`,
              `没有检测到USB连接`,
              {
                type: 'error',
                showClose: false,
                center: true,
                confirmButtonText: '刷新页面',
                callback: () => {
                  window.location.reload()
                }
              }
            )
          }
        })
        .catch(err => {
          this.$alert(
            `${err}。请重新连接USB线，然后点击"刷新页面"按钮！`,
            `初始化SerialPort.list失败`,
            {
              type: 'error',
              showClose: false,
              center: true,
              confirmButtonText: '刷新页面',
              callback: () => {
                window.location.reload()
              }
            }
          )
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
