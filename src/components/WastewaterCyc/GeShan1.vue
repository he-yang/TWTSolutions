<template>
  <div>
    <DescriptionWWcyc />

    <h2>格栅</h2>
    <p>.</p>

    <IntroElement />


    <h4>请在下方的表单区输入主要设计参数，然后点击开始计算。在开始计算按钮下方会根据您的输入更新计算书。</h4>
    <h4>如果遇到不确定的参数，可以尝试表单中的默认参数，可查询崔玉川的书、排水规范、设计手册等，也可以使用AI人工智能工具进行提问。</h4>
    <h4>
      了解计算过程，请
      <a href="../../../public/GeShan1.pdf" target="_blank">点击查看计算书</a>
    </h4>
    <el-divider />
    <!-- 基于Vue3和ElementPlus的form表单，有提交按钮 -->
    <el-form :model="form" ref="formRef" status-icon>
      <!-- 表单项目 -->
      <!-- Q_max, 最大设计流量，m3/s -->
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="Q_max">
        <p>$Q_{max}$ 最大设计流量，m3/s</p>
        <el-input-number v-model="form.Q_max" @change="hideReport" :controls="false" />
      </el-form-item>
      <!-- K_z，总变化系数 -->
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="K_z">
        <span>$K_z$ 总变化系数</span>
        <el-input-number v-model="form.K_z" @change="hideReport" :controls="false" />
      </el-form-item>

      <!-- b，栅条间隙，m -->
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="b">
        <span>$b$ 栅条间隙，m</span>
        <el-input-number v-model="form.b" @change="hideReport" :controls="false" />
      </el-form-item>
      <!-- h,栅前水深,m -->
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="h">
        <span>$h$ 栅前水深，m</span>
        <el-input-number v-model="form.h" @change="hideReport" :controls="false" />
      </el-form-item>
      <!-- v，过栅流速,m/s -->
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="v">
        <span>$v$ 过栅流速，m/s</span>
        <el-input-number v-model="form.v" @change="hideReport" :controls="false" />
      </el-form-item>

      <!-- S,栅条宽度,m -->
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="S">
        <span>$S$ 栅条宽度，m</span>
        <el-input-number v-model="form.S" @change="hideReport" :controls="false" />
      </el-form-item>
      <!-- k，k系数, 一般选用3 -->
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="k">
        <span>$k$ 系数, 一般选用3</span>
        <el-input-number v-model="form.k" @change="hideReport" :controls="false" />
      </el-form-item>
      <!-- beta, \beta系数 -->
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="beta">
        <span>$\beta$ 系数</span>
        <el-input-number v-model="form.beta" @change="hideReport" :controls="false" />
      </el-form-item>
      <!-- B_1，进水渠宽, m -->
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="B_1">
        <span>$B_1$ 进水渠宽，m</span>
        <el-input-number v-model="form.B_1" @change="hideReport" :controls="false" />
      </el-form-item>
      <!-- alpha_1，减宽部分展开角度, 度 -->
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="alpha_1">
        <span>$\alpha_1$ 减宽部分展开角度，度</span>
        <el-input-number v-model="form.alpha_1" @change="hideReport" :controls="false" />
      </el-form-item>
      <!-- W_1，栅渣量， $m^3/ 10^3 m^3$污水 -->
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="W_1">
        <span>$W_1$ 栅渣量，$m^3/10^3m^3$污水</span>
        <el-input-number v-model="form.W_1" @change="hideReport" :controls="false" />
        <span>格栅间隙为16~25mm时，取0.1~0.05 ；格栅间隙为30~50mm时，取0.03~0.1。</span>
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
        <el-button type="primary" v-if="reportVisibility" @click="genReport" v-loading="reportLoading">生成Docx格式Word文档</el-button>
      </el-form-item>
      <p>点击开始计算后，系统会进行计算，计算完成后，下方的计算书会根据计算结果相应更新。<br>
        同时，此处会增加一个生成Docx格式Word文档的按钮，点击后，可以生成报告。</p>
    </el-form>
    <el-divider />

    <div id="report" v-if="reportVisibility" class="no-print">
      <h1>格栅设计计算</h1>

      <h2>1. 已知条件</h2>
      <p>某城镇污水处理厂的最大设计污水量 \( Q_{max} = {{ form.Q_max }} \, \text{m}^3/\text{s} \)，求格栅各部分尺寸。</p>

      <h2>2. 设计计算</h2>
      <img src="../../assets/images/GeShan1_1.png" alt="格栅设计计算图" width="300px">
      <p>图1为格栅设计计算图。</p>

      <h3>(1) 栅槽宽度</h3>

      <h4>① 栅条的间隙数 \( n \) (个)</h4>
      <p>
        \[ n = \frac{Q_{max} \sqrt{sin \alpha } }{2bhv} \]
      </p>

      <p>
        \[ = \frac{ {{ form.Q_max }} \sqrt{sin {{ form.alpha }} } }{ 2 \times {{ form.b }} \times {{ form.h }} \times {{
          form.v }}} \]
      </p>
      <p>
        \[ n = {{ form.n }} \]
      </p>


      <p>式中：</p>
      <ul>
        <li>\( Q_{max} \) —— 最大设计流量，\( \text{m}^3/\text{s} \)</li>
        <li>\( \alpha \) —— 格栅倾角，\( (°) \)，取 \( \alpha = {{ form.alpha }}° \)</li>
        <li>\( b \) —— 栅条间隙，\( \text{m} \)，取 \( b = {{ form.b }} \, \text{m} \)</li>
        <li>\( n \) —— 栅条间隙数，个</li>
        <li>\( h \) —— 栅前水深，\( \text{m} \)，取 \( h = {{ form.h }} \, \text{m} \)</li>
        <li>\( v \) —— 过栅流速，\( \text{m/s} \)，取 \( v = {{ form.v }} \, \text{m/s} \)</li>
      </ul>
      <p>格栅设两组，按两组同时工作设计，一格停用，一格工作校核。则栅条间隙数</p>

      <h4>② 栅槽宽度 \( B \)</h4>
      <p>栅槽宽度一般比格栅宽 \( 0.2 \sim 0.3 \, \text{m} \)，取 \( 0.2 \, \text{m} \)；设栅条宽度 \( S = {{ form.S }} \text{m}
        \)，则栅槽宽度</p>
      <p>\[ B = S(n-1) + bn + 0.2 \]</p>
      <p>\[ = {{ form.S }} \times ({{ form.n }}-1) + {{ form.b }} \times {{ form.n }} + 0.2 \]</p>
      <p>\[ = {{ form.B }} \, \text{m} \]</p>

      <h3>(2) 通过格栅的水头损失 \( h_1 \) (m)</h3>
      <p>\[ h_1 = h_0 k \]</p>
      <p>
        \[ h_0 = \xi \frac{v^2}{2g} \sin{\alpha } \]
      </p>
      <p>
        \[ \xi = \beta ( \frac{S}{b})^{4/3} \]
      </p>
      <p>式中：</p>
      <ul>
        <li>\( h_1 \) —— 设计水头损失，\( \text{m} \)</li>
        <li>\( h_0 \) —— 计算水头损失，\( \text{m} \)</li>
        <li>\( g \) —— 重力加速度，\( \text{m/s}^2 \)</li>
        <li>\( k \) —— 系数，格栅受污物堵塞时水头损失增大倍数，采用{{ form.k }}</li>
        <li>\( \xi \) —— 阻力系数，与栅条断面形状有关，可按手册提供的计算公式和相关系数计算</li>
      </ul>
      <p>设栅条断面为锐边矩形断面，\( \beta = {{ form.beta }} \)，代入数据得</p>
      <p>
        \[ h_1 = h_0 k = \beta (\frac{S}{b} )^{4/3} \frac{v^2}{2g}\sin{\alpha k} \]
      </p>

      <p>
        \[ h_1 = h_0 k = {{ form.beta }} (\frac{ {{ form.S }} }{ {{ form.b }} } )^{4/3} \frac{ {{ form.v }} ^2}{2g}\sin{
        {{ form.alpha }} \times {{ form.k }} } \]
      </p>

      <p>\[ h_1 = {{ form.h_1 }} \, \text{m} \]</p>

      <h3>(3) 栅后槽总高度 \( H \) (m)</h3>
      <p>设栅前渠道超高 \( h_2 = 0.3 \, \text{m} \)，则</p>
      <p>\[ H = h + h_1 + h_2 \]</p>
      <p>\[ = {{ form.h }} + {{ form.h_1 }} + 0.3 \]</p>
      <p>\[ = {{ form.H }} \, \text{m} \]</p>

      <h3>(4) 栅槽总长度 \( L \) (m)</h3>

      <h4>① 进水渠道渐宽部分的长度 \( L_1 \)</h4>
      <p>设进水渠宽 \( B_1 = {{ form.B_1 }} \, \text{m} \)，其渐宽部分展开角度 \( \alpha_1 = {{ form.alpha_1 }}° \)。</p>
      <!-- 进水渠道内的流速为 \( 0.77 \, \text{m/s} \) -->
      <p>
        \[ L_1 = \frac{B-B_1}{2 \tan{ \alpha_1} } \]
      </p>
      <p>
        \[ L_1 = \frac{ {{ form.B }} - {{ form.B_1 }} }{ 2 \tan{ {{ form.alpha_1 }} } } \]
      </p>
      <p>
        \[ L_1 = {{ form.L_1 }} m \]
      </p>

      <h4>② 栅槽与出水渠道连接处的渐窄部分长度 \( L_2 \) (m)</h4>

      <p>
        \[ L_2= \frac{L_1}{2} = \frac{ {{ form.L_1 }} }{2} = {{ form.L_2 }} m \]
      </p>

      <p>
        \[ L = L_1 + L_2 + 1.0 + 0.5 + \frac{H_1}{ \tan{\alpha} } \]
      </p>
      <p>\[ H_1 = h + h_2 \]</p>
      <p>式中，\( H_1 \) 为栅前渠道深，\( \text{m} \)。</p>
      <p>
        \[ L = {{ form.L_1 }} + {{ form.L_2 }} + 1.0 + 0.5 + \frac{ {{ form.h }} + {{ form.h_2 }} }{ \tan{ {{ form.alpha
        }}} }
        \]
      </p>
      <p>\[ L = 2.22 \, \text{m} \]</p>

      <h3>(5) 每日栅渣量 \( W m^3 /d \)</h3>
      <p>
        \[ W = \frac{86400 Q_{max} W_1}{ 1000 K_z } \]
      </p>
      <p>式中：</p>
      <ul>
        <li>\( W_1 \) 为栅渣量</li>
      </ul>
      <p>
        \[ W = \frac{86400 \times {{ form.Q_max }} \times {{ form.W_1 }}}{ 1000 \times {{ form.K_z }} } = {{ form.W }}
        m^3/d \]
      </p>
      <p v-if="form.W > 0.2">采用机械清渣。</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { onMounted } from 'vue';
