<!--
 * @Author      : Mr.bin
 * @Date        : 2024-02-21 14:18:34
 * @LastEditTime: 2024-02-29 10:50:46
 * @Description : 球号推荐
-->
<template>
  <div class="ball-recommendation">
    <!-- 标题 -->
    <div class="title">球号推荐-页面</div>

    <!-- 规格型号 -->
    <div class="model-spec">
      <div class="text">
        规格：{{
          this.$store.state.spec === ''
            ? '未选择'
            : this.$store.state.spec
        }}
      </div>
      <div class="text">
        型号：{{
          this.$store.state.model === '' ? '未选择' : this.$store.state.model
        }}
      </div>
    </div>

    <!-- 主内容 -->
    <div class="main">
      <div class="left">
        <div class="text">
          <div class="item">
            气嘴对准滑块中部，然后按下机械按钮，就会显示推荐的球号
          </div>
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
              实时中心距：{{ spacingActual > 0 ? '+' : '' }}{{ spacingActual }}
            </div>
            <div class="item">
              缓存中心距(基准)：{{ spacingReference > 0 ? '+' : ''
              }}{{ spacingReference }}
            </div>
            <el-divider></el-divider>
            <div class="item">
              公式：最终中心距 = 实时中心距 - 缓存中心距(基准) +
              常数C(这个C的值与型号有关)
            </div>
            <div class="item">
              最终中心距：{{ spacingResult > 0 ? '+' : '' }}{{ spacingResult }}
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>

      <div class="right">
        <div class="item">
          <div class="text">球号</div>
          <div class="value">
            {{ ballNumber }}
          </div>
        </div>
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
  name: 'ball-recommendation',

  data() {
    return {
      /* 串口相关 */
      usbPort: null,
      parser: null,
      scmBaudRate: 115200,

      source: '', // 下位机源数据
      k: 0.13019,
      b: -4300,
      spacingReference: 0, // 基准中心距
      spacingActual: '', // 实时的中心距
      spacingResult: '', // 滑块最终的中心距

      ballNumber: '' // 推荐的球号
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
              // console.log(data) //  格式：'1369,1379,1359,1359,1374,1391,1376,1357,33753'
              this.source = data

              const dataArray = data.split(',') // 将原始数据以逗号作为分割符，组成一个数组
              const pressureDigital = dataArray[dataArray.length - 1] // 取出最后一个压力数字量

              /* 计算 */
              let spacingOriginal = parseFloat(
                ((this.k * pressureDigital + this.b) / 10).toFixed(1)
              )
              /* 补偿，算出最终的实时中心距 */
              if (spacingOriginal >= -1 && spacingOriginal <= 0.9) {
                // 0
                spacingOriginal = spacingOriginal - 0
              } else if (spacingOriginal >= -3 && spacingOriginal <= -1.1) {
                // +2
                spacingOriginal = spacingOriginal - 0.1
              } else if (spacingOriginal >= -5.3 && spacingOriginal <= -3.1) {
                // +4
                spacingOriginal = spacingOriginal + 0.7
              } else if (spacingOriginal >= -7.0 && spacingOriginal <= -5.4) {
                // +6
                spacingOriginal = spacingOriginal + 0.5
              } else if (spacingOriginal >= -9.5 && spacingOriginal <= -7.1) {
                // +8
                spacingOriginal = spacingOriginal + 0.6
              } else if (spacingOriginal >= 1.0 && spacingOriginal <= 2.9) {
                // -2
                spacingOriginal = spacingOriginal - 0.5
              } else if (spacingOriginal >= 3.0 && spacingOriginal <= 4.9) {
                // -4
                spacingOriginal = spacingOriginal - 0.4
              } else if (spacingOriginal >= 5.0 && spacingOriginal <= 6.9) {
                // -6
                spacingOriginal = spacingOriginal + 0.1
              } else if (spacingOriginal >= 7.0 && spacingOriginal <= 8.3) {
                // -8
                spacingOriginal = spacingOriginal + 0.2
              } else if (spacingOriginal >= 8.4 && spacingOriginal <= 20) {
                //
                spacingOriginal = 0
              }

              this.spacingActual = spacingOriginal

              this.spacingResult = parseFloat(
                (this.spacingActual - this.spacingReference).toFixed(1)
              )

              /* 不同型号对应不同公式 */
              const modelSelect = this.$store.state.model
              switch (modelSelect) {
                case 'AA':
                  this.spacingResult = this.spacingResult + 1
                  break
                case 'EA':
                  this.spacingResult = this.spacingResult + 1
                  break
                case 'HAA':
                  this.spacingResult = this.spacingResult - 0
                  break
                case 'HEA':
                  this.spacingResult = this.spacingResult - 0
                  break
                default:
                  this.spacingResult = this.spacingResult - 0
                  break
              }

              /* 选球区间 */
              if (this.spacingResult >= -8.5 && this.spacingResult <= -7.1) {
                this.ballNumber = '+8'
              } else if (
                this.spacingResult >= -7.0 &&
                this.spacingResult <= -5.1
              ) {
                this.ballNumber = '+6'
              } else if (
                this.spacingResult >= -5.0 &&
                this.spacingResult <= -3.1
              ) {
                this.ballNumber = '+4'
              } else if (
                this.spacingResult >= -3.0 &&
                this.spacingResult <= -1.1
              ) {
                this.ballNumber = '+2'
              } else if (
                this.spacingResult >= -1.0 &&
                this.spacingResult <= 0.9
              ) {
                this.ballNumber = '0'
              } else if (
                this.spacingResult >= 1.0 &&
                this.spacingResult <= 2.9
              ) {
                this.ballNumber = '-2'
              } else if (
                this.spacingResult >= 3.0 &&
                this.spacingResult <= 4.9
              ) {
                this.ballNumber = '-4'
              } else if (
                this.spacingResult >= 5.0 &&
                this.spacingResult <= 6.9
              ) {
                this.ballNumber = '-6'
              } else if (
                this.spacingResult >= 7.0 &&
                this.spacingResult <= 9.5
              ) {
                this.ballNumber = '-8'
              } else {
                this.ballNumber = '超出范围'
              }
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
          routerName: JSON.stringify('/ball-recommendation'),
          duration: JSON.stringify(300)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ball-recommendation {
  width: 100%;
  height: 100%;
  padding: 20px 60px;
  @include flex(column, stretch, stretch);

  .title {
    font-size: 70px;
    margin-bottom: 10px;
  }

  .model-spec {
    position: absolute;
    right: 2.5%;
    top: 30px;
    .text {
      font-size: 22px;
      font-weight: 700;
      margin-top: 10px;
    }
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
        margin: 50px 0 50px 0;
        @include flex(column, stretch, center);
        .text {
          font-size: 50px;
          color: black;
        }
        .value {
          font-size: 200px;
          color: red;
        }
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
