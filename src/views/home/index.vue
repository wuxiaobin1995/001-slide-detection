<!--
 * @Author      : Mr.bin
 * @Date        : 2024-03-12 15:11:07
 * @LastEditTime: 2024-03-19 14:50:37
 * @Description : home
-->
<template>
  <div class="home" v-loading.fullscreen.lock="isSaveing">
    <!-- 被测滑块部分 -->
    <div class="slider">
      <!-- 左侧数值显示 -->
      <div class="main">
        <!-- 规格型号选择 -->
        <div class="gx">
          <!-- 规格 -->
          <div class="spec">
            <div class="text">规格</div>
            <el-select
              v-model="specValue"
              placeholder="请选择规格"
              @change="specChange"
            >
              <el-option
                v-for="item in specSelection"
                :key="item.value"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <!-- 型号 -->
          <div class="model">
            <div class="text">型号</div>
            <el-select
              v-model="modelValue"
              placeholder="请选择型号"
              @change="modelChange"
            >
              <el-option
                v-for="item in modelSelection"
                :key="item.value"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>

        <!-- 二维码 -->
        <div class="QRCode">
          <span class="text">二维码</span>
          <div>
            <el-input
              ref="QRCodeInput"
              placeholder=""
              v-model="QRCode"
            ></el-input>
          </div>
          <div class="btn">
            <el-button class="btn-item" type="danger" @click="handleRescan"
              >重 扫</el-button
            >
          </div>
        </div>

        <!-- 来料检测 -->
        <div class="check">
          <div class="box">
            <div class="title">.</div>
            <div class="value">
              {{ bArray.length === 0 ? '待测' : '已测' }}
            </div>
          </div>

          <div class="box">
            <div class="title">中心距</div>
            <div class="value">{{ spacing === '' ? '/' : spacing }}</div>
          </div>

          <div class="box">
            <div class="title">区间</div>
            <div class="value">
              [{{ checkInterval[0] }} ~ {{ checkInterval[1] }}]
            </div>
          </div>

          <div class="box">
            <div class="title">检测结果</div>
            <div class="value">
              {{ checkResult === '' ? '/' : checkResult }}
            </div>
          </div>
        </div>

        <!-- 3次气压值 -->
        <div class="pressure">
          <div class="box">
            <div class="title">.</div>
            <div class="value">{{ bArray.length >= 2 ? '已测' : '待测' }}</div>
            <div class="value">{{ bArray.length >= 3 ? '已测' : '待测' }}</div>
            <div class="value">{{ bArray.length >= 4 ? '已测' : '待测' }}</div>
          </div>

          <div class="box">
            <div class="title">1号气嘴</div>
            <div class="value">
              {{ bArray.length >= 2 ? bArray[1][0] : '/' }}
            </div>
            <div class="value">
              {{ bArray.length >= 3 ? bArray[2][0] : '/' }}
            </div>
            <div class="value">
              {{ bArray.length >= 4 ? bArray[3][0] : '/' }}
            </div>
          </div>

          <div class="box">
            <div class="title">2号气嘴</div>
            <div class="value">
              {{ bArray.length >= 2 ? bArray[1][1] : '/' }}
            </div>
            <div class="value">
              {{ bArray.length >= 3 ? bArray[2][1] : '/' }}
            </div>
            <div class="value">
              {{ bArray.length >= 4 ? bArray[3][1] : '/' }}
            </div>
          </div>

          <div class="box">
            <div class="title">3号气嘴</div>
            <div class="value">
              {{ bArray.length >= 2 ? bArray[1][2] : '/' }}
            </div>
            <div class="value">
              {{ bArray.length >= 3 ? bArray[2][2] : '/' }}
            </div>
            <div class="value">
              {{ bArray.length >= 4 ? bArray[3][2] : '/' }}
            </div>
          </div>

          <div class="box">
            <div class="title">4号气嘴</div>
            <div class="value">
              {{ bArray.length >= 2 ? bArray[1][3] : '/' }}
            </div>
            <div class="value">
              {{ bArray.length >= 3 ? bArray[2][3] : '/' }}
            </div>
            <div class="value">
              {{ bArray.length >= 4 ? bArray[3][3] : '/' }}
            </div>
          </div>
        </div>

        <!-- 滑块精度 -->
        <div class="sliderAccuracy">
          <div class="box">
            <div class="title">.</div>
            <div class="value">精度结果</div>
          </div>

          <div class="box">
            <div class="title">等高</div>
            <div class="value">
              {{ dg !== '' ? dg : '/' }}
            </div>
          </div>

          <div class="box">
            <div class="title">到A</div>
            <div class="value">
              {{ toA !== '' ? toA : '/' }}
            </div>
          </div>

          <div class="box">
            <div class="title">到B</div>
            <div class="value">
              {{ toB !== '' ? toB : '/' }}
            </div>
          </div>

          <div class="box">
            <div class="title">A平行</div>
            <div class="value">
              {{ aParallel !== '' ? aParallel : '/' }}
            </div>
          </div>

          <div class="box">
            <div class="title">B平行</div>
            <div class="value">
              {{ bParallel !== '' ? bParallel : '/' }}
            </div>
          </div>

          <div class="box">
            <div class="title">精度等级</div>
            <div class="value">
              {{ accuracyClass !== '' ? accuracyClass : '/' }}
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧表格 -->
      <div class="table">
        <el-table
          :data="tableData"
          style="width: 100%"
          height="100%"
          :default-sort="{ prop: 'create_time', order: 'ascending' }"
          :stripe="false"
          :border="true"
          v-loading="tableLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <!-- 二维码 -->
          <el-table-column align="center" prop="QRCode" label="二维码" fixed />
          <!-- 测量时间 -->
          <el-table-column
            align="center"
            prop="create_time"
            label="测量时间"
            width="220"
          />
          <!-- 规格 -->
          <el-table-column
            align="center"
            prop="specValue"
            label="规格"
            width="80"
          />
          <!-- 型号 -->
          <el-table-column
            align="center"
            prop="modelValue"
            label="型号"
            width="80"
          />
          <!-- 等高 -->
          <el-table-column align="center" prop="dg" label="等高" width="100" />
          <!-- 到A -->
          <el-table-column align="center" prop="toA" label="到A" width="100" />
          <!-- 到B -->
          <el-table-column align="center" prop="toB" label="到B" width="100" />
          <!-- A平行 -->
          <el-table-column
            align="center"
            prop="aParallel"
            label="A平行"
            width="100"
          />
          <!-- B平行 -->
          <el-table-column
            align="center"
            prop="bParallel"
            label="B平行"
            width="100"
          />
          <!-- 精度等级 -->
          <el-table-column
            align="center"
            prop="accuracyClass"
            label="精度等级"
            width="50"
          />
          <!-- 中心距 -->
          <el-table-column
            align="center"
            prop="spacing"
            label="中心距"
            width="100"
          />
          <!-- 是否合格 -->
          <el-table-column
            align="center"
            prop="checkResult"
            label="是否合格"
            width="80"
          />

          <!-- 删除按钮 -->
          <el-table-column label="删除操作" align="center" width="150">
            <template slot-scope="scope">
              <el-button
                type="danger"
                plain
                icon="el-icon-delete"
                @click="handleDeleteTableData(scope.$index, scope.row)"
                >删 除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 标准滑块部分 -->
    <div class="standard-slider">
      <div class="head-title">
        <div>标准</div>
        <div>滑块</div>
      </div>

      <div class="content">
        <div class="box">
          <div class="title">.</div>
          <div class="item">{{ aArray.length >= 1 ? '已测' : '待测' }}</div>
          <div class="item">{{ aArray.length >= 2 ? '已测' : '待测' }}</div>
          <div class="item">{{ aArray.length >= 3 ? '已测' : '待测' }}</div>
        </div>

        <div class="box">
          <div class="title">1号气嘴</div>
          <div class="value">
            {{ aArray.length >= 1 ? aArray[0][0] : '/' }}
          </div>
          <div class="value">
            {{ aArray.length >= 2 ? aArray[1][0] : '/' }}
          </div>
          <div class="value">
            {{ aArray.length >= 3 ? aArray[2][0] : '/' }}
          </div>
        </div>

        <div class="box">
          <div class="title">2号气嘴</div>
          <div class="value">
            {{ aArray.length >= 1 ? aArray[0][1] : '/' }}
          </div>
          <div class="value">
            {{ aArray.length >= 2 ? aArray[1][1] : '/' }}
          </div>
          <div class="value">
            {{ aArray.length >= 3 ? aArray[2][1] : '/' }}
          </div>
        </div>

        <div class="box">
          <div class="title">3号气嘴</div>
          <div class="value">
            {{ aArray.length >= 1 ? aArray[0][2] : '/' }}
          </div>
          <div class="value">
            {{ aArray.length >= 2 ? aArray[1][2] : '/' }}
          </div>
          <div class="value">
            {{ aArray.length >= 3 ? aArray[2][2] : '/' }}
          </div>
        </div>

        <div class="box">
          <div class="title">4号气嘴</div>
          <div class="value">
            {{ aArray.length >= 1 ? aArray[0][3] : '/' }}
          </div>
          <div class="value">
            {{ aArray.length >= 2 ? aArray[1][3] : '/' }}
          </div>
          <div class="value">
            {{ aArray.length >= 3 ? aArray[2][3] : '/' }}
          </div>
        </div>
      </div>

      <!-- 按钮组 -->
      <div class="btn">
        <el-button class="item" type="danger" @click="handleClearStandard"
          >清 空 标 准 滑 块</el-button
        >
        <el-button class="item" type="danger" @click="handleRefresh"
          >刷 新 页 面</el-button
        >
      </div>
    </div>

    <!-- 打开控制台按钮 -->
    <el-button
      class="btn-control"
      type="info"
      size="mini"
      @click="handleOpenDev"
      >Open Dev</el-button
    >
    <!-- 开发者页按钮 -->
    <el-button
      class="btn-developer"
      type="info"
      size="mini"
      @click="handleToDeveloper"
      >Developer</el-button
    >
  </div>
