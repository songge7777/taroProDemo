import Taro from '@tarojs/taro';
import { Component } from "react";
import { Provider } from "react-redux";
import configStore from "./store";
import "./app.scss";

const store = configStore();

const DEFALUT_MENUBUTTON_HEIGHT = 32;
const ANDROID_DEFAULT_NAV_HEIGHT = 48;
const IOS_DEFAULT_NAV_HEIGHT = 40;
// 根据自己 二维码url 进行配置
type launchQuery = {
  shopId: number,
  appId: string,
  scene?: string,
};


class App extends Component {

    componentDidMount () {}

    componentDidShow () {}

    componentDidHide () {}

    componentDidCatchError () {}

    public onLaunch = async ({ query, sceneVal }) => {
        console.log('首次启动');
        console.log('query参数', query);
        /* 首次启动时先获取状态栏以及导航栏高度，如果有需要设置自定义导航栏则可直接用*/
        const { statusBarHeight, platform, windowWidth } = Taro.getSystemInfoSync();
        // 胶囊位子信息
        const { top, height } = Taro.getMenuButtonBoundingClientRect();
        // 状态栏高度
        Taro.setStorageSync('statusBarHeight', statusBarHeight);
        Taro.setStorageSync('menuButtonHeight', height ? height : DEFALUT_MENUBUTTON_HEIGHT);
        const width = 750;
        const ratio = width / windowWidth;
        Taro.setStorageSync('ratio', ratio);

        let navigationBarHeight = 0;
        // 判断胶囊按钮信息是否成功获取
        if (top && top !== 0 && height && height !== 0) {
            navigationBarHeight = (top - statusBarHeight) * 2 + height;
            // 导航栏高度
        } else {
            navigationBarHeight = ANDROID_DEFAULT_NAV_HEIGHT;
            if (platform === 'ios') {
                navigationBarHeight = IOS_DEFAULT_NAV_HEIGHT;
            }
        }
        Taro.setStorageSync('navigationBarHeight', navigationBarHeight);
        const extConfig = Taro.getExtConfigSync ? Taro.getExtConfigSync() : {};
        // 根据二维码 进来获取 query 配置
        const _scene = (query as launchQuery).scene || '';

        console.log('启动配置', query, extConfig, sceneVal);
    };
    // this.props.children 是将要会渲染的页面
    render () {
        return (
          <Provider store={store}>
            {this.props.children}
          </Provider>
        )
    }
}
    
export default App;
