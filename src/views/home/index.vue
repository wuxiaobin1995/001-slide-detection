<!--
 * @Author      : Mr.bin
 * @Date        : 2024-02-07 15:05:37
 * @LastEditTime: 2024-02-07 15:11:21
 * @Description : 首页
-->
<template>
  <div class="home">
    <div class="main">Home</div>

    <div class="btn">
      <el-button class="item" type="info" @click="handleRefresh"
        >刷 新</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',

  methods: {
    /**
     * @description: 刷新页面
     */
    handleRefresh() {
      this.$router.push({
        path: '/refresh',
        query: {
          routerName: JSON.stringify('/'),
          duration: JSON.stringify(300)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  @include flex(column, stretch, stretch);
  padding: 26px 40px;

  .main {
    flex: 1;
  }

  /* 按钮 */
  .btn {
    margin-top: 20px;
    @include flex(row, center, center);
    .item {
      font-size: 24px;
    }
  }
}
</style>