</template>

<script>
/* 用于打开控制台 */
import { remote } from 'electron'

/* 串口通信库 */
import SerialPort from 'serialport'
import Readline from '@serialport/parser-readline'

export default {
  name: 'home',

  data() {
    return {
      /* 串口相关 */
      usbPort: null,
      parser: null,
      scmBaudRate: 115200,

      /* 状态标志位 */
      isSaveing: false, // 计算和调用api状态

      /* 服务器地址ip */
      ip: '',

      /* 表格 */
      tableData: [],
      tableLoading: false, // 表格加载动画

      /* 规格 */
      specValue: '',
      specSelection: [
        {
          value: '15'
        },
        {
          value: '20'
        },
        {
          value: '25'
        },
        {
          value: '30'
        },
        {
          value: '35'
        },
        {
          value: '45'
        }
      ],
      /* 型号 */
      modelValue: '',
      modelSelection: [
        {
          value: 'AA'
        },
        {
          value: 'EA'
        },
        {
          value: 'AN'
        },
        {
          value: 'HAA'
        },
        {
          value: 'HEA'
        },
        {
          value: 'HAN'
        }
      ],

      /* 二维码编号（滑块的身份证） */
      QRCode: '',

      /* 来料检测 */
      checkInterval: [-5, 2], // 来料检测区间
      spacing: '', // 中心距值，用于判断是否在区间内
      checkResult: '', // 来料检测结果

      /* 标准滑块源数组，格式比如 [[气嘴1, 气嘴2, 气嘴3, 气嘴4], [......], [......]] */
      aArray: [],
      /* 来料检测和被测滑块源数组，格式比如 [[压力数字量], [气嘴1, 气嘴2, 气嘴3, 气嘴4], [......], [......]] */
      bArray: [],

      /* 滑块的精度 */
      dg: '', // 等高
      toA: '', // 到A
      toB: '', // 到B
      aParallel: '', // A平行
      bParallel: '', // B平行
      accuracyClass: '' // 精度等级
    }
  },

  created() {
    /* 从Vuex中获取规格、型号的初始值 */
    this.specValue = this.$store.state.spec ? this.$store.state.spec : '15'
    this.modelValue = this.$store.state.model ? this.$store.state.model : 'AA'

    /* 从SessionStorage获取标准滑块源数组 */
    this.aArray = JSON.parse(
      window.sessionStorage.getItem('standard_slider_value')
    )

    /* 获取服务器地址IP */
    this.ip = window.localStorage.getItem('ip')

    /* 开启串口通信 */
    this.initSerialPort()

    /* 获取表格数据 */
    this.getTableData()
  },
  mounted() {
    /* 二维码输入框获取鼠标焦点 */
    this.QRFocus()
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
          routerName: JSON.stringify('/'),
          duration: JSON.stringify(100)
        }
      })
    },

    /**
     * @description: 获取表格数据
     */
    getTableData() {
      this.tableLoading = true
      const api = `http://${this.ip}/st_t6_m5_001_slide_detection/public/index.php/slideDetection/getData`
      this.$axios
        .post(api, {
          num: 6
        })
        .then(res => {
          const data = res.data
          if (data.status === 1) {
            /* 成功 */
            this.tableData = data.result
          } else if (data.status === 0) {
            /* 失败 */
            this.$message({
              message: `表格数据获取失败`,
              type: 'error',
              duration: 2500
            })
          }
        })
        .catch(err => {
          this.$alert(
            `[查-环节] ${err}。请确保网络连接正常！`,
            '网络请求错误',
            {
              type: 'error',
              showClose: false, // 是否显示右上角关闭按钮
              center: false, // 是否居中布局
              confirmButtonText: '刷新页面', // 确定按钮的文本内容
              callback: () => {
                this.handleRefresh()
              }
            }
          )
        })
        .finally(() => {
          this.tableLoading = false
        })
    },

    /**
     * @description: 删除按钮
     * @param {*} index
     * @param {*} row
     */
    handleDeleteTableData(index, row) {
      this.$confirm('此操作将"永久删除"该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          const api = `http://${this.ip}/st_t6_m5_001_slide_detection/public/index.php/slideDetection/deleteData`
          this.$axios
            .post(api, {
              QRCode: row.QRCode
            })
            .then(res => {
              const data = res.data
              if (data.status === 1) {
                /* 成功 */
                this.$message({
                  message: `删除成功`,
                  type: 'success',
                  duration: 2500
                })
              } else if (data.status === 0) {
                /* 失败 */
                this.$message({
                  message: `删除失败`,
                  type: 'error',
                  duration: 2500
                })
              } else if (data.status === -2) {
                /* 二维码不存在 */
                this.$alert(
                  `二维码不存在，请点击“刷新页面”按钮！`,
                  `状态码[${data.status}]`,
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
              } else if (data.status === -11) {
                /* 参数有误 */
                this.$alert(
                  `参数有误，请点击“刷新页面”按钮！`,
                  `状态码[${data.status}]`,
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
                `[删-环节] ${err}。请确保网络连接正常！`,
                '网络请求错误',
                {
                  type: 'error',
                  showClose: false, // 是否显示右上角关闭按钮
                  center: false, // 是否居中布局
                  confirmButtonText: '刷新页面', // 确定按钮的文本内容
                  callback: () => {
                    this.handleRefresh()
                  }
                }
              )
            })
            .finally(() => {
              this.getTableData()
            })
        })
        .catch(() => {})
    },

    /**
     * @description: 更新数据函数
     */
    updateTableData() {
      this.$confirm('数据库中已存在这个二维码编号, 是否要覆盖旧数据?', '提示', {
        confirmButtonText: '覆 盖',
        cancelButtonText: '取 消',
        type: 'warning',
        center: true,
        showClose: false,
        closeOnClickModal: false,
        closeOnPressEscape: false
      })
        .then(() => {
          const api = `http://${this.ip}/st_t6_m5_001_slide_detection/public/index.php/slideDetection/updateData`
          this.$axios
            .post(api, {
              QRCode: this.QRCode,
              specValue: this.specValue,
              modelValue: this.modelValue,
              spacing: this.spacing,
              checkResult: this.checkResult,
              dg: this.dg,
              toA: this.toA,
              toB: this.toB,
              aParallel: this.aParallel,
              bParallel: this.bParallel,
              accuracyClass: this.accuracyClass
            })
            .then(res => {
              const data = res.data
              if (data.status === 1) {
                /* 成功 */
                this.$message({
                  message: `覆盖成功`,
                  type: 'success',
                  duration: 2500
                })
                this.handleRefresh()
              } else if (data.status === 0) {
                /* 失败 */
                this.$message({
                  message: `覆盖失败`,
                  type: 'error',
                  duration: 2500
                })
                this.handleRefresh()
              } else if (data.status === -2) {
                /* 二维码不存在 */
                this.$alert(
                  `二维码不存在，请点击“刷新页面”按钮，然后重新测量！`,
                  `状态码[${data.status}]`,
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
              } else if (data.status === -11) {
                /* 参数有误 */
                this.$alert(
                  `参数有误，请点击“刷新页面”按钮，然后重新测量！`,
                  `状态码[${data.status}]`,
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
                `[改-环节] ${err}。请确保网络连接正常！`,
                '网络请求错误',
                {
                  type: 'error',
                  showClose: false, // 是否显示右上角关闭按钮
                  center: false, // 是否居中布局
                  confirmButtonText: '刷新页面', // 确定按钮的文本内容
                  callback: () => {
                    this.handleRefresh()
                  }
                }
              )
            })
            .finally(() => {})
        })
        .catch(() => {
          this.handleRefresh()
        })
    },

    /**
     * @description: 打开控制台
     */
    handleOpenDev() {
      this.$prompt('请输入密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^htpm$/,
        inputErrorMessage: '密码不正确',
        showClose: true,
        closeOnClickModal: false
      })
        .then(() => {
          try {
            remote.getCurrentWebContents().openDevTools()
          } catch (err) {
            this.$message({
              type: 'error',
              message: `打开控制台失败：${err}`
            })
          }
        })
        .catch(() => {})
    },
    /**
     * @description: 前往开发者页
     */
    handleToDeveloper() {
      this.$prompt('请输入密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^htpm$/,
        inputErrorMessage: '密码不正确',
        showClose: true,
        closeOnClickModal: false
      })
        .then(() => {
          this.$router.push({
            path: '/set-developer'
          })
        })
        .catch(() => {})
    },

    /**
     * @description: 重扫二维码按钮
     */
    handleRescan() {
      this.QRCode = ''
      this.QRFocus() // 二维码输入框获取鼠标焦点
    },

    /**
     * @description: 二维码输入框获取鼠标焦点函数
     */
    QRFocus() {
      this.$refs.QRCodeInput.focus()
    },

    /**
     * @description: 规格下拉框的选中值发生变化时触发
     */
    specChange() {
      this.$store.dispatch('changeSpec', this.specValue).then(() => {
        this.$message({
          message: `规格选择成功，为：${this.specValue}`,
          type: 'success',
          duration: 2500
        })

        // 清空标准滑块源数组
        this.aArray = []
        window.sessionStorage.setItem(
          'standard_slider_value',
          JSON.stringify([])
        )

        // 中心距值
        this.spacing = ''
        // 来料检测结果
        this.checkResult = ''
        // 清空来料检测和被测滑块源数组
        this.bArray = []

        // 二维码输入框获取鼠标焦点
        this.QRFocus()
      })
    },
    /**
     * @description: 型号下拉框的选中值发生变化时触发
     */
    modelChange() {
      this.$store.dispatch('changeModel', this.modelValue).then(() => {
        this.$message({
          message: `型号选择成功，为：${this.modelValue}`,
          type: 'success',
          duration: 2500
        })

        // 清空标准滑块源数组
        this.aArray = []
        window.sessionStorage.setItem(
          'standard_slider_value',
          JSON.stringify([])
        )

        // 中心距值
        this.spacing = ''
        // 来料检测结果
        this.checkResult = ''
        // 清空来料检测和被测滑块源数组
        this.bArray = []

        // 二维码输入框获取鼠标焦点
        this.QRFocus()
      })
    },

    /**
     * @description: 清空标准滑块源数组按钮
     */
    handleClearStandard() {
      this.$confirm('是否要清空标准滑块的基准数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        type: 'warning'
      })
        .then(() => {
          this.aArray = []
          window.sessionStorage.setItem(
            'standard_slider_value',
            JSON.stringify([])
          )
          this.$message({
            message: `标准滑块数据清空完成`,
            type: 'success',
            duration: 5000
          })
        })
        .catch(() => {})

      this.QRFocus() // 二维码输入框获取鼠标焦点
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
              /* 如果处于计算和调用后端api状态，就不触发，防止出bug */
              if (this.isSaveing === false) {
                // console.log(data) //  格式：'a,1369,1379,1359,1359,1374,1391,1376,1357,33753'

                /* 数据预处理 */
                const dataArray = data.split(',') // 将原始数据以逗号作为分割符，组成一个数组

                const keyType = dataArray[0] // 机械按钮类型 a，b，c

                const _1s = dataArray[1]
                const _1 = dataArray[2]
                const oneNozzle = parseInt(Math.abs(_1s - _1).toFixed(0)) // 1号喷嘴气压
                const _2s = dataArray[3]
                const _2 = dataArray[4]
                const twoNozzle = parseInt(Math.abs(_2s - _2).toFixed(0)) // 2号喷嘴气压
                const _3s = dataArray[5]
                const _3 = dataArray[6]
                const threeNozzle = parseInt(Math.abs(_3s - _3).toFixed(0)) // 3号喷嘴气压
                const _4s = dataArray[7]
                const _4 = dataArray[8]
                const fourNozzle = parseInt(Math.abs(_4s - _4).toFixed(0)) // 4号喷嘴气压（在侧面）
                const nozzleArray = [
                  oneNozzle,
                  twoNozzle,
                  threeNozzle,
                  fourNozzle
                ]

                const pressureDigital = dataArray[dataArray.length - 1] // 取出最后一个压力数字量

                /* 判断a、b、c机械按钮触发 */
                switch (keyType) {
                  /* 标准滑块机械按钮-触发 */
                  case 'a': {
                    // console.log('标准滑块按钮-触发', data)

                    if (this.aArray.length !== 3) {
                      this.aArray.push(nozzleArray)
                    }
                    /* 第3次按下瞬间，表示完成 */
                    if (this.aArray.length === 3) {
                      // 完成的逻辑
                      window.sessionStorage.setItem(
                        'standard_slider_value',
                        JSON.stringify(this.aArray)
                      )
                      this.$message({
                        message: `标准滑块测量基准完成`,
                        type: 'success',
                        duration: 5000
                      })
                    }
                    break
                  }

                  /* 被测滑块机械按钮-触发 */
                  case 'b': {
                    // console.log('被测滑块按钮-触发', data)

                    /* 1、来料检测（表示第1次按被测滑块机械按钮） */
                    if (this.bArray.length === 0) {
                      this.bArray.push([pressureDigital])
                      /* 计算开始 */
                      /* 根据规格的不同，选择不同的k、b（与型号无关） */
                      let k = 0.13019
                      let b = -4300
                      if (this.specValue === this.specSelection[0].value) {
                        // 15
                        k = 0.13019
                        b = -4300
                      } else if (
                        this.specValue === this.specSelection[1].value
                      ) {
                        // 20
                        k = 0.13019
                        b = -4300
                      } else if (
                        this.specValue === this.specSelection[2].value
                      ) {
                        // 25
                        k = 0.13019
                        b = -4300
                      } else if (
                        this.specValue === this.specSelection[3].value
                      ) {
                        // 30
                        k = 0.13019
                        b = -4300
                      } else if (
                        this.specValue === this.specSelection[4].value
                      ) {
                        // 35
                        k = 0.13019
                        b = -4300
                      } else if (
                        this.specValue === this.specSelection[5].value
                      ) {
                        // 45
                        k = 0.13019
                        b = -4300
                      }

                      /* 未经过补偿的中心距 */
                      const spacingTemporary = parseFloat(
                        ((k * pressureDigital + b) / 10).toFixed(1)
                      )
                      /* 开始补偿，算出最终的中心距 */
                      if (
                        spacingTemporary >= -9.5 &&
                        spacingTemporary <= -7.1
                      ) {
                        // +8
                        this.spacing = spacingTemporary + 0.6
                      } else if (
                        spacingTemporary > -7.1 &&
                        spacingTemporary <= -5.4
                      ) {
                        // +6
                        this.spacing = spacingTemporary + 0.5
                      } else if (
                        spacingTemporary > -5.4 &&
                        spacingTemporary <= -3.1
                      ) {
                        // +4
                        this.spacing = spacingTemporary + 0.7
                      } else if (
                        spacingTemporary > -3.1 &&
                        spacingTemporary <= -1.1
                      ) {
                        // +2
                        this.spacing = spacingTemporary - 0.1
                      } else if (
                        spacingTemporary > -1.1 &&
                        spacingTemporary <= 0.9
                      ) {
                        // 0
                        this.spacing = spacingTemporary
                      } else if (
                        spacingTemporary > 0.9 &&
                        spacingTemporary <= 2.9
                      ) {
                        // -2
                        this.spacing = spacingTemporary - 0.5
                      } else if (
                        spacingTemporary > 2.9 &&
                        spacingTemporary <= 4.9
                      ) {
                        // -4
                        this.spacing = spacingTemporary - 0.4
                      } else if (
                        spacingTemporary > 4.9 &&
                        spacingTemporary <= 6.9
                      ) {
                        // -6
                        this.spacing = spacingTemporary + 0.1
                      } else if (
                        spacingTemporary > 6.9 &&
                        spacingTemporary <= 8.3
                      ) {
                        // -8
                        this.spacing = spacingTemporary + 0.2
                      } else {
                        // 其他情况
                        this.spacing = spacingTemporary
                      }
                      /* 中心距保留1位小数 */
                      this.spacing = parseFloat(this.spacing.toFixed(1))
                      /* 判断中心距是否在区间内 */
                      if (
                        this.spacing >= this.checkInterval[0] &&
                        this.spacing <= this.checkInterval[1]
                      ) {
                        // 在区间内
                        this.checkResult = '合格'
                      } else {
                        // 在区间外
                        this.checkResult = '不合格'
                      }
                    } else {
                      /* 2、被测滑块精度测量 */
                      if (this.bArray.length !== 4) {
                        this.bArray.push(nozzleArray)
                      }
                      /* 第4次按下瞬间，表示完成 */
                      if (this.bArray.length === 4) {
                        // 完成的逻辑
                        this.save()
                      }
                    }
                    break
                  }

                  /* 清空机械按钮-触发 */
                  case 'c': {
                    // console.log('清空按钮-触发：', data)

                    /* 只清空被测滑块数据 */
                    // 中心距值
                    this.spacing = ''
                    // 来料检测结果
                    this.checkResult = ''
                    // 清空来料检测和被测滑块源数组
                    this.bArray = []

                    break
                  }

                  /* 机械按钮类型异常 */
                  default:
                    this.$alert(
                      `下位机源数据为：【${data}】，请停止操作，然后联系技术人员来处理！`,
                      '机械按钮类型异常',
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
                    break
                }
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
     * @description: 计算和调用api函数逻辑
     */
    save() {
      this.isSaveing = true // 开始计算和调用api操作

      /* 判断一下数据 */
      if (this.QRCode !== '') {
        if (this.aArray.length === 3) {
          /* 1、根据公式，计算等高、到A、到B、A平行、B平行、滑块精度等 */
          // console.log('二维码编号', this.QRCode)
          // console.log('规格', this.specValue)
          // console.log('型号', this.modelValue)
          // console.log('基准气压', this.aArray)
          // console.log('被测滑块气压', this.bArray)
          // console.log('中心距', this.spacing)
          // console.log('是否合格', this.checkResult)

          // 等高
          // 到A
          // 到B
          // A平行
          // B平行

          /* 2、调用API插入数据 */
          const api = `http://${this.ip}/st_t6_m5_001_slide_detection/public/index.php/slideDetection/setData`
          this.$axios
            .post(api, {
              QRCode: this.QRCode,
              specValue: this.specValue,
              modelValue: this.modelValue,
              spacing: this.spacing,
              checkResult: this.checkResult,
              dg: this.dg,
              toA: this.toA,
              toB: this.toB,
              aParallel: this.aParallel,
              bParallel: this.bParallel,
              accuracyClass: this.accuracyClass
            })
            .then(res => {
              const data = res.data
              if (data.status === 1) {
                /* 上传成功 */
                this.$message({
                  message: `数据上传成功。`,
                  type: 'success',
                  duration: 2000
                })
                this.handleRefresh()
              } else if (data.status === 0) {
                /* 上传失败 */
                this.$alert(
                  `数据上传失败，请点击“刷新页面”按钮，然后重新测量！`,
                  `状态码[${data.status}]`,
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
              } else if (data.status === -4) {
                /* 参数有误 */
                this.$alert(
                  `参数有误，请点击“刷新页面”按钮，然后重新测量！`,
                  `状态码[${data.status}]`,
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
              } else if (data.status === -5) {
                /* 二维码已存在 */
                this.updateTableData()
              }
            })
            .catch(err => {
              this.$alert(
                `[增-环节] ${err}。请确保网络连接正常！`,
                '网络请求错误',
                {
                  type: 'error',
                  showClose: false, // 是否显示右上角关闭按钮
                  center: false, // 是否居中布局
                  confirmButtonText: '刷新页面', // 确定按钮的文本内容
                  callback: () => {
                    this.handleRefresh()
                  }
                }
              )
            })
            .finally(() => {})
        } else {
          this.$alert(
            `标准滑块的基准数据为空，请点击"刷新页面"按钮，重新测量"标准滑块"的值！`,
            '警告',
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
      } else {
        this.$alert(
          `二维码为空，请点击"刷新页面"按钮，重新测量一次！`,
          '警告',
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
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  padding: 5px 10px;
  position: relative;
  @include flex(column, stretch, stretch);

  /* 被测滑块部分 */
  .slider {
    flex: 1;
    @include flex(row, stretch, stretch);
    /* 左侧内容区域 */
    .main {
      width: 50%;
      border-right: 2px solid black;
      /* 规格型号 */
      .gx {
        @include flex(row, stretch, stretch);
        .spec,
        .model {
          @include flex(row, stretch, center);
          margin-right: 20px;
          .text {
            margin-right: 10px;
          }
        }
      }
      /* 二维码 */
      .QRCode {
        margin-top: 20px;
        @include flex(row, stretch, center);
        .text {
          margin-right: 10px;
        }
        .btn {
          margin-left: 20px;
          .btn-item {
            width: 100px;
            font-size: 18px;
          }
        }
      }
      /* 来料检测 */
      .check {
        margin-top: 20px;
        @include flex(row, space-between, stretch);
        .box {
          @include flex(column, space-around, center);
          .title {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 4px;
          }
          .value {
            font-size: 20px;
          }
        }
      }
      /* 3次气压值 */
      .pressure {
        margin-top: 20px;
        @include flex(row, space-between, stretch);
        .box {
          @include flex(column, space-around, center);
          .title {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 4px;
          }
          .value {
            font-size: 20px;
          }
        }
      }
      /* 滑块精度 */
      .sliderAccuracy {
        margin-top: 50px;
        @include flex(row, space-between, stretch);
        .box {
          @include flex(column, space-around, center);
          .title {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 4px;
          }
          .value {
            font-size: 20px;
          }
        }
      }
    }

    /* 表格区域 */
    .table {
      width: 50%;
    }
  }

  /* 标准滑块部分 */
  .standard-slider {
    height: 22%;
    border-top: 2px solid black;
    @include flex(row, stretch, stretch);
    .head-title {
      width: 100px;
      font-size: 30px;
      @include flex(column, center, center);
    }
    .content {
      width: 50%;
      @include flex(row, space-around, stretch);
      .box {
        @include flex(column, space-around, center);
        .title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .value {
          font-size: 20px;
        }
      }
    }
    .btn {
      flex: 1;
      @include flex(row, space-around, center);
    }
  }

  /* 打开控制台按钮 */
  .btn-control {
    position: absolute;
    right: 0;
    bottom: 0;
  }
  /* 开发者页按钮 */
  .btn-developer {
    position: absolute;
    right: 100px;
    bottom: 0;
  }
}
</style>
