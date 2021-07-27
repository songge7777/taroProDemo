/**
 * @Owners sg
 * @Title component navigationBar
 */
import { Image, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Component } from 'react'; // 框架 Hooks （基础 Hooks）
import BACK_ICON from '@/assets/imgs/back.png';
import './index.scss';

type Props = {
    title?: string,
    backIcon?: string,
    background?: string,
};
// const BACK_ICON = 'assets/imgs/back.png';

class _NavigationBar extends Component<Props, {
    statusBarHeight: string,
    navigationBarHeight: string,
    menuButtonHeight: string,
    navigationBarAndStatusBarHeight: string,
}> {
    public constructor(props: Props) {
        super(props);
        const statusBarHeight = Number(Taro.getStorageSync('statusBarHeight'));
        const navigationBarHeight = Number(Taro.getStorageSync('navigationBarHeight'));
        this.state = {
            // 状态栏高度
            statusBarHeight: Taro.getStorageSync('statusBarHeight') + 'px',
            // 导航栏高度
            navigationBarHeight: Taro.getStorageSync('navigationBarHeight') + 'px',
            // 胶囊按钮高度
            menuButtonHeight: Taro.getStorageSync('menuButtonHeight') + 'px',
            // 导航栏和状态栏高度
            navigationBarAndStatusBarHeight: (statusBarHeight + navigationBarHeight) + 'px',
        };
    }

    private readonly goBack = () => {
        Taro.navigateBack();
    };

    public render() {
        const { navigationBarAndStatusBarHeight, statusBarHeight, navigationBarHeight, menuButtonHeight } = this.state;
        const { title, children, backIcon, background } = this.props;
        console.log('navigationBarHeight', navigationBarHeight);
        return (<>
            <View className='navigation-container' style={{ height: navigationBarAndStatusBarHeight, background }}>
                <View style={{ height: statusBarHeight }} />
                <View className='navigation-bar' style={{ height: navigationBarHeight }}>
                    {
                        children || <>
                            <View className='navigation-buttons' style={{ height: menuButtonHeight }}>
                                <Image className='nav-img' onClick={this.goBack} src={backIcon || BACK_ICON} />
                            </View>
                            <View className='navigation-title'>
                                {title ? title : ''}
                            </View>
                        </>
                    }
                </View>
            </View>
            <View style={{ height: navigationBarAndStatusBarHeight }} />
        </>);
    }
}

export const NavigationBar = _NavigationBar;
