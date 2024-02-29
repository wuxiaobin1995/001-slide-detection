<!--
 * @Author      : Mr.bin
 * @Date        : 2024-02-21 14:18:34
 * @LastEditTime: 2024-02-29 11:04:24
 * @Description : 滑块数据测量
-->
<template>
  <div class="slide-measurement">
    <!-- 标题 -->
    <div class="title">滑块数据测量-页面</div>

    <!-- 规格型号 -->
    <div class="model-specifications">
      <div class="text">
        规格：{{
          this.$store.state.specifications === ''
            ? '未选择'
            : this.$store.state.specifications
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
      <div class="item">
        <span>标准滑块的基准值：</span>
        <span>
          {{ slideBenchmark }}
        </span>
      </div>

      <div class="item">
        <span>下位机源数据：</span>
        <span>
          {{ source }}
        </span>
      </div>

      <div class="item">
        <span>第一次：</span>
        <span>
          {{ sourceArray[0] }} {{ sourceArray[1] }} {{ sourceArray[2] }}
          {{ sourceArray[3] }}
        </span>
      </div>

      <div class="item">
        <span>第二次：</span>
        <span>
          {{ sourceArray[4] }} {{ sourceArray[5] }} {{ sourceArray[6] }}
          {{ sourceArray[7] }}
        </span>
      </div>

      <div class="item">
        <span>第三次：</span>
        <span>
          {{ sourceArray[8] }} {{ sourceArray[9] }} {{ sourceArray[10] }}
          {{ sourceArray[11] }}
        </span>
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
        >重 新 测 量</el-button
      >
    </div>
  </div>
</template>

<script>
/* 串口通信库 */
import SerialPort from 'serialport'
import Readline from '@serialport/parser-readline'

export default {
  name: 'slide-measurement',

  data() {
    return {
      /* 串口相关 */
      usbPort: null,
      parser: null,
      scmBaudRate: 115200,

      slideBenchmark: [],
      source: '', // 下位机源数据

      sourceArray: [] // 下位机源数据数组（3组）
    }
  },

  created() {
    // 获取标准滑块的基准值
    this.slideBenchmark = JSON.parse(
      window.sessionStorage.getItem('slideBenchmark')
    )

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
              const _1s = dataArray[0]
              const _1 = dataArray[1]
              const one = parseInt(Math.abs(_1s - _1).toFixed(0))

              const _2s = dataArray[2]
              const _2 = dataArray[3]
              const two = parseInt(Math.abs(_2s - _2).toFixed(0))

              const _3s = dataArray[4]
              const _3 = dataArray[5]
              const three = parseInt(Math.abs(_3s - _3).toFixed(0))

              const _4s = dataArray[6]
              const _4 = dataArray[7]
              const four = parseInt(Math.abs(_4s - _4).toFixed(0))

              if (this.sourceArray.length >= 12) {
              } else {
                this.sourceArray.push(one, two, three, four)
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
          routerName: JSON.stringify('/slide-measurement'),
          duration: JSON.stringify(300)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-measurement {
  width: 100%;
  height: 100%;
  padding: 20px 60px;
  @include flex(column, stretch, stretch);

  .title {
    font-size: 70px;
    margin-bottom: 10px;
  }

  .model-specifications {
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
    .item {
      margin: 20px 0;
      font-size: 36px;
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
