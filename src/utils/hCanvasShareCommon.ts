/**
 * @Owners sg
 * @Title canvasImg share
 */
import Taro from '@tarojs/taro';


function transformRatioFactory(name: string){
    return function transformRatio(constructor: Function):void{
        constructor.prototype.x = name
    }
}

const ONESPOTFIVE = 1.5;
const ZEROSPOTFIVE = 0.5;
const TEN = 10;

// 注意这个地方 要配置ratio
const ratio: number = Taro.getStorageSync('ratio') || 2;

type drawTextType = {
    width: number, // 文本框宽度
    lineHeight: number, // 行高
    maxRows: number, // 最大行数
    text: string, // 文本内容
    fontSize: number, // 字体大小，默认 20
    color: string, // 字体颜色，默认：#000000
    bold: string,
    fontFamliy: string, // 字体样式
};
type Props = {
    ctx: Taro.CanvasContext
}
type State = {
    ctx: Taro.CanvasContext
}

@transformRatioFactory('xx')
export class CanvasShareCommon {
    state:State;
    // arc:()=>{}
    constructor(props:Props) {
        this._cInit(props)
        this.state = {
            ctx: props.ctx
        }
    }

    _cInit(props:Props){
        for(const r in props.ctx) {
            if(r !== 'state' && this[r]) throw new Error(`定义的方法${r}重复,请换个名字`);
            this[r] = props.ctx[r]
        }
    }

    /**
     * 绘图（缩放）
     * @param ctx ctx
     * @param image 图片本地路径
     * @param x 横坐标
     * @param y 纵坐标
     * @param _w 绘图的宽度
     * @param _h 绘图的高度
     */
    public async cDrawImage(image: string, _x: number, _y: number, _w: number, _h: number) {
        const { ctx } = this.state;
        ctx.drawImage(
            image,
            0,
            0,
            _w / ratio,
            _h / ratio,
        );
    }

    /**
     * 绘制圆形图片
     * @param ctx ctx
     * @param img 图片路径
     * @param x 横坐标
     * @param y 纵坐标
     * @param r 宽高
     * @param strokStyle 圆角颜色
     */
    public cCircleImg(img: string, _x: number, _y: number, _r: number, strokStyle?: string) {
        const { ctx } = this.state;
        const rate = 1;
        const x = _x / ratio;
        const y = _y / ratio;
        const r = _r / ratio;
        const radis = r / ratio;

        ctx.save(); // 保存原有的画图
        if (strokStyle) {
            ctx.lineWidth = 4;
            ctx.setStrokeStyle(strokStyle);
        }
        ctx.beginPath(); // 重新开始
        ctx.arc(// 绘制圆
            Math.floor((x + radis) * rate),
            Math.floor((y + radis) * rate),
            Math.floor(radis * rate),
            0,
            Math.PI * 2,
        );
        if (strokStyle) {
            ctx.stroke();
        }
        ctx.closePath();
        ctx.fill();
        ctx.clip(); // 裁剪

        ctx.drawImage(// 定位在圆圈范围内便会出现
            img, // 图片暂存路径
            Math.floor(x * rate),
            Math.floor(y * rate),
            Math.floor(r * rate),
            Math.floor(r * rate),
        );
        ctx.restore();
    }

    /**
     * 带有圆角的矩形
     * @param ctx ctx
     * @param x 横坐标
     * @param y 纵坐标
     * @param w 宽
     * @param h 高
     * @param r 圆角
     * @param fillStyle 填充颜色
     */
    public cRoundRect(x: number, y: number, w: number, h: number, r: number, fillStyle?: string) {
        const { ctx } = this.state;
        ctx.save(); // 保存原有的画图
        // 开始绘制

        ctx.beginPath();

        ctx.setFillStyle(fillStyle || '#ffffff');

        ctx.arc(x + r, y + r, r, Math.PI, Math.PI * ONESPOTFIVE);

        ctx.moveTo(x + r, y);

        ctx.lineTo(x + w - r, y);

        ctx.lineTo(x + w, y + r);

        ctx.arc(x + w - r, y + r, r, Math.PI * ONESPOTFIVE, Math.PI * 2);

        ctx.lineTo(x + w, y + h - r);

        ctx.lineTo(x + w - r, y + h);

        ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * ZEROSPOTFIVE);

        ctx.lineTo(x + r, y + h);

        ctx.lineTo(x, y + h - r);

        ctx.arc(x + r, y + h - r, r, Math.PI * ZEROSPOTFIVE, Math.PI);

        ctx.lineTo(x, y + r);

        ctx.lineTo(x + r, y);

