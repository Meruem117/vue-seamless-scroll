<template>
    <div class="seamless-list" ref="scrollBody" @mouseenter="onMouseenter" @mouseleave="onMouseleave" @wheel="onWheel">
        <div class="seamless-list__body" :class="{ 'is-horizontal': isHorizontal }" ref="listBody"
            :style="{ transform: getScrollStyle() }">
            <slot></slot>
        </div>
        <div class="seamless-list__body" :class="{ 'is-horizontal': isHorizontal }" v-if="state.canScroll"
            :style="{ transform: getScrollStyle() }">
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
import { withDefaults, reactive, ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'

export interface Props {
    direction?: 'top' | 'bottom' | 'left' | 'right',
    steep?: number,
    roller?: boolean,
    distance?: number,
    data?: any[]
}

export interface State {
    listWidth: number,
    listHeight: number,
    bodyWidth: number,
    bodyHeight: number,
    canScroll: boolean,
    isStop: boolean,
    scrollDistance: number,
    animationFrame: number | null
}

const props = withDefaults(defineProps<Props>(), {
    direction: 'top',
    steep: 0.5,
    roller: true,
    distance: 20
})
const state: State = reactive({
    listWidth: 0,
    listHeight: 0,
    bodyWidth: 0,
    bodyHeight: 0,
    canScroll: false,
    isStop: false,
    scrollDistance: 0,
    animationFrame: null
})
const scrollBody = ref<HTMLElement>()
const listBody = ref<HTMLElement>()
const isHorizontal = computed(() => {
    return props.direction === 'left' || props.direction === 'right'
})

watch(() => props.data, () => {
    nextTick(() => {
        initData()
    })
})

onMounted(() => {
    nextTick(() => {
        initData()
    })
})

onUnmounted(() => {
    stop()
})

function initData() {
    stop()
    nextTick(() => {
        state.listWidth = listBody.value?.clientWidth || 0
        state.listHeight = listBody.value?.clientHeight || 0
        state.bodyWidth = scrollBody.value?.clientWidth || 0
        state.bodyHeight = scrollBody.value?.clientHeight || 0
        state.scrollDistance = 0
        start()
    })
}

function start() {
    state.isStop = false
    if (isHorizontal.value) {
        getCanScroll(state.listWidth, state.bodyWidth)
    } else {
        getCanScroll(state.listHeight, state.bodyHeight)
    }
    if (state.canScroll) {
        run()
    }
}

function run() {
    clearAnimation()
    if (props.steep == 0) {
        setScrollDistance()
        return
    }
    state.animationFrame = window.requestAnimationFrame(() => {
        setScrollDistance()
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

function getCanScroll(listSize: number, bodySize: number) {
    state.canScroll = (listSize && bodySize) ? listSize > bodySize : false
}

function setScrollDistance() {
    if (isHorizontal.value) {
        getScrollDistance(state.listWidth, state.bodyWidth)
    } else {
        getScrollDistance(state.listHeight, state.bodyHeight)
    }
}

function getScrollDistance(listSize: number, bodySize: number) {
    let scrollDistance = Math.abs(state.scrollDistance)
    if (state.scrollDistance < 0) {
        let size = 2 * listSize - bodySize
        if (scrollDistance > size) {
            state.scrollDistance = -(listSize - bodySize)
        }
    } else {
        state.scrollDistance = -listSize
    }
}

function getScrollStyle() {
    let style = ''
    if (isHorizontal.value) {
        style = `translate(${state.scrollDistance}px, 0)`
    } else {
        style = `translate(0, ${state.scrollDistance}px)`
    }
    return style
}

function clearAnimation() {
    if (state.animationFrame) {
        cancelAnimationFrame(state.animationFrame)
        state.animationFrame = null
    }
}

function onMouseenter() {
    stop()
}

function onMouseleave() {
    start()
}

function onWheel(e: WheelEvent) {
    e.preventDefault()
    if (!state.canScroll || !props.roller) {
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
    overflow: hidden;
}

.seamless-list__body {
    overflow: hidden;
}

.seamless-list__body.is-horizontal {
    display: inline-block;
    font-size: 0;
}
</style>
