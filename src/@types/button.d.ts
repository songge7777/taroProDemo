/**
 * @Owners sg
 * @Title taro-ui 扩展
 */
import { ButtonProps } from '@tarojs/components/types/Button';
import { CommonEventFunction } from '@tarojs/components/types/common';
import { ComponentClass } from 'react';


type TaroButtonProps = Pick<ButtonProps, 'appParameter' | 'formType' | 'lang' | 'onContact' | 'onError' | 'onGetPhoneNumber' | 'onGetUserInfo' | 'onOpenSetting' | 'openType' | 'sendMessageImg' | 'sendMessagePath' | 'sendMessageTitle' | 'sessionFrom' | 'showMessageCard'>;

export interface AtButtonProps extends TaroButtonProps {
    /**
     * 按钮的大小
     * default 'normal'
     */
    size?: 'normal' | 'small',
    /**
     * 按钮的类型
     */
    type?: 'primary' | 'secondary',
    /**
     * 按钮的颜色
     */
    colorRed?: boolean,
    /**
     * 设置按钮圆角
     * default false
     */
    circle?: boolean,
    /**
     * 是否通栏样式（即按钮宽度为屏幕宽度时的样式）
     * default false
     */
    full?: boolean,
    /**
     * 设置按钮的载入状态
     * default false
     */
    loading?: boolean,
    /**
     * 设置按钮为禁用态（不可点击）
     * default false
     */
    disabled?: boolean,
    /**
     * 按钮的颜色
     */
    themeColor?: boolean,
    defaultBorder?: boolean,
    /**
     * 背景的颜色
     */
    themeBackgroud?: boolean,
    /**
     * 点击按钮时触发
     */
    onClick?: CommonEventFunction,
}

export interface AtButtonState {
    isWEB: boolean,
    isWEAPP: boolean,
    isALIPAY: boolean,
}

declare const AtButton: ComponentClass<AtButtonProps>;
