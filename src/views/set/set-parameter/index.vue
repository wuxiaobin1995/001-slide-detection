<!--
 * @Author      : Mr.bin
 * @Date        : 2024-03-26 08:38:14
 * @LastEditTime: 2024-03-26 08:38:31
 * @Description : 参数配置
-->
<template>
  <div class="set-parameter">
    <el-page-header
      class="page"
      title="返回首页"
      content="参数配置"
      @back="handleToHome"
    ></el-page-header>
  </div>
</template>

<script>
export default {
  name: 'set-parameter',

  methods: {
    /**
     * @description: 回到首页
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
.set-parameter {
  width: 100%;
  height: 100%;
  @include flex(row, center, center);
}
</style>
