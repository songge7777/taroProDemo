/**
 * @Owners jiangzm
 * @Title taro-ui 扩展
 */
import { CommonEventFunction } from '@tarojs/components/types/common';


export interface AtIconBaseProps {
    value: string,
    color?: string,
    prefixClass?: string,
    size?: number | string,
}

export interface AtIconProps extends AtIconBaseProps {
    onClick?: CommonEventFunction,
}
