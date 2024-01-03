# vue-seamless-scroll

> github: https://github.com/Meruem117/vue-seamless-scroll


A simple vue seamless scroll component supports vue3 & vue2. Extension of [@david-j/vue-j-scroll](https://github.com/DavidJ-0/vue-j-scroll.js)



## Install

```shell
# vue3
# yarn
yarn add @meruem117/vue-seamless-scroll@latest --dev
# npm
npm i @meruem117/vue-seamless-scroll@latest --save-dev

# vue2
# yarn
yarn add @meruem117/vue-seamless-scroll@latest-v2 --dev
# npm
npm i @meruem117/vue-seamless-scroll@latest-v2 --save-dev
```



## Use

`main.ts`

```ts
import App from './App.vue'

import { VueSeamlessScroll } from '@meruem117/vue-seamless-scroll'
import '@meruem117/vue-seamless-scroll/dist/style.css'

const app = createApp(App)
app.use(VueSeamlessScroll)
```



`env.d.ts`

```ts
declare module '@meruem117/vue-seamless-scroll'
```



`*.vue`

```vue
<vue-seamless-scroll class="list" :data="data" direction="top" :steep="0.2" roller :distance="20">
    <div class="list-item" v-for="item, index in data" :key="index">{{ item.text }}</div>
</vue-seamless-scroll>
```



## Api

| 属性          | 说明                         | 类型                                   | 默认值 |
| ------------- | ---------------------------- | -------------------------------------- | ------ |
| **direction** | 滚动的方向                   | 'top' \| 'bottom' \| 'left' \| 'right' | 'top'  |
| **steep**     | 滚动的速率                   | number                                 | 0.2    |
| **roller**    | 是否可以使用滚轮滚动         | boolean                                | true   |
| **distance**  | 滚轮滚动的速率               | number                                 | 20     |
| **data**      | 接收异步数据，同步任务可不传 | array                                  | -      |



## Tips

- 如没有显示请为嵌入的标签设置字体大小
- 当 `direction` 为 `top` 或 `bottom` 时，要为组件设置高度；当 `direction` 为 `left` 或 `right` 时，要为组件设置宽度
- reference: [@david-j/vue-j-scroll](https://github.com/DavidJ-0/vue-j-scroll.js)

