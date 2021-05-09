<h1 align="center">Welcome to tag-deposit 👋</h1>

## Usage

### 1、引入SDK

### 2、标注属性以及自定义事件
#### 2.1、标注属性链路维度
```
Body >= Page容器 > Module容器 > Item
```

|  标注DOM   | 说明  | 支持属性 |
|  :----  | :----  | :---- |
| Body  | document.body 上标注的属性 | 1、td-groupid 可选<br>2、td-domAM 可选<br>3、td-stayAM 可选 |
| Page  | 以 Page 容器为隔离标准，Page 容器之间允许相互嵌套 | 1、td-appid 必选<br>2、td-pageid 必选 |
| Module| Module 容器必须属于 Page 容器<br>不能嵌套更高维度的容器且 Module 容器之间不允许嵌套 | 1、td-moduleid 必选 <br>2、td-expose 可选 |
| Item  | Item 必须属于 Module 容器<br>交互型行为按钮必须为 Item<br>不能嵌套更高维度的容器且 Item 之间不允许嵌套 | 1、td-itemid 必选 |
<br>

#### 2.2、标注属性说明：
|  属性   | 示例  | 说明 |
|  :----  | :----  | :---- |
| td-groupid  | td-groupid="front-end" | 1、拓展信息|
| td-offAM | td-offAM="1" | 1、是否关闭自动检测DOM变更，默认开启 |
| td-offSM | td-offSM="1" | 1、是否关闭页面停留检测，默认开启 |
| td-appid | td-appid="app_1" | 1、链路统计方式为距离 pageid 最近且拥有 appid 的当前或上级节点 |
| td-pageid | td-pageid="page_1" | 1、链路统计方式以 pageid 作为隔离界限<br>2、统计 pageid 子节点上的 moduleid 和 itemid<br>3、忽略 pageid 子节点上的 pageid 和 appid |
| td-moduleid | td-moduleid="module_1" | 1、Module 容器 |
| td-expose | td-expose="1" | 1、跟 moduleid 配合使用，申明需要曝光的 Module 容器 |
| td-itemid | td-itemid="item_1" | 1、item 为交互行为的对象<br>2、item 会自动统计点击和曝光行为 |
<br>

#### 2.3、支持的自定义事件：
|  事件   | type |level  | 示例 |
|  :----  | :----: | :----  | :---- |
| tdExpose  | expose | page: 1<br>module: 2<br>item: 3 | const evt = new Event("tdExpose", { bubbles: true });<br>[Element].dispatchEvent(evt); |
| tdCustomize | customize | | const evt = new Event("tdCustomize", { bubbles: true });<br>[Element].dispatchEvent(evt); |
