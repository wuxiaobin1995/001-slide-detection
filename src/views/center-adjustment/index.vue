<!--
 * @Author      : Mr.bin
 * @Date        : 2024-02-21 14:18:34
 * @LastEditTime: 2024-02-22 17:35:04
 * @Description : 中心距调零
-->
<template>
  <div class="center-adjustment">
    <!-- 标题 -->
    <div class="title">中心距调零-页面</div>

    <!-- 主内容 -->
    <div class="main">
      <div class="left">
        <div class="text">
          <div class="item">
            1、若中心距不为0，则先擦拭导轨、滑块等，再次按下机械按钮
          </div>
          <div class="item">
            2、若中心距仍不为0，则查看滑块是否对准了，再次按下机械按钮
          </div>
          <div class="item">3、若中心距依然不为0，则点击“调 零”按钮</div>
        </div>

        <el-collapse class="collapse">
          <el-collapse-item title="详 情 展 开">
            <div class="item">下位机源数据：{{ source }}</div>
            <div class="item">k：{{ k }}</div>
            <div class="item">b：{{ b }}</div>
            <div class="item">
              公式【精确到0.1】：实时中心距 = （k * x + b） / 10 + 补偿值
            </div>
            <div class="item">
              缓存中心距(基准)：{{ spacingReference > 0 ? '+' : ''
              }}{{ spacingReference }}
            </div>
            <div class="item">
              实时中心距：{{ spacingActual > 0 ? '+' : '' }}{{ spacingActual }}
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>

      <div class="right">
        <div class="item">
          中心距：{{ spacingShow > 0 ? '+' : '' }}{{ spacingShow }}
        </div>
        <el-button class="btn-confirm" type="success" @click="handleConfirm"
          >调 零</el-button
        >
      </div>
    </div>

    <!-- 按钮组 -->
    <div class="btn">
      <el-button
        class="item"
        icon="el-icon-back"
        type="info"
        @click="handleToHome"
        >返 回 首 页</el-button
      >
      <el-button class="item" type="primary" @click="handleRefresh"
        >刷 新 页 面</el-button
      >
    </div>
  </div>
</template>

<script>
/* 串口通信库 */
import SerialPort from 'serialport'
import Readline from '@serialport/parser-readline'

export default {
  name: 'center-adjustment',

  data() {
    return {
      /* 串口相关 */
      usbPort: null,
      parser: null,
      scmBaudRate: 115200,

      source: '', // 下位机源数据
      pressureDigital: '', // 实时的压力数字量
      k: 0.16,
      b: -5680,
      spacingReference: 0, // 基准中心距
      spacingActual: '', // 实时的中心距
      spacingShow: '' // 展示的中心距
    }
  },

  created() {
    // 取出缓存中的基准中心距值
    this.spacingReference = JSON.parse(
      window.sessionStorage.getItem('spacingReference')
    )
      ? JSON.parse(window.sessionStorage.getItem('spacingReference'))
      : 0

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
     * @description: 串口
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
              // console.log(data) //  格式：'5,13,5,16,5,20,5,10,35568'
              const adData = '5,13,5,16,5,20,5,10,35568'
              this.source = adData

              const dataArray = adData.split(',') // 将原始数据以逗号作为分割符，组成一个数组
              this.pressureDigital = dataArray[dataArray.length - 1] // 取出最后一个压力数字量

              /* 计算 */
              const spacingOriginal = parseFloat(
                ((this.k * this.pressureDigital + this.b) / 10).toFixed(1)
              )
              // 补偿，算出最终的实时中心距
              if (spacingOriginal >= 0 && spacingOriginal < 4) {
                this.spacingActual = parseFloat(
                  (spacingOriginal + 0.1).toFixed(1)
                )
              } else {
                this.spacingActual = spacingOriginal
              }

              this.spacingShow = parseFloat(
                (this.spacingActual - this.spacingReference).toFixed(1)
              )
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
    },

    /**
     * @description: 调零
     */
    handleConfirm() {
      if (this.pressureDigital === '') {
        this.$message({
          message: `下位机数据为空，请先点击“机械按钮”`,
          type: 'error',
          duration: 2000
        })
      } else {
        this.spacingReference = this.spacingActual
        window.sessionStorage.setItem(
          'spacingReference',
          JSON.stringify(this.spacingReference)
        )
        this.spacingShow = 0

        this.$message({
          message: '调零成功',
          type: 'success',
          duration: 3000
        })
      }
    },

    /**
     * @description: 返回首页
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
          routerName: JSON.stringify('/center-adjustment'),
          duration: JSON.stringify(300)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.center-adjustment {
  width: 100%;
  height: 100%;
  padding: 20px 60px;
  @include flex(column, stretch, stretch);

  .title {
    font-size: 70px;
    margin-bottom: 10px;
  }

  .main {
    flex: 1;
    @include flex(row, stretch, stretch);
    .left {
      width: 40%;
      .text {
        font-size: 24px;
        margin-bottom: 10px;
        .item {
          margin-bottom: 10px;
        }
      }
      .collapse {
        .item {
          font-size: 20px;
          margin: 5px 0;
        }
      }
    }
    .right {
      width: 60%;
      @include flex(column, stretch, center);
      .item {
        font-size: 100px;
        color: red;
        margin: 100px 0 80px 0;
      }
      .btn-confirm {
        width: 160px;
        height: 100px;
        font-size: 50px;
      }
    }
  }

  .btn {
    margin: 10px 0 20px 0;
    @include flex(row, stretch, center);
    .item {
      width: 190px;
      font-size: 22px;
      margin-right: 40px;
    }
  }
}
</style>
