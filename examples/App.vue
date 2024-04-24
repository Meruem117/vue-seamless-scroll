<template>
    <div id="app">
        <div class="box">
            <div class="box-head">
                <button class="box-head-btn" @click="clearData">清空</button>
                <button class="box-head-btn" @click="setData">赋值</button>
                <input v-model="num" type="number" />
            </div>
            <vue-seamless-scroll class="list" :data="data" direction="top" :steep="0.5" roller :distance="20"
                v-if="data.length > 0">
                <div class="list-item" v-for="item, index in data" :key="index">{{ item }}</div>
            </vue-seamless-scroll>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            data: [],
            num: 0
        }
    },
    methods: {
        clearData() {
            this.num = 0
            this.data = []
        },

        setData() {
            let list = []
            for (let i = 0; i < this.num; i++) {
                list.push('测试滚动数据')
            }
            this.data = list
        }
    }
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
