<!--
 * @Author      : Mr.bin
 * @Date        : 2024-04-12 15:18:34
 * @LastEditTime: 2024-04-13 08:35:27
 * @Description : 原始数据显示
-->
<template>
  <div class="set-rawData">
    <div>
      <div>气嘴1：</div>
      <div>入口值：{{ this.qz_1s }}</div>
      <div>出口值：{{ this.qz_1 }}</div>
    </div>

    <div>
      <div>气嘴2：</div>
      <div>入口值：{{ this.qz_2s }}</div>
      <div>出口值：{{ this.qz_2 }}</div>
    </div>

    <div>
      <div>气嘴3：</div>
      <div>入口值：{{ this.qz_3s }}</div>
      <div>出口值：{{ this.qz_3 }}</div>
    </div>

    <div>
      <div>气嘴4：</div>
      <div>入口值：{{ this.qz_4s }}</div>
      <div>出口值：{{ this.qz_4 }}</div>
    </div>
  </div>
</template>

<script>
/* 串口通信库 */
import SerialPort from 'serialport'
import Readline from '@serialport/parser-readline'

export default {
  name: 'set-rawData',

  data() {
    return {
      /* 串口相关 */
      usbPort: null,
      parser: null,
      scmBaudRate: 115200,

      qz_1: 0, // 1号气嘴-出口值
      qz_1s: 0, // 1号气嘴-入口值

      qz_2: 0, // 2号气嘴-出口值
      qz_2s: 0, // 2号气嘴-入口值

      qz_3: 0, // 3号气嘴-出口值
      qz_3s: 0, // 3号气嘴-入口值

      qz_4: 0, // 4号气嘴-出口值
      qz_4s: 0 // 4号气嘴-入口值
    }
  },

  created() {
    /* 开启串口通信 */
    this.initSerialPort()
  },
  beforeDestroy() {
    if (this.usbPort) {
      if (this.usbPort.isOpen) {
        this.usbPort.close()
      }
    }
  },

  methods: {
    /**
     * @description: 刷新页面按钮
     */
    handleRefresh() {
      this.$router.push({
        path: '/refresh',
        query: {
          routerName: JSON.stringify('/set-rawData'),
          duration: JSON.stringify(300)
        }
      })
    },

    /**
     * @description: 串口通信
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
            /**
             * @description: 创建串口实例
             * @param {String} comPath 串行端口的系统路径。例如：在Mac、Linux上的/dev/tty.XXX或Windows上的COM1
             * @param {Object} 配置项
             */
            this.usbPort = new SerialPort(comPath, {
              baudRate: this.scmBaudRate, // 默认波特率115200
              autoOpen: true // 是否自动开启串口
            })
            /* 调用 this.usbPort.open() 成功时触发（开启串口成功） */
            this.usbPort.on('open', () => {})
            /* 调用 this.usbPort.open() 失败时触发（开启串口失败） */
            this.usbPort.on('error', () => {
              this.$alert(
                `请重新连接USB线，然后点击"刷新页面"按钮！`,
                '串口开启失败',
                {
                  type: 'error',
                  showClose: false,
                  center: true,
                  confirmButtonText: '刷新页面',
                  callback: () => {
                    this.handleRefresh()
                  }
                }
              )
            })

            this.parser = this.usbPort.pipe(new Readline({ delimiter: '\n' }))
            this.parser.on('data', data => {
              // console.log(data)

              /* 数据预处理 */
              const dataArray = data.split(',') // 将原始数据以逗号作为分割符，组成一个数组

              // 前一个是出口值，后一个是入口值（即基准）
              this.qz_1 = parseFloat(dataArray[0])
              this.qz_1s = parseFloat(dataArray[1])

              this.qz_2 = parseFloat(dataArray[2])
              this.qz_2s = parseFloat(dataArray[3])

              this.qz_3 = parseFloat(dataArray[4])
              this.qz_3s = parseFloat(dataArray[5])

              this.qz_4 = parseFloat(dataArray[6])
              this.qz_4s = parseFloat(dataArray[7])
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
                  this.handleRefresh()
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
                this.handleRefresh()
              }
            }
          )
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.set-rawData {
  width: 100%;
  height: 100%;
  padding: 5px 10px;
  position: relative;
  @include flex(column, stretch, stretch);
}
</style>
