<!--
 * @Author      : Mr.bin
 * @Date        : 2022-07-28 14:00:00
 * @LastEditTime: 2024-04-20 09:06:37
 * @Description : 开发者
-->
<template>
  <div class="set-developer">
    <div class="wrapper">
      <el-page-header
        class="page"
        title="返回首页"
        content="开发者"
        @back="handleToHome"
      ></el-page-header>

      <div class="btn">
        <el-button class="item" type="success" round @click="handleOpenDev"
          >打开控制台</el-button
        >
      </div>

      <div class="ip">
        <el-input placeholder="请输入服务器的ip" v-model="ip">
          <template slot="prepend">服务器IP地址：</template>
        </el-input>
        <el-button class="item" type="primary" @click="handleSetIP"
          >设置IP</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
/* 用于打开控制台 */
import { remote } from 'electron'

export default {
  name: 'set-developer',

  data() {
    return {
      ip: ''
    }
  },

  created() {
    this.ip = window.localStorage.getItem('ip')
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
     * @description: 打开控制台
     */
    handleOpenDev() {
      try {
        remote.getCurrentWebContents().openDevTools()
      } catch (err) {
        this.$message({
          type: 'error',
          message: `打开控制台失败：${err}`
        })
      }
    },

    /**
     * @description: 设置IP
     */
    handleSetIP() {
      window.localStorage.setItem('ip', this.ip)

      this.$message({
        type: 'success',
        message: `设置IP【${this.ip}】成功！`,
        duration: 3000
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.set-developer {
  width: 100%;
  height: 100%;
  @include flex(row, center, center);

  .wrapper {
    width: 86%;
    height: 90%;
    border-radius: 34px;
    background-color: #ffffff;
    box-shadow: 0 0 10px #929292;
    padding: 40px;
    @include flex(column, center, center);
    position: relative;

    .page {
      position: absolute;
      top: 20px;
      left: 30px;
    }

    .btn {
      @include flex(column, center, center);
      .item {
        font-size: 28px;
      }
    }

    .ip {
      margin-top: 60px;
      @include flex(row, center, center);
      .item {
        margin-left: 30px;
      }
    }
  }
}
</style>