        // ctx.fill();

        // ctx.setGlobalAlpha(0.04);

        // ctx.setShadow(0, 2, 4, '#000000');

        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    /**
     * 横向居中文字
     * @param ctx ctx
     * @param text 文字
     * @param x 居中的横坐标
     * @param y 纵坐标
     * @param fontSize 文字大小
     * @param fontColor 文字颜色
     */
    public cDrawTextCenterForRow(ctx: Taro.CanvasContext, text: string, x: number, y: number, fontSize: number, fontColor?: string) {
        ctx.save(); // 保存原有的画图
        // 开始绘制
        ctx.moveTo(x, y - TEN);
        ctx.lineTo(x, y + TEN);
        ctx.setFontSize(fontSize);
        ctx.setFillStyle(fontColor || '#FFFFFF');
        ctx.setTextAlign('center');
        ctx.fillText(text, x, y);
        ctx.restore();
    }

    // 拆分
    public cSplitTextToRows = (context: Taro.CanvasContext, width: number, text: string, fontSize?: number) => {
        const chars = text ? text.split('') : '';
        let tempText = '';
        const rows: string[] = ['1'];
        let r = 0;
        if (fontSize) {
            for (let index = 0; index < chars.length; index++) {
                if (tempText.length < (width / fontSize) + r) {
                    if (/[0-9a-zA-Z]/.test(chars[index])) {
                        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                        r += 0.5;
                    }
                    tempText += chars[index];
                } else {
                    r = 0;
                    index--;
                    rows.push(tempText);
                    tempText = '';
                }
            }
        } else {
            for (let index = 0; index < chars.length; index++) {
                if (context.measureText(tempText).width < width) {
                    tempText += chars[index];
                } else {
                    index--;
                    rows.push(tempText);
                    tempText = '';
                }
            }
        }
        rows.push(tempText);

        rows.shift();
        return rows;
    };

    // 计算换行
    public cAutoDrawText = async (
        context: Taro.CanvasContext,
        x: number,
        y: number,
        {
            width, // 文本框宽度
            lineHeight, // 行高
            maxRows, // 最大行数
            text, // 文本内容
            fontSize, // 字体大小，默认 20
            color = '#333333', // 字体颜色，默认：#000000
            bold = 'normal normal',
            fontFamliy = 'serif',
        }: drawTextType,
        coulumnNum?: { r: number},
    ) => {
        context.fillStyle = color;
        context.font = `${bold} ${fontSize}px ${fontFamliy}`;
        context.setFontSize(fontSize);
        let textRows = [''];
        if (maxRows > 1) {
            textRows = this.cSplitTextToRows(context, width, text, fontSize);
        } else {
            textRows = this.cSplitTextToRows(context, width, text);
        }
        if (textRows.length > maxRows) {
            textRows = textRows.slice(0, maxRows);
            const arr = textRows[maxRows - 1].split('');
            // 截取 第三行的 数据 用... 替换
            arr.pop();
            arr.pop();
            textRows[maxRows - 1] = arr.join('') + '....';
        }
        if (coulumnNum) {
            coulumnNum.r = textRows.length;
        }
        textRows.forEach((txt, index) => {
            context.fillText(txt, x, y + index * lineHeight, width);
        });
    };

    /**
     * 填充文字
     * @param ctx ctx
     * @param text 文字
     * @param x 横坐标
     * @param y 纵坐标
     * @param fontSize 文字大小
     * @param fontColor 文字颜色
     */
    public cDrawText(ctx: Taro.CanvasContext, text: string, x: number, y: number, fontSize: number, fontColor?: string) {
        ctx.save(); // 保存原有的画图
        // 开始绘制
        ctx.setFontSize(fontSize);
        ctx.setFillStyle(fontColor || '#FFFFFF');
        ctx.fillText(text, x, y);
        ctx.restore();
    }

    /**
     * 填充文字
     * @param ctx ctx
     * @param text 文字
     * @param x 横坐标
     * @param y 纵坐标
     * @param fontSize 文字大小
     * @param maxWidth 最大宽度
     * @param fontColor 文字颜色
     */
    public cDrawTextForWidth(ctx: Taro.CanvasContext, text: string, x: number, y: number, fontSize: number, maxWidth: number, fontColor?: string) {
        ctx.save(); // 保存原有的画图
        // 开始绘制
        ctx.setFontSize(fontSize);
        ctx.setFillStyle(fontColor || '#FFFFFF');
        const arrText = text.split('');
        let line = '';
        // 保证两个文字的空间
        const m = ctx.measureText('的的...');
        const width = m.width;
        for (const info of arrText) {
            line = line + info;
            const metrics = ctx.measureText(line);
            const testWidth = metrics.width;
            if (testWidth >= maxWidth - width) {
                ctx.fillText(line + '...', x, y);
                ctx.restore();
                return;
            }
        }
        ctx.fillText(text, x, y);
        ctx.restore();
    }

