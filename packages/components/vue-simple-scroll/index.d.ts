export interface Props {
    direction?: directionType,
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

export type directionType = 'top' | 'bottom' | 'left' | 'right'
