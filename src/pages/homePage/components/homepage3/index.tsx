
import Taro from '@tarojs/taro';
import { Component } from 'react'
import { View } from '@tarojs/components'
import { NavigationBar } from '@/components/NavigationBar'
import { _ChunkRoutes } from '../../../../configs/routesConfig';
import './index.scss'

export default class Index extends Component {

    componentWillMount () { 
    }

  componentDidMount () {
    console.log('homepage3_componentDidMount',Taro.getCurrentPages())
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View>
        {/* <NavigationBar background='red' title='ddd' /> */}
        {/* <NavigationBar background='red'>
          <Text>自定义 NavigationBar</Text>
        </NavigationBar> */}
        <View onClick={()=>
          // Taro.reLaunch({
          //   url: _ChunkRoutes.homePage2
          // })
        {
          console.log('homepage3_componentDidMount',Taro.getCurrentPages())
          Taro.navigateTo({
            url: _ChunkRoutes.homePage2
          })
        }
        }
        >
          page3
        </View>
        <View onClick={()=>
          // Taro.reLaunch({
          //   url: _ChunkRoutes.homePage2
          // })
        {
          console.log('homepage3_componentDidMount',Taro.getCurrentPages())
          Taro.redirectTo({
            url: _ChunkRoutes.homePage2
          })
        }
        }
        >
          page3
        </View>
        <View onClick={()=>
          // Taro.reLaunch({
          //   url: _ChunkRoutes.homePage2
          // })
        {
          console.log('homepage3_componentDidMount',Taro.getCurrentPages())
          Taro.switchTab({
            url: _ChunkRoutes.homePage
          })
        }
        }
        >
          switch  page3
        </View>
      </View>
    )
  }
}
