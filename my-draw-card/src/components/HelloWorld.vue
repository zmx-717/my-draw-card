<template>
  <div class="container" @wheel="handleScroll">
    <Header />
    <div
      class="content"
      :style="{ transform: `translateY(-${currentIndex * 100}vh)` }"
    >
      <First class="item" />
      <produce class="item" />
      <DrawCard class="item" />
      <Home class="item" />
      <Food class="item" />
    </div>
   
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Header from '../layouts/Header.vue';
import First from '../views/First.vue';
import produce from '../views/produce.vue';
import DrawCard from '../views/DrawCard.vue';
import Home from '@/views/Home.vue';
import Food from '../layouts/Food.vue';

const currentIndex = ref(0); // 当前显示的组件索引
const totalItems = 5; // 子组件总数
let isScrolling = false; // 防止快速连续滚动

const handleScroll = (event) => {
  if (isScrolling) return;

  if (event.deltaY > 0 && currentIndex.value < totalItems - 1) {
    // 向下滚动，显示下一个组件
    currentIndex.value++;
  } else if (event.deltaY < 0 && currentIndex.value > 0) {
    // 向上滚动，显示上一个组件
    currentIndex.value--;
  }

  isScrolling = true;
  setTimeout(() => {
    isScrolling = false;
  }, 800); // 阻尼效果的时间
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  overflow: hidden; /* 防止滚动条出现 */
  position: relative;
}

.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1); /* 滑动阻尼效果 */
}

.item {
  width: 100%;
  height: 92vh;
  flex-shrink: 0; /* 防止子组件缩小 */
}

</style>