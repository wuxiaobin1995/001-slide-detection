<!--
 * @Author      : Mr.bin
 * @Date        : 2024-03-12 15:11:07
 * @LastEditTime: 2024-04-20 11:59:11
 * @Description : home
-->
<template>
  <div class="home" v-loading.fullscreen.lock="isSaveing">
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
          <span class="text">二维码：</span>
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

        <!-- 实时距离 -->
        <div>
          <div>{{ h1 }}</div>
          <div>{{ h2 }}</div>
          <div>{{ h3 }}</div>
          <div>{{ h4 }}</div>
        </div>

        <!-- 来料检测 -->
        <div class="check">
          <div class="box">
            <div class="title">.</div>
            <div class="value">
              <el-image
                class="bit"
                :src="srcYes"
                fit="scale-down"
                v-if="bArray.length >= 2"
              ></el-image>
              <el-image
                class="bit"
                :src="srcNo"
                fit="scale-down"
                v-else
              ></el-image>
            </div>
          </div>

          <div class="box">
            <div class="title">中心距</div>
            <div class="value">{{ spacing === '' ? '/' : spacing }}</div>
          </div>

          <div class="box">
            <div class="title">合格区间</div>
            <div class="value">
              [{{ checkInterval[0] }} ~ {{ checkInterval[1] }}]
            </div>
          </div>

          <div class="box">
            <div class="title">对标值</div>
            <div class="value">
              {{ checkStandard }}
            </div>
          </div>

          <div class="box">
            <div class="title">检测结果</div>
            <div class="value">
              {{ checkResult === '' ? '/' : checkResult }}
            </div>
          </div>
        </div>

        <!-- 3次气压值 -->
        <div class="pressure">
          <div class="box">
            <div class="title">.</div>
            <div class="value">
              <el-image
                class="bit"
                :src="srcYes"
                fit="scale-down"
                v-if="bArray.length >= 1"
              ></el-image>
              <el-image
                class="bit"
                :src="srcNo"
                fit="scale-down"
                v-else
              ></el-image>
            </div>
            <div class="value">
              <el-image
                class="bit"
                :src="srcYes"
                fit="scale-down"
                v-if="bArray.length >= 2"
              ></el-image>
              <el-image
                class="bit"
                :src="srcNo"
                fit="scale-down"
                v-else
              ></el-image>
            </div>
            <div class="value">
              <el-image
                class="bit"
                :src="srcYes"
                fit="scale-down"
                v-if="bArray.length >= 3"
              ></el-image>
              <el-image
                class="bit"
                :src="srcNo"
                fit="scale-down"
                v-else
              ></el-image>
            </div>
          </div>

          <div class="box">
            <div class="title">1号气嘴</div>
            <div class="value">
              {{ bArray.length >= 1 ? h1 : '/' }}
            </div>
            <div class="value">
              {{ bArray.length >= 2 ? h1 : '/' }}
            </div>
            <div class="value">
              {{ bArray.length >= 3 ? h1 : '/' }}
            </div>
          </div>

          <div class="box">
            <div class="title">2号气嘴</div>
            <div class="value">
              {{ bArray.length >= 1 ? h2 : '/' }}
            </div>
            <div class="value">
              {{ bArray.length >= 2 ? h2 : '/' }}
            </div>
            <div class="value">
              {{ bArray.length >= 3 ? h2 : '/' }}
            </div>
          </div>

          <div class="box">
            <div class="title">3号气嘴</div>
            <div class="value">
              {{ bArray.length >= 1 ? h3 : '/' }}
            </div>
            <div class="value">
              {{ bArray.length >= 2 ? h3 : '/' }}
            </div>
            <div class="value">
              {{ bArray.length >= 3 ? h3 : '/' }}
            </div>
          </div>

          <div class="box">
            <div class="title">4号气嘴</div>
            <div class="value">
              {{ bArray.length >= 1 ? h4 : '/' }}
            </div>
            <div class="value">
              {{ bArray.length >= 2 ? h4 : '/' }}
            </div>
            <div class="value">
              {{ bArray.length >= 3 ? h4 : '/' }}
            </div>
          </div>
        </div>

        <!-- 滑块精度结果 -->
        <div class="sliderAccuracy">
          <div class="box">
            <div class="title">.</div>
            <div class="value">结果</div>
          </div>

          <div class="box">
            <div class="title">等高</div>
            <div class="value">
              {{ dg !== '' ? dg : '/' }}
            </div>
          </div>

          <div class="box">
            <div class="title">到A</div>
            <div class="value">
              {{ toA !== '' ? toA : '/' }}
            </div>
          </div>

          <div class="box">
            <div class="title">到B</div>
            <div class="value">
              {{ toB !== '' ? toB : '/' }}
            </div>
          </div>

          <div class="box">
            <div class="title">A平行</div>
            <div class="value">
              {{ aParallel !== '' ? aParallel : '/' }}
            </div>
          </div>

          <div class="box">
            <div class="title">B平行</div>
            <div class="value">
              {{ bParallel !== '' ? bParallel : '/' }}
            </div>
          </div>

          <div class="box">
            <div class="title">精度等级</div>
            <div class="value">
              {{ accuracyClass !== '' ? accuracyClass : '/' }}
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧表格 -->
      <div class="table">
        <el-table
          :data="tableData"
          style="width: 100%"
          height="100%"
          :default-sort="{ prop: 'create_time', order: 'ascending' }"
          :stripe="false"
          :border="true"
          v-loading="tableLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <!-- 二维码 -->
          <el-table-column align="center" prop="QRCode" label="二维码" fixed />
          <!-- 测量时间 -->
          <el-table-column
            align="center"
            prop="create_time"
            label="测量时间"
            width="190"
          />
          <!-- 规格 -->
          <el-table-column
            align="center"
            prop="specValue"
            label="规格"
            width="60"
          />
          <!-- 型号 -->
          <el-table-column
            align="center"
            prop="modelValue"
            label="型号"
            width="80"
          />
          <!-- 等高 -->
          <el-table-column align="center" prop="dg" label="等高" width="80" />
          <!-- 到A -->
          <el-table-column align="center" prop="toA" label="到A" width="80" />
          <!-- 到B -->
          <el-table-column align="center" prop="toB" label="到B" width="80" />
          <!-- A平行 -->
          <el-table-column
            align="center"
            prop="aParallel"
            label="A平行"
            width="80"
          />
          <!-- B平行 -->
          <el-table-column
            align="center"
            prop="bParallel"
            label="B平行"
            width="80"
          />
          <!-- 精度等级 -->
          <el-table-column
            align="center"
            prop="accuracyClass"
            label="精度等级"
            width="50"
          />
          <!-- 中心距 -->
          <el-table-column
            align="center"
            prop="spacing"
            label="中心距"
            width="100"
          />
          <!-- 是否合格 -->
          <el-table-column
            align="center"
            prop="checkResult"
            label="是否合格"
            width="80"
          />

          <!-- 删除按钮 -->
          <el-table-column label="删除操作" align="center" width="150">
            <template slot-scope="scope">
              <el-button
                type="danger"
                plain
                icon="el-icon-delete"
                @click="handleDeleteTableData(scope.$index, scope.row)"
                >删 除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 标准滑块部分 -->
    <div class="standard-slider">
      <div class="head-title">
        <div>标准</div>
        <div>滑块</div>
      </div>

      <div class="content">
        <div class="box">
          <div class="title">.</div>
          <div class="item">
            <el-image
              class="bit"
              :src="srcYes"
              fit="scale-down"
              v-if="aArray.length === 1"
            ></el-image>
            <el-image
              class="bit"
              :src="srcNo"
              fit="scale-down"
              v-else
            ></el-image>
          </div>
        </div>

        <div class="box">
          <div class="title">1号气嘴</div>
          <div class="value">
            {{ aArray.length === 1 ? h1 : '/' }}
          </div>
        </div>

        <div class="box">
          <div class="title">2号气嘴</div>
          <div class="value">
            {{ aArray.length === 1 ? h2 : '/' }}
          </div>
        </div>

        <div class="box">
          <div class="title">3号气嘴</div>
          <div class="value">
            {{ aArray.length === 1 ? h3 : '/' }}
          </div>
        </div>

        <div class="box">
          <div class="title">4号气嘴</div>
          <div class="value">
            {{ aArray.length === 1 ? h4 : '/' }}
          </div>
        </div>
      </div>

      <!-- 按钮组 -->
      <div class="btn">
        <el-button class="item" type="primary" @click="handleClearStandard"
          >清 空 标 准 滑 块</el-button
        >
        <el-button class="item" type="primary" @click="handleRefresh"
          >刷 新 页 面</el-button
        >
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
    <!-- 开发者页按钮 -->
    <el-button
      class="btn-developer"
      type="info"
      size="mini"
      @click="handleToDeveloper"
      >Developer</el-button
    >
    <!-- 参数配置 -->
    <el-button
      class="btn-parameter"
      type="info"
      size="mini"
      @click="handleParameter"
      >参数配置</el-button
    >
    <!-- 设置abcd -->
    <el-button class="btn-abcd" type="info" size="mini" @click="handleSetABCD"
      >设置abcd</el-button
    >
    <!-- 原始数据显示 -->
    <el-button
      class="btn-rawdata"
      type="info"
      size="mini"
      @click="handleRawData"
      >原始数据显示</el-button
    >
  </div>
