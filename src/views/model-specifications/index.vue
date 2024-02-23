<!--
 * @Author      : Mr.bin
 * @Date        : 2024-02-23 09:23:11
 * @LastEditTime: 2024-02-23 16:20:23
 * @Description : 设置规格型号
-->
<template>
  <div class="model-specifications">
    <!-- 标题 -->
    <div class="title">选择-规格型号</div>

    <div class="mian">
      <div class="specifications">
        <div class="text">规格</div>
        <el-radio-group class="radio radio-1" v-model="radioSpecifications">
          <div class="radio-item">
            <el-radio border label="15">15</el-radio>
            <el-radio border label="20">20</el-radio>
            <el-radio border label="25">25</el-radio>
          </div>
          <div class="radio-item">
            <el-radio border label="30">30</el-radio>
            <el-radio border label="35">35</el-radio>
            <el-radio border label="45">45</el-radio>
          </div>
        </el-radio-group>
      </div>

      <div class="divider"></div>

      <div class="model">
        <div class="text">型号</div>
        <el-radio-group class="radio radio-2" v-model="radioModel">
          <div class="radio-item">
            <el-radio border label="AA">AA</el-radio>
            <el-radio border label="EA">EA</el-radio>
            <el-radio border label="AN">AN</el-radio>
          </div>
          <div class="radio-item">
            <el-radio border label="HAA">HAA</el-radio>
            <el-radio border label="HEA">HEA</el-radio>
            <el-radio border label="HAN">HAN</el-radio>
          </div>
        </el-radio-group>
      </div>
    </div>

    <!-- 按钮组 -->
    <div class="btn">
      <el-button class="item" type="success" @click="handleSave"
        >保 存</el-button
      >
    </div>

    <el-button
      class="btn-back"
      icon="el-icon-back"
      type="info"
      @click="handleToHome"
      >返 回 首 页</el-button
    >
  </div>
</template>

<script>
export default {
  name: 'model-specifications',

  data() {
    return {
      radioSpecifications: '', // 规格
      radioModel: '' // 型号
    }
  },

  methods: {
    /**
     * @description: 保存
     */
    handleSave() {
      if (this.radioSpecifications === '' || this.radioModel === '') {
        this.$alert(`您好，请选择规格型号`, `提示`, {
          type: 'warning',
          showClose: false,
          center: true,
          confirmButtonText: '收 到',
          callback: () => {}
        })
      } else {
        this.$store
          .dispatch('changeSpecifications', this.radioSpecifications)
          .then(() => {
            this.$store.dispatch('changeModel', this.radioModel).then(() => {
              this.$message({
                message: '选择成功',
                type: 'success',
                duration: 2000
              })
              this.handleToHome()
            })
          })
      }
    },

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
.model-specifications {
  width: 100%;
  height: 100%;
  padding: 20px 60px;
  @include flex(column, stretch, stretch);

  .title {
    font-size: 70px;
    margin-bottom: 30px;
  }

  .mian {
    flex: 1;
    @include flex(row, space-around, stretch);
    border: 3px solid black;
    border-radius: 30px;
    .specifications,
    .model {
      width: 50%;
      @include flex(column, stretch, center);
      .text {
        font-size: 50px;
        margin: 20px 0 20px 0;
        color: red;
      }
      .radio /deep/ .el-radio__input {
        display: none;
      }
      .radio /deep/ .el-radio.is-bordered.is-checked {
        background-color: red;
      }
      .radio /deep/ .el-radio.is-bordered.is-checked .el-radio__label {
        color: #ffffff;
      }
      .radio-1 /deep/ .is-bordered {
        padding-left: 30px;
        width: 210px;
        height: 140px;
      }
      .radio-2 /deep/ .is-bordered {
        padding-top: 35px;
        padding-left: 30px;
        width: 210px;
        height: 140px;
      }
      .radio-1 /deep/ .el-radio__label {
        font-size: 100px;
        font-weight: 700;
      }
      .radio-2 /deep/ .el-radio__label {
        font-size: 60px;
        font-weight: 700;
      }
      .radio-item {
        margin: 40px 0;
      }
    }
    .divider {
      border: 2px solid black;
    }
  }

  .btn {
    margin: 20px 0;
    @include flex(row, center, center);
    .item {
      width: 190px;
      font-size: 22px;
    }
  }

  .btn-back {
    width: 190px;
    font-size: 22px;
    position: absolute;
    left: 60px;
    bottom: 40px;
  }
}
</style>
