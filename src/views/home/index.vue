<!--
 * @Author      : Mr.bin
 * @Date        : 2024-03-12 15:11:07
 * @LastEditTime: 2024-03-12 17:56:11
 * @Description : home
-->
<template>
  <div class="home">
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
            <el-button class="btn-item" type="primary" @click="handleRescan"
              >重 扫</el-button
            >
          </div>
        </div>

        <!-- 来料检测 -->
        <div></div>

        <!-- 3次气压值 -->
        <div></div>

        <!-- 结果显示 -->
        <div></div>
      </div>

      <!-- 右侧表格 -->
      <div class="table">
        <div>表格</div>
      </div>
    </div>

    <!-- 标准滑块部分 -->
    <div class="standard-slider">
      <div>标准滑块部分</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',

  data() {
    return {
      /* 规格 */
      specValue: '15',
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
      modelValue: 'AA',
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
      QRCode: ''
    }
  },

  created() {},
  mounted() {
    /* 进入页面时，二维码输入框获取鼠标焦点 */
    this.$refs.QRCodeInput.focus()
  },

  methods: {
    /**
     * @description: 规格下拉框的选中值发生变化时触发
     */
    specChange() {
      // console.log(this.specValue)
    },
    /**
     * @description: 型号下拉框的选中值发生变化时触发
     */
    modelChange() {
      // console.log(this.modelValue)
    },

    /**
     * @description: 重扫二维码按钮
     */
    handleRescan() {
      this.QRCode = ''
      this.$refs.QRCodeInput.focus() // 输入框获取鼠标焦点
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  padding: 5px 10px;
  @include flex(column, stretch, stretch);

  .slider {
    flex: 1;
    @include flex(row, stretch, stretch);
    .main {
      border: 1px solid black;
      width: 50%;
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
    }

    .table {
      border: 1px solid black;
      width: 50%;
    }
  }

  .standard-slider {
    height: 200px;
    border: 1px solid black;
  }
}
</style>
