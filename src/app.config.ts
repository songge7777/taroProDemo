
export default {
    pages: [
        "pages/index/index",
        "pages/homePage/index",
        "pages/homePage/components/homepage1/index",
        "pages/homePage/components/homepage2/index",
        "pages/homePage/components/homepage3/index",
        "pages/twoPage/index",
    ],
    subpackages: [
        {
            root: 'chunks/goods',
            pages: [
                'addGoods/index',
            ],
        },
        {
            root: 'chunks/user',
            pages: [
                'login/index',
            ],
        },
    ],
    tabBar:{
        custom: true,
        list:[
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
        ],
        usingComponents: {
            customtabbar: "custom-tab-bar/index"
        }
    },
    window: {
        backgroundTextStyle: "light",
        navigationBarBackgroundColor: "#fff",
        navigationBarTitleText: "WeChat",
        navigationBarTextStyle: "black"
    }
};
