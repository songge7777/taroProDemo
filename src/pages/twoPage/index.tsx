import { Component } from 'react'
import { View } from '@tarojs/components'
import Tabs from '../components/tabs';
import './index.scss'

interface Props{}
interface State{
  current:number
}
export default class Index extends Component<Props, State> {
    constructor(props:Props){
      super(props)
      this.state={
        current:0,
      }
    }

    componentWillMount () { 
    }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  handleClick = (value:number) => {
    this.setState({
      current: value
    })
  }
  render () {
    const tabList = [
      { title: '标签页1' },
      { title: '标签页2' },
      { title: '标签页3' },
      { title: '标签页4' },
      { title: '标签页5' },
      { title: '标签页6' },
      { title: '标签页1' },
      { title: '标签页2' },
      { title: '标签页3' },
      { title: '标签页4' },
      { title: '标签页5' },
      { title: '标签页6' },
      { title: '标签页1' },
      { title: '标签页2' },
      { title: '标签页3' },
      { title: '标签页4' },
      { title: '标签页5' },
      { title: '标签页6' },
    ]
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
      <View className='all-categorey-page'>
          <View className='body-wrap'>
            <Tabs 
            // 圆角
              isTabsRadius
              PropsHandleClick={this.handleClick}
              height='88vh'
              scroll
              current={this.state.current}
              tabDirection='vertical'
              tabList={tabList}
              tabItem={tabItem}
            />
        </View>
      </View>
    )
  }
}
