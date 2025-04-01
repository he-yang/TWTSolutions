<template>
  <div>
    <DescriptionWWcyc />

    <h2>平流式沉砂池</h2>
    <p>.</p>
    <IntroElement />

    <h4>请在下方的表单区输入主要设计参数，然后点击开始计算。在开始计算按钮下方会根据您的输入更新计算书。</h4>
    <h4>如果遇到不确定的参数，可以尝试表单中的默认参数，可查询崔玉川的书、排水规范、设计手册等，也可以使用AI人工智能工具进行提问。</h4>
    <h4>
      了解计算过程，请
      <a href="../../../public/ChenSha1.pdf" target="_blank">点击查看计算书</a>
    </h4>
    <el-divider />
    <!-- 基于Vue3和ElementPlus的form表单，有提交按钮 -->
    <el-form :model="form" ref="formRef" status-icon>
      <!-- 表单项目 -->
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="Q_max">
        <span>(Q_{max})  最大设计流量 (m³/s)</span>
        <el-input-number v-model="form.Q_max" :controls="false" @change="hideReport"></el-input-number>
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="Q_min">
        <span>(Q_{min})  最小设计流量 (m³/s)</span>
        <el-input-number v-model="form.Q_min" :controls="false" @change="hideReport"></el-input-number>
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="K_z">
        <span>(K_z)  总变化系数</span>
        <el-input-number v-model="form.K_z" :controls="false" @change="hideReport"></el-input-number>
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="v">
        <span>(v)  最大设计流速 (m/s)</span>
        <el-input-number v-model="form.v" :controls="false" @change="hideReport"></el-input-number>
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]">
        <span>(t)  流行时间 (s)</span>
        <el-input-number v-model="form.t" :controls="false" @change="hideReport"></el-input-number>
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="n">
        <span> (n)  沉砂池格数</span>
        <el-input-number v-model="form.n" :controls="false" @change="hideReport"></el-input-number>
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="b">
        <span>(b)  每格宽度 (m)</span>
        <el-input-number v-model="form.b" :controls="false" @change="hideReport"></el-input-number>
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="X">
        <span>(X)  城镇污水沉砂量 (m^3/ 10^6 m^3)</span>
        <el-input-number v-model="form.X" :controls="false" @change="hideReport"></el-input-number>
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="T">
        <span>(T)  清除沉砂间隔时间 (d)</span>
        <el-input-number v-model="form.T" :controls="false" @change="hideReport"></el-input-number>
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="a_1">
        <span>(a_1)  斗底宽 (m)</span>
        <el-input-number v-model="form.a_1" :controls="false" @change="hideReport"></el-input-number>
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

      <h1>平流式沉砂池设计计算</h1>
      <img src="../../assets/images/ChenSha1_1.jpg" alt="平流式沉砂池简图">
      <h3>(1) 沉砂池长度 (L)</h3>
      <p>\[ L = v \times t \]</p>
      <p>式中：</p>
      <ul>
        <li>\( v \)：最大设计流量时的流速，取 {{ form.v }} m/s</li>
        <li>\( t \)：最大设计流量时的流行时间，取 {{ form.t }} s</li>
      </ul>
      <p>\[ L = {{ form.v }} \times {{ form.t }} = {{ form.L.toFixed(2) }} \, \text{m} \]</p>

      <h3>(2) 水流断面面积 (A)</h3>
      <p>\[ A = \frac { Q_{ \text{max } } }{v} \]</p>
      <p>式中：</p>
      <ul>
        <li>\( Q_{ \text { max } } \)：最大设计流量，{{ form.Q_max }} m³/s</li>
      </ul>
      <p>\[ A = \frac{ {{ form.Q_max }} }{ {{ form.v }} } = {{ form.A.toFixed(2) }} \, \text{m}^2 \]</p>

      <h3>(3) 池总宽度 (B)</h3>
      <p>\[ B = n \times b \]</p>
      <ul>
        <li>\( n \)：沉砂池格数，取 {{ form.n }}</li>
        <li>\( b \)：每格宽度，取 {{ form.b }} m</li>
      </ul>
      <p>\[ B = {{ form.n }} \times {{ form.b }} = {{ form.B.toFixed(2) }} \, \text{m} \]</p>

      <h3>(4) 有效水深 (h₂)</h3>
      <p>\[ h_2 = \frac{A}{B} \]</p>
      <p>\[ h_2 = \frac{ {{ form.A.toFixed(2) }} }{ {{ form.B.toFixed(2) }} } = {{ form.h_2.toFixed(2) }} \, \text{m} \]
      </p>

      <h3>(5) 沉砂斗容积 (V)</h3>
      <p>\[ V = \frac{ Q_{ \text{max } } \times X \times T \times 86400}{K_z \times 10^6} \]</p>
      <p>式中：</p>
      <ul>
        <li>\( X \)：城市污水沉砂量，取 {{ form.X }} \( m^3/10^6 m^3 \)</li>
        <li>\( T \)：清除沉砂的间隔时间，取 {{ form.T }} d</li>
        <li>\( K_z \)：污水流量总变化系数，取 {{ form.K_z }}</li>
      </ul>
      <p>\[ V = \frac{ {{ form.Q_max }} \times {{form.X}} \times {{ form.T }} \times 86400 }{ {{ form.K_z }} \times 10^6 } = {{
        form.V.toFixed(2) }} \, \text{m}^3 \]</p>

      <h3>(6) 每个沉砂斗容积 (V₀)</h3>
      <ul>
        <li>设每一分格有 2 个沉砂斗，共有 {{ form.n_cone }} 个沉砂斗</li>
      </ul>
      <p>\[ V_0 = \frac{V}{ {{ form.n_cone }} } = \frac{ {{ form.V.toFixed(2) }} }{ {{ form.n_cone }} } = {{ form.V_0.toFixed(2) }} \, \text{m}^3 \]</p>

      <h3>(7) 沉砂斗尺寸</h3>
      <p>\[ a = \frac{2h_3'}{\tan 55^\circ} + a_1 = \frac{2 \times {{ form.h_3p }} }{\tan 55^\circ} + {{ form.a_1 }} = {{
        form.a.toFixed(2) }} \, \text{m} \]</p>
      <p>式中：</p>

      <ul>
        <li>斗高 \( h_3' \)：取 {{ form.h_3p }} m</li>
        <li>斗底宽 \( a_1 \)：取 {{ form.a_1 }} m</li>
        <li>斗壁与水平面的倾角：55°</li>
      </ul>
      <p>沉砂斗容积 V<sub>0</sub>验算</p>
      <p>\[ V_0 = \frac{h_3'}{6} \times (2a^2 + 2a \times a_1 + 2a_1^2) \]</p>
      <p>\[ V_0 = \frac{ {{ form.h_3p }} }{6} \times (2 \times {{ form.a.toFixed(2) }}^2 + 2 \times {{ form.a.toFixed(2)
        }} \times {{ form.a_1 }} + 2 \times {{ form.a_1 }}^2) = {{ form.V0_calculated.toFixed(2) }} \, \text{m}^3 \]</p>

      <h3>(8) 沉砂室高度 (h₃)</h3>
      <p>采用重力排砂</p>
      <ul>
        <li>池底坡度：0.06</li>
        <li>沉砂室宽度 \( L_2 \)：</li>
      </ul>
      <p>\[ L_2 = \frac{L - 2a - 0.2}{2} = \frac{ {{ form.L.toFixed(2) }} - 2 \times {{ form.a.toFixed(2) }} - 0.2 }{2}
        = {{ form.L_2.toFixed(2) }} \, \text{m} \]</p>
      <p>\[ h_3 = h_3' + 0.06 \times L_2 = {{ form.h_3p }} + 0.06 \times {{ form.L_2.toFixed(2) }} = {{
        form.h_3.toFixed(2) }} \, \text{m} \]</p>

      <h3>(9) 沉砂池总高度 (H)</h3>
      <ul>
        <li>超高 \( h_1 \)：取 0.3 m</li>
      </ul>
      <p>\[ H = h_1 + h_2 + h_3 = 0.3 + {{ form.h_2.toFixed(2) }} + {{ form.h_3.toFixed(2) }} = {{ form.H.toFixed(2)
        }} \, \text{m} \]</p>

      <!-- <h3>(10) 验算最小流速 (v_min)</h3>
      <p>在流量最小的时候，采用1格进行工作</p>
      <ul>
        <li>最小流量 \( Q_{ \text { min } } \)：{{ form.Q_min }} m³/s</li>
        <li>最小流量时工作的沉砂池数目 \( n_1 \)：1</li>
      </ul>
      <p>\[ v_{ \text { min } } = \frac {Q_ { \text{min} } }{n_1 \times A} = \frac{ {{ form.Q_min }} }{ {{form.n_1}} \times {{
        form.A.toFixed(2) }} } = {{ form.v_min.toFixed(3) }} \, \text{m/s} \]</p>
      <p>\[ {{ form.v_min.toFixed(3) }} \, \text{m/s} > 0.15 \, \text{m/s} \quad (\text{满足要求}) \]</p> -->
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
const genReport = () => {
  reportLoading.value = true
  ElMessage({
        message: '正在生成报告...',
        type: 'info'
      })
  DocxReport.methods.renderDoc('ChenSha1',JSON.parse(JSON.stringify(form)),(msg)=>{
    if ('success' in msg) {
      ElMessage({
        message: '生成报告成功!请留意浏览器弹出的下载提示(ChenSha1.docx),点击下载即可。部分手机浏览器可能会阻止下载。下载后请务必使用Word软件打开，不支持WPS。',
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
  Q_max: 0.2,       // 最大设计流量 (m³/s)
  Q_min: 0.1,        // 最小设计流量 (m³/s)
  K_z: 1.5,          // 总变化系数
  v: 0.25,            // 最大设计流速 (m/s)
  t: 30,             // 流行时间 (s)
  n: 2,              // 沉砂池格数
  b: 0.6,            // 每格宽度 (m)
  T: 2,              // 清除沉砂间隔时间 (天)
  h_3p: 0.35,          // 斗高 (m)
  a_1: 0.5,          // 斗底宽 (m)
  X: 30,            // 城镇污水沉砂量 (m³/10^6 m³)

  // 中间计算结果（初始化为 0）
  L: 0,              // 沉砂池长度
  A: 0,              // 水流断面面积
  B: 0,              // 池总宽度
  h_2: 0,             // 有效水深
  V: 0,              // 沉砂斗容积
  n_cone:0,          // 总共几个斗
  V_0: 0,             // 每个沉砂斗容积
  a: 0,              // 斗尺寸计算
  V0_calculated: 0,  // 沉砂斗容积验算
  L_2: 0,             // 沉砂室宽度
  h_3: 0,       // 沉砂室高度
  H: 0,              // 沉砂池总高度
  v_min: 0,          // 最小流速
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
  try {
    form.L = form.v * form.t; // 沉砂池长度
    form.A = form.Q_max / form.v; // 水流断面面积
    form.B = form.n * form.b; // 池总宽度
    form.h_2 = form.A / form.B; // 有效水深
    form.V = (form.Q_max * form.X * form.T * 86400) / (form.K_z * 1e6); // 沉砂斗容积
    form.n_cone = form.n * 2; // 总共几个斗
    form.V_0 = form.V / form.n_cone; // 每个沉砂斗容积
    form.a = (2 * form.h_3p / Math.tan(55 * Math.PI / 180)) + form.a_1; // 斗尺寸计算
    form.V0_calculated = (form.h_3p / 6) * (2 * form.a * form.a + 2 * form.a * form.a_1 + 2 * form.a_1 * form.a_1); // 沉砂斗容积验算
    form.L_2 = (form.L - 2 * form.a - 0.2) / 2; // 沉砂室宽度
    form.h_3 = form.h_3p + 0.06 * form.L_2; // 沉砂室高度
    form.H = 0.3 + form.h_2 + form.h_3; // 沉砂池总高度
    // form.v_min = form.Q_min / (1 * form.A); // 最小流速
  } catch (error) {
    console.error('计算过程中发生错误:', error);
    ElMessage({
      message: '计算过程中发生错误，请检查输入值。或联系he.yang@wtsolutions.cn',
      type: 'error',
    });
  }
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
