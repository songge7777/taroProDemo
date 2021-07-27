/**
 * @Owners songge
 * @Title taro-ui 扩展
 */
import { InputProps } from '@tarojs/components/types/Input';
import { BaseEventOrig, ITouchEvent } from '@tarojs/components/types/common';
import { ComponentClass } from 'react';

declare type OmitInputProps = Omit<
InputProps,
'className' | 'onBlur' | 'onChange' | 'onConfirm' | 'onFocus' | 'onKeyboardHeightChange' | 'type'
>;

declare type InputFunction<T extends number | string, U = unknown, R = void> = (
    value: T,
    event?: BaseEventOrig<U>
) => R;

declare type InputBaseEventDetail = {
    /** 输入值 */
    value: number | string,
};

export declare type InputEventDetail = InputBaseEventDetail & {
    /** 光标位置 */
    cursor: number,
    /** 键值 */
    keyCode: number,
};

export declare type FocusEventDetail = InputBaseEventDetail & {
    /** 键盘高度 */
    height: number,
};

export declare type BlurEventDetail = InputBaseEventDetail;

export declare type ConfirmEventDetail = InputBaseEventDetail;

export declare type KeyboardHeightEventDetail = {
    /** 键盘高度 */
    height: number,
    /** 持续时间 */
    duration: number,
};

export interface AtInputProps extends OmitInputProps {
    value?: string,
    password?: boolean,
    maxlength?: number,
    /**
     * 光标结束位置，自动聚集时有效，需与 selection-start 搭配使用
     */
    selectionEnd?: number,
    /**
     * 指定光标与键盘的距离，单位 px 。取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离,只在微信小程序有效
     */
    cursorSpacing?: number,
    /**
     * 设置键盘右下角按钮的文字,只在小程序有效
     */
    confirmType?: 'done' | 'go' | 'next' | 'search' | 'send',
    /**
     * 光标起始位置，自动聚集时有效，需与 selection-end 搭配使用
     */
    selectionStart?: number,
    // clear?: number,
    /**
     * 指定光标与键盘的距离，单位 px 。取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离,只在微信小程序有效
     */
    cursor?: number,
    /**
     * 输入框的唯一标识，有传入点击 title 会聚焦输入框
     */
    name: string,
    /**
     * 输入框左侧标题，若传入为空，则不显示标题
     */
    title?: string,
    /**
     * 输入框类型
     * @defalut 'text'
     */
    type?: 'digit' | 'idcard' | 'number' | 'password' | 'phone' | 'text',
    /**
     * 是否出现错误
     * default false
     */
    error?: boolean,
    /**
     * 是否显示清除按钮，需要传入 onChange 事件来改变 value
     * default false
     */
    clear?: boolean,
    /**
     * 是否显示下划线边框
     * default true
     */
    border?: boolean,
    /**
     * 是否禁止输入，禁止点击按钮
     * default false
     */
    disabled?: boolean,
    /**
     * 占位符
     */
    placeholder?: string,
    /**
     * 指定 placeholder 的样式，只在小程序有效
     */
    placeholderStyle?: string,
    /**
     * 指定 placeholder 的样式类，只在小程序有效
     */
    placeholderClass?: string,
    /**
     * 是否可编辑
     * default true
     */
    editable?: boolean,
    /**
     * 键盘弹起时，是否自动上推页面
     * default false
     */
    adjustPosition?: boolean,
    /**
     * 是否自动聚焦
     * default false
     */
    autoFocus?: boolean,
    /**
     * 是否聚焦
     * default false
     */
    focus?: boolean,
    /**
     * 是否必填
     * default false
     */
    required?: boolean,
    /**
     * 输入框失去焦点时触发的事件，v2.0.3 版本可以获取 event 参数
     */
    onBlur?: InputFunction<number | string, BlurEventDetail>,
    /**
     * 输入框被选中时触发的事件，v2.0.3 版本可以获取 event 参数
     */
    onFocus?: InputFunction<number | string, FocusEventDetail>,
    /**
     * 输入框值改变时触发的事件，开发者需要通过 onChange 事件来更新 value 值变化，onChange 函数必填。
     * 小程序中，如果想改变 value 的值，需要 return value 从而改变输入框的当前值, v2.0.3 版本可以获取 event 参数
     */
    onChange: InputFunction<number | string, InputEventDetail>,
    /**
     * 点击完成按钮时触发，v2.0.3 版本可以获取 event 参数
     */
    onConfirm?: InputFunction<number | string, ConfirmEventDetail>,
    /**
     * 当 editable 为 false 时，点击组件触发的事件，v2.3.3 版本可以获取 event 参数
     */
    onClick?(event?: ITouchEvent): void,
    /**
     * 键盘高度发生变化的时候触发此事件
     */
    onKeyboardHeightChange?(
        event?: BaseEventOrig<KeyboardHeightEventDetail>
    ): void,
    /**
     * 点击错误按钮触发的事件，v2.3.3 版本可以获取 event 参数
     */
    onErrorClick?(event?: ITouchEvent): void,
}

declare const AtInput: ComponentClass<AtInputProps>;
