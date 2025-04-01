<template>
  <div>
    <DescriptionWWcyc />

    <h2>辐流式初沉淀</h2>
    <p>.</p>
    <IntroElement />

    <h4>请在下方的表单区输入主要设计参数，然后点击开始计算。在开始计算按钮下方会根据您的输入更新计算书。</h4>
    <h4>如果遇到不确定的参数，可以尝试表单中的默认参数，可查询崔玉川的书、排水规范、设计手册等，也可以使用AI人工智能工具进行提问。</h4>
    <h4>
      了解计算过程，请
      <a href="../../../public/ChenShen3.pdf" target="_blank">点击查看计算书</a>
    </h4>
    <el-divider />
    <!-- 基于Vue3和ElementPlus的form表单，有提交按钮 -->
    <el-form :model="form" ref="formRef" status-icon>
      <!-- 表单项目 -->
      <el-form-item v-for="(item, key) in formItems" :key="key" :rules="commonRules" :prop="key">
        <span>{{ item.label }}</span>
        <el-input-number v-model="form[key]" :controls="false" @change="hideReport"></el-input-number>
      </el-form-item>

      <!-- 一个CheckBox要求用户必须勾选，以同意服务协议和隐私政策 -->
      <el-form-item>
        <el-checkbox v-model="form.agree" required>
          我已阅读并同意
          <RouterLink to="/ServiceAgreement">服务协议</RouterLink>
          和
          <RouterLink to="/PrivacyPolicy">隐私政策</RouterLink>
        </el-checkbox>
      </el-form-item>

      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)" v-loading="formLoading">开始计算</el-button>
        <el-button type="primary" v-if="reportVisibility" @click="genReport"
          v-loading="reportLoading">生成Docx格式Word文档</el-button>
      </el-form-item>
      <p>点击开始计算后，系统会进行计算，计算完成后，下方的计算书会根据计算结果相应更新。<br>
        同时，此处会增加一个生成Docx格式Word文档的按钮，点击后，可以生成报告。</p>
    </el-form>
    <el-divider />

    <div id="report" v-if="reportVisibility" class="no-print">
      <h1>初沉池设计计算</h1>

      <h2>1. 设计计算步骤</h2>

      <h3>(1) 沉淀部分水面面积 F</h3>
      <p>\[ F = \frac{Q_{max}}{nq'} \]</p>
      <ul>
        <li>\( Q_{max} \)：最大设计流量，{{ form.Q_max }} m³/d</li>
        <li>\( n \)：池数，{{ form.n }} 个</li>
        <li>\( q' \)：表面负荷，{{ form.q }} m³/(m²·h)</li>
      </ul>
      <p>\[ Q_{max} = \frac{ {{ form.Q_max }} }{24} = {{ form.Q_max_h }} \, \text{m}^3/\text{h} \]</p>
      <p>\[ F = \frac{ {{ form.Q_max_h }} }{ {{form.n}}  \times  {{form.q }} } = {{ form.F }} \,
        \text{m}^2 \]</p>

      <img src="../../assets/images/ChuChen3_1.jpg" alt="辐流式沉淀池设计图">
      <h3>(2) 池子直径 D</h3>
      <p>\[ D = \sqrt{\frac{4F}{\pi}} \]</p>
      <p>\[ D = \sqrt{\frac{4 \times {{ form.F }}}{3.14}} = {{ form.D }} \, \text{m} \]</p>

      <h3>(3) 有效水深 h₂</h3>
      <p>\[ h_2 = q't \]</p>
      <ul>
        <li>\( t \)：沉淀时间，{{ form.t }} h</li>
      </ul>
      <p>\[ h_2 = {{ form.q }} \times {{ form.t }} = {{ form.h_2 }} \, \text{m} \]</p>

      <h3>(4) 每天污泥量 V</h3>
      <p>\[ V = \frac{SNT}{1000n} \]</p>
      <ul>
        <li>\( S \)：每人每日污泥量，{{ form.S }} L/(人·d)</li>
        <li>\( N \)：设计入口数，{{ form.N }} 万人</li>
        <li>\( T \)：清除污泥间隔时间，{{ form.T }} h</li>
      </ul>
      <p>\[ V = \frac{ {{ form.S }}  \times {{ form.N }} \times 10000 \times {{ form.T }} }{ 1000 \times {{ form.n }} \times
        24} = {{
          form.V }} \, \text{m}^3 \]</p>

      <h3>(5) 污泥斗容积 V₁</h3>
      <p>\[ V_1 = \frac{\pi h_5}{3}(r_1^2 + r_1 r_2 + r_2^2) \]</p>
      <ul>
        <li>\( h_5 \)：污泥斗高度，{{ form.h_5 }} m</li>
        <li>\( r_1 \)：污泥斗上口半径，{{ form.r_1 }} m</li>
        <li>\( r_2 \)：污泥斗下口半径，{{ form.r_2 }} m</li>
      </ul>
      <p>\[ V_1 = \frac{3.14 \times {{ form.h_5 }}}{3} \times ({{ form.r_1 }}^2 + {{ form.r_1 }} \times {{
        form.r_2 }} + {{ form.r_2
        }}^2) = {{ form.V_1 }} \, \text{m}^3 \]</p>

      <h3>(6) 污泥以上圆锥体部分容积 V₂</h3>
      <p>\[ V_2 = \frac{\pi h_4}{3}(R^2 + R r_1 + r_1^2) \]</p>
      <ul>
        <li>\( h_4 \)：底坡落差，{{ form.h_4 }} m</li>
        <li>\( R \)：池子半径，{{ form.R }} m</li>
      </ul>
      <p>\[ V_2 = \frac{3.14 \times {{ form.h_4 }}}{3} \times ({{ form.R }}^2 + {{
        form.R }} \times {{
          form.r_1 }} + {{ form.r_1 }}^2) = {{ form.V_2 }} \, \text{m}^3 \]</p>

        <p>共可以储存的污泥体积为</p>

        <p>
          \[ V_1+V_2 = {{ form.V_1 }} + {{ form.V_2 }}  = {{ form.V_1 + form.V_2 }} m^3\]
        </p>

        <p v-if="form.V_1+form.V_2 >= form.V"> 可见有充足的储存容积</p>
        <p v-else>储存容积不足，请返回修改</p>


      <h3>(7) 沉淀池总高度 H</h3>
      <p>\[ H = 0.3 + h_2 + 0.5 + 0.5 + h_5 \]</p>
      <p>\[ H = 0.3 + {{ form.h_2 }} + 0.5 + 0.5 + {{ form.h_5 }} = {{ form.H }} \,
        \text{m} \]</p>

      <h3>(8) 沉淀池周边的高度</h3>
      <p>\[ h_1 + h_2 + h_3 = 0.3 + h_2 + h_4 \]</p>
      <p>\[ h_1 + h_2 + h_3 = 0.3 + {{ form.h_2 }} + {{ form.h_4 }} = {{
        form.h_perimeter }} \,
        \text{m} \]</p>

      <h3>(9) 校核径深比</h3>
      <p>\[ D/h_2 = {{ form.D }} / {{ form.h_2 }} = {{ form.D_h_2_ratio }} \]</p>
      <p v-if="form.D_h_2_ratio>= 6 && form.D_h_2_ratio<=12 ">径深比在 6～12 范围内，满足要求。</p>
      <p v-else>径深比在不在 6～12 范围内，请返回检查。</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { onMounted } from 'vue';
import DescriptionWWcyc from '../shared/DescriptionWWcyc3.vue';
import IntroElement from '../shared/IntroElement.vue';
import { ElMessage } from 'element-plus';
import DocxReport from '../shared/DocxReport.js';

const formRef = ref(null)
const formLoading = ref(false)
const reportVisibility = ref(false)
const reportLoading = ref(false)
const hideReport = () => {
  reportVisibility.value = false
}

const commonRules = [
  { required: true, message: '必填项', trigger: 'blur' },
  { type: 'number', message: '必须为数字', trigger: 'blur' },
];
const formItems = {
  Q_max: { label: '(Q_{max}) 最大设计流量 (m³/d)' },
  N: { label: '(N) 设计入口数 (万人)' },
  n: { label: '(n) 池数 (个)' },
  q: { label: '(q) 表面负荷 (m³/(m²·h))' },
  t: { label: '(t) 沉淀时间 (h)' },
  S: { label: '(S) 每人每日污泥量 (L/(人·d))' },
  T: { label: '(T) 清除污泥间隔时间 (h)' },
};
const genReport = () => {
  reportLoading.value = true
  ElMessage({
    message: '正在生成报告...',
    type: 'info'
  })
  DocxReport.methods.renderDoc('ChuChen3', JSON.parse(JSON.stringify(form)), (msg) => {
    if ('success' in msg) {
      ElMessage({
        message: '生成报告成功!请留意浏览器弹出的下载提示(ChuChen3.docx),点击下载即可。部分手机浏览器可能会阻止下载。下载后请务必使用Word软件打开，不支持WPS。',
        type: 'success',
        showClose: true,
      })
    } else {
      ElMessage({
        message: '生成报告失败，请稍候重试。',
        type: 'error',
        showClose: true,
      })
    }
    reportLoading.value = false
  });
}
const form = reactive({
  // 已知条件
  Q_max: 43200, // 最大设计流量 (m³/d)
  N: 25, // 设计入口数 (万人)
  n: 2, // 池数 (个)
  q: 2, // 表面负荷 (m³/(m²·h))
  t: 1.5, // 沉淀时间 (h)
  S: 0.5, // 每人每日污泥量 (L/(人·d))
  T: 4, // 清除污泥间隔时间 (h)

  // 中间计算结果（初始化为 0）
  Q_max_h: 0,
  F: 0,
  D: 0,
  h_2: 0,
  V: 0,
  r_1: 1.8,
  r_2: 0.8,
  h_5: 0,
  V_1: 0,
  R: 0,
  h_4: 0,
  V_2: 0,
  H: 0,
  h_perimeter: 0,
  D_h_2_ratio: 0,

  agree: false,      // 同意服务协议和隐私政策
});

onMounted(async () => {
  refresh()
});
const refresh = () => {
  if (window.MathJax) {
    window.MathJax.typeset();
  }
}

const submitForm = (formEl) => {
  if (form.agree === false) {
    ElMessage({
      message: '请勾选同意服务协议和隐私政策',
      type: 'error',
    })
    return
  }
  formLoading.value = true
  if (!formEl) {
    formLoading.value = false
    return
  }
  formEl.validate((valid) => {
    if (valid) {
      // console.log('ok')
      ElMessage({
        message: '请稍候，正在计算',
        type: 'info',
      })

      calculation()

      reportVisibility.value = true

      setTimeout(function () {
        formLoading.value = false
        ElMessage({
          message: '计算完成，可以查看下方的计算书',
          type: 'success',
          showClose: true,
        })
        refresh()
      }, 1000);
    } else {
      ElMessage({
        message: '请检查表单中的输入，确保输入正确',
        type: 'error',
      })
      formLoading.value = false
    }
  })
}

const calculation = () => {
  const { Q_max, N, n, q, t, S, T, r_1, r_2 } = form;

  // 计算沉淀部分水面面积 F
  const Q_max_h = (Q_max / 24).toFixed(2); // 将最大设计流量转换为 m³/h，保留两位小数
  const F = (Q_max_h / (n * q)).toFixed(2); // 沉淀部分水面面积，保留两位小数

  // 计算池子直径 D
  const D = Math.sqrt((4 * F) / Math.PI).toFixed(2); // 池子直径，保留两位小数

  // 计算有效水深 h_2
  const h_2 = (q * t).toFixed(2); // 有效水深，保留两位小数

  // 计算每天污泥量 V
  const V = ((S * N * 10000 * T) / (1000 * n * 24)).toFixed(2); // 每天污泥量，保留两位小数

  // 计算污泥斗高度 h_5
  const h_5 = ((r_1 - r_2) * Math.tan((60 * Math.PI) / 180)).toFixed(2); // 污泥斗高度，保留两位小数

  // 计算污泥斗容积 V_1
  const V_1 = ((Math.PI * h_5 / 3) * (r_1 ** 2 + r_1 * r_2 + r_2 ** 2)).toFixed(2); // 污泥斗容积，保留两位小数

  // 计算池子半径 R
  const R = (D / 2).toFixed(2); // 池子半径，保留两位小数

  // 计算底坡落差 h_4
  const h_4 = ((R - r_1) * 0.05).toFixed(2); // 底坡落差，保留两位小数

  // 计算污泥以上圆锥体部分容积 V_2
  const V_2 = ((Math.PI * h_4 / 3) * (R ** 2 + R * r_1 + r_1 ** 2)).toFixed(2); // 污泥以上圆锥体部分容积，保留两位小数

  // 计算沉淀池总高度 H
  const H = (0.3 + parseFloat(h_2) + 0.5 + 0.5 + parseFloat(h_5)).toFixed(2); // 沉淀池总高度，保留两位小数

  // 计算沉淀池周边的高度
  const h_perimeter = (0.3 + parseFloat(h_2) + parseFloat(h_4)).toFixed(2); // 沉淀池周边的高度，保留两位小数

  // 校核径深比
  const D_h_2_ratio = (D / h_2).toFixed(2); // 径深比，保留两位小数

  // 将计算结果赋值回 form 对象
  form.Q_max_h = Q_max_h;
  form.F = F;
  form.D = D;
  form.h_2 = h_2;
  form.V = V;
  form.h_5 = h_5;
  form.V_1 = V_1;
  form.R = R;
  form.h_4 = h_4;
  form.V_2 = V_2;
  form.H = H;
  form.h_perimeter = h_perimeter;
  form.D_h_2_ratio = D_h_2_ratio;

  formLoading.value = true;
};

</script>

<style scoped>
.el-input-number .el-input__inner {
  text-align: left;
}

.el-input-number {
  width: 100%;
}
</style>
