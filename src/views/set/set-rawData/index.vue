<!--
 * @Author      : Mr.bin
 * @Date        : 2024-04-12 15:18:34
 * @LastEditTime: 2024-04-23 11:19:43
 * @Description : 原始数据显示（用于求a、b、c、d）（也用于扯皮时保留证据）
-->
<template>
  <div class="set-rawData">
    <div class="main">
      <div class="raw">
        <div class="row">
          <div>气嘴1（电压V）：</div>
          <div class="val">入口值：{{ qz_1s }}</div>
          <div class="val">出口值：{{ qz_1 }}</div>
        </div>

        <div class="row">
          <div>气嘴2（电压V）：</div>
          <div class="val">入口值：{{ qz_2s }}</div>
          <div class="val">出口值：{{ qz_2 }}</div>
        </div>

        <div class="row">
          <div>气嘴3（电压V）：</div>
          <div class="val">入口值：{{ qz_3s }}</div>
          <div class="val">出口值：{{ qz_3 }}</div>
        </div>

        <div class="row">
          <div>气嘴4（电压V）：</div>
          <div class="val">入口值：{{ qz_4s }}</div>
          <div class="val">出口值：{{ qz_4 }}</div>
        </div>

        <div class="row">
          <div>压力数字量（数字量）：</div>
          <div class="val">{{ pressureDigital }}</div>
        </div>
      </div>

      <!-- 只取小数点后1位 -->
      <div class="test">
        <div class="row">
          <div>只取小数点后2位</div>
        </div>

        <div class="row">
          <div>气嘴1（电压V）：</div>
          <div class="val">入口值：{{ qz_1s_test }}</div>
          <div class="val">出口值：{{ qz_1_test }}</div>
        </div>

        <div class="row">
          <div>气嘴2（电压V）：</div>
          <div class="val">入口值：{{ qz_2s_test }}</div>
          <div class="val">出口值：{{ qz_2_test }}</div>
        </div>

        <div class="row">
          <div>气嘴3（电压V）：</div>
          <div class="val">入口值：{{ qz_3s_test }}</div>
          <div class="val">出口值：{{ qz_3_test }}</div>
        </div>

        <div class="row">
          <div>气嘴4（电压V）：</div>
          <div class="val">入口值：{{ qz_4s_test }}</div>
          <div class="val">出口值：{{ qz_4_test }}</div>
        </div>
      </div>
    </div>

    <div class="btn">
      <el-button class="item" type="danger" @click="handleToHome"
        >返回首页</el-button
      >
      <el-button class="item" type="primary" @click="handleRefresh"
        >刷新页面</el-button
      >
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
      qz_4s: 0, // 4号气嘴-入口值

      // 只取小数点后1位
      qz_1_test: 0,
      qz_1s_test: 0,

      qz_2_test: 0,
      qz_2s_test: 0,

      qz_3_test: 0,
      qz_3s_test: 0,

      qz_4_test: 0,
      qz_4s_test: 0,

      pressureDigital: 0 // 5位压力数字量
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
     * @description: 回到首页
     */
    handleToHome() {
      this.$router.push({
        path: '/'
      })
    },

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

              // 只取小数点后1位
              this.qz_1_test = parseInt(dataArray[0] * 100) / 100
              this.qz_1s_test = parseInt(dataArray[1] * 100) / 100

              this.qz_2_test = parseInt(dataArray[2] * 100) / 100
              this.qz_2s_test = parseInt(dataArray[3] * 100) / 100

              this.qz_3_test = parseInt(dataArray[4] * 100) / 100
              this.qz_3s_test = parseInt(dataArray[5] * 100) / 100

              this.qz_4_test = parseInt(dataArray[6] * 100) / 100
              this.qz_4s_test = parseInt(dataArray[7] * 100) / 100

              // 5位压力数字量
              this.pressureDigital = parseFloat(dataArray[8])
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
  padding: 20px;
  @include flex(column, stretch, stretch);

  .main {
    flex: 1;
    @include flex(row, space-around, stretch);
    .raw {
      @include flex(column, center, stretch);
    }
    .test {
      @include flex(column, center, stretch);
    }
    .row {
      margin-bottom: 50px;
      font-size: 24px;
      .val {
        font-weight: 700;
      }
    }
  }

  .btn {
    @include flex(row, center, center);
    .item {
      font-size: 28px;
      margin: 0 40px;
    }
  }
}
</style>
