<!--
 * @Author      : Mr.bin
 * @Date        : 2024-04-13 08:34:06
 * @LastEditTime: 2024-04-20 10:59:48
 * @Description : 设置4组abcd常数
-->
<template>
  <div class="set-abcd">
    <div class="title">设置4组abcd常数</div>

    <div class="main">
      <div class="box" v-for="(item, index) of abcdArrs" :key="index">
        <div class="title">气嘴{{ index + 1 }}：</div>
        <div class="val">
          <span>a{{ index + 1 }}：</span>
          <el-input-number
            v-model="item[0]"
            :precision="5"
            controls-position="right"
          ></el-input-number>
        </div>
        <div class="val">
          <span>b{{ index + 1 }}：</span>
          <el-input-number
            v-model="item[1]"
            :precision="5"
            controls-position="right"
          ></el-input-number>
        </div>
        <div class="val">
          <span>c{{ index + 1 }}：</span>
          <el-input-number
            v-model="item[2]"
            :precision="5"
            controls-position="right"
          ></el-input-number>
        </div>
        <div class="val">
          <span>d{{ index + 1 }}：</span>
          <el-input-number
            v-model="item[3]"
            :precision="5"
            controls-position="right"
          ></el-input-number>
        </div>
      </div>
    </div>

    <div class="btn">
      <el-button class="item" type="success" @click="handleSave"
        >保 存</el-button
      >
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
export default {
  name: 'set-abcd',

  data() {
    return {
      abcdArrs: []
    }
  },

  created() {
    this.getLocalStorage()
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
          routerName: JSON.stringify('/set-abcd'),
          duration: JSON.stringify(300)
        }
      })
    },

    /**
     * @description: 获取4组abcd常数数组
     */
    getLocalStorage() {
      this.abcdArrs = JSON.parse(window.localStorage.getItem('abcdArrs'))
    },

    /**
     * @description: 保存按钮
     */
    handleSave() {
      window.localStorage.setItem('abcdArrs', JSON.stringify(this.abcdArrs))

      /* 成功 */
      this.$message({
        message: `保存成功`,
        type: 'success',
        duration: 2500
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.set-abcd {
  width: 100%;
  height: 100%;
  padding: 20px;
  @include flex(column, stretch, stretch);

  .title {
    font-size: 30px;
  }

  .main {
    flex: 1;
    @include flex(row, space-around, center);
    .box {
      .title {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 20px;
      }
      .val {
        margin-bottom: 40px;
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
