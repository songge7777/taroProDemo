import { Component } from 'react'
import Taro from '@tarojs/taro';
import { Canvas, View, Text } from '@tarojs/components'
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
  
  public downlodaImage = (url: string): Promise<{statusCode: number, tempFilePath: string}> =>
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
                fail() {
                    reject();
                },
            });
        });

  public getImageInfo = (src: string): Promise<{ path: string }> => new Promise(resolve => {
      Taro.getImageInfo({
          src,
          success(res) {
              resolve(res);
          },
      });
  });

  public shareFn = async () => {
    const ctx = Taro.createCanvasContext('postCanvas', this);
    ctx.beginPath();
    ctx.beginPath();
    const x = 50;
    const y = 50;
    const r = 50;
    const h = 50;
    const w = 150;
    ctx.fillRect(0, 0, 597, 969 );
    ctx.rect(10, 10, 150, 75)
    // ctx.setFillStyle('#fff')
    // ctx.moveTo(10, 10)
    // ctx.rect(10, 10, 100, 50)
    // ctx.lineTo(110, 60)
    // ctx.stroke()
    // ctx.fill()
    // // ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);
    // // ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2);
    // // ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5);
    // // ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI);
    // ctx.clip();
    ctx.save()
    ctx.beginPath()
    ctx.arc(50, 50, 25, 0, 2*Math.PI)
    ctx.clip()
    const _img = await this.downlodaImage('https://www.baidu.com/img/PC22_559a0d863ae10df92ee187e6a796f72b.gif');
    console.log(_img);
    ctx.drawImage(_img.tempFilePath, x, y, w, h);
    ctx.restore();

    ctx.draw(true, () => {
      console.log('ok')
    })
  }
  handleClick = (value:number) => {
    this.setState({
      current: value
    })
  }
  render () {
    const tabList = [{ title: '标签页1' }, { title: '标签页2' }, { title: '标签页3' }]
    const tabItem = [
      {
        context:'11111'
      },
      {
        context:'2222'
      },
      {
        context:'33333'
      },
    ]
    return (
      <View className='index'>
        <Tabs
          current={this.state.current}
          PropsHandleClick={this.handleClick}
          tabList={tabList}
          tabItem={tabItem}
        />
        <Text>Hello world!</Text>
        <Canvas id='postCanvasId' canvasId='postCanvas' disableScroll />
        <View onClick={this.shareFn}>分享</View>
      </View>
    )
  }
}
