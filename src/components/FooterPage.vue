<template>
  <el-affix :offset="25" position="bottom">
    <el-button type="primary" @click="openChatWindow">设计计算有疑问？点击问AI。
      <img src="../assets/images/bigmodel.png" alt="智谱AI大模型">
    </el-button>
  </el-affix>
  <ChatWindow ref="chatWindow" />
  <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;">
    <div style="width: 50%;">
      <p>
        版权所有 WTSolutions 2025
      </p>

    </div>
    <div style="width: 50%;">
      <p>
        <RouterLink to="/ServiceAgreement">服务协议</RouterLink>
         |
         <RouterLink to="/PrivacyPolicy">隐私政策</RouterLink>
          | Dependencies
      </p>
    </div>
  </div>
</template>

<script setup>
import ChatWindow from './ChatWindow.vue';
import { ref } from 'vue';

const chatWindow = ref(null);
const openChatWindow = () => {
  chatWindow.value.dialogVisible = true;
};
</script>

<style scoped>
p {
  text-align: center;
}
</style>
