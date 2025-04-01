<template>
  <el-container>
  <el-header>
    <HeaderPage />
  </el-header>
  <el-main class="no-print">
    <RouterView/>
  </el-main>
  <el-footer>
    <FooterPage />
  </el-footer>
  </el-container>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { ElLoading } from 'element-plus';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import HeaderPage from './components/HeaderPage.vue'
import FooterPage from './components/FooterPage.vue'

const router = useRouter();

// 全局 loading 实例
let loadingInstance;

// 显示 loading
const showLoading = () => {
  loadingInstance = ElLoading.service({
    lock: true, // 是否锁定屏幕
    text: '加载中...', // 加载文字
    background: 'rgba(0, 0, 0, 0.7)', // 背景颜色
  });
};

// 隐藏 loading
const hideLoading = () => {
  if (loadingInstance) {
    loadingInstance.close();
  }
};

// 模拟页面加载
onMounted(() => {
  showLoading(); // 进入页面时显示 loading
  setTimeout(() => {
    hideLoading();
  }, 2000); // 假设页面加载需要 2 秒
});

// 路由切换时显示 loading
router.beforeEach(() => {
  showLoading();
});

// 路由加载完成后隐藏 loading
router.afterEach(() => {
  setTimeout(() => {
    hideLoading();
  }, 1000); // 假设页面加载需要 1 秒
});

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  display: flex;
  justify-content: center;
}

.el-container {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.el-header {
  position: fixed;
  z-index: 999;
  top: 0;
  justify-content: center;
  padding: 0;
  width: 100%;
}

.el-main {
  padding-top: 0px;
  margin: auto;
  margin-top: 80px;
  padding-bottom: 80px;
  max-width: 1000px;
  width: 100%;
  display: block;
  flex:1;
  min-height: calc(100vh  - 140px );
}

.el-footer {
  margin: auto;
  text-align: center;
  max-width: 1000px;
  padding: 0;
  width: 100%;
  justify-content: center;
  height: auto;
}

@media print {
  .no-print {
    display: none;
  }
}
</style>
