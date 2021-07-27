/**
 * @Owners jiangzm
 * @Title taro-ui 扩展
 */
import { CommonEvent } from '@tarojs/components/types/common';
import { ComponentClass } from 'react';


export interface AtActionSheetProps {
    /**
     * 是否展示元素
     * false
     */
    isOpened: boolean,
    /**
     * 元素的标题
     */
    title?: string,
    /**
     * 取消按钮的内容
     */
    cancelText?: string,
    /**
     * 元素被关闭触发的事件
     */
    onClose?(event?: CommonEvent): void,
    /**
     * 点击了底部取消按钮触发的事件
     */
    onCancel?(event?: CommonEvent): void,
}

export interface AtActionSheetState {
    _isOpened: boolean,
}

export interface AtActionSheetHeaderProps {}

export interface AtActionSheetFooterProps {
}

export interface AtActionSheetBodyProps {}

export interface AtActionSheetItemProps {
    /**
     * 点击 Item 触发的事件
     */
    onClick?(event?: CommonEvent): void,
}

declare const AtActionSheetItem: ComponentClass<AtActionSheetItemProps>;

declare const AtActionSheet: ComponentClass<AtActionSheetProps>;

export default AtActionSheet;

export { AtActionSheetItem };
