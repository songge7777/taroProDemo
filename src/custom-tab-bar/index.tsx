/**
 * @Owners linrui
 * @Title custom-tab-bar 自定义tabbar
 */
import { CoverImage, CoverView } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { Component } from "react";
import { connect } from 'react-redux'
import actions from '../store/actions/counter';
import "./index.scss";

const tabBarConfig = [
    {
        pagePath:"pages/index/index",
        text:"首页",
        iconPath: "assets/tabbar/home.png",
        selectedIconPath: "assets/tabbar/sHome.png",
    },
    {
        pagePath:"pages/homePage/index",
        text:"homePage",
        iconPath: "assets/tabbar/feat.png",
        selectedIconPath: "assets/tabbar/sfeat.png",
    },
    {
        pagePath:"pages/twoPage/index",
        text:"twoPage",
        iconPath: "assets/tabbar/me.png",
        selectedIconPath: "assets/tabbar/sMe.png",
    }
];
 type TabItem = {
     pagePath: string,
     text: string,
     iconPath: string,
     selectedIconPath: string,
 };
 
type Props = {
    tabBarIndex: number,
    count: number,
    add: (num: number) =>{},
};

const createTabBarConfig = () => {
    const _tabBarConfig: TabItem[] = tabBarConfig.map((item: TabItem) => ({
        pagePath: item.pagePath,
        text: item.text,
        iconPath: `../${item.iconPath}`,
        selectedIconPath: `../${item.selectedIconPath}`,
    }));
    return _tabBarConfig;
};
 
const list: TabItem[] = createTabBarConfig();
 class _CustomTabBar extends Component<Props, unknown> {
    constructor(props:Props){
        super(props);
        this.state = {
        };
    }
     public readonly switchTab = (item: TabItem, index) => {
         console.log("点击tabbar 跳转的事件", item.pagePath, index);
        //  const _customTabBaar = Taro.getStorageSync("customTabBaar");
        //  if (_customTabBaar === item.pagePath) return;
        // redux.dispatch(redux.action.tabBarChange(index));
        this.props.add(index);
         Taro.setStorageSync("customTabBaar", item.pagePath);
         //  注意 '/' 不加会报错
         const url = "/" + item.pagePath;
         //  const { tabBarIndex } = this.props;
         //  tabBarIndex !== -1 && 
         Taro.switchTab({url});
     };
 
    //  public readonly getCurrentTab = () => {
    //      const _customTabBaar = Taro.getStorageSync("customTabBaar");
    //      console.log("获取当前的路径", _customTabBaar);
    //      let _r = tabBarConfig.findIndex(_item => _item.pagePath === _customTabBaar);
    //      _r = _r !== -1 ? _r : 0;
    //      return _r;
    //  }
 
     public render() {
         const { count } = this.props;
         return (
             <CoverView className='custom-tab-bar'>
                 {list.map((item, index) => {
                     const isSelected = count === index;
                     return (
                         <CoverView className='tab-bar-item' onClick={() => this.switchTab(item, index)} data-path={item.pagePath} key={item.text} >
                             <CoverImage className='tab-bar-item-icon' src={isSelected ? item.selectedIconPath : item.iconPath} />
                             <CoverView className='tab-bar-item-text' style={{
                                 color: isSelected ? "#3D3D47" : "#A9ADB6",
                             }}
                             >
                                 {item.text}{count}
                             </CoverView>
                         </CoverView>
                     );
                 })}
             </CoverView>
         );
     }
}
const mapTabBarState = (_state) => ({
    count: _state.counter.num,
});
const CustomTabBar = connect(mapTabBarState,actions)(_CustomTabBar);

export default CustomTabBar;
 