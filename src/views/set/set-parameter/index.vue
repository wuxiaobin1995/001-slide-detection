<!--
 * @Author      : Mr.bin
 * @Date        : 2024-03-26 08:38:14
 * @LastEditTime: 2024-04-22 11:47:23
 * @Description : 参数配置
-->
<template>
  <div class="set-parameter" v-loading.fullscreen.lock="loading">
    <el-page-header
      class="page"
      title="返回"
      content="参数配置页面"
      @back="handleToHome"
    ></el-page-header>

    <div class="box">
      <el-row class="row">
        <el-col :span="2">
          <div class="item title">规格型号</div>
        </el-col>
        <el-col :span="4">
          <div class="item title">滑块二维码编号</div>
        </el-col>
        <el-col :span="3">
          <div class="item title">等高常数</div>
        </el-col>
        <el-col :span="3">
          <div class="item title">到A常数</div>
        </el-col>
        <el-col :span="3">
          <div class="item title">到B常数</div>
        </el-col>
        <el-col :span="3">
          <div class="item title">上限</div>
        </el-col>
        <el-col :span="3">
          <div class="item title">下限</div>
        </el-col>
        <el-col :span="3">
          <div class="item title">对标值</div>
        </el-col>
      </el-row>

      <el-row class="row" v-for="item of arg" :key="item.gx">
        <el-divider></el-divider>
        <el-col :span="2">
          <div class="item">{{ item.gx }}</div>
        </el-col>
        <el-col :span="4">
          <div class="item">
            <el-input v-model="item.QRCode"></el-input>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="item">
            <el-input-number
              v-model="item.dgCS"
              :precision="0"
            ></el-input-number>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="item">
            <el-input-number
              v-model="item.toACS"
              :precision="0"
            ></el-input-number>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="item">
            <el-input-number
              v-model="item.toBCS"
              :precision="0"
            ></el-input-number>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="item">
            <el-input-number
              v-model="item.checkIntervalUp"
              :precision="0"
              :min="item.checkIntervalDown"
            ></el-input-number>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="item">
            <el-input-number
              v-model="item.checkIntervalDown"
              :precision="0"
              :max="item.checkIntervalUp"
            ></el-input-number>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="item">
            <el-input-number
              v-model="item.checkStandard"
              :precision="1"
            ></el-input-number>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-divider></el-divider>

    <!-- 按钮组 -->
    <div class="btn">
      <el-button class="item" type="primary" @click="handleSave"
        >保 存</el-button
      >
      <el-button class="item" type="danger" @click="handleToHome"
        >返 回</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'set-parameter',

  data() {
    return {
      loading: false,

      /* 服务器地址ip */
      ip: '',

      arg: []
    }
  },

  created() {
    /* 获取服务器地址IP */
    this.ip = window.localStorage.getItem('ip')

    /* 获取配置参数页的参数 */
    this.getArg()
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
          routerName: JSON.stringify('/set-parameter'),
          duration: JSON.stringify(300)
        }
      })
    },

    /**
     * @description: 获取配置参数页的参数
     */
    getArg() {
      const api = `http://${this.ip}/st_t6_m5_001_slide_detection/public/index.php/config/getArg`
      this.$axios.post(api, {}).then(res => {
        const data = res.data
        if (data.status === 1) {
          /* 成功 */
          this.arg = JSON.parse(data.result[0].arg)
        } else if (data.status === 0) {
          /* 失败 */
          this.$message({
            message: `获取配置参数页的参数失败`,
            type: 'error',
            duration: 2500
          })
        }
      })
    },

    /**
     * @description: 保存按钮
     */
    handleSave() {
      this.loading = true
      const api = `http://${this.ip}/st_t6_m5_001_slide_detection/public/index.php/config/updateArg`
      this.$axios
        .post(api, {
          arg: JSON.stringify(this.arg)
        })
        .then(res => {
          const data = res.data
          if (data.status === 1) {
            /* 成功 */
            this.$message({
              message: `保存成功`,
              type: 'success',
              duration: 2500
            })
            this.handleRefresh()
          } else if (data.status === 0) {
            /* 失败 */
            this.$message({
              message: `保存失败`,
              type: 'error',
              duration: 2500
            })
          }
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.set-parameter {
  width: 100%;
  height: 100%;
  position: relative;

  .page {
    position: absolute;
    top: 20px;
    left: 30px;
  }

  .box {
    width: 100%;
    padding: 50px 5px 0 5px;

    .row {
      .title {
        font-weight: 700;
      }
      .item {
        height: 40px;
        @include flex(row, center, center);
        font-size: 24px;
      }
    }
  }

  .btn {
    @include flex(row, center, center);
    .item {
      margin: 10px 60px;
      font-size: 28px;
    }
  }
}
</style>
