## 自定义tabbar
- 1、custom 为true
- 2、添加配置文件
```yaml
custom-tab-bar/index.js
custom-tab-bar/index.json
custom-tab-bar/index.wxml
custom-tab-bar/index.wxss
```
## 自定义  NavigationBar
```ts
    <NavigationBar background='red' title='ddd' />
```

## tabs
- 封装后的tabs 用法 和 taro-ui 一样 
- 横
```js
<Tabs
    current={this.state.current}
    PropsHandleClick={this.handleClick}
    tabList={tabList}
    tabItem={tabItem}
/>

```
- 纵
- 这个我 在原来的基础上 写了一层ui
```js
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
```
## 绘制
```html
<Canvas id='postCanvasId' canvasId='postCanvas' disableScroll />
```
- `ctx.setStrokeStyle` => `ctx.stroke()` 
- `ctx.setFillStyle` => `ctx.fill()`
- beginPath
    -   开始创建一个路径。需要调用 fill 或者 stroke 才会使用路径进行填充或描边


```ts
const ctx = Taro.createCanvasContext('postCanvas', this);

// 画长方形
// begin path
ctx.rect(10, 10, 100, 30)
// 填充颜色
ctx.setFillStyle('#fff')
// 填充颜色线
ctx.setStrokeStyle('red')
// 画出当前路径的边框。默认颜色色为黑色。
ctx.stroke()

// begin another path
ctx.beginPath()
ctx.rect(10, 40, 100, 30)
// only fill this rect, not in current path
ctx.setFillStyle('blue')
// 填充矩形
ctx.fillRect(10, 70, 100, 30)

ctx.rect(10, 100, 100, 30)
// it will fill current path
ctx.setFillStyle('red')
// 填充
ctx.fill()
ctx.draw()
```

## 分包
- 在 pages页面的 同级下 配置一个subpackages即可,
- 注意点,tabar 首次渲染不能 有分包的组件
```js
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
```