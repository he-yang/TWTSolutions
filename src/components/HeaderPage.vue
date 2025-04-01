<template>
  <el-menu mode="horizontal" :ellipsis="false" background-color="#545c64" text-color="#fff" active-text-color="#fff" router="true">
    <el-menu-item index="0">
      <img style="width: 60px" src="/src/assets/logo.png" alt="WTSolutions logo" />
    </el-menu-item>
    <el-menu-item index="WastewaterCyc">
      <RouterLink to="/WastewaterCyc">污水厂崔玉川</RouterLink>
    </el-menu-item>
    <el-menu-item index="WaterCyc">
      <RouterLink to="/WaterCyc">自来水厂崔玉川</RouterLink>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { onMounted } from 'vue';

// 定义一个加载脚本的函数
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve; // 脚本加载成功时 resolve
    script.onerror = reject; // 脚本加载失败时 reject
    document.head.appendChild(script);
  });
}

onMounted(async () => {
  try {
    // 尝试加载主库
    await loadScript('https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js');
    console.log('Primary library loaded successfully');
  } catch (error) {
    console.log('Primary library failed to load, loading fallback...',error);
    try {
      // 如果主库加载失败，尝试加载备用库
      await loadScript('https://cdn.bootcdn.net/ajax/libs/mathjax/3.2.2/es5/tex-mml-chtml.min.js');
      console.log('Fallback library loaded successfully');
    } catch (fallbackError) {
      console.error('Both primary and fallback libraries failed to load',fallbackError);
    }
  }

  // 在这里可以执行依赖于库的代码
});


</script>

<style scoped>
el-menu {
  width: 100%;
  min-width: 1000px;
  font-size: medium;
  text-indent: 20px;
}
</style>
