<!--
 * @Author      : Mr.bin
 * @Date        : 2024-02-07 15:05:37
 * @LastEditTime: 2024-02-22 17:56:31
 * @Description : 首页
-->
<template>
  <div class="home">
    <div class="wrapper">
      <!-- 软件名称 -->
      <div class="title">滑块数据检测软件</div>

      <div>规格：</div>
      <div>型号：</div>

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
        this.$router.push({
          path: '/slide-measurement'
        })
      } else if (src === 'src5') {
        // 测基准
        this.$router.push({
          path: '/datum'
        })
      }
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
