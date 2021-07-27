/**
 * @Owners kzc
 * @Title taro-ui 浮动弹层 types
 */

import { CommonEventFunction } from '@tarojs/components/types/common';
import { ComponentClass } from 'react';

export interface AtFloatLayoutProps {
    /**
     * 控制是否出现在页面上
     * @default false
     */
    isOpened: boolean,
    /**
     * 元素的标题
     */
    title?: string,
    /**
     * 商城的头部组件
     * created by kzc
     */
    header?: JSX.Element,
    /**
     * 商城的头部图片
     * created by kzc
     */
    imageUrl?: string,
    /**
     * 商城的头部图片
     * created by kzc
     */
    actionContent?: JSX.Element,
    /**
     * 是否垂直滚动
     * @default true
     */
    scrollY?: boolean,
    /**
     * 是否水平滚动
     * @default false
     */
    scrollX?: boolean,
    /**
     * 设置竖向滚动条位置
     */
    scrollTop?: number,
    /**
     * 设置横向滚动条位置
     */
    scrollLeft?: number,
    /**
     * 距顶部/左边多远时，触发 scrolltolower 事件
     */
    upperThreshold?: number,
    /**
     * 距底部/右边多远时，触发 scrolltolower 事件
     */
    lowerThreshold?: number,
    /**
     * 在设置滚动条位置时使用动画过渡
     * @default false
     */
    scrollWithAnimation?: boolean,
    /**
     * 元素被关闭时候触发的事件
     */
    onClose?: CommonEventFunction,
    /**
     * 滚动时触发的事件
     */
    onScroll?: CommonEventFunction,
    /**
     * 滚动到顶部/左边，会触发 onScrollToUpper 事件
     */
    onScrollToUpper?: CommonEventFunction,
    /**
     * 滚动到底部/右边，会触发 onScrollToLower 事件
     */
    onScrollToLower?: CommonEventFunction,
}

export interface AtFloatLayoutState {
    _isOpened: boolean,
}

declare const AtFloatLayout: ComponentClass<AtFloatLayoutProps>;

export default AtFloatLayout;
