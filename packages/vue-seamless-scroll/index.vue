<template>
    <div class="seamless-list" ref="scrollBody" @mouseenter="onMouseenter" @mouseleave="onMouseleave" @wheel="onWheel">
        <div class="seamless-list__body" :class="{ 'is-horizontal': isHorizontal }" ref="listBody"
            :style="{ transform: getScrollStyle() }">
            <slot></slot>
        </div>
        <div class="seamless-list__body" :class="{ 'is-horizontal': isHorizontal }" v-if="canScroll"
            :style="{ transform: getScrollStyle() }">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VueSeamlessScroll',
    props: {
        // 滚动方向
        direction: {
            type: String,
            default: 'top'
        },
        // 滚动速度
        steep: {
            type: Number,
            default: 0.5
        },
        // 是否可以滑轮滚动
        roller: {
            type: Boolean,
            default: true
        },
        // 滑轮滚动的距离
        distance: {
            type: Number,
            default: 20
        },
        data: Array
    },
    data() {
        return {
            listWidth: 0,
            listHeight: 0,
            bodyWidth: 0,
            bodyHeight: 0,
            canScroll: false,
            isStop: false,
            scrollDistance: 0,
            animationFrame: null
        }
    },
    computed: {
        isHorizontal() {
            return this.direction === 'left' || this.direction === 'right'
        }
    },
    watch: {
        data: {
            handler() {
                this.$nextTick(() => {
                    this.initData()
                })
            },
            deep: true
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initData()
        })
    },
    destroyed() {
        this.stop()
    },
    methods: {
        initData() {
            this.stop()
            this.$nextTick(() => {
                this.listWidth = this.$refs.listBody ? this.$refs.listBody.clientWidth : 0
                this.listHeight = this.$refs.listBody ? this.$refs.listBody.clientHeight : 0
                this.bodyWidth = this.$refs.scrollBody ? this.$refs.scrollBody.clientWidth : 0
                this.bodyHeight = this.$refs.scrollBody ? this.$refs.scrollBody.clientHeight : 0
                this.scrollDistance = 0
                this.start()
            })
        },

        start() {
            this.isStop = false
            if (this.isHorizontal) {
                this.getCanScroll(this.listWidth, this.bodyWidth)
            } else {
                this.getCanScroll(this.listHeight, this.bodyHeight)
            }
            if (this.canScroll) {
                this.run()
            }
        },

        run() {
            let that = this
            this.clearAnimation()
            if (this.steep == 0) {
                this.setScrollDistance()
                return
            }
            this.animationFrame = window.requestAnimationFrame(() => {
                console.log(123)
                that.setScrollDistance()
                if (!that.isStop) {
                    if (that.direction === 'top' || that.direction === 'left') {
                        that.scrollDistance -= that.steep
                    } else if (that.direction === 'bottom' || that.direction === 'right') {
                        that.scrollDistance += that.steep
                    }
                    that.run()
                }
            })
        },

        stop() {
            this.isStop = true
            this.clearAnimation()
        },

        getCanScroll(listSize, bodySize) {
            this.canScroll = listSize && bodySize && listSize > bodySize
        },

        setScrollDistance() {
            if (this.isHorizontal) {
                this.getScrollDistance(this.listWidth, this.bodyWidth)
            } else {
                this.getScrollDistance(this.listHeight, this.bodyHeight)
            }
        },

        getScrollDistance(listSize, bodySize) {
            let scrollDistance = Math.abs(this.scrollDistance)
            if (this.scrollDistance < 0) {
                let size = 2 * listSize - bodySize
                if (scrollDistance > size) {
                    this.scrollDistance = -(listSize - bodySize)
                }
            } else {
                this.scrollDistance = -listSize
            }
        },

        getScrollStyle() {
            let style = ''
            if (!this.isHorizontal) {
                style = `translate(0, ${this.scrollDistance}px)`
            } else {
                style = `translate(${this.scrollDistance}px, 0)`
            }
            return style
        },

        clearAnimation() {
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame)
                this.animationFrame = null
            }
        },

        onMouseenter() {
            this.stop()
        },

        onMouseleave() {
            this.start()
        },

        onWheel(e) {
            e.preventDefault()
            if (!this.canScroll || !this.roller) {
                return false
            }
            let dis = e.deltaY
            if (dis > 0) {
                this.scrollDistance -= this.distance
            } else {
                this.scrollDistance += this.distance
            }
            this.run()
        }
    }
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
