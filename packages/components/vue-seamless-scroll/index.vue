<template>
    <div class="seamless-list" ref="scrollBody" @mouseenter="mouseenterFunc" @mouseleave="mouseleaveFunc"
        @wheel="mousewheelFunc">
        <div class="seamless-list__body" :class="{ 'is-horizontal': isHorizontal }" ref="listBody"
            :style="{ transform: getScrollDistance() }">
            <slot></slot>
        </div>
        <div class="seamless-list__body" :class="{ 'is-horizontal': isHorizontal }" v-if="state.isCanScroll"
            :style="{ transform: getScrollDistance() }">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'VueSeamlessScroll'
}
</script>

<script setup lang="ts">
import { withDefaults, reactive, ref, computed, watch, nextTick, onMounted } from 'vue'

export interface Props {
    direction?: 'top' | 'bottom' | 'left' | 'right',
    steep?: number,
    roller?: boolean,
    distance?: number,
    data?: any[]
}

export interface State {
    scrollDistance: number,
    bodyHeight: number,
    bodyWidth: number,
    listHeight: number,
    listWidth: number,
    isCanScroll: boolean,
    isStop: boolean,
    animationFrame: number | null
}

const props = withDefaults(defineProps<Props>(), {
    direction: 'top',
    steep: 0.5,
    roller: true,
    distance: 20
})
const state: State = reactive({
    scrollDistance: 0, // 滚动距离
    bodyHeight: 0, // 滚动容器高度
    bodyWidth: 0, // 滚动容器宽度
    listHeight: 0, // 列表高度
    listWidth: 0, // 列表宽度
    isCanScroll: true,
    isStop: false,
    animationFrame: null,
})
const scrollBody = ref<HTMLElement>()
const listBody = ref<HTMLElement>()
const isHorizontal = computed(() => {
    return props.direction === 'left' || props.direction === 'right'
})

watch(() => props.data, () => {
    initData()
})

onMounted(() => {
    nextTick(() => {
        initData()
    })
})

function initData() {
    nextTick(() => {
        state.scrollDistance = 0
        state.bodyHeight = scrollBody.value?.clientHeight || 0
        state.bodyWidth = scrollBody.value?.clientWidth || 0
        state.listHeight = listBody.value?.clientHeight || 0
        state.listWidth = listBody.value?.clientWidth || 0
        state.isCanScroll = true
        if ((state.bodyHeight !== 0 && state.listHeight !== 0 && state.listHeight >= state.bodyHeight) ||
            (state.bodyWidth !== 0 && state.listWidth !== 0 && state.listWidth >= state.bodyWidth)) {
            state.isCanScroll = true
            start()
        } else {
            state.isCanScroll = false
        }
    })
}

function start() {
    // 判断是否可以滚动函数
    const isScrollFunc = (bodySize: number, listSize: number) => {
        if (bodySize > listSize) {
            state.scrollDistance = 0
            state.isCanScroll = false
        }
    }
    state.isStop = false
    // 判断是否可以滚动
    if (!isHorizontal.value) {
        isScrollFunc(state.bodyHeight, state.listHeight)
    } else {
        isScrollFunc(state.bodyWidth, state.listWidth)
    }
    if (state.isCanScroll) {
        run()
    }
}

function run() {
    clearAnimation()
    state.animationFrame = window.requestAnimationFrame(() => {
        // 滚动主逻辑函数
        const main = (listSize: number, bodySize: number) => {
            let scrollDistance = Math.abs(state.scrollDistance)
            if (state.scrollDistance < 0) {
                let size = 2 * listSize - bodySize
                if (scrollDistance > size) {
                    state.scrollDistance = -(listSize - bodySize);
                }
            } else {
                state.scrollDistance = -listSize
            }
        }
        // 根据滚动方向判断使用高度或宽度控制效果
        if (!isHorizontal.value) {
            main(state.listHeight, state.bodyHeight)
        } else {
            main(state.listWidth, state.bodyWidth)
        }
        // 判断滚动值
        if (!state.isStop) {
            if (props.direction === 'top' || props.direction === 'left') {
                state.scrollDistance -= props.steep
            } else if (props.direction === 'bottom' || props.direction === 'right') {
                state.scrollDistance += props.steep
            }
            run()
        }
    })
}

function stop() {
    state.isStop = true
    clearAnimation()
}

function getScrollDistance() {
    let style = ''
    if (!isHorizontal.value) {
        style = `translate(0, ${state.scrollDistance}px)`
    } else {
        style = `translate(${state.scrollDistance}px, 0)`
    }
    return style
}

function clearAnimation() {
    if (state.animationFrame) {
        cancelAnimationFrame(state.animationFrame)
        state.animationFrame = null
    }
}

function mouseenterFunc() {
    stop()
}

function mouseleaveFunc() {
    start()
}

function mousewheelFunc(e: WheelEvent) {
    e.preventDefault()
    if (!state.isCanScroll || !props.roller) {
        return
    }
    let dis = e.deltaY
    if (dis > 0) {
        state.scrollDistance -= props.distance
    } else {
        state.scrollDistance += props.distance
    }
    run()
}
</script>

<style scoped>
.seamless-list {
    /* white-space: nowrap;
    font-size: 0; */
    overflow: hidden;
}

.seamless-list__body {
    /* white-space: nowrap; */
    overflow: hidden;
}

.seamless-list__body.is-horizontal {
    display: inline-block;
    font-size: 0;
}
</style>
