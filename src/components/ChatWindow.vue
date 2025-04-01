<template>
  <el-dialog v-model="dialogVisible" title="与智谱AI GLM-4-FLASH 对话" width="80%" :before-close="handleClose">
    <div class="chat-container">
      <!-- 消息展示区域 -->
      <div class="chat-messages">
        <div v-for="(message, index) in messages" :key="index" :class="['message', message.role]">
          <div class="message-content" v-html="renderMarkdown(message.content)">
          </div>
        </div>
      </div>

      <!-- 输入框和发送按钮 -->
      <el-input v-model="inputMessage" placeholder="请输入你的消息" @keyup.enter="sendMessage" v-loading="dialogLoading">
        <template #append>
          <el-button type="success" @click="sendMessage">发送</el-button>
        </template>
      </el-input>
    </div>
    <p>点击发送后，请耐心等待，可暂时关闭小窗，稍候查看AI回复。</p>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { ElMessage } from 'element-plus';

const dialogLoading = ref(false)


const renderMarkdown = (markdown) => {
  const rawHtml = marked.parse(markdown);
  return DOMPurify.sanitize(rawHtml);
};

// 控制对话框显示/隐藏
const dialogVisible = ref(false);

// 输入框的消息内容
const inputMessage = ref('');

// 消息列表
const messages = ref([]);
messages.value.push({ role: 'system', content: '智谱AI你好，你是一名水处理、污水处理、环境工程相关的专家，会非常耐心详细的向提问者回答相关专业问题。' });
// 发送消息
const sendMessage = async () => {
  if (inputMessage.value.trim() === '') return;

  // 添加用户消息
  messages.value.push({ role: 'user', content: inputMessage.value });
  messages.value.push({ role: 'temp', content: '请稍等...' });

  // 移除临时消息
  //查找messages.value中筛选出role不等于temp的元素

  let msg = messages.value.filter(item => item.role !== 'temp');
  // 清空输入框
  inputMessage.value = '';

  dialogLoading.value = true;
  // 发送消息到 GLM-4-FLASH API

  try {
    // 模拟发送消息到 GLM-4-FLASH API
    const response = await fetch('https://bigmodel.wtsolutions.cn/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: msg, code: 'TWTSolutions' }),
    });

    const data = await response.json();

    if (data.error) {
      messages.value.push({ role: 'temp', content: '抱歉，暂时无法处理您的请求。请您通过其他渠道获取AI大模型的问答服务。' });
    } else {
      // 添加 GLM-4-FLASH 的回复
      messages.value.push({ role: 'assistant', content: data.content });
      setTimeout(function () {
        dialogLoading.value = false
        if (window.MathJax) {
          window.MathJax.typeset();
        }
        ElMessage({
          message: '收到质谱AI的一条新消息',
          type: 'success',
        })
      }, 1000);
    }



  } catch (error) {
    console.error('发送消息失败:', error);
    messages.value.push({ role: 'temp', content: '抱歉，暂时无法处理您的请求。请您通过其他渠道获取AI大模型的问答服务。' });
    dialogLoading.value = false
  }


};

// 关闭对话框前的处理
const handleClose = (done) => {
  done();
};

// 暴露方法，供父组件调用
defineExpose({
  dialogVisible,
});
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 400px;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.message {
  margin-bottom: 10px;
}

.message.user {
  text-align: right;
}

.message.assistant {
  text-align: left;
}

.message.temp {
  text-align: center;
  color: #909399;
}

.message-content {
  display: inline-block;
  padding: 8px 12px;
  border-radius: 4px;
  background-color: #f0f2f5;
}

.message.user .message-content {
  background-color: #409eff;
  color: white;
}
</style>
