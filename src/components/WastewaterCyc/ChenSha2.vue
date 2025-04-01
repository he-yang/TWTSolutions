<template>
  <div>
    <DescriptionWWcyc />

    <h2>竖流式沉砂池</h2>
    <p>.</p>
    <IntroElement />

    <h4>请在下方的表单区输入主要设计参数，然后点击开始计算。在开始计算按钮下方会根据您的输入更新计算书。</h4>
    <h4>如果遇到不确定的参数，可以尝试表单中的默认参数，可查询崔玉川的书、排水规范、设计手册等，也可以使用AI人工智能工具进行提问。</h4>
    <h4>
      了解计算过程，请
      <a href="../../../public/ChenSha2.pdf" target="_blank">点击查看计算书</a>
    </h4>
    <el-divider />
    <!-- 基于Vue3和ElementPlus的form表单，有提交按钮 -->
    <el-form :model="form" ref="formRef" status-icon>
      <!-- 表单项目 -->

      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="Q_max">
        <span>(Q_{max}) 最大设计流量 (m³/s)</span>
        <el-input-number v-model="form.Q_max" :controls="false" @change="hideReport"></el-input-number>
      </el-form-item>

      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="n">
        <span>(n) 沉砂池格数</span>
        <el-input-number v-model="form.n" :controls="false" @change="hideReport"></el-input-number>
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="v1">
        <span>(v_1) 污水在中心管内流速 (m/s)</span>
        <el-input-number v-model="form.v1" :controls="false" @change="hideReport"></el-input-number>
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="v2">
        <span>(v_2) 池内水流上升流速 (m/s)</span>
        <el-input-number v-model="form.v2" :controls="false" @change="hideReport"></el-input-number>
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="t">
        <span>(t) 最大设计流量时的流行时间 (s)</span>
        <el-input-number v-model="form.t" :controls="false" @change="hideReport"></el-input-number>
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="K_z">
        <span>(K_z) 污水流量总变化系数</span>
        <el-input-number v-model="form.K_z" :controls="false" @change="hideReport"></el-input-number>
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="T">
        <span>(T) 清除沉砂的间隔时间 (d)</span>
        <el-input-number v-model="form.T" :controls="false" @change="hideReport"></el-input-number>
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="X">
        <span>(X) 城市污水沉砂量 (m³/10⁶m³)</span>
        <el-input-number v-model="form.X" :controls="false" @change="hideReport"></el-input-number>
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="R">
        <span>(R) 池子半径 (m)</span>
        <el-input-number v-model="form.R" :controls="false" @change="hideReport"></el-input-number>
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="r">
        <span>(r) 圆截锥部分下底半径 (m)</span>
        <el-input-number v-model="form.r" :controls="false" @change="hideReport"></el-input-number>
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="h1">
        <span>(h_1) 超高 (m)</span>
        <el-input-number v-model="form.h1" :controls="false" @change="hideReport"></el-input-number>
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="h3">
        <span>(h_3) 中心管底至沉砂面的距离 (m)</span>
        <el-input-number v-model="form.h3" :controls="false" @change="hideReport"></el-input-number>
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

        <!-- <el-button type="primary" @click="refresh()">xxx</el-button> -->
        <el-button type="primary" v-if="reportVisibility" @click="genReport"
          v-loading="reportLoading">生成Docx格式Word文档</el-button>
      </el-form-item>
      <p>点击开始计算后，系统会进行计算，计算完成后，下方的计算书会根据计算结果相应更新。<br>
        同时，此处会增加一个生成Docx格式Word文档的按钮，点击后，可以生成报告。</p>



    </el-form>
    <el-divider />

    <div id="report" v-if="reportVisibility" class="no-print">

      <h1>竖流式沉砂池设计计算</h1>
      <img src="../../assets/images/ChenSha2_1.jpg" alt="竖流式沉砂池计算图">
      <p>竖流式沉砂池计算图。</p>

      <h3>(1) 中心管直径(d)</h3>
      <p>
        \[d = \sqrt { \frac { 4q_{ \max } } { \pi v_{1} } }\]
      </p>
      <p>-式中:</p>
      <li>\(v_1\)为污水在中心管内流速，m/s，\(v_1\)= {{ form.v1 }} m/s；</li>
      <li>q<sub>max</sub>为单格最大设计流量，m³/s。</li>
      <li>设沉砂池格数n= {{ form.n }} ，每格最大设计流量</li>
      <li>q<sub>max</sub>为单格最大设计流量，m³/s。</li>
      <li>q<sub>max</sub>为单格最大设计流量，m³/s。</li>

      <p>
        \[q_{\max} = \frac{ {{ form.Q_max }} }{ {{ form.n }} } = {{ form.q_max }} m^{3}/s\]
      </p>
      <p>
        \[d = \sqrt { \frac{4 \times {{ form.q_max }} } { 3.14 \times {{ form.v1 }} } } = {{ form.d }} m \]
      </p>

      <h3>(2) 池子直径(D)</h3>
      <p>
        \[D = \sqrt { \frac{4 \times q_{ \max } (v_{1} + v_{2}) } { \pi v_{1}v_{2 } } }\]
      </p>
      <p>式中</p>
      <li>\(v_2\)为池内水流上升流速，m/s，\(v_2\)取 {{ form.v2 }} m/s。</li>

      <p>
        \[D = \sqrt { \frac{4 \times {{ form.q_max }} \times ( {{ form.v1 }} + {{ form.v2 }} )}{3.14 \times {{
          form.v1 }} \times {{ form.v2 }} } } = {{ form.D }} m\]
      </p>

      <h3>(3) 水流部分高度(h_2)</h3>
      <p>\[ h_2 = v_2 t \]</p>
      <p>式中</p>
      <li>t为最大流量时的流行时间，s，t= {{ form.t }} s。</li>

      <p>\[h_2 ={{ form.v2 }} \times {{ form.t }} = {{ form.h2 }} (m) \] </p>

      <h3>(4) 沉砂部分所需容积(V)</h3>
      <p>
        \[V = \frac{Q_{\max} X T \times 86400} {K_{z} \times 10^{6 } }\]
      </p>
      <p>-式中:</p>
        <li>X为城镇污水沉砂量，m³/10⁶m³污水，取X ={{ form.X }} m³/10⁶m³污水；</li>
        <li>T为两次清除沉砂相隔的时间，d，T= {{ form.T }} d；</li>
        <li>K<sub>z</sub>为生活污水流量总变化系数，K<sub>z</sub> = {{ form.K_z }} 。</li>

      <p>
        \[V = \frac{ {{ form.Q_max }} \times {{ form.X }} \times {{ form.T }} \times 86400}{ {{ form.K_z }} \times 10^{6
        } } = {{ form.V }} m^{3} \]
      </p>

      <h3>(5) 每个沉砂斗容积(V_0)</h3>
      <p>\[V₀ = V/2\]</p>
      <p>\[V₀ = {{ form.V }}/2 = {{ form.V0 }} (m³)\]</p>


      <h3>(6) 沉砂部分高度(h_4)</h3>
      <p>\[h₄ = (R - r) tan(α)\]</p>

      <p>-式中:</p>
        <li>R为池子半径，m；r为圆截锥部分下底半径，m；α为截锥部分倾角，55(°)。</li>

        <li>取沉砂室锥底直径为 {{ form.R }} m，圆截锥部分下底半径为{{ form.r }} m，则</li>

      <p>\[h₄ = (R - r) tan(α) = ({{ form.R }} - {{ form.r }})tan55° = {{ form.h4 }}(m)\]</p>

      <h3>(7) 圆截锥部分实际容积(V_1)</h3>
      <p>
        \[V_{1} = \frac { \pi h_{4} }{3} (R^{2} + Rr + r^{2})\]
      </p>
      <p>
        \[V_{1} = \frac{3.14 \times {{ form.h4 }}}{3} \times ( {{ form.R }} ^{2} + {{ form.R }} \times {{ form.r }} + {{
          form.r }} ^{2}) = {{ form.V1 }} (m³)\]
      </p>

      <h3>(8) 池总高度(H)</h3>
      <p>\[H = h_1 + h_2 + h_3 + h_4\]</p>
      <p>式中</p>
        <li>h₁为超高，m，取 {{ form.h1 }} m；</li>
        <li>h₃为中心管底至沉砂面的距离，m，一般采用{{ form.h3 }} m。</li>

      <p>\[H = h_1 + h_2 + h_3 + h_4 = {{ form.h1 }} + {{ form.h2 }} + {{ form.h3 }} + {{ form.h4 }} = {{ form.H }}(m)\]
      </p>

      <h3>(9) 排砂方式</h3>
      <p>采用重力排砂或水泵排砂。</p>

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
  DocxReport.methods.renderDoc('ChenSha2', JSON.parse(JSON.stringify(form)), (msg) => {
    if ('success' in msg) {
      ElMessage({
        message: '生成报告成功!请留意浏览器弹出的下载提示(ChenSha2.docx),点击下载即可。部分手机浏览器可能会阻止下载。下载后请务必使用Word软件打开，不支持WPS。',
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
  // 最大设计流量 (m³/s)
  Q_max: 0.2,
  // 污水在中心管内流速 (m/s)
  v1: 0.3,
  // 池内水流上升流速 (m/s)
  v2: 0.05,
  // 最大流量时的流行时间 (s)
  t: 30,
  // 污水流量总变化系数
  K_z: 1.5,
  // 两次清除沉砂相隔的时间 (d)
  T: 2,
  // 城镇污水沉砂量 (m³/10⁶m³污水)
  X: 30,
  // 中心管直径 (m)
  d: 0,
  // 池子直径 (m)
  D: 0,
  // 水流部分高度 (m)
  h2: 0,
  // 沉砂部分所需容积 (m³)
  V: 0,
  // 每个沉砂斗容积 (m³)
  V0: 0,
  // 沉砂部分高度 (m)
  h4: 0,
  // 圆截锥部分实际容积 (m³)
  V1: 0,
  // 池总高度 (m)
  H: 0,
  // 沉砂池格数
  n: 2,
  // 池子半径 (m)
  R: 0.86,
  // 圆截锥部分下底半径 (m)
  r: 0.25,
  // 超高 (m)
  h1: 0.3,
  // 中心管底至沉砂面的距离 (m)
  h3: 0.25,
  // 同意服务协议和隐私政策
  agree: false,
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
    // 直接在 form 对象上引用属性进行计算
    // 计算q_max
    form.q_max = parseFloat((form.Q_max / form.n).toFixed(2));
    // 计算中心管直径
    form.d = parseFloat(Math.sqrt((4 * form.q_max) / (Math.PI * form.v1)).toFixed(2));
    // 计算池子直径
    form.D = parseFloat(Math.sqrt((4 * form.q_max * (form.v1 + form.v2)) / (Math.PI * form.v1 * form.v2)).toFixed(2));
    // 计算水流部分高度
    form.h2 = parseFloat((form.v2 * form.t).toFixed(2));
    // 计算沉砂部分所需容积
    form.V = parseFloat(((form.Q_max * form.X * form.T * 86400) / (form.K_z * 1e6)).toFixed(2));
    // 计算每个沉砂斗容积
    form.V0 = parseFloat((form.V / 2).toFixed(2));
    // 计算沉砂部分高度
    form.h4 = parseFloat(((form.R - form.r) * Math.tan(55 * Math.PI / 180)).toFixed(2));
    // 计算圆截锥部分实际容积
    form.V1 = parseFloat(((Math.PI * form.h4 / 3) * (form.R ** 2 + form.R * form.r + form.r ** 2)).toFixed(2));
    // 计算池总高度
    form.H = parseFloat((form.h1 + form.h2 + form.h3 + form.h4).toFixed(2));
  } catch (error) {
    console.error("计算过程中发生错误:", error);
    ElMessage({
      message: '计算过程中发生错误，请检查输入数据。或联系he.yang@wtsolutions.cn',
      type: 'error',
      showClose: true,
    });
    formLoading.value = false
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
