<template>
    <div class="seamless-list" ref="scrollBody" @mouseenter="mouseenterFunc" @mouseleave="mouseleaveFunc"
        @wheel="mousewheelFunc">
        <div class="seamless-list__body" :class="{ 'is-horizontal': isHorizontal }" ref="listBody"
            :style="{ transform: getScrollDistance() }">
            <slot></slot>
        </div>
        <div class="seamless-list__body" :class="{ 'is-horizontal': isHorizontal }" v-if="isCanScroll"
            :style="{ transform: getScrollDistance() }">
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
            scrollDistance: 0, // 滚动距离
            bodyHeight: 0, // 滚动容器高度
            bodyWidth: 0, // 滚动容器宽度
            listHeight: 0, // 列表高度
            listWidth: 0, // 列表宽度
            isCanScroll: true,
            isStop: false,
            animationFrame: null,
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
                this.initData()
            },
            deep: true
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initData()
        })
    },
    methods: {
        initData() {
            this.$nextTick(() => {
                this.scrollDistance = 0
                this.bodyHeight = this.$refs.scrollBody.clientHeight
                this.bodyWidth = this.$refs.scrollBody.clientWidth
                this.listHeight = this.$refs.listBody.clientHeight
                this.listWidth = this.$refs.listBody.clientWidth
                this.isCanScroll = true
                if ((this.bodyHeight !== 0 && this.listHeight !== 0 && this.listHeight >= this.bodyHeight) ||
                    (this.bodyWidth !== 0 && this.listWidth !== 0 && this.listWidth >= this.bodyWidth)) {
                    this.isCanScroll = true
                    this.start()
                } else {
                    this.isCanScroll = false
                }
            })
        },

        start() {
            let that = this
            // 判断是否可以滚动函数
            let isScrollFunc = (bodySize, listSize) => {
                if (bodySize > listSize) {
                    that.scrollDistance = 0
                    that.isCanScroll = false
                }
            }
            that.isStop = false
            // 判断是否可以滚动
            if (!that.isHorizontal) {
                isScrollFunc(that.bodyHeight, that.listHeight)
            } else {
                isScrollFunc(that.bodyWidth, that.listWidth)
            }
            if (that.isCanScroll) {
                that.run()
            }
        },

        run() {
            let that = this
            that.clearAnimation()
            that.animationFrame = window.requestAnimationFrame(() => {
                // 滚动主逻辑函数
                let main = (listSize, bodySize) => {
                    let scrollDistance = Math.abs(that.scrollDistance)
                    if (that.scrollDistance < 0) {
                        let size = 2 * listSize - bodySize
                        if (scrollDistance > size) {
                            that.scrollDistance = -(listSize - bodySize)
                        }
                    } else {
                        that.scrollDistance = -listSize
                    }
                }
                // 根据滚动方向判断使用高度或宽度控制效果
                if (!that.isHorizontal) {
                    main(that.listHeight, that.bodyHeight)
                } else {
                    main(that.listWidth, that.bodyWidth)
                }
                // 判断滚动值
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

        getScrollDistance() {
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

        mouseenterFunc() {
            this.stop()
        },

        mouseleaveFunc() {
            this.start()
        },

        mousewheelFunc(e) {
            e.preventDefault()
            if (!this.isCanScroll || !this.roller) {
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
    },
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
