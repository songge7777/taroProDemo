import { Component } from 'react'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from '@/components/index'

interface Props {
  tabList:{
    title: string,
  }[],
  tabItem:{
    context: string,
  }[],
  isTabsRadius?:boolean,
  height?: string | undefined,
  width?:boolean,
  scroll?: boolean,
  swipeable?: boolean,
  current: number,
  tabDirection?:  "horizontal" | "vertical" | undefined,
  PropsHandleClick(num: number):void
}

export default class Tabs extends Component<Props,{}> {
    constructor (props: Props) {
        super(props)
        this.state={}
      }
    componentWillMount () { 
    }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  
  handleClick (value:number) {
    this.props.PropsHandleClick(value)
  }
  render () {
    const {tabList,tabItem,tabDirection,swipeable,scroll, height, current, isTabsRadius} = this.props;
    return (
      <View className='body-wrap' >
      <AtTabs scroll={scroll} isTabsRadius={isTabsRadius} height={height} current={current} tabDirection={tabDirection} swipeable={swipeable} tabList={tabList} onClick={this.handleClick.bind(this)}>
        { tabItem.map((_i,_index) => <AtTabsPane tabDirection={tabDirection}  key={_index} current={current} index={_index} >
          <View style='font-size:18px;text-align:center;height:200px;' >{_i.context}</View>
        </AtTabsPane>
        )}
      </AtTabs>
      </View>
    )
  }
}