import DescriptionWWcyc from '../shared/DescriptionWWcyc2.vue';
import { ElMessage } from 'element-plus';
import IntroElement from '../shared/IntroElement.vue';
import DocxReport from '../shared/DocxReport.js';

const formRef = ref(null)
const formLoading = ref(false)
const reportLoading = ref(false)
const reportVisibility = ref(false)
const hideReport = () => {
  reportVisibility.value = false
}
const genReport = () => {
  reportLoading.value = true
  ElMessage({
        message: '正在生成报告...',
        type: 'info'
      })
  DocxReport.methods.renderDoc('GeShan1',JSON.parse(JSON.stringify(form)),(msg)=>{
    if ('success' in msg) {
      ElMessage({
        message: '生成报告成功!请留意浏览器弹出的下载提示(GeShan1.docx),点击下载即可。部分手机浏览器可能会阻止下载。下载后请务必使用Word软件打开，不支持WPS。',
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
let form = reactive({
  Q_max: 0.4,
  alpha: 60,
  K_z: 1.39,
  b: 0.021,
  n: 26,
  S: 0.01,
  h: 0.4,
  v: 0.9,
  B: 0.996,
  alpha_1: 20,
  B_1: 0.85,
  W_1: 0.07,
  xi: 0.3,
  beta: 2.42,
  k: 3,
  g: 9.8,
  h_1: 0.097,
  H: 0.797,
  L: 2.22,
  L_1: 0.21,
  L_2: 0.105,
  W: 1.74,
  h_2: 0.3,
  agree: false,
})


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
      type: 'error'
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
          duration:0,
          showClose: true,
        })
        refresh()
      }, 1000);
    } else {
      ElMessage({
        message: '请检查表单中的输入，确保输入正确',
        type: 'error',
        duration: 5000
      })
      formLoading.value = false
    }
  })


}

