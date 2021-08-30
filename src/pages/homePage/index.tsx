
import Taro from '@tarojs/taro';
import { Component } from 'react'
import { View } from '@tarojs/components'
import { NavigationBar } from '@/components/NavigationBar'
import { _ChunkRoutes } from '../../configs/routesConfig';
import './index.scss'

export default class Index extends Component {

    componentWillMount () { 
    }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View>
        <NavigationBar background='red' title='ddd' />
        {/* <NavigationBar background='red'>
          <Text>自定义 NavigationBar</Text>
        </NavigationBar> */}
        <View>
          123
        </View>
        ---- 跳转 chunks goods -----
        <View onClick={()=>{
          Taro.navigateTo({
            url: _ChunkRoutes.homePage1
          })
        }}
        >goods</View>
      </View>
    )
  }
}
