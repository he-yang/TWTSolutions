<template>
  <div class="inline">
    <a href="https://mp.weixin.qq.com/s/9vg9xz7GYiR4jfJHB0zZUA?token=1443022417&lang=zh_CN" target="_blank"
      rel="noopener noreferrer" class="link">
      <span class="vertical-text">文字教程</span>
      <img src="../../assets/images/qr_intro_text.png" alt="文字教程二维码" width="60px" class="qr-code">
    </a>
    <a href="https://mp.weixin.qq.com/s/Al8lHBVzsmQ7KC16ExkDmQ?token=1443022417&lang=zh_CN" target="_blank"
      rel="noopener noreferrer" class="link">
      <span class="vertical-text">视频教程</span>
      <img src="../../assets/images/qr_intro_video.png" alt="视频教程二维码" width="60px" class="qr-code">
    </a>
  </div>
</template>

<script setup>

</script>

<style scoped>
.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: upright;
  white-space: nowrap;
  font-size: 16px;
  line-height: 1.5;
  margin-right: 10px; /* 添加右边距以增加间距 */
}

.inline {
  display: flex; /* 使用flex布局 */
  align-items: center;
  float: right;
}

.link {
  display: flex;
  align-items: center;
  text-decoration: none; /* 去除下划线 */
  color: #333; /* 设置文字颜色 */
  margin-right: 10px; /* 减小右边距以缩短间距 */
}

.qr-code {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}
</style>
