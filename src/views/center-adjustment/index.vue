<!--
 * @Author      : Mr.bin
 * @Date        : 2024-02-21 14:18:34
 * @LastEditTime: 2024-02-21 17:59:56
 * @Description : 中心距调零
-->
<template>
  <div class="center-adjustment">
    <!-- 标题 -->
    <div class="title">中心距调零-页面</div>

    <div class="main">
      <div class="left">
        <div class="text">文字说明</div>
        <el-collapse class="collapse">
          <el-collapse-item title="详 情">
            <div class="item">下位机源数据：{{ source }}</div>
            <div class="item">
              缓存中心距：{{ spacingStorage > 0 ? '+' : ''
              }}{{ spacingStorage }}
            </div>
            <div class="item">实时中心距：{{ spacingActual }}</div>
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
      <el-button class="item" type="danger" @click="handleToHome"
        >返 回 首 页</el-button
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
      c: 5680,
      spacingActual: '', // 实时的中心距
      spacingShow: '', // 展示的中心距
      spacingStorage: 0 // 缓存的中心距
    }
  },

  created() {
    // 先取出缓存中的中心距值
    this.spacingStorage = JSON.parse(
      window.sessionStorage.getItem('spacingStorage')
    )
      ? JSON.parse(window.sessionStorage.getItem('spacingStorage'))
      : 0

    this.initSerialPort() // 检测串口通信是否正常
  },
  beforeDestroy() {
    if (this.usbPort) {
      if (this.usbPort.isOpen) {
        this.usbPort.close()
      }
    }
  },

  methods: {
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
                    window.location.reload()
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
              this.spacingActual = parseFloat(
                ((this.pressureDigital * this.k - this.c) / 10).toFixed(1)
              )
              this.spacingShow = parseFloat(
                (
                  (this.pressureDigital * this.k - this.c) / 10 -
                  this.spacingStorage
                ).toFixed(1)
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
    },

    /**
     * @description: 调零
     */
    handleConfirm() {
      this.spacingStorage = parseFloat(
        ((this.pressureDigital * this.k - this.c) / 10).toFixed(1)
      )
      window.sessionStorage.setItem(
        'spacingStorage',
        JSON.stringify(this.spacingStorage)
      )
      this.spacingShow = 0

      this.$message({
        message: '调零成功',
        type: 'success',
        duration: 3000
      })
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
      width: 30%;
      .text {
        font-size: 26px;
        margin-bottom: 10px;
      }
      .collapse {
        .item {
          font-size: 20px;
          margin: 10px 0;
        }
      }
    }
    .right {
      width: 70%;
      @include flex(column, center, center);
      .item {
        font-size: 30px;
        margin: 50px 0;
      }
      .btn-confirm {
        width: 160px;
        height: 100px;
        font-size: 50px;
      }
    }
  }

  .btn {
    margin-top: 10px;
    @include flex(row, center, center);
    .item {
      width: 150px;
      font-size: 22px;
    }
  }
}
</style>
