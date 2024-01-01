<template>
    <div class="box">
        <vue-simple-scroll class="list" :data="data" direction="top" :steep="0.2" roller :distance="20">
            <div class="list-item" v-for="item, index in data" :key="index">{{ item.text }}</div>
        </vue-simple-scroll>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let data = ref([
    { text: '测试滚动数据' },
    { text: '测试滚动数据' },
    { text: '测试滚动数据' },
    { text: '测试滚动数据' },
    { text: '测试滚动数据' },
    { text: '测试滚动数据' },
    { text: '测试滚动数据' },
    { text: '测试滚动数据' },
    { text: '测试滚动数据' },
    { text: '测试滚动数据' },
    { text: '测试滚动数据' },
    { text: '测试滚动数据' },
    { text: '测试滚动数据' },
    { text: '测试滚动数据' },
    { text: '测试滚动数据' },
    { text: '测试滚动数据' },
    { text: '测试滚动数据' },
])
</script>

<style scoped>
.box {
    width: 100%;
    padding-top: 50px;
    display: flex;
    justify-content: center;
}

.list {
    height: 300px;
    overflow: hidden;
}

.list-item {
    width: 500px;
    height: 100px;
    margin-bottom: 20px;
    color: #000;
    font-size: 14px;
    background-color: aliceblue;
}
</style>
