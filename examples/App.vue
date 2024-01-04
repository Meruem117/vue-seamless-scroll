<template>
    <div id="app">
        <div class="box">
            <vue-seamless-scroll class="list" :data="data" direction="top" :steep="0.5" roller :distance="20">
                <div class="list-item" v-for="item, index in data" :key="index">{{ item.text }}</div>
            </vue-seamless-scroll>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            data: [
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
            ]
        }
    },
}
</script>

<style scoped>
.box {
    width: 100%;
    height: 200px;
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