const calculation = () => {
  // 1. 栅条的间隙数 n
  const radians_alpha = (form.alpha * Math.PI) / 180; // 角度转弧度
  form.n = (form.Q_max * Math.sqrt(Math.sin(radians_alpha))) / (form.b * form.h * form.v) / 2;
  // form.n = (form.Q_max * Math.sqrt(Math.sin(form.alpha))) / (form.b * form.h * form.v);
  //form.n仅保留整数部分，但需要向上取整
  form.n = Math.ceil(form.n);

  // 2. 栅槽宽度 B
  form.B = form.S * (form.n - 1) + form.b * form.n + 0.2;
  //保留2位有效数字
  form.B = parseFloat(form.B.toFixed(2));

  // 3. 通过格栅的水头损失 h1
  const xi = form.beta * Math.pow(form.S / form.b, 4 / 3);
  const h0 = xi * (Math.pow(form.v, 2) / (2 * form.g)) * Math.sin(radians_alpha);
  form.h1 = h0 * form.k;
  //保留2位有效数字
  form.h1 = parseFloat(form.h1.toFixed(2));

  form.h2 = 0.3

  // 4. 栅后槽总高度 H
  form.H = form.h + form.h1 + form.h2;
  //保留2位有效数字
  form.H = parseFloat(form.H.toFixed(2));

  // 5. 进水渠道渐宽部分的长度 L1
  const radians_alpha1 = (form.alpha_1 * Math.PI) / 180; // 角度转弧度
  form.L1 = (form.B - form.B1) / (2 * Math.tan(radians_alpha1));
  //保留2位有效数字
  form.L1 = parseFloat(form.L1.toFixed(2));

  // 6. 栅槽与出水渠道连接处的渐窄部分长度 L2
  form.L2 = form.L1 / 2;
  //保留2位有效数字
  form.L2 = parseFloat(form.L2.toFixed(2));

  // 7. 栅槽总长度 L
  const H1 = form.h + form.h2; // 栅前渠道深
  form.L = form.L1 + form.L2 + 1.0 + 0.5 + H1 / Math.tan(radians_alpha);
  //保留2位有效数字
  form.L = parseFloat(form.L.toFixed(2));

  // 8. 每日栅渣量 W
  form.W = (86400 * form.Q_max * form.W_1) / (1000 * form.K_z);
  //保留2位有效数字
  form.W = parseFloat(form.W.toFixed(2));

}
</script>

<style scoped>
.el-input-number .el-input__inner {
  text-align: left;
}

.el-input-number {
  width: 100%;
}

h2 {
  display: inline;
}
</style>
