<!--
 * @Author      : Mr.bin
 * @Date        : 2024-02-21 14:18:34
 * @LastEditTime: 2024-02-23 16:21:09
 * @Description : 配置
-->
<template>
  <div class="configuration">
    <!-- 标题 -->
    <div class="title">配置-页面</div>

    <div class="main">内容......</div>

    <!-- 按钮组 -->
    <div class="btn">
      <el-button class="item" type="info" @click="handleToHome"
        >返 回 首 页</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'configuration',

  methods: {
    /**
     * @description: 返回首页
     */
    handleToHome() {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.configuration {
  width: 100%;
  height: 100%;
  padding: 20px 60px;
  @include flex(column, stretch, stretch);

  .title {
    font-size: 40px;
    margin-bottom: 5px;
  }

  .main {
    flex: 1;
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
