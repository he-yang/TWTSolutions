<template>
  <div>
    <DescriptionWWcyc />

    <h2>曝气式沉砂池</h2>
    <p>.</p>
    <IntroElement />

    <h4>请在下方的表单区输入主要设计参数，然后点击开始计算。在开始计算按钮下方会根据您的输入更新计算书。</h4>
    <h4>如果遇到不确定的参数，可以尝试表单中的默认参数，可查询崔玉川的书、排水规范、设计手册等，也可以使用AI人工智能工具进行提问。</h4>
    <h4>
      了解计算过程，请
      <a href="../../../public/ChenSha3.pdf" target="_blank">点击查看计算书</a>
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
      ]" prop="t">
        <span>(t) 最大设计流量时的流行时间 (min)</span>
        <el-input-number v-model="form.t" :controls="false" @change="hideReport"></el-input-number>
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="v_1">
        <span>(v_1) 最大设计流量时的水平流速 (m/s)</span>
        <el-input-number v-model="form.v_1" :controls="false" @change="hideReport"></el-input-number>
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="h_2">
        <span>(h_2) 设计有效水深 (m)</span>
        <el-input-number v-model="form.h_2" :controls="false" @change="hideReport"></el-input-number>
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="d">
        <span>(d) 每立方米污水所需空气量 (m³/m³)</span>
        <el-input-number v-model="form.d" :controls="false" @change="hideReport"></el-input-number>
      </el-form-item>
      <el-form-item :rules="[
        { required: true, message: '必填项', trigger: 'blur' },
        { type: 'number', message: '必须为数字', trigger: 'blur' },
      ]" prop="n">
        <span>(n) 格数</span>
        <el-input-number v-model="form.n" :controls="false" @change="hideReport"></el-input-number>
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
      <h3>曝气沉砂池设计计算书</h3>
      <h4>(1) 池子总有效容积 (V)</h4>
      <p>
        \[V = Q_{max} \times t \times 60\]
        \[ = {{ form.Q_max }} \times {{ form.t }} \times 60\ ={{ form.V }} m^3 \]
      </p>
      <p>式中：</p>

      <li>\(Q_{max}\)：最大设计流量。{{ form.Q_max }} m³/s</li>
      <li>\(t\)：最大设计流量时的流行时间。{{ form.t }} min</li>

      <img src="../../assets/images/ChenSha3_1.jpg" alt="曝气沉砂池计算图">
      <p>曝气沉砂池计算图</p>
      <h4>(2) 水流断面积 (A) </h4>
      <p>
        \[A = \frac{ Q_{max} }{v_1}\]
        \[ = \frac{ {{ form.Q_max }} }{ {{ form.v_1 }} } = {{ form.A }} m^2\]
      </p>
      <p>式中：</p>
      <li>\(Q_{max}\)：最大设计流量。{{ form.Q_max }} m³/s</li>
      <li>\(v_1\)：最大设计流量时的水平流速。取 {{ form.v_1 }} m/s</li>
      <h4>(3) 池总宽度 (B) </h4>
      <p>
        \[B = \frac{A}{h_2}\]
        \[ = \frac{ {{ form.A }} }{ {{ form.h_2 }} } = {{ form.B }} m \]
      </p>
      <p>式中：</p>
      <li>\(A\)：水流断面积。{{ form.A }} m²</li>
      <li>\(h_2\)：设计有效水深。取 {{ form.h_2 }} m</li>
      <h4>(4) 每个池子宽度 (b) </h4>
      <p>
        \[b = \frac{B}{n}\]
        \[= \frac{ {{ form.B }} }{ {{ form.n }} } == {{ form.b }} m \]
      </p>
      <p>式中：</p>
      <li>\(B\)：池总宽度。{{ form.B }} m</li>
      <li>\(n\)：格数。取{{ form.n }}格</li>
      <h4>(5) 池长 (L) </h4>
      <p>
        \[L = \frac{V}{A}\]
        \[ = \frac{ {{ form.V }} }{ {{ form.A }} } = {{ form.L }} m \]
      </p>
      <p>式中：</p>
      <li>\(V\)：池子总有效容积。{{ form.V }} m³</li>
      <li>\(A\)：水流断面积。{{ form.A }} m²</li>

      <h4>(6) 每小时所需空气量 (q) </h4>
      <p>
        \[ q = d \times Q_{max} \times 3600\]
        \[ = {{ form.d }} \times {{ form.Q_max }} \times 3600 = {{ form.q }} m^3/h \]
      </p>
      <p>式中：</p>
      <li>\(d\)：每立方米污水所需空气量。{{ form.d }} m³/m³</li>
      <li>\(Q_{max}\)：最大设计流量</li>
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
  DocxReport.methods.renderDoc('ChenSha3', JSON.parse(JSON.stringify(form)), (msg) => {
    if ('success' in msg) {
      ElMessage({
        message: '生成报告成功!请留意浏览器弹出的下载提示(ChenSha3.docx),点击下载即可。部分手机浏览器可能会阻止下载。下载后请务必使用Word软件打开，不支持WPS。',
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

  Q_max: 0.8, // 默认值为0.8 m³/s
  t: 2, // 默认值为2 min
  v_1: 0.1, // 默认值为0.1 m/s
  h_2: 2, // 默认值为2 m
  d: 0.2, // 默认值为0.2 m³/m³
  n: 2, // 默认值为2
  V: null, // 池子总有效容积 (m³)
  A: null, // 水流断面积 (m²)
  B: null, // 池总宽度 (m)
  b: null, // 每个池子宽度 (m)
  L: null, // 池长 (m)
  q: null, // 每小时所需空气量 (m³/h)

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
  reportVisibility.value = false
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
    form.V = (form.Q_max * form.t * 60).toFixed(2); // 池子总有效容积 (m³)
    form.A = (form.Q_max / form.v_1).toFixed(2); // 水流断面积 (m²)
    form.B = (form.A / form.h_2).toFixed(2); // 池总宽度 (m)
    form.b = (form.B / form.n).toFixed(2); // 每个池子宽度 (m)
    form.L = (form.V / form.A).toFixed(2); // 池长 (m)
    form.q = (form.d * form.Q_max * 3600).toFixed(2); // 每小时所需空气量 (m³/h)
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
