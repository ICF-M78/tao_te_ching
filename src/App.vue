<template>
  <div class="h-full">
    <main class="flex">
      <div class="btn-group">
        <button class="switch-btn" @click="prevChapter" :disabled="curIndex === 0">上</button>
        <button class="switch-btn" @click="nextChapter" :disabled="curIndex === 80">下</button>
      </div>
      <div class="vertical-text">
        {{ curDocument.content }}
      </div>
      <div class="title-text" @click="showChapterList = true">
        {{ curDocument.title }}
      </div>
    </main>

    <!-- 章节选择弹窗 -->
    <div v-if="showChapterList" class="chapter-modal">
      <div class="chapter-modal-content">
        <div class="chapter-list">
          <div
            v-for="(doc, index) in documentList"
            :key="index"
            class="chapter-item"
            :class="{ active: index === curIndex }"
            @click="selectChapter(index)"
          >
            {{ doc.title }}
          </div>
        </div>
      </div>
      <div class="modal-overlay" @click="showChapterList = false"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getDocumentList } from './assets/document-list'

const curIndex = ref(0)
const curDocument = ref(getDocumentList(curIndex.value))
const showChapterList = ref(false)
const documentList = Array.from({ length: 81 }, (_, i) => getDocumentList(i))

const prevChapter = () => {
  if (curIndex.value > 0) {
    curIndex.value--
    curDocument.value = getDocumentList(curIndex.value)
  }
}

const nextChapter = () => {
  if (curIndex.value < 80) {
    curIndex.value++
    curDocument.value = getDocumentList(curIndex.value)
  }
}

const selectChapter = (index: number) => {
  curIndex.value = index
  curDocument.value = getDocumentList(index)
  showChapterList.value = false
}
</script>

<style>
body {
  background-color: black;
  color: #989898;
  font-family: 'LXGW WenKai Screen';
  font-weight: '400';
}

/* 组件样式 */
.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: upright;
  font-size: 1.8rem;
  line-height: 2;
  letter-spacing: 0.5em;
  height: 86vh;
  width: 100%;
  padding: 2rem 0 0 2rem;
  display: flex;
  justify-content: center;
  white-space: pre-wrap;
  word-break: keep-all;
  overflow-wrap: break-word;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.vertical-text::-webkit-scrollbar {
  display: none;
}

.title-text {
  writing-mode: vertical-rl;
  text-orientation: upright;
  font-size: 2rem;
  font-weight: bold;
  width: 10vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 2rem 2rem 0 1rem;
}

.btn-group {
  height: 89vh;
  padding: 0 0 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 2.6rem;
  padding-bottom: 2rem;
}

.switch-btn {
  writing-mode: vertical-rl;
  text-orientation: upright;
  font-size: 2rem;
  font-family: 'LXGW WenKai Screen';
  background-color: transparent;
  color: #989898;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.switch-btn:hover:not(:disabled) {
  color: #989898;
  transform: scale(1.1);
}

.switch-btn:disabled {
  color: #4a5568;
  cursor: not-allowed;
}

/* 弹窗样式 */
.chapter-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}

.chapter-modal-content {
  position: relative;
  background-color: #000;
  border: 1px solid #989898;
  border-radius: 0;
  padding: 2rem;
  width: 86vw;
  max-height: 80vh;
  overflow-y: auto;
  z-index: 1001;
}

.chapter-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.chapter-item {
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: #989898;
  border-bottom: 1px dashed #989898;
  border-radius: 0;
  transition: all 0.3s ease;
}

.chapter-item:hover {
  background-color: #989898;
  color: #000;
}

.chapter-item.active {
  background-color: #989898;
  color: #000;
}

/* 隐藏弹窗滚动条 */
.chapter-modal-content::-webkit-scrollbar {
  display: none;
}

.chapter-modal-content {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
</style>
