
export default {
    pages: [
        "pages/index/index",
        "pages/homePage/index",
        "pages/twoPage/index",
    ],
    tabBar:{
        custom: true,
        list:[
            {
                pagePath:"pages/index/index",
                text:"首页122",
                iconPath: "assets/tabbar/home.png",
                selectedIconPath: "assets/tabbar/sHome.png",
            },
            {
                pagePath:"pages/homePage/index",
                text:"homePage2",
                iconPath: "assets/tabbar/feat.png",
                selectedIconPath: "assets/tabbar/sfeat.png",
            },
            {
                pagePath:"pages/twoPage/index",
                text:"twoPage3",
                iconPath: "assets/tabbar/me.png",
                selectedIconPath: "assets/tabbar/sMe.png",
            }
        ]
    },
    window: {
        backgroundTextStyle: "light",
        navigationBarBackgroundColor: "#fff",
        navigationBarTitleText: "WeChat",
        navigationBarTextStyle: "black"
    }
};
