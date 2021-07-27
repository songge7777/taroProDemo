/**
 * @Owners kzc
 * @Title taro-ui 浮动弹层 types
 */

import {
    CommonEvent,
    CommonEventFunction,
} from '@tarojs/components/types/common';
import { ComponentClass } from 'react';


export interface SwipeActionOption {
    /**
     * 选项名称
     */
    text: string,
    /**
     * 选项样式
     */
    style?: {} | string,
    /**
     * 选项样式类名
     */
    className?: {} | string[] | string,
}

export interface AtSwipeActionProps {
    /**
     * 是否开启
     * @default false
     */
    isOpened?: boolean,
    /**
     * 是否禁止滑动
     * @default false
     */
    disabled?: boolean,
    /**
     * 点击选项时，是否自动关闭
     * @default false
     */
    autoClose?: boolean,
    /**
     * 展示的选项数组
     */
    options?: SwipeActionOption[],
    /**
     * 完全打开时触发
     */
    onOpened?: CommonEventFunction,
    /**
     * 完全关闭时触发
     */
    onClosed?: CommonEventFunction,
    /**
     * 点击触发事件
     */
    onClick?(item: SwipeActionOption, index: number, event: CommonEvent): void,
    /**
     * 默认最大滑动距离
     */
    maxOffsetSize?: number,
}

export interface AtSwipeActionState {
    componentId: string,
    offsetSize: number,
    _isOpened: boolean,
}

export interface AtSwipeActionOptionsProps {
    componentId: string,
    options: SwipeActionOption[],
    onQueryedDom(res: unknown): void,
}

declare const AtSwipeAction: ComponentClass<AtSwipeActionProps>;

export default AtSwipeAction;

