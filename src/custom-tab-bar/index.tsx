/**
 * @Owners linrui
 * @Title custom-tab-bar 自定义tabbar
 */
import { CoverImage, CoverView } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { Component } from "react";

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
 

const createTabBarConfig = () => {
    const _tabBarConfig: TabItem[] = tabBarConfig.map((item: TabItem) => ({
        pagePath: item.pagePath,
        text: item.text,
        iconPath: `../${item.iconPath}`,
        selectedIconPath: `../${item.selectedIconPath}`,
    }));
    return _tabBarConfig;
};
 
type Props = {
    tabBarIndex: number,
    count: number,
};

type State = {
    selected: number,
};

const list: TabItem[] = createTabBarConfig();
 class _CustomTabBar extends Component<Props, State> {
    constructor(props:Props){
        super(props);
        this.state = {
            selected: 0,
        }
    }
     public readonly switchTab = (item: TabItem, _index: number) => {
         console.log("点击tabbar 跳转的事件", item.pagePath, this.state.selected, _index);
         const _customTabBaar = Taro.getStorageSync("customTabBaar");
         if (_customTabBaar === item.pagePath) return;
         Taro.setStorageSync("customTabBaar", item.pagePath);
         const url = "/" + item.pagePath;
         //  const { tabBarIndex } = this.props;
         //  tabBarIndex !== -1 && 
        //  this.setState({
        //     selected: _index,
        //  })
         Taro.switchTab({url});
     };
 
     public readonly getCurrentTab = () => {
         const _customTabBaar = Taro.getStorageSync("customTabBaar");
        //  console.log("获取当前的路径", _customTabBaar);
         let _r = tabBarConfig.findIndex(_item => _item.pagePath === _customTabBaar);
         _r = _r !== -1 ? _r : 0;
         return _r;
     }
 
     public render() {
         const _isSelected = this.getCurrentTab();
         console.log("_isSelected", _isSelected);
         return (
             <CoverView className='custom-tab-bar'>
                 {list.map((item, index) => {
                     const isSelected = _isSelected === index;
                     return (
                         <CoverView className='tab-bar-item' onClick={() => this.switchTab(item, index)} data-path={item.pagePath} key={item.text} >
                             <CoverImage className='tab-bar-item-icon' src={isSelected ? item.selectedIconPath : item.iconPath} />
                             <CoverView className='tab-bar-item-text' style={{
                                 color: isSelected ? "#3D3D47" : "#A9ADB6",
                             }}
                             >
                                 {_isSelected}{item.text}{this.state.selected}
                             </CoverView>
                         </CoverView>
                     );
                 })}
             </CoverView>
         );
     }
}
export default _CustomTabBar;
 