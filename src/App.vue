<!--
 * @Author      : Mr.bin
 * @Date        : 2024-02-07 14:19:10
 * @LastEditTime: 2024-02-21 17:04:18
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

    this.initSerialPort() // 检测串口通信是否正常
  },

  methods: {
    /**
     * @description: 软件启动后，初始化sessionStorage的一些值
     */
    initSessionStorage() {
      /* 初始化中心距 */
      if (!window.sessionStorage.getItem('spacingStorage')) {
        window.sessionStorage.setItem('spacingStorage', JSON.stringify(0))
      }
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
              duration: 6000
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
