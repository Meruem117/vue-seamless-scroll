<template>
    <div class="box">
        <div class="box-head">
            <button class="box-head-btn" @click="clearData">清空</button>
            <button class="box-head-btn" @click="setData">赋值</button>
            <button class="box-head-btn" @click="setSteep(0.5)">steep 0.5</button>
            <button class="box-head-btn" @click="setSteep(0)">steep 0</button>
            <input v-model="num" type="number" />
        </div>
        <vue-seamless-scroll class="list" :data="data" direction="top" :steep="steep" roller :distance="20"
            v-if="data.length > 0">
            <div class="list-item" v-for="item, index in data" :key="index">{{ item }}</div>
        </vue-seamless-scroll>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const num = ref<number>(0)
const data = ref<string[]>([])
const steep = ref<number>(0.5)

function clearData() {
    num.value = 0
    data.value = []
}

function setData() {
    let list: string[] = []
    for (let i = 0; i < num.value; i++) {
        list.push(`测试滚动数据${i + 1}`)
    }
    data.value = list
}

function setSteep(value: number) {
    steep.value = value
}
</script>

<style scoped>
.box {
    width: 100%;
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.box .box-head {
    margin-bottom: 15px;
    display: flex;
}

.box .box-head .box-head-btn {
    margin-right: 15px;
}

.list {
    height: 300px;
    overflow: hidden;
}

.list .list-item {
    width: 500px;
    height: 100px;
    margin-bottom: 20px;
    color: #000;
    font-size: 14px;
    background-color: aliceblue;
}
</style>