</template>

<script>
/* 用于打开控制台 */
import { remote } from 'electron'

/* 串口通信库 */
import SerialPort from 'serialport'
import Readline from '@serialport/parser-readline'

export default {
  name: 'home',

  data() {
    return {
      /* 串口相关 */
      usbPort: null,
      parser: null,
      scmBaudRate: 115200,

      /* 状态标志位 */
      isSaveing: false, // 计算和调用api状态

      /* 标记是否已测 */
      srcYes: require('@/assets/img/Home/已测.png'),
      srcNo: require('@/assets/img/Home/待测.png'),

      /* 服务器地址ip */
      ip: '',

      /* 4组abcd常数数组 */
      abcdArrs: [],

      /* 表格 */
      tableData: [],
      tableLoading: false, // 表格加载动画

      /* 配置参数 */
      arg: [
        {
          gx: '15DA', // 规格型号
          QRCode: '', // 滑块二维码编号
          dgCS: 0, // 等高常数
          toACS: 0, // 到A常数
          toBCS: 0, // 到B常数
          checkIntervalUp: 0, // 中心距上限
          checkIntervalDown: 0, // 中心距下限
          checkStandard: 0 // 对标值
        },
        {
          gx: '15AA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '15EA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '15FA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '15AN',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '15HAA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '15HEA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '15HFA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '15HAN',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '20DA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '20AA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '20EA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '20FA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '20AN',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '20HAA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '20HEA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '20HFA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '20HAN',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '25DA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '25AA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '25EA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '25FA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '25AN',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '25HAA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '25HEA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '25HFA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '25HAN',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '30DA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '30AA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '30EA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '30FA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '30AN',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '30HAA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '30HEA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '30HFA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '30HAN',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '35DA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '35AA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '35EA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '35FA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '35AN',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '35HAA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '35HEA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '35HFA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '35HAN',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '45DA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '45AA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '45EA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '45FA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '45AN',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '45HAA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '45HEA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '45HFA',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        },
        {
          gx: '45HAN',
          QRCode: '',
          dgCS: 0,
          toACS: 0,
          toBCS: 0,
          checkIntervalUp: 0,
          checkIntervalDown: 0,
          checkStandard: 0
        }
      ],

      dgCS: 0, // 等高常数
      toACS: 0, // 到A常数
      toBCS: 0, // 到B常数

      /* 规格 */
      specValue: '',
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
      modelValue: '',
      modelSelection: [
        {
          value: 'AA'
        },
        {
          value: 'DA'
        },
        {
          value: 'EA'
        },
        {
          value: 'FA'
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
          value: 'HFA'
        },
        {
          value: 'HAN'
        }
      ],

      /* 二维码编号（滑块的身份证） */
      QRCode: '',

      /* 来料检测 */
      checkInterval: [0, 0], // 来料检测区间（只有两种，标准长度和加长）
      checkStandard: 0, // 对标值（不同规格、不同型号，就不同）
      spacing: '', // 中心距值，用于判断是否在区间内
      checkResult: '', // 来料检测结果

      /* 标准滑块源数组，中间位置按一下即可，格式比如 [气嘴1, 气嘴2, 气嘴3, 气嘴4] */
      aArray: [],
      /* 来料检测和被测滑块源数组，格式比如 [[气嘴1, 气嘴2, 气嘴3, 气嘴4], [气嘴1, 气嘴2, 气嘴3, 气嘴4, 压力数字量], [气嘴1, 气嘴2, 气嘴3, 气嘴4]] */
      bArray: [],

      /* 滑块表面到喷嘴的距离 */
      h1: 0,
      h2: 0,
      h3: 0,
      h4: 0,

      /* 滑块的精度 */
      dg: '', // 等高
      toA: '', // 到A
      toB: '', // 到B
      aParallel: '', // A平行
      bParallel: '', // B平行
      accuracyClass: '' // 精度等级
    }
  },

  created() {
    /* 从Vuex中获取规格、型号的初始值 */
    this.specValue = this.$store.state.spec ? this.$store.state.spec : '15'
    this.modelValue = this.$store.state.model ? this.$store.state.model : 'AA'

    /* 从SessionStorage获取标准滑块源数组 */
    this.aArray = JSON.parse(
      window.sessionStorage.getItem('standard_slider_value')
    )

    /* 获取服务器地址IP */
    this.ip = window.localStorage.getItem('ip')

    /* 获取4组abcd常数数组 */
    this.abcdArrs = JSON.parse(window.localStorage.getItem('abcdArrs'))

    /* 开启串口通信 */
    this.initSerialPort()

    /* 获取配置参数页的参数 */
    this.getArg()

    /* 获取表格数据 */
    // this.getTableData()
  },
  mounted() {
    /* 二维码输入框获取鼠标焦点 */
    this.QRFocus()
  },
  beforeDestroy() {
    if (this.usbPort) {
      if (this.usbPort.isOpen) {
        this.usbPort.close()
      }
    }
  },

  methods: {
    /**
     * @description: 刷新页面按钮
     */
    handleRefresh() {
      this.$router.push({
        path: '/refresh',
        query: {
          routerName: JSON.stringify('/'),
          duration: JSON.stringify(300)
        }
      })
    },

    /**
     * @description: 获取配置参数页的参数
     */
    getArg() {
      const api = `http://${this.ip}/st_t6_m5_001_slide_detection/public/index.php/config/getArg`
      this.$axios
        .post(api, {})
        .then(res => {
          const data = res.data
          if (data.status === 1) {
            /* 成功 */
            if (data.result.length === 0) {
              // 顺便增添到数据库里
              const api = `http://${this.ip}/st_t6_m5_001_slide_detection/public/index.php/config/setArg`
              this.$axios.post(api, {
                arg: JSON.stringify(this.arg)
              })
            } else {
              this.arg = JSON.parse(data.result[0].arg)
            }
          } else if (data.status === 0) {
            /* 失败 */
            this.$message({
              message: `获取配置参数页的参数失败`,
              type: 'error',
              duration: 2500
            })
          }
        })
        .finally(() => {
          this.countArg()
        })
    },

    /**
     * @description: 根据不同的规格、型号，计算对应的参数
     */
    countArg() {
      const gx = `${this.specValue}${this.modelValue}`
      for (let i = 0; i < this.arg.length; i++) {
        const element = this.arg[i]
        if (element.gx === gx) {
          this.dgCS = element.dgCS
          this.toACS = element.toACS
          this.toBCS = element.toBCS
          this.checkInterval = [
            element.checkIntervalDown,
            element.checkIntervalUp
          ]
          this.checkStandard = element.checkStandard
        }
      }
    },

    /**
     * @description: 获取表格数据
     */
    getTableData() {
      this.tableLoading = true
      const api = `http://${this.ip}/st_t6_m5_001_slide_detection/public/index.php/slideDetection/getData`
      this.$axios
        .post(api, {
          num: 6
        })
        .then(res => {
          const data = res.data
          if (data.status === 1) {
            /* 成功 */
            this.tableData = data.result
          } else if (data.status === 0) {
            /* 失败 */
            this.$message({
              message: `表格数据获取失败`,
              type: 'error',
              duration: 2500
            })
          }
        })
        // .catch(err => {
        //   this.$alert(
        //     `[查-环节] ${err}。请确保网络连接正常！`,
        //     '网络请求错误',
        //     {
        //       type: 'error',
        //       showClose: false, // 是否显示右上角关闭按钮
        //       center: false, // 是否居中布局
        //       confirmButtonText: '刷新页面', // 确定按钮的文本内容
        //       callback: () => {
        //         this.handleRefresh()
        //       }
        //     }
        //   )
        // })
        .finally(() => {
          this.tableLoading = false
        })
    },

    /**
     * @description: 删除按钮
     * @param {*} index
     * @param {*} row
     */
    handleDeleteTableData(index, row) {
      this.$confirm('此操作将"永久删除"该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          const api = `http://${this.ip}/st_t6_m5_001_slide_detection/public/index.php/slideDetection/deleteData`
          this.$axios
            .post(api, {
              QRCode: row.QRCode
            })
            .then(res => {
              const data = res.data
              if (data.status === 1) {
                /* 成功 */
                this.$message({
                  message: `删除成功`,
                  type: 'success',
                  duration: 2500
                })
              } else if (data.status === 0) {
                /* 失败 */
                this.$message({
                  message: `删除失败`,
                  type: 'error',
                  duration: 2500
                })
              } else if (data.status === -2) {
                /* 二维码不存在 */
                this.$alert(
                  `二维码不存在，请点击“刷新页面”按钮！`,
                  `状态码[${data.status}]`,
                  {
                    type: 'error',
                    showClose: false,
                    center: true,
                    confirmButtonText: '刷新页面',
                    callback: () => {
                      this.handleRefresh()
                    }
                  }
                )
              } else if (data.status === -11) {
                /* 参数有误 */
                this.$alert(
                  `参数有误，请点击“刷新页面”按钮！`,
                  `状态码[${data.status}]`,
                  {
                    type: 'error',
                    showClose: false,
                    center: true,
                    confirmButtonText: '刷新页面',
                    callback: () => {
                      this.handleRefresh()
                    }
                  }
                )
              }
            })
            .catch(err => {
              this.$alert(
                `[删-环节] ${err}。请确保网络连接正常！`,
                '网络请求错误',
                {
                  type: 'error',
                  showClose: false, // 是否显示右上角关闭按钮
                  center: false, // 是否居中布局
                  confirmButtonText: '刷新页面', // 确定按钮的文本内容
                  callback: () => {
                    this.handleRefresh()
                  }
                }
              )
            })
            .finally(() => {
              this.getTableData()
            })
        })
        .catch(() => {})
    },

    /**
     * @description: 更新数据函数
     */
    updateTableData() {
      this.$confirm('数据库中已存在这个二维码编号, 是否要覆盖旧数据?', '提示', {
        confirmButtonText: '覆 盖',
        cancelButtonText: '取 消',
        type: 'warning',
        center: true,
        showClose: false,
        closeOnClickModal: false,
        closeOnPressEscape: false
      })
        .then(() => {
          const api = `http://${this.ip}/st_t6_m5_001_slide_detection/public/index.php/slideDetection/updateData`
          this.$axios
            .post(api, {
              QRCode: this.QRCode,
              specValue: this.specValue,
              modelValue: this.modelValue,
              spacing: this.spacing,
              checkResult: this.checkResult,
              dg: this.dg,
              toA: this.toA,
              toB: this.toB,
              aParallel: this.aParallel,
              bParallel: this.bParallel,
              accuracyClass: this.accuracyClass
            })
            .then(res => {
              const data = res.data
              if (data.status === 1) {
                /* 成功 */
                this.$message({
                  message: `覆盖成功`,
                  type: 'success',
                  duration: 2500
                })
                this.handleRefresh()
              } else if (data.status === 0) {
                /* 失败 */
                this.$message({
                  message: `覆盖失败`,
                  type: 'error',
                  duration: 2500
                })
                this.handleRefresh()
              } else if (data.status === -2) {
                /* 二维码不存在 */
                this.$alert(
                  `二维码不存在，请点击“刷新页面”按钮，然后重新测量！`,
                  `状态码[${data.status}]`,
                  {
                    type: 'error',
                    showClose: false,
                    center: true,
                    confirmButtonText: '刷新页面',
                    callback: () => {
                      this.handleRefresh()
                    }
                  }
                )
              } else if (data.status === -11) {
                /* 参数有误 */
                this.$alert(
                  `参数有误，请点击“刷新页面”按钮，然后重新测量！`,
                  `状态码[${data.status}]`,
                  {
                    type: 'error',
                    showClose: false,
                    center: true,
                    confirmButtonText: '刷新页面',
                    callback: () => {
                      this.handleRefresh()
                    }
                  }
                )
              }
            })
            .catch(err => {
              this.$alert(
                `[改-环节] ${err}。请确保网络连接正常！`,
                '网络请求错误',
                {
                  type: 'error',
                  showClose: false, // 是否显示右上角关闭按钮
                  center: false, // 是否居中布局
                  confirmButtonText: '刷新页面', // 确定按钮的文本内容
                  callback: () => {
                    this.handleRefresh()
                  }
                }
              )
            })
            .finally(() => {})
        })
        .catch(() => {
          this.handleRefresh()
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
    },
    /**
     * @description: 前往开发者页
     */
    handleToDeveloper() {
      this.$prompt('请输入密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^htpm$/,
        inputErrorMessage: '密码不正确',
        showClose: true,
        closeOnClickModal: false
      })
        .then(() => {
          this.$router.push({
            path: '/set-developer'
          })
        })
        .catch(() => {})
    },
    /**
     * @description: 前往参数配置
     */
    handleParameter() {
      this.$prompt('请输入密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^st$/,
        inputErrorMessage: '密码不正确',
        showClose: true,
        closeOnClickModal: false
      })
        .then(() => {
          this.$router.push({
            path: '/set-parameter'
          })
        })
        .catch(() => {})
    },
    /**
     * @description: 前往设置abcd常数
     */
    handleSetABCD() {
      this.$prompt('请输入密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^st$/,
        inputErrorMessage: '密码不正确',
        showClose: true,
        closeOnClickModal: false
      })
        .then(() => {
          this.$router.push({
            path: '/set-abcd'
          })
        })
        .catch(() => {})
    },
    /**
     * @description: 前往原始数据显示页
     */
    handleRawData() {
      this.$router.push({
        path: '/set-rawData'
      })
    },

    /**
     * @description: 重扫二维码按钮
     */
    handleRescan() {
      this.QRCode = ''
      this.QRFocus() // 二维码输入框获取鼠标焦点
    },

    /**
     * @description: 二维码输入框获取鼠标焦点函数
     */
    QRFocus() {
      this.$refs.QRCodeInput.focus()
    },

    /**
     * @description: 规格下拉框的选中值发生变化时触发
     */
    specChange() {
      this.$store.dispatch('changeSpec', this.specValue).then(() => {
        this.$message({
          message: `规格选择成功，为：${this.specValue}`,
          type: 'success',
          duration: 2500
        })

        // 清空标准滑块源数组
        this.aArray = []
        window.sessionStorage.setItem(
          'standard_slider_value',
          JSON.stringify([])
        )

        // 中心距值
        this.spacing = ''
        // 来料检测结果
        this.checkResult = ''
        // 清空来料检测和被测滑块源数组
        this.bArray = []

        this.countArg()

        // 二维码输入框获取鼠标焦点
        this.QRFocus()
      })
    },
    /**
     * @description: 型号下拉框的选中值发生变化时触发
     */
    modelChange() {
      this.$store.dispatch('changeModel', this.modelValue).then(() => {
        this.$message({
          message: `型号选择成功，为：${this.modelValue}`,
          type: 'success',
          duration: 2500
        })

        // 清空标准滑块源数组
        this.aArray = []
        window.sessionStorage.setItem(
          'standard_slider_value',
          JSON.stringify([])
        )

        // 中心距值
        this.spacing = ''
        // 来料检测结果
        this.checkResult = ''
        // 清空来料检测和被测滑块源数组
        this.bArray = []

        this.countArg()

        // 二维码输入框获取鼠标焦点
        this.QRFocus()
      })
    },

    /**
     * @description: 清空标准滑块源数组按钮
     */
    handleClearStandard() {
      this.$confirm('是否要清空标准滑块的基准数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        type: 'warning'
      })
        .then(() => {
          this.aArray = []
          window.sessionStorage.setItem(
            'standard_slider_value',
            JSON.stringify([])
          )
          this.$message({
            message: `标准滑块数据清空完成`,
            type: 'success',
            duration: 5000
          })
        })
        .catch(() => {})

      this.QRFocus() // 二维码输入框获取鼠标焦点
    },

    /**
     * @description: 串口通信
     */
    initSerialPort() {
      SerialPort.list()
        .then(ports => {
          /* 遍历设备的USB串口，目标设备需安装驱动 */
          let comPath = ''
          for (const port of ports) {
            if (/^USB/.test(port.pnpId)) {
              comPath = port.path
              break
            }
          }

          /* 验证USB有没有连接到电脑，但不能验证有无数据发送给上位机 */
          if (comPath) {
            /**
             * @description: 创建串口实例
             * @param {String} comPath 串行端口的系统路径。例如：在Mac、Linux上的/dev/tty.XXX或Windows上的COM1
             * @param {Object} 配置项
             */
            this.usbPort = new SerialPort(comPath, {
              baudRate: this.scmBaudRate, // 默认波特率115200
              autoOpen: true // 是否自动开启串口
            })
            /* 调用 this.usbPort.open() 成功时触发（开启串口成功） */
            this.usbPort.on('open', () => {})
            /* 调用 this.usbPort.open() 失败时触发（开启串口失败） */
            this.usbPort.on('error', () => {
              this.$alert(
                `请重新连接USB线，然后点击"刷新页面"按钮！`,
                '串口开启失败',
                {
                  type: 'error',
                  showClose: false,
                  center: true,
                  confirmButtonText: '刷新页面',
                  callback: () => {
                    this.handleRefresh()
                  }
                }
              )
            })

            this.parser = this.usbPort.pipe(new Readline({ delimiter: '\n' }))
            this.parser.on('data', data => {
              /* 如果处于计算和调用后端api保存状态，就不触发，防止出bug */
              if (this.isSaveing === false) {
                // console.log(data)

                if (data === 'a') {
                  console.log('a')
                } else if (data === 'b') {
                  console.log('b')
                } else if (data === 'c') {
                  console.log('c')
                } else {
                  /* 数据预处理 */
                  const dataArray = data.split(',') // 将原始数据以逗号作为分割符，组成一个数组

                  /* 前一个是出口值，后一个是入口值（即基准） */
                  const qz_1 = dataArray[0]
                  const qz_1s = dataArray[1]
                  const qz_2 = dataArray[2]
                  const qz_2s = dataArray[3]
                  const qz_3 = dataArray[4]
                  const qz_3s = dataArray[5]
                  const qz_4 = dataArray[6]
                  const qz_4s = dataArray[7]

                  /* 5位压力数字量 */
                  // const pressureDigital = dataArray[8]

                  /* 4个气嘴的x，公式：出口÷入口 */
                  const x1 = qz_1 / qz_1s
                  const x2 = qz_2 / qz_2s
                  const x3 = qz_3 / qz_3s
                  const x4 = qz_4 / qz_4s

                  /* 4组abcd常数，在abcd页面输入 */
                  const a1 = this.abcdArrs[0][0]
                  const b1 = this.abcdArrs[0][1]
                  const c1 = this.abcdArrs[0][2]
                  const d1 = this.abcdArrs[0][3]

                  const a2 = this.abcdArrs[1][0]
                  const b2 = this.abcdArrs[1][1]
                  const c2 = this.abcdArrs[1][2]
                  const d2 = this.abcdArrs[1][3]

                  const a3 = this.abcdArrs[2][0]
                  const b3 = this.abcdArrs[2][1]
                  const c3 = this.abcdArrs[2][2]
                  const d3 = this.abcdArrs[2][3]

                  const a4 = this.abcdArrs[3][0]
                  const b4 = this.abcdArrs[3][1]
                  const c4 = this.abcdArrs[3][2]
                  const d4 = this.abcdArrs[3][3]

                  /*
                   * 计算公式，是一个传递函数，陈少新给的
                   * h = a*(出口÷入口)^3 + b*(出口÷入口)^2 + c*(出口÷入口) + d
                   */
                  this.h1 = parseInt(
                    a1 * x1 * x1 * x1 + b1 * x1 * x1 + c1 * x1 + d1
                  )
                  this.h2 = parseInt(
                    a2 * x2 * x2 * x2 + b2 * x2 * x2 + c2 * x2 + d2
                  )
                  this.h3 = parseInt(
                    a3 * x3 * x3 * x3 + b3 * x3 * x3 + c3 * x3 + d3
                  )
                  this.h4 = parseInt(
                    a4 * x4 * x4 * x4 + b4 * x4 * x4 + c4 * x4 + d4
                  )
                  console.log(this.h1)
                  console.log(this.h2)
                  console.log(this.h3)
                  console.log(this.h4)
                }
              }
            })
          } else {
            this.$alert(
              `请重新连接USB线，然后点击"刷新页面"按钮！`,
              `没有检测到USB连接`,
              {
                type: 'error',
                showClose: false,
                center: true,
                confirmButtonText: '刷新页面',
                callback: () => {
                  this.handleRefresh()
                }
              }
            )
          }
        })
        .catch(err => {
          this.$alert(
            `${err}。请重新连接USB线，然后点击"刷新页面"按钮！`,
            `初始化SerialPort.list失败`,
            {
              type: 'error',
              showClose: false,
              center: true,
              confirmButtonText: '刷新页面',
              callback: () => {
                this.handleRefresh()
              }
            }
          )
        })
    },

    /**
     * @description: 计算和调用api函数逻辑
     */
    save() {
      this.isSaveing = true // 开始计算和调用api操作

      /* 判断一下数据 */
      if (this.QRCode !== '') {
        if (this.aArray.length === 1) {
          /* 1、根据公式，计算等高、到A、到B、A平行、B平行、滑块精度等 */

          // let n = 2 // 法兰型n=3，矩型n=2
          // if (this.modelValue === 'EA' || this.modelValue === 'HEA') {
          //   n = 3
          // }

          // // 等高（um微米，1um=0.001mm）
          // this.dg = parseInt(
          //   (
          //     (this.k3 * this.bArray[1][2] -
          //       this.k1 * this.bArray[1][0] -
          //       (this.k3 * this.aArray[2] - this.k1 * this.aArray[0])) /
          //       n +
          //     this.dgCS
          //   ).toFixed(0)
          // )
          // // 到A
          // this.toA = parseInt(
          //   (
          //     this.k2 * (this.bArray[1][1] - this.aArray[1]) +
          //     this.toACS
          //   ).toFixed(0)
          // )
          // // 到B
          // this.toB = parseInt(
          //   (
          //     this.k4 * (this.bArray[1][3] - this.aArray[3]) +
          //     this.toBCS
          //   ).toFixed(0)
          // )
          // // A平行
          // this.aParallel = parseInt(
          //   (
          //     this.k2 *
          //     (Math.max(
          //       ...[this.bArray[0][1], this.bArray[1][1], this.bArray[2][1]]
          //     ) -
          //       Math.min(
          //         ...[this.bArray[0][1], this.bArray[1][1], this.bArray[2][1]]
          //       ))
          //   ).toFixed(0)
          // )
          // // B平行
          // this.bParallel = parseInt(
          //   (
          //     this.k4 *
          //     (Math.max(
          //       ...[this.bArray[0][3], this.bArray[1][3], this.bArray[2][3]]
          //     ) -
          //       Math.min(
          //         ...[this.bArray[0][3], this.bArray[1][3], this.bArray[2][3]]
          //       ))
          //   ).toFixed(0)
          // )
          // 精度等级
          if (
            Math.abs(this.dg) <= 20 &&
            Math.abs(this.toA) <= 30 &&
            Math.abs(this.toB) <= 30 &&
            this.aParallel <= 10 &&
            this.bParallel <= 15
          ) {
            this.accuracyClass = 'E'
          } else if (
            Math.abs(this.dg) > 50 ||
            Math.abs(this.toA) > 100 ||
            Math.abs(this.toB) > 120 ||
            this.aParallel > 40 ||
            this.bParallel > 40
          ) {
            this.accuracyClass = '报废'
          } else {
            this.accuracyClass = 'N'
          }

          /* 2、调用API插入数据 */
          const api = `http://${this.ip}/st_t6_m5_001_slide_detection/public/index.php/slideDetection/setData`
          this.$axios
            .post(api, {
              QRCode: this.QRCode,
              specValue: this.specValue,
              modelValue: this.modelValue,
              spacing: this.spacing,
              checkResult: this.checkResult,
              dg: this.dg,
              toA: this.toA,
              toB: this.toB,
              aParallel: this.aParallel,
              bParallel: this.bParallel,
              accuracyClass: this.accuracyClass
            })
            .then(res => {
              const data = res.data
              if (data.status === 1) {
                /* 上传成功 */
                this.$message({
                  message: `数据上传成功。`,
                  type: 'success',
                  duration: 2000
                })
                this.handleRefresh()
              } else if (data.status === 0) {
                /* 上传失败 */
                this.$alert(
                  `数据上传失败，请点击“刷新页面”按钮，然后重新测量！`,
                  `状态码[${data.status}]`,
                  {
                    type: 'error',
                    showClose: false,
                    center: true,
                    confirmButtonText: '刷新页面',
                    callback: () => {
                      this.handleRefresh()
                    }
                  }
                )
              } else if (data.status === -4) {
                /* 参数有误 */
                this.$alert(
                  `参数有误，请点击“刷新页面”按钮，然后重新测量！`,
                  `状态码[${data.status}]`,
                  {
                    type: 'error',
                    showClose: false,
                    center: true,
                    confirmButtonText: '刷新页面',
                    callback: () => {
                      this.handleRefresh()
                    }
                  }
                )
              } else if (data.status === -5) {
                /* 二维码已存在 */
                this.updateTableData()
              }
            })
            .catch(err => {
              this.$alert(
                `[增-环节] ${err}。请确保网络连接正常！`,
                '网络请求错误',
                {
                  type: 'error',
                  showClose: false, // 是否显示右上角关闭按钮
                  center: false, // 是否居中布局
                  confirmButtonText: '刷新页面', // 确定按钮的文本内容
                  callback: () => {
                    this.handleRefresh()
                  }
                }
              )
            })
            .finally(() => {})
        } else {
          this.$alert(
            `标准滑块的基准数据为空，请点击"刷新页面"按钮，重新测量"标准滑块"的值！`,
            '警告',
            {
              type: 'error',
              showClose: false,
              center: true,
              confirmButtonText: '刷新页面',
              callback: () => {
                this.handleRefresh()
              }
            }
          )
        }
      } else {
        this.$alert(
          `二维码为空，请点击"刷新页面"按钮，重新测量一次！`,
          '警告',
          {
            type: 'error',
            showClose: false,
            center: true,
            confirmButtonText: '刷新页面',
            callback: () => {
              this.handleRefresh()
            }
          }
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  padding: 5px 10px;
  position: relative;
  @include flex(column, stretch, stretch);

  /* 被测滑块部分 */
  .slider {
    flex: 1;
    @include flex(row, stretch, stretch);
    /* 左侧内容区域 */
    .main {
      width: 55%;
      border-right: 2px solid black;
      /* 是否已测标志 */
      .bit {
        width: 40px;
      }
      /* 规格型号 */
      .gx {
        margin-top: 10px;
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
      /* 二维码 */
      .QRCode {
        border-bottom: 2px solid black;
        margin-top: 20px;
        padding-bottom: 20px;
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
      /* 来料检测 */
      .check {
        margin-top: 10px;
        margin-right: 20px;
        @include flex(row, space-between, stretch);
        .box {
          @include flex(column, space-around, center);
          .title {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 10px;
          }
          .value {
            font-size: 20px;
          }
        }
      }
      /* 3次气压值 */
      .pressure {
        margin-top: 40px;
        margin-right: 20px;
        @include flex(row, space-between, stretch);
        .box {
          @include flex(column, space-around, center);
          .title {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 10px;
          }
          .value {
            font-size: 20px;
          }
        }
      }
      /* 滑块精度 */
      .sliderAccuracy {
        margin-top: 60px;
        margin-right: 20px;
        @include flex(row, space-between, stretch);
        .box {
          @include flex(column, space-around, center);
          .title {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 15px;
          }
          .value {
            font-size: 20px;
          }
        }
      }
    }

    /* 表格区域 */
    .table {
      width: 45%;
    }
  }

  /* 标准滑块部分 */
  .standard-slider {
    height: 22%;
    border-top: 2px solid black;
    @include flex(row, stretch, stretch);
    /* 是否已测标志 */
    .bit {
      width: 35px;
    }
    .head-title {
      width: 100px;
      font-size: 30px;
      @include flex(column, center, center);
    }
    .content {
      width: 50%;
      @include flex(row, space-around, stretch);
      .box {
        @include flex(column, space-around, center);
        .title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .value {
          font-size: 20px;
        }
      }
    }
    .btn {
      flex: 1;
      @include flex(row, space-around, center);
    }
  }

  /* 打开控制台按钮 */
  .btn-control {
    position: absolute;
    right: 0;
    bottom: 0;
  }
  /* 开发者页按钮 */
  .btn-developer {
    position: absolute;
    right: 100px;
    bottom: 0;
  }
  /* 参数配置 */
  .btn-parameter {
    position: absolute;
    right: 200px;
    bottom: 0;
  }
  /* abcd */
  .btn-abcd {
    position: absolute;
    right: 300px;
    bottom: 0;
  }
  /* 原始数据显示 */
  .btn-rawdata {
    position: absolute;
    right: 400px;
    bottom: 0;
  }
}
</style>
