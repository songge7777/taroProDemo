/**
 * @Owners songge
 * @Title taro-ui 扩展
 */
import { ComponentClass } from 'react';


export interface AtBadgeProps {
    /**
     * 角标红点
     * default false
     */
    dot?: boolean,
    /**
     * 角标内容
     */
    value?: number | string,
    /**
     * 角标最大值
     * default 99
     */
    maxValue?: number,
}

declare const AtBadge: ComponentClass<AtBadgeProps>;