    public cGetTextWidth(ctx: Taro.CanvasContext, text: string, fontSize: number) {
        ctx.save(); // 保存原有的画图
        ctx.setFontSize(fontSize);
        const m = ctx.measureText(text);
        ctx.restore();
        return m.width;
    }

    /**
     * 画线
     * @param ctx  CTX
     * @param x 开始横坐标
     * @param y 开始纵坐标
     * @param targetX 目标横坐标
     * @param targetY 目标纵坐标
     * @param color 颜色
     */
    public cDrawLine(ctx: Taro.CanvasContext, x: number, y: number, targetX: number, targetY: number, color?: string) {
        ctx.save(); // 保存原有的画图
        ctx.beginPath(); // 重新开始
        ctx.moveTo(x, y);
        ctx.lineTo(targetX, targetY);
        ctx.setStrokeStyle(color || '#FFFFFF');
        ctx.stroke();
        ctx.restore();
    }

    /**
     * 开始下载
     * @param imageUrl 图片url
     * @returns 下载后的本地临时地址
     */
    public cDownlodaImage = (url: string): Promise<{statusCode: number, tempFilePath: string}> =>
        new Promise((resolve, reject) => {
            Taro.downloadFile({
                url,
                success(res: {
                    statusCode: number,
                    tempFilePath: string,
                }) {
                    if (res.statusCode === 200) {
                        resolve(res);
                    }
                },
                fail(err) {
                    reject(err);
                },
            });
        });
    /**
     * 开始绘画
     * @param ctx CTX
     * @param canvasId id
     * @param width 源宽度
     * @param height 源高度
     * @param destWidth 输出宽度
     * @param destHeight 输出高度
     * @returns 保存后的本地临时地址
     */
    public async cStartDraw(canvasId: string, width: number, height: number, destWidth: number, destHeight: number): Promise<string> {
        const { ctx } = this.state;
        return new Promise((resolve) => {
            ctx.draw(true, async() => {
                const resFileData = await Taro.canvasToTempFilePath({
                    x: 0,
                    y: 0,
                    width,
                    height,
                    destWidth,
                    destHeight,
                    canvasId,
                    fileType: 'png',
                });
                resolve(resFileData.tempFilePath);
            });
        });
    }

    /**
     * 获取图片信息
     * @param src 图片地址 ;
     * @returns 
     */
    public cGetImageInfo = (src: string): Promise<{ path: string }> => new Promise(resolve => {
        Taro.getImageInfo({
            src,
            success(res) {
                resolve(res);
            },
        });
    });

    /**
     * 绘制方形图片
     * @param ctx ctx
     * @param img 图片路径
     * @param x 横坐标
     * @param y 纵坐标
     * @param r 宽高
     * @param strokStyle 圆角颜色
     */
    public cRectImg(ctx: Taro.CanvasContext, img: string, x: number, y: number, w: number, h: number, r: number, strokStyle?: string) {
        ctx.save(); // 保存原有的画图
        if (strokStyle) {
            ctx.lineWidth = 2;
            ctx.setStrokeStyle(strokStyle);
        }
        ctx.beginPath(); // 重新开始
        ctx.arc(x + r, y + r, r, Math.PI, Math.PI * ONESPOTFIVE);

        ctx.moveTo(x + r, y);

        ctx.lineTo(x + w - r, y);

        ctx.lineTo(x + w, y + r);

        ctx.arc(x + w - r, y + r, r, Math.PI * ONESPOTFIVE, Math.PI * 2);

        ctx.lineTo(x + w, y + h - r);

        ctx.lineTo(x + w - r, y + h);

        ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * ZEROSPOTFIVE);

        ctx.lineTo(x + r, y + h);

        ctx.lineTo(x, y + h - r);

        ctx.arc(x + r, y + h - r, r, Math.PI * ZEROSPOTFIVE, Math.PI);

        ctx.lineTo(x, y + r);

        ctx.lineTo(x + r, y);
        if (strokStyle) {
            ctx.stroke();
        }
        ctx.closePath();
        ctx.fill();
        ctx.clip(); // 裁剪

        ctx.drawImage(// 定位在圆圈范围内便会出现
            img, // 图片暂存路径
            x,
            y,
            w,
            h,
        );
        // ctx.draw(true);
        ctx.restore();
    }
}
