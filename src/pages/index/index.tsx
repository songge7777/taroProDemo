import { Component } from 'react'
import Taro from '@tarojs/taro';
import { Canvas, View, Text } from '@tarojs/components'
import {CanvasShareCommon} from '../../utils';
import Tabs from '../components/tabs';
import './index.scss'


interface Props{}
interface State{
  current:number
}
export default class Index extends Component <Props, State> {
  constructor(props:Props){
    super(props)
    this.state={
      current:0,
    }
  }
    componentWillMount () { 
    }
  componentDidMount () {
    this.shareFn();
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  
 

  public getImageInfo = (src: string): Promise<{ path: string }> => new Promise(resolve => {
      Taro.getImageInfo({
          src,
          success(res) {
              resolve(res);
          },
      });
  });

  public shareFn = async () => {
    type R = CanvasShareCommon & Taro.CanvasContext;
    const _ctx = Taro.createCanvasContext('postCanvas', this);
    const ctx = new CanvasShareCommon({ctx:_ctx}) as R;
    const _img = await ctx.cDownlodaImage('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fgss0.baidu.com%2F-Po3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F4034970a304e251fae75ad03a786c9177e3e534e.jpg&refer=http%3A%2F%2Fgss0.baidu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632048749&t=8bf6bad79a999e513291295ec8179d7c');
    // ctx.drawImage(_img.tempFilePath, 0, 0, 421 / ratio, 338 / ratio);
    // 绘制普通图片
    ctx.cDrawImage(_img.tempFilePath, 0, 0, 300, 300);
    // 绘制圆形图片
    ctx.cCircleImg(_img.tempFilePath, 330, 0, 100);
    // 带有圆角的矩形
    // ctx.cRoundRect(_img.tempFilePath, 330, 0, 100);
    const ___r = await ctx.cRoundRect(1,2,3,4,5)
    console.log('------<>1', ___r);
    // canvas 生成的图片和canvas 宽高对应
    const _canvasImg = await ctx.cStartDraw('postCanvas', 300, 300, 300 * 2, 300 * 2);
    console.log(`canvas 生成图片`, _canvasImg);
  }
  handleClick = (value:number) => {
    this.setState({
      current: value
    })
  }
  // 微信自带分享&&button type='分享' 会走这个逻辑
  public onShareAppMessage = async () => {
    
  }

  render () {
    const tabList = [{ title: '标签页1' }, { title: '标签页2' }, { title: '标签页3' }, { title: '标签页4' }, { title: '标签页5' }, { title: '标签页6' }, { title: '标签页7' }]
    const tabItem = [
      {
        context:'1111-'
      },
      {
        context:'2222'
      },
      {
        context:'33333'
      },
      {
        context:'44444'
      },
      {
        context:'55555'
      },
      {
        context:'66666'
      },
      {
        context:'77777'
      },
    ]
    return (
      <View className='index' style={{marginBottom:'100px'}}>
        <Tabs
          current={this.state.current}
          PropsHandleClick={this.handleClick}
          scroll
          tabList={tabList}
          tabItem={tabItem}
        />
        <Text>Hello world!</Text>
        <Canvas id='postCanvasId' canvasId='postCanvas' disableScroll  style={{width:'400px',height:'500px', border: '1px solid red'}} />
        <View onClick={this.shareFn}>分享</View>
      </View>
    )
  }
}
