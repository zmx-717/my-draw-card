<template>
  <div>
    <!-- 顶部导航栏 -->
    <header class="navbar">
      <div class="navbar-container">
        <!-- Logo -->
        <div class="navbar-logo">
          <a href="#">LOGO</a>
        </div>

        <!-- 导航菜单 -->
        <nav class="navbar-menu">
          <a href="#shop" class="navbar-item">商城</a>
          <a href="#about-us" class="navbar-item">我们</a>
          <a href="#login" class="navbar-item">登录</a>
          <a href="#introduction" class="navbar-item" @click="openChat">钧小宝对话</a>
        </nav>

        <!-- 搜索框 -->
        <div class="navbar-search">
          <input type="text" placeholder="搜索..." class="search-input" />
          <button class="search-button">搜索</button>
        </div>
      </div>
    </header>

    <!-- 对话框 -->
    <div v-if="isChatOpen" class="chat-dialog">
      <div class="chat-header">
        <h3>钧小宝 对话</h3>
        <button class="close-button" @click="closeChat">×</button>
      </div>
      <div class="chat-content">
        <div v-for="(message, index) in messages" :key="index" class="chat-message">
          <strong>{{ message.role }}:</strong> {{ message.text }}
        </div>
      </div>
      <div class="chat-input">
        <input
          type="text"
          v-model="userInput"
          placeholder="输入你的问题..."
          @keyup.enter="sendMessage"
        />
        <button @click="sendMessage">发送</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 控制对话框的显示
const isChatOpen = ref(false);

// 对话内容
const messages = ref([]);

// 用户输入
const userInput = ref('');

// 打开对话框
const openChat = () => {
  isChatOpen.value = true;
};

// 关闭对话框
const closeChat = () => {
  isChatOpen.value = false;
};

// 预设的钧瓷相关信息
const predefinedResponses = {
  '你好': '你好，请问有什么可以帮助您的？',
  '钧瓷': '钧瓷是中国传统五大名瓷之一，起源于河南省禹州市，以其独特的窑变釉色闻名。',
  '历史': '钧瓷起源于唐代，兴盛于宋代，是中国陶瓷艺术的瑰宝。',
  '工艺': '钧瓷的制作工艺复杂，包括拉坯、施釉、烧制等多个环节，尤其以窑变工艺最为独特。',
  '特点': '钧瓷以其窑变釉色著称，每件作品的釉色都独一无二，被称为“入窑一色，出窑万彩”。',
  '用途': '钧瓷在古代多用于皇家御用器皿，如花瓶、香炉等，现代则广泛用于艺术收藏和装饰。',
  '窑变': '窑变是钧瓷的核心工艺，烧制过程中釉料在高温下发生化学反应，形成独特的色彩和纹理。',
  '禹州': '禹州是钧瓷的发源地，位于河南省，是中国陶瓷文化的重要发祥地之一。',
  '五大名瓷': '钧瓷与汝瓷、官瓷、哥瓷、定瓷并称为中国五大名瓷。',
  '收藏价值': '钧瓷因其独特的工艺和稀缺性，具有极高的艺术和收藏价值。',
  '现代钧瓷': '现代钧瓷在传统工艺的基础上融入了创新设计，成为艺术与实用的结合体。',
  '釉色': '钧瓷的釉色丰富多彩，包括天青、月白、玫瑰紫等，釉面光滑如玉。',
  '皇家御用': '钧瓷在宋代被列为皇家御用瓷器，普通百姓不得使用。',
  '烧制温度': '钧瓷的烧制温度通常在1300℃左右，高温下釉料会发生窑变。',
  '艺术价值': '钧瓷因其独特的窑变效果和历史文化背景，被誉为陶瓷艺术的巅峰之作。',
  '传承': '钧瓷的制作技艺被列入国家级非物质文化遗产，传承至今已有千年历史。',
  '釉料': '钧瓷的釉料以天然矿物为主，经过精心调配，形成独特的窑变效果。',
  '器型': '钧瓷的器型多样，包括花瓶、香炉、茶具等，既有实用性又具观赏性。',
  '文化意义': '钧瓷不仅是陶瓷艺术的代表，更是中华文化的重要象征之一。',
  '国际影响': '钧瓷作为中国陶瓷文化的瑰宝，在国际上享有盛誉，深受收藏家喜爱。',
  '瓷器': '瓷器是中国传统工艺的代表之一，钧瓷是其中的瑰宝。',
  '收藏': '钧瓷因其独特性和稀缺性，成为收藏爱好者的热门选择。',
  '艺术品': '钧瓷不仅是实用器皿，更是具有艺术价值的收藏品。',
  '装饰': '钧瓷常被用作家居装饰，增添艺术气息。',
  '礼物': '钧瓷因其高雅的外观和文化内涵，是馈赠亲友的佳品。',
  '价格': '钧瓷的价格因工艺和稀缺性而异，从几百元到数万元不等。',
  '购买': '钧瓷可以在专业的瓷器店或线上平台购买。',
  '保养': '钧瓷需要避免碰撞和高温，定期清洁以保持其光泽。',
  '真假': '辨别钧瓷真伪需要注意其釉色、质地和工艺细节。',
  '瓷器文化': '瓷器文化是中国传统文化的重要组成部分，钧瓷是其中的代表。',
  '手工艺': '钧瓷的制作过程以手工为主，体现了匠人精神。',
  '传统': '钧瓷是中国传统文化的象征之一，承载了深厚的历史底蕴。',
  '创新': '现代钧瓷在传统工艺的基础上融入了现代设计理念。'
};

// 发送消息
const sendMessage = () => {
  if (!userInput.value.trim()) return;

  // 添加用户消息
  messages.value.push({ role: '用户', text: userInput.value });

  // 根据关键词匹配预设回复
  const keyword = Object.keys(predefinedResponses).find(key =>
    userInput.value.includes(key)
  );

  if (keyword) {
    // 添加匹配的预设回复
    messages.value.push({ role: '钧小宝', text: predefinedResponses[keyword] });
  } else {
    // 未匹配到关键词时的默认回复
    messages.value.push({ role: '钧小宝', text: '抱歉，我暂时无法回答这个问题。' });
  }

  // 清空输入框
  userInput.value = '';
};
</script>

<style scoped>
/* 顶部导航栏样式 */
.navbar {
  width: 100%;
  height: 5vh;
  background-color: #333;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.navbar-container {
  width: 90%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-logo a {
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.navbar-menu {
  display: flex;
  gap: 20px;
}

.navbar-item {
  color: white;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s ease;
  cursor: pointer;
}

.navbar-item:hover {
  color:#1d7785;
}

.navbar-search {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-input {
  padding: 5px 10px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  outline: none;
}

.search-button {
  padding: 5px 10px;
  font-size: 14px;
  background-color: #1d7785;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-button:hover {
  background-color: #1d7785;
}

/* 对话框样式 */
.chat-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  background-color: #333;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-header h3 {
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
}

.chat-content {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}

.chat-message {
  margin-bottom: 10px;
}

.chat-input {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
}

.chat-input input {
  flex: 1;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
}

.chat-input button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color:#1d7785;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.chat-input button:hover {
  background-color:#1d7785;
}
</style>