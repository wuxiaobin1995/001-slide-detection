<!--
 * @Author      : Mr.bin
 * @Date        : 2024-02-07 15:05:37
 * @LastEditTime: 2024-02-29 11:02:10
 * @Description : 首页
-->
<template>
  <div class="home">
    <div class="wrapper">
      <!-- 软件名称 -->
      <div class="title">滑块数据检测软件</div>

      <!-- 设置规格型号 -->
      <div class="model-spec">
        <el-button class="btn" type="danger" @click="handleModelspec"
          >选择 - 规格型号</el-button
        >
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

      <!-- 配置 -->
      <div class="select-item">
        <el-image
          class="item"
          :src="src1"
          fit="scale-down"
          @click.native="handleClick('src1')"
        ></el-image>
        <div class="text">配置</div>
      </div>
      <!-- 中心距调零 -->
      <div class="select-item">
        <el-image
          class="item"
          :src="src2"
          fit="scale-down"
          @click.native="handleClick('src2')"
        ></el-image>
        <div class="text">中心距调零</div>
      </div>
      <!-- 球号推荐 -->
      <div class="select-item">
        <el-image
          class="item"
          :src="src3"
          fit="scale-down"
          @click.native="handleClick('src3')"
        ></el-image>
        <div class="text">球号推荐</div>
      </div>
      <!-- 滑块数据测量 -->
      <div class="select-item">
        <el-image
          class="item"
          :src="src4"
          fit="scale-down"
          @click.native="handleClick('src4')"
        ></el-image>
        <div class="text">滑块数据测量</div>
      </div>
      <!-- 测基准 -->
      <div class="select-item">
        <el-image
          class="item"
          :src="src5"
          fit="scale-down"
          @click.native="handleClick('src5')"
        ></el-image>
        <div class="text">测基准(标准滑块)</div>
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
  </div>
</template>

<script>
/* 用于打开控制台 */
import { remote } from 'electron'

export default {
  name: 'home',

  data() {
    return {
      src1: require('@/assets/img/Home/配置.png'),
      src2: require('@/assets/img/Home/中心距调零.png'),
      src3: require('@/assets/img/Home/球号推荐.png'),
      src4: require('@/assets/img/Home/滑块数据测量.png'),
      src5: require('@/assets/img/Home/测基准.png')
    }
  },

  methods: {
    /**
     * @description: 页面跳转
     * @param {String} src
     */
    handleClick(src) {
      // 先判断规格型号是否选择了
      const spec = this.$store.state.spec
      const model = this.$store.state.model
      if (spec === '' || model === '') {
        this.$alert(`您好，请先选择规格型号，点击“确 认”按钮`, `提示`, {
          type: 'warning',
          showClose: false,
          center: true,
          confirmButtonText: '确 认',
          callback: () => {
            this.handleModelspec()
          }
        })
      } else {
        if (src === 'src1') {
          // 配置
          this.$router.push({
            path: '/configuration'
          })
        } else if (src === 'src2') {
          // 中心距调零
          this.$router.push({
            path: '/center-adjustment'
          })
        } else if (src === 'src3') {
          // 球号推荐
          this.$router.push({
            path: '/ball-recommendation'
          })
        } else if (src === 'src4') {
          // 滑块数据测量
          // 先判断是否已经测了基准
          const slideBenchmark = JSON.parse(
            window.sessionStorage.getItem('slideBenchmark')
          )
            ? JSON.parse(window.sessionStorage.getItem('slideBenchmark'))
            : []
          if (slideBenchmark.length === 0) {
            this.$alert(
              `您好，请先进行标准滑块基准测量，点击“确 认”按钮`,
              `提示`,
              {
                type: 'warning',
                showClose: false,
                center: true,
                confirmButtonText: '确 认',
                callback: () => {
                  // 测基准
                  this.$router.push({
                    path: '/datum'
                  })
                }
              }
            )
          } else {
            this.$router.push({
              path: '/slide-measurement'
            })
          }
        } else if (src === 'src5') {
          // 测基准
          this.$router.push({
            path: '/datum'
          })
        }
      }
    },

    /**
     * @description: 设置规格型号
     */
    handleModelspec() {
      this.$router.push({
        path: '/model-spec'
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
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  @include flex(row, center, center);

  .wrapper {
    width: 96%;
    height: 90%;
    border-radius: 34px;
    background-color: #ffffff;
    box-shadow: 0 0 10px #929292;
    position: relative;
    @include flex(row, space-around, center);

    .title {
      position: absolute;
      top: 15px;
      font-size: 60px;
      font-weight: 700;
    }

    .model-spec {
      position: absolute;
      left: 25px;
      top: 30px;
      .btn {
        font-size: 34px;
      }
      .text {
        font-size: 24px;
        font-weight: 700;
        margin-top: 10px;
      }
    }

    .select-item {
      @include flex(column, center, center);
      .item {
        transform: scale(1.2);
        box-shadow: 0 0 8px #1fc047;
        padding: 5px;
      }
      .text {
        color: green;
        margin-top: 35px;
        font-size: 30px;
        font-weight: 700;
      }
    }
  }

  /* 打开控制台按钮 */
  .btn-control {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>
