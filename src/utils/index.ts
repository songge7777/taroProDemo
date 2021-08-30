/**
 * @Owners sg
 * @Title taro-ui utils
 */
import Taro from '@tarojs/taro';
import { SelectorQuery } from '@tarojs/taro/types/index';
import { CanvasShareCommon } from './hCanvasShareCommon';

const ENV = Taro.getEnv();
const DEFAULTDLAY = 500;

function delay(delayTime = 25): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, delayTime);
    });
}

function delayQuerySelector(
    selectorStr: string,
    delayTime = 500,
): Promise<unknown[]> {
    return new Promise(resolve => {
        const selector: SelectorQuery = Taro.createSelectorQuery();
        delay(delayTime).then(() => {
            selector.select(selectorStr)
                .boundingClientRect()
                .exec((res: unknown[]) => {
                    resolve(res);
                });
        });
    });
}

function delayGetScrollOffset({ delayTime = DEFAULTDLAY }): Promise<unknown[]> {
    return new Promise(resolve => {
        delay(delayTime).then(() => {
            Taro.createSelectorQuery()
                .selectViewport()
                .scrollOffset()
                .exec((res: unknown[]) => {
                    resolve(res);
                });
        });
    });
}

function delayGetClientRect({ selectorStr = '', delayTime = DEFAULTDLAY }): Promise<unknown[]> {
    const selector: SelectorQuery = Taro.createSelectorQuery();

    return new Promise(resolve => {
        delay(delayTime).then(() => {
            selector
                .select(selectorStr)
                .boundingClientRect()
                .exec((res: unknown[]) => {
                    resolve(res);
                });
        });
    });
}

function uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        // eslint-disable-next-line no-bitwise
        const r = Math.random() * 16 | 0;
        // eslint-disable-next-line no-bitwise
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

interface EventDetail {
    pageX: number,
    pageY: number,
    clientX: number,
    clientY: number,
    offsetX: number,
    offsetY: number,
    x: number,
    y: number,
}

interface TocuhEventDetail extends EventDetail {
    target: {
        pageX: number,
        pageY: number,
        clientX: number,
        clientY: number,
        offsetX: number,
        offsetY: number,
        x: number,
        y: number,
        offsetLeft: number,
        offsetTop: number,
    },
    touches: EventDetail[],
    changedTouches: EventDetail[],
    detail: EventDetail,
}

function getEventDetail(event: TocuhEventDetail): EventDetail {
    let detail: EventDetail;
    switch (ENV) {
        case Taro.ENV_TYPE.WEB:
            detail = {
                pageX: event.pageX,
                pageY: event.pageY,
                clientX: event.clientX,
                clientY: event.clientY,
                offsetX: event.offsetX,
                offsetY: event.offsetY,
                x: event.x,
                y: event.y,
            };
            break;

        case Taro.ENV_TYPE.WEAPP:
            detail = {
                pageX: event.touches[0].pageX,
                pageY: event.touches[0].pageY,
                clientX: event.touches[0].clientX,
                clientY: event.touches[0].clientY,
                offsetX: event.target.offsetLeft,
                offsetY: event.target.offsetTop,
                x: event.target.x,
                y: event.target.y,
            };
            break;

        case Taro.ENV_TYPE.ALIPAY:
            detail = {
                pageX: event.target.pageX,
                pageY: event.target.pageY,
                clientX: event.target.clientX,
                clientY: event.target.clientY,
                offsetX: event.target.offsetLeft,
                offsetY: event.target.offsetTop,
                x: event.target.x,
                y: event.target.y,
            };
            break;

        case Taro.ENV_TYPE.SWAN:
            detail = {
                pageX: event.changedTouches[0].pageX,
                pageY: event.changedTouches[0].pageY,
                clientX: event.target.clientX,
                clientY: event.target.clientY,
                offsetX: event.target.offsetLeft,
                offsetY: event.target.offsetTop,
                x: event.detail.x,
                y: event.detail.y,
            };
            break;

        default:
            detail = {
                pageX: 0,
                pageY: 0,
                clientX: 0,
                clientY: 0,
                offsetX: 0,
                offsetY: 0,
                x: 0,
                y: 0,
            };
            console.warn('getEventDetail暂未支持该环境');
    }
    return detail;
}

function initTestEnv(): void {
    if (process.env.NODE_ENV === 'test') {
        Taro.initPxTransform({
            designWidth: 750,
            deviceRatio: {
                640: 2.34 / 2,
                750: 1,
                828: 1.81 / 2,
            },
        });
    }
}

function isTest(): boolean {
    return process.env.NODE_ENV === 'test';
}

let scrollTop = 0;

function handleTouchScroll(flag: unknown): void {
    if (ENV !== Taro.ENV_TYPE.WEB) {
        return;
    }
    if (flag) {
        scrollTop = document.documentElement.scrollTop;

        // 使body脱离文档流
        document.body.classList.add('at-frozen');

        // 把脱离文档流的body拉上去！否则页面会回到顶部！
        document.body.style.top = `${-scrollTop}px`;
    } else {
        document.body.style.top = '';
        document.body.classList.remove('at-frozen');

        document.documentElement.scrollTop = scrollTop;
    }
}

function pxTransform(size: number): string {
    if (!size) return '';
    const designWidth = 750;
    const deviceRatio = {
        640: 2.34 / 2,
        750: 1,
        828: 1.81 / 2,
    };
    return `${size / deviceRatio[designWidth]}rpx`;
}

function objectToString(style: {} | string): string {
    if (style && typeof style === 'object') {
        let styleStr = '';
        Object.keys(style).forEach(key => {
            const lowerCaseKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
            styleStr += `${lowerCaseKey}:${style[key as keyof typeof style]};`;
        });
        return styleStr;
    } else if (style && typeof style === 'string') {
        return style;
    }
    return '';
}

/**
 * 合并 style
 */
function mergeStyle(
    style1: React.CSSProperties | string,
    style2: React.CSSProperties | string,
): {} | string {
    if (
        style1 &&
    typeof style1 === 'object' &&
    style2 &&
    typeof style2 === 'object'
    ) {
        return {
            ...style1,
            ...style2,
        };
    }
    return objectToString(style1) + objectToString(style2);
}

export {
    delay,
    delayQuerySelector,
    uuid,
    getEventDetail,
    initTestEnv,
    isTest,
    pxTransform,
    handleTouchScroll,
    delayGetClientRect,
    delayGetScrollOffset,
    mergeStyle,
    CanvasShareCommon,
};
