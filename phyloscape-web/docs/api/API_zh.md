# 全局API

## phyloscape.InitTreeLayoutStructure

用于初始化进化树实例，此方式需要传入布局类型 `tree` 或者 `radial`。

```
// 引入 phyloscape.js
import { InitTreeLayoutStructure } from "phyloscape";

// new 出一个实例化对象
const treeConstructor = InitTreeLayoutStructure( < Element:Id > , {...});

console.log(treeConstructor);
```

## phyloscape.InitTreeStructure

用于初始化`tree`布局实例

```
// 引入 phyloscape.js
import { InitTreeStructure } from "phyloscape";

// new 出一个实例化对象
const treeConstructor = new InitTreeStructure( < Element:Id > , {...});

console.log(treeConstructor);
```

## phyloscape.InitRadialStructure

用于初始化`radial`布局实例

```
// 引入 phyloscape.js
import { InitRadialStructure } from "phyloscape";

// new 出一个实例化对象
const treeConstructor = new InitRadialStructure( < Element:Id > , {...});

console.log(treeConstructor);
```

## treeConstructor.init

初始化，可通过`treeConstructor.init`方式获取，其中`treeConstructor` 为 `phyloscape` 的一个实例化对象。一般用于首次加载视图：

```
treeConstructor.init({...})
```

## treeConstructor.update

视图更新，可通过`treeConstructor.update`方式获取，其中`treeConstructor` 为 `phyloscape` 的一个实例化对象。一般用于配置更新后更新视图：

```
treeConstructor.update({...})
```

## treeConstructor.d3

`d3`中的所有属性或方法，项目中使用时不用再次引入，可直接通过`treeConstructor.d3`方式获取。

```
const d3 = treeConstructor.d3;
```

## treeConstructor.setContent[#](http://www.phyloscape.cc/api/method.html#treeconstructor-setcontent)

可重新渲染新的`newick`数据，用于重置数据。

```
treeConstructor.setContent(<content>);
```

## treeConstructor.setHighlightLeaf[#](http://www.phyloscape.cc/api/method.html#treeconstructor-sethighlightleaf)

设置叶节点高亮。

```
treeConstructor.setHighlightLeaf(<data>);
```

## treeConstructor.onClick[#](http://www.phyloscape.cc/api/method.html#treeconstructor-onclick)

内部节点点击事件。

```
treeConstructor.onClick = (data) => {
    console.log(data);
};
```

# 复用参数

## style

控制样式（SVG CSS 样式均可），例如：

```
{
    "font-family": "Arial",
    "fill": "red",
    "font-size": "10px",
    "stroke-width": 0.3,
    "stroke": "#000",
    ...
}
```

## label

标题文字相关配置

- **类型**： `object`
- **默认值**： `{}`

```
{
    show: true,
    name: "",
    rotate: 0,
    dx: 0,
    dy: 0,
    spacing: 0,
    style: {
        // fill: '#666',
        // 'font-size': '10px',
    },
}
```

#### label.show

是否显示该标题文字

- **类型**： `boolean`
- **默认值**： `true`

#### [label.name](http://label.name/)

标题文字名称

- **类型**： `string`
- **默认值**： `""`

#### label.dx

标题文字横向偏移量

- **类型**： `number`
- **默认值**： `0`

#### label.dy

标题文字纵向偏移量

- **类型**： `number`
- **默认值**： `0`

#### label.spacing

标题文字的间距大小

- **类型**： `number`
- **默认值**： `0`

#### label.rotate

控制标题文字的旋转角度

- **类型**： `number`
- **默认值**： `0`

#### label.style

控制标题文字的整体样式（SVG CSS 样式均可），查看更多：[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **类型**： `object`
- **默认值**： `{}`

## symbol

用于控制图形符号类型和样式。目前支持 `circle`、`cross`、`diamond`、`square`、`star`、`triangle`、`wye`、`pie`、`bar`、`image`、`text`、`polygon`、`heart`、`thermograph`、`rect`、`ellipse` 内置符号。

- **类型**： `object`
- **默认值**： `{}`

### symbol【circle】

图形符号为`circle`时，参数如下：

```
{
    "type": "circle",
    "show": true,
    "name": "",
    "rotate": 0,
    "dx": 0,
    "dy": 0,
    "size": 5,
    "style": {}
}
```

#### symbol.show

是否显示该图形符号

- **类型**： `boolean`
- **默认值**： `true`

#### [symbol.name](http://symbol.name/)

图形符号名称，鼠标移动上去后显示

- **类型**： `string`
- **默认值**： `""`

#### symbol.dx

图形符号横向偏移量

- **类型**： `number`
- **默认值**： `0`

#### symbol.dy

图形符号纵向偏移量

- **类型**： `number`
- **默认值**： `0`

#### symbol.size

图形符号的大小

- **类型**： `number`
- **默认值**： `5`

#### symbol.rotate

控制图形符号的旋转角度

- **类型**： `number`
- **默认值**： `0`

#### symbol.style

控制图形符号的整体样式（SVG CSS 样式均可），查看更多：[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **类型**： `object`
- **默认值**： `{}`

### symbol【cross】

图形符号为`cross`时，参数如下：

```
{
    "type": "cross",
    "show": true,
    "name": "",
    "rotate": 0,
    "dx": 0,
    "dy": 0,
    "size": 5,
    "style": {}
}
```

#### symbol.show

是否显示该图形符号

- **类型**： `boolean`
- **默认值**： `true`

#### [symbol.name](http://symbol.name/)

图形符号名称，鼠标移动上去后显示

- **类型**： `string`
- **默认值**： `""`

#### symbol.dx

图形符号横向偏移量

- **类型**： `number`
- **默认值**： `0`

#### symbol.dy

图形符号纵向偏移量

- **类型**： `number`
- **默认值**： `0`

#### symbol.size

图形符号的大小

- **类型**： `number`
- **默认值**： `5`

#### symbol.rotate

控制图形符号的旋转角度

- **类型**： `number`
- **默认值**： `0`

#### symbol.style

控制图形符号的整体样式（SVG CSS 样式均可），查看更多：[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **类型**： `object`
- **默认值**： `{}`

### symbol【diamond】

图形符号为`diamond`时，参数如下：

```
{
    "type": "diamond",
    "show": true,
    "name": "",
    "rotate": 0,
    "dx": 0,
    "dy": 0,
    "size": 5,
    "style": {}
}
```

#### symbol.show

是否显示该图形符号

- **类型**： `boolean`
- **默认值**： `true`

#### [symbol.name](http://symbol.name/)

图形符号名称，鼠标移动上去后显示

- **类型**： `string`
- **默认值**： `""`

#### symbol.dx

图形符号横向偏移量

- **类型**： `number`
- **默认值**： `0`

#### symbol.dy

图形符号纵向偏移量

- **类型**： `number`
- **默认值**： `0`

#### symbol.size

图形符号的大小

- **类型**： `number`
- **默认值**： `5`

#### symbol.rotate

控制图形符号的旋转角度

- **类型**： `number`
- **默认值**： `0`

#### symbol.style

控制图形符号的整体样式（SVG CSS 样式均可），查看更多：[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **类型**： `object`
- **默认值**： `{}`

### symbol【square】

图形符号为`square`时，参数如下：

```
{
    "type": "square",
    "show": true,
    "name": "",
    "rotate": 0,
    "dx": 0,
    "dy": 0,
    "size": 5,
    "style": {}
}
```

#### symbol.show

是否显示该图形符号

- **类型**： `boolean`
- **默认值**： `true`

#### [symbol.name](http://symbol.name/)

图形符号名称，鼠标移动上去后显示

- **类型**： `string`
- **默认值**： `""`

#### symbol.dx

图形符号横向偏移量

- **类型**： `number`
- **默认值**： `0`

#### symbol.dy

图形符号纵向偏移量

- **类型**： `number`
- **默认值**： `0`

#### symbol.size

图形符号的大小

- **类型**： `number`
- **默认值**： `5`

#### symbol.rotate

控制图形符号的旋转角度

- **类型**： `number`
- **默认值**： `0`

#### symbol.style

控制图形符号的整体样式（SVG CSS 样式均可），查看更多：[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **类型**： `object`
- **默认值**： `{}`

### symbol【star】

图形符号为`star`时，参数如下：

```
{
    "type": "star",
    "show": true,
    "name": "",
    "rotate": 0,
    "dx": 0,
    "dy": 0,
    "size": 5,
    "style": {}
}
```

#### symbol.show

是否显示该图形符号

- **类型**： `boolean`
- **默认值**： `true`

#### [symbol.name](http://symbol.name/)

图形符号名称，鼠标移动上去后显示

- **类型**： `string`
- **默认值**： `""`

#### symbol.dx

图形符号横向偏移量

- **类型**： `number`
- **默认值**： `0`

#### symbol.dy

图形符号纵向偏移量

- **类型**： `number`
- **默认值**： `0`

#### symbol.size

图形符号的大小

- **类型**： `number`
- **默认值**： `5`

#### symbol.rotate

控制图形符号的旋转角度

- **类型**： `number`
- **默认值**： `0`

#### symbol.style

控制图形符号的整体样式（SVG CSS 样式均可），查看更多：[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **类型**： `object`
- **默认值**： `{}`

### symbol【triangle】

图形符号为`triangle`时，参数如下：

```
{
    "type": "triangle",
    "show": true,
    "name": "",
    "rotate": 0,
    "dx": 0,
    "dy": 0,
    "size": 5,
    "style": {}
}
```

#### symbol.show

是否显示该图形符号

- **类型**： `boolean`
- **默认值**： `true`

#### [symbol.name](http://symbol.name/)

图形符号名称，鼠标移动上去后显示

- **类型**： `string`
- **默认值**： `""`

#### symbol.dx

图形符号横向偏移量

- **类型**： `number`
- **默认值**： `0`

#### symbol.dy

图形符号纵向偏移量

- **类型**： `number`
- **默认值**： `0`

#### symbol.size

图形符号的大小

- **类型**： `number`
- **默认值**： `5`

#### symbol.rotate

控制图形符号的旋转角度

- **类型**： `number`
- **默认值**： `0`

#### symbol.style

控制图形符号的整体样式（SVG CSS 样式均可），查看更多：[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **类型**： `object`
- **默认值**： `{}`

### symbol【wye】

图形符号为`wye`时，参数如下：

```
{
    "type": "wye",
    "show": true,
    "name": "",
    "rotate": 0,
    "dx": 0,
    "dy": 0,
    "size": 5,
    "style": {}
}
```

#### symbol.show

是否显示该图形符号

- **类型**： `boolean`
- **默认值**： `true`

#### [symbol.name](http://symbol.name/)

图形符号名称，鼠标移动上去后显示

- **类型**： `string`
- **默认值**： `""`

#### symbol.dx

图形符号横向偏移量

- **类型**： `number`
- **默认值**： `0`

#### symbol.dy

图形符号纵向偏移量

- **类型**： `number`
- **默认值**： `0`

#### symbol.size

图形符号的大小

- **类型**： `number`
- **默认值**： `5`

#### symbol.rotate

控制图形符号的旋转角度

- **类型**： `number`
- **默认值**： `0`

#### symbol.style

控制图形符号的整体样式（SVG CSS 样式均可），查看更多：[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **类型**： `object`
- **默认值**： `{}`

### symbol【pie】

图形符号为`pie`时，参数如下：

```
{
    type: "pie",
    show: true,
    rotate: 0,
    dx: 0,
    dy: 0,
    innerRadius: 0,
    outerRadius: 5,
    style: {},
    data: [
        {
            name: "",
            value: 12,
            style: {}
        }
        ...
    ]
}
```

#### symbol.show

是否显示该图形符号

- **类型**： `boolean`
- **默认值**： `true`

#### symbol.dx

图形符号横向偏移量

- **类型**： `number`
- **默认值**： `0`

#### symbol.dy

图形符号纵向偏移量

- **类型**： `number`
- **默认值**： `0`

#### symbol.innerRadius

图形符号的内圆大小

- **类型**： `number`
- **默认值**： `0`

#### symbol.outerRadius

图形符号的圆外圆大小

- **类型**： `number`
- **默认值**： `5`

#### symbol.rotate

控制图形符号的旋转角度

- **类型**： `number`
- **默认值**： `0`

#### symbol.size

图形符号的大小

- **类型**： `number`
- **默认值**： `5`

#### symbol.style

控制图形符号的整体样式（SVG CSS 样式均可），查看更多：[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **类型**： `object`
- **默认值**： `{}`

#### symbol.data[].name

图形符号名称，鼠标移动上去后显示

- **类型**： `string`
- **默认值**： `""`

#### symbol.data[].value

图形符号扇形的大小

- **类型**： `number`
- **默认值**： `5`

#### symbol.data[].style

控制扇形样式（SVG CSS 样式均可），查看更多：[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **类型**： `object`
- **默认值**： `{}`

### symbol【bar】

图形符号为`bar`时，参数如下：

```
{
    type: "bar",
    show: true,
    name: '',
    rotate: 0,
    dx: 0,
    dy: 0,
    min: 0,
    max: 0,
    size: 10,
    style: {},
    data: [
        {
            name: "",
            value: 12,
            style: {}
        }
        ...
    ]
}
```

#### symbol.show

是否显示该图形符号

- **类型**： `boolean`
- **默认值**： `true`

#### symbol.dx

图形符号横向偏移量

- **类型**： `number`
- **默认值**： `0`

#### symbol.dy

图形符号纵向偏移量

- **类型**： `number`
- **默认值**： `0`

#### symbol.min

图形符号的最小值

- **类型**： `number`
- **默认值**： `0`

#### symbol.max

图形符号的最大值

- **类型**： `number`
- **默认值**： `5`

#### symbol.rotate

控制图形符号的旋转角度

- **类型**： `number`
- **默认值**： `0`

#### symbol.style

控制图形符号的整体样式（SVG CSS 样式均可），查看更多：[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **类型**： `object`
- **默认值**： `{}`

#### symbol.data[].name

图形符号名称，鼠标移动上去后显示

- **类型**： `string`
- **默认值**： `""`

#### symbol.data[].value

图形符号扇形的大小

- **类型**： `number`
- **默认值**： `5`

#### symbol.data[].style

控制扇形样式（SVG CSS 样式均可），查看更多：[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **类型**： `object`
- **默认值**： `{}`

### symbol【image】

图形符号为`image`时，参数如下：

```
{
    "type": "image",
    "show": true,
    "name": "",
    "rotate": 0,
    "dx": 0,
    "dy": 0,
    "href": "",
    "width": 15,
    "height": 15,
    "style": {}
}
```

#### symbol.show

是否显示该图形符号

- **类型**： `boolean`
- **默认值**： `true`

#### [symbol.name](http://symbol.name/)

图形符号名称，鼠标移动上去后显示

- **类型**： `string`
- **默认值**： `""`

#### symbol.dx

图形符号横向偏移量

- **类型**： `number`
- **默认值**： `0`

#### symbol.dy

图形符号纵向偏移量

- **类型**： `number`
- **默认值**： `0`

#### symbol.width

图形符号的宽

- **类型**： `number`
- **默认值**： `15`

#### symbol.height

图形符号的高

- **类型**： `number`
- **默认值**： `15`

#### symbol.href

控制图形符号图片的地址或base64

- **类型**： `string`
- **默认值**： `""`

#### symbol.rotate

控制图形符号的旋转角度

- **类型**： `number`
- **默认值**： `0`

#### symbol.style

控制图形符号的整体样式（SVG CSS 样式均可），查看更多：[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **类型**： `object`
- **默认值**： `{}`

### symbol【text】

图形符号为`text`时，参数如下：

```
{
    "type": "text",
    "show": true,
    "name": "",
    "rotate": 0,
    "dx": 0,
    "dy": 0,
    "position": "start", //start center end  
    "style": {}
}
```

#### symbol.show

是否显示该图形符号

- **类型**： `boolean`
- **默认值**： `true`

#### [symbol.name](http://symbol.name/)

图形符号名称，鼠标移动上去后显示

- **类型**： `string`
- **默认值**： `""`

#### symbol.dx

图形符号横向偏移量

- **类型**： `number`
- **默认值**： `0`

#### symbol.dy

图形符号纵向偏移量

- **类型**： `number`
- **默认值**： `0`

#### symbol.position

图形符号的位置，分为 `start`、`center`、`end` 这三种

- **类型**： `string`
- **默认值**： `start`

#### symbol.rotate

控制图形符号的旋转角度

- **类型**： `number`
- **默认值**： `0`

#### symbol.style

控制图形符号的整体样式（SVG CSS 样式均可），查看更多：[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **类型**： `object`
- **默认值**： `{}`

### symbol【polygon】

图形符号为`polygon`时，参数如下：

```
{
    "type": "polygon",
    "show": true,
    "name": "",
    "rotate": 0,
    "dx": 0,
    "dy": 0,
    "size": 5, 
    "side": 5, //边的条数
    "style": {}
}
```

#### symbol.show

是否显示该图形符号

- **类型**： `boolean`
- **默认值**： `true`

#### [symbol.name](http://symbol.name/)

图形符号名称，鼠标移动上去后显示

- **类型**： `string`
- **默认值**： `""`

#### symbol.dx

图形符号横向偏移量

- **类型**： `number`
- **默认值**： `0`

#### symbol.dy

图形符号纵向偏移量

- **类型**： `number`
- **默认值**： `0`

#### symbol.side

多边形边的条数

- **类型**： `number`
- **默认值**： `5`

#### symbol.rotate

控制图形符号的旋转角度

- **类型**： `number`
- **默认值**： `0`

#### symbol.style

控制图形符号的整体样式（SVG CSS 样式均可），查看更多：[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **类型**： `object`
- **默认值**： `{}`

### symbol【heart】

图形符号为`heart`时，参数如下：

```
{
    "type": "heart",
    "show": true,
    "name": "",
    "rotate": 0,
    "dx": 0,
    "dy": 0,
    "size": 5, 
    "style": {}
}
```

#### symbol.show

是否显示该图形符号

- **类型**： `boolean`
- **默认值**： `true`

#### [symbol.name](http://symbol.name/)

图形符号名称，鼠标移动上去后显示

- **类型**： `string`
- **默认值**： `""`

#### symbol.dx

图形符号横向偏移量

- **类型**： `number`
- **默认值**： `0`

#### symbol.dy

图形符号纵向偏移量

- **类型**： `number`
- **默认值**： `0`

#### symbol.size

图形符号的大小

- **类型**： `number`
- **默认值**： `5`

#### symbol.rotate

控制图形符号的旋转角度

- **类型**： `number`
- **默认值**： `0`

#### symbol.style

控制图形符号的整体样式（SVG CSS 样式均可），查看更多：[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **类型**： `object`
- **默认值**： `{}`

### symbol【thermograph】

图形符号为`thermograph`时，参数如下：

```
{
    type: "thermograph",
    show: true,
    name: "",
    rotate: 0,
    dx: 0,
    dy: 0,
    size: 5,
    thickness: 5,
    bgcHeight: 10,
    bgcDis: 2,
    style: {},
    bgcStyle: {},
    barStyle: {},
    rulerStyle: {},
    rulerDx: 0,
    rulerDy: 0,
    label: [
        {
            name: 'asd',
            style: {},
            ... 
        }
    ]
}
```

#### symbol.show

是否显示该图形符号

- **类型**： `boolean`
- **默认值**： `true`

#### [symbol.name](http://symbol.name/)

图形符号名称，鼠标移动上去后显示

- **类型**： `string`
- **默认值**： `""`

#### symbol.dx

图形符号横向偏移量

- **类型**： `number`
- **默认值**： `0`

#### symbol.dy

图形符号纵向偏移量

- **类型**： `number`
- **默认值**： `0`

#### symbol.size

图形符号的内高（值的大小）

- **类型**： `number`
- **默认值**： `10`

#### symbol.thickness

图形符号的内宽

- **类型**： `number`
- **默认值**： `5`

#### symbol.bgcHeight

图形符号背景的高度

- **类型**： `number`
- **默认值**： `5`

#### symbol.bgcDis

图形符号背景的间距

- **类型**： `number`
- **默认值**： `5`

#### symbol.rotate

控制图形符号的旋转角度

- **类型**： `number`
- **默认值**： `0`

#### symbol.style

控制图形符号的整体样式（SVG CSS 样式均可），查看更多：[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **类型**： `object`
- **默认值**： `{}`

#### symbol.bgcStyle

控制图形符号背景的样式（SVG CSS 样式均可），查看更多：[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **类型**： `object`
- **默认值**： `{}`

#### symbol.barStyle

控制图形符号内部柱状样式（SVG CSS 样式均可），查看更多：[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **类型**： `object`
- **默认值**： `{}`

#### symbol.rulerStyle

控制图形符号比例尺的样式（SVG CSS 样式均可），查看更多：[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **类型**： `object`
- **默认值**： `{}`

#### symbol.rulerDx

控制图形符号比例尺的横向偏移

- **类型**： `object`
- **默认值**： `{}`

#### symbol.rulerDy

控制图形符号比例尺的纵向偏移

- **类型**： `object`
- **默认值**： `{}`

#### symbol.label

控制图形符号比例尺的标识文字，查看更多：[label](http://www.phyloscape.cc/api/multiplex.html#label)

- **类型**： `array`
- **默认值**： `[]`

### symbol【rect】

图形符号为`rect`时，参数如下：

```
{
    "type": "rect",
    "show": true,
    "name": "",
    "rotate": 0,
    "dx": 0,
    "dy": 0,
    "width": 15,
    "height": 15,
    "style": {}
}
```

#### symbol.show

是否显示该图形符号

- **类型**： `boolean`
- **默认值**： `true`

#### [symbol.name](http://symbol.name/)

图形符号名称，鼠标移动上去后显示

- **类型**： `string`
- **默认值**： `""`

#### symbol.dx

图形符号横向偏移量

- **类型**： `number`
- **默认值**： `0`

#### symbol.dy

图形符号纵向偏移量

- **类型**： `number`
- **默认值**： `0`

#### symbol.width

图形符号的宽

- **类型**： `number`
- **默认值**： `15`

#### symbol.height

图形符号的高

- **类型**： `number`
- **默认值**： `15`

#### symbol.rotate

控制图形符号的旋转角度

- **类型**： `number`
- **默认值**： `0`

#### symbol.style

控制图形符号的整体样式（SVG CSS 样式均可），查看更多：[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **类型**： `object`
- **默认值**： `{}`

### symbol【ellipse】

图形符号为`ellipse`时，参数如下：

```
{
    "type": "ellipse",
    "show": true,
    "name": "",
    "rotate": 0,
    "dx": 0,
    "dy": 0,
    "cx": 5,
    "cy": 3,
    "rx": 10,
    "ry": 6,
    "style": {}
}
```

#### symbol.show

是否显示该图形符号

- **类型**： `boolean`
- **默认值**： `true`

#### [symbol.name](http://symbol.name/)

图形符号名称，鼠标移动上去后显示

- **类型**： `string`
- **默认值**： `""`

#### symbol.dx

图形符号横向偏移量

- **类型**： `number`
- **默认值**： `0`

#### symbol.dy

图形符号纵向偏移量

- **类型**： `number`
- **默认值**： `0`

#### [symbol.cx](http://symbol.cx/)

图形符号中心x轴位置

- **类型**： `number`
- **默认值**： `5`

#### [symbol.cy](http://symbol.cy/)

图形符号中心y轴位置

- **类型**： `number`
- **默认值**： `3`

#### symbol.rx

图形符号半径x轴位置

- **类型**： `number`
- **默认值**： `10`

#### symbol.ry

图形符号半径y轴位置

- **类型**： `number`
- **默认值**： `6`

#### symbol.rotate

控制图形符号的旋转角度

- **类型**： `number`
- **默认值**： `0`

#### symbol.style

控制图形符号的整体样式（SVG CSS 样式均可），查看更多：[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **类型**： `object`
- **默认值**： `{}`

# 全局配置

`phyloscape` 中的 `config` 是一个对象，包含 `phyloscape` 的全局配置。可以在使用之前修改下列 `property` ：

```
import phyloscape from "phyloscape";

let config = {
    content: ""
    layout: "" // radial、tree
}
const treeConstructor = new phyloscape.InitTreeStructure("#dendrogram", config)

// 或者
const treeConstructor = new phyloscape.InitRadialStructure("#dendrogram", config)

// 或者
const treeConstructor = phyloscape.InitTreeLayoutStructure("#dendrogram", config)
```

注意

本文中的 `treeConstructor` 均为 `phyloscape` 的实例对象。

## content

进化树的内容，目前只支持 `Newick` 格式数据内容。后面会支持更多文件格式（ `Newick`、`Extended Newick`、`Nexus` 、 `PhyloXML` 、`NeXML` ）导入。

- **类型**：`string`
- **默认值**：`""`
- **用法**：

```
treeConstructor.init({
    content: "(A:0.1,(B:0.3,C:0.4)D:0.5)E;"
})
```

## layout

布局类型，分为 `tree` 和 `radial`。只在 `InitTreeLayoutStructure` 中有效。

- **类型**： `string`
- **默认值**： `tree`
- **用法**：

```
treeConstructor.init({
    layout: "tree"
})
```

## language

设定当前语言类型。 zh: 简体中文 en: 英文。

- **类型**： `string`
- **默认值**： `zh`
- **用法**：

```
treeConstructor.init({
    language: "zh"
})
```

## width

设定画布的宽度，默认为 `0` ，如果设定值过小，会导致树结构显示不全。但是若为 `0` 则会跟随父级元素自动调整大小。

- **类型**：`number`
- **默认值**：`0`
- **用法**：

```
treeConstructor.init({
    width: 0
})
```

## height

设定画布的高度，与 `width` 类似。

- **类型**：`number`
- **默认值**：`0`
- **用法**：

```
treeConstructor.init({
    height: 0
})
```

## sort

设定树结构的排序方式，一共有 `6种` 可选的排序方式，分别是 `defaultAsc` 、 `defaultDes` 、 `nameDes` 、 `nameAsc` 、 `lengthDes` 、 `lengthAsc` ，其中， `defaultAsc` 、 `defaultDes` 会按照节点所在的层级来排序。下式代码即表示按节点名称降序排列，结果如图3所示。

- **类型**：`string`
- **默认值**：`defaultDes`
- **用法**：

```
treeConstructor.init({
    sort: "defaultDes"
})
```

## size

至多填入两个值，其中，size[0]控制画布横向拉伸值，size[1]控制画布宽度，且size[1]为选填内容，如下代码所示。

- **类型**：`array`
- **默认值**：`[700, 900]`
- **用法**：

```
treeConstructor.init({
    // 横向拉伸值800，画布宽度400
    size: [800, 400]
    // 横向拉伸值400，此时画布宽度为config.width的值
    // size: [400]
})
```

## position

控制页面渲染完成后，进化树初始位置的左边距和上边距，示例如下

- **类型**：`array`
- **默认值**：`[20, 20]`
- **用法**：

```
treeConstructor.init({
    // 左边距20，上边距20
    position: [20, 20]
})
```

## separation

控制叶节点之间的间隙，值越大，进化树的纵向显示长度越长。

- **类型**：`number`
- **默认值**：`10`
- **用法**：

```
treeConstructor.init({
    separation: 10
})
```

## scale

整体拉伸倍率（画布缩放），值越大，进化树的横向宽度和纵向高度越大。

- **类型**：`number`
- **默认值**：`1`
- **用法**：

```
treeConstructor.init({
    scale: 1
})
```

## rotationAngle

旋转展开角度。只在 `layout = radial` 时有效。

- **类型**：`number`
- **默认值**：`0`
- **用法**：

```
treeConstructor.init({
    rotationAngle: 0
})
```

## isPhylogram

是否按长度展示支长，若为 `false` ，则全部叶分支对齐右侧；为 `true` ，则按分支长度展示分支。

- **类型**：`boolean`
- **默认值**：`true`
- **用法**：

```
treeConstructor.init({
    isPhylogram: true
})
```

## isWheelZoom

为 `true` 时启用滚轮缩放、进化树拖动功能。

- **类型**：`boolean`
- **默认值**：`false`
- **用法**：

```
treeConstructor.init({
    isWheelZoom: false
})
```

## minimap

视图缩放功能

```
treeConstructor.init({
    "minimap": {
        "show": false,
        "scaleInit": 0.1,
        "scaleRange": [
            0.5,
            1.5
        ]
    }
})
```

### minimap.show

是否启用视图缩放功能。

- **类型**：`boolean`
- **默认值**：`false`

### minimap.scaleInit

初始视图缩放倍率。

- **类型**：`number`
- **默认值**：`0.1`

### minimap.scaleRange

滚轮缩放的倍率区间。

- **类型**：`array`
- **默认值**：`[0.5,1.5]`

## stretch

过长分支（不平衡树）优化，按伸缩比例的不同，用不同颜色渲染线，并给出对应的比例尺（与线的颜色相同）

```
// 对长度在[0.001,0.003),[0.003,0.005),[0.005,0.008)范围内的分支分别放大1,2,3倍
treeConstructor.init({
    stretch: {
        show: true,
        data: [{
                range: [
                    0.001,
                    0.003
                ],
                multiple: 1,
                color: "red"
            },
            {
                range: [
                    0.003,
                    0.005
                ],
                multiple: 2,
                color: "blue"
            },
            {
                range: [
                    0.005,
                    0.008
                ],
                multiple: 3,
                color: "green"
            }
        ]
    }
})
```

### stretch.show

是否启用分支优化功能。

- **类型**：`boolean`
- **默认值**：`false`

### stretch.data[].range

分支需要缩放的范围区间。

- **类型**：`array`
- **默认值**：`[]`

### stretch.data[].multiple

分支需要缩放的倍率。

- **类型**：`number`
- **默认值**：`1`

### stretch.data[].color

分支需要缩放的颜色。

- **类型**：`string`
- **默认值**：`""`

## style

画布的全局样式，可被其它样式覆盖（SVG CSS 样式均可）

- **类型**： `object`
- **默认值**： `{}`
- **用法**：

```
treeConstructor.init({
    // 设置字体集为Arial，并以红颜色填充，字体大小10px
    style: {
        'font-family': "Arial",
        'fill': 'red',
        'font-size': "10px",
    }
})
```

## leafs

用于控制叶子区域的展示

- **类型**： `object`
- **默认值**： `{}`
- **用法**：

```
treeConstructor.init({
    leafs: {
        show: true,
        dx: 0,
        dy: 0,
        style: {}, 
    }
})
```

### leafs.show

是否显示叶子区域

- **类型**： `boolean`
- **默认值**：`true`

### leafs.dx

叶子区域横向偏移量

- **类型**：`number`
- **默认值**：`0`

### leafs.dy

叶子区域纵向偏移量

- **类型**：`number`
- **默认值**：`0`

### leafs.style

控制叶子区域的文本样式（SVG CSS 样式均可），查看更多：[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **类型**：`object`
- **默认值**：`{}`

## extension

控制叶节点前面的虚线相关属性

- **类型**： `object`
- **默认值**： `{}`
- **用法**：

```
treeConstructor.init({
    extension: { //leaf 前面的虚线
        show: true,
        style: {
            'stroke-dasharray': 3,
            'stroke-width': 1,
            opacity: 0.5
        }
    }
})
```

### extension.show

是否显示叶节点前面的虚线。

- **类型**：`boolean`
- **默认值**：`true`

### extension.style

控制叶节点前面的虚线样式（SVG CSS 样式均可），查看更多：[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **类型**：`object`
- **默认值**：`{}`

## mask

控制叶节点 `leafs` 下面的背景相关属性

- **类型**： `object`
- **默认值**： `{}`
- **用法**：

```
treeConstructor.init({
    mask: {
        show: true,
        dx: 0,
        dy: 0,
        padding: [10, 10],
        style: {
            opacity: 0.2
        }
    }
})
```

### mask.show

是否显示叶子节点背景

- **类型**： `boolean`
- **默认值**： `false`

### mask.dx

叶子节点遮罩横向偏移量

- **类型**： `number`
- **默认值**： `0`

### mask.dy

叶子节点遮罩纵向偏移量

- **类型**： `number`
- **默认值**： `0`

### mask.padding

叶子节点遮罩内边距

- **类型**： `array`
- **默认值**： `[10, 10]`

### mask.style

控制叶子节点遮罩的样式（SVG CSS 样式均可），查看更多：[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **类型**： `object`
- **默认值**： `{}`

## collapse

控制三角形折叠符号的显示

- **类型**： `object`
- **默认值**： `{}`
- **用法**：

```
treeConstructor.init({
    collapse:{
        show: true,
        dx: 0,
        dy: 0,
        rotate: 0,
        size: [20, 10],
        data:  [], 
        style: {},
        textStyle: {},
        symbolStyle: {}
    }  
})
```

### collapse.dx

三角形折叠符号横向偏移量

- **类型**： `number`
- **默认值**： `0`

### collapse.dy

三角形折叠符号纵向偏移量

- **类型**： `number`
- **默认值**： `0`

### collapse.rotate

三角形折叠符号旋转角度

- **类型**： `number`
- **默认值**： `0`

### collapse.size

三角形折叠符号大小，宽：`size[1]`，高：`size[2]`。

- **类型**： `array`
- **默认值**： `[30, 15]`

### collapse.style

三角形折叠符号的全局样式（SVG CSS 样式均可），查看更多：[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **类型**： `object`
- **默认值**： `{}`

### collapse.textStyle

三角形折叠符号的文本样式（SVG CSS 样式均可），查看更多：[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **类型**： `object`
- **默认值**： `{}`

### collapse.symbolStyle

三角形折叠符号的符号样式（SVG CSS 样式均可），查看更多：[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **类型**： `object`
- **默认值**： `{}`

## nodes

控制节点相关的属性，里面含有名称（name）、枝长（value）、图标（symbol）三大类。

- **类型**： `object`
- **默认值**： `{}`

### [nodes.name](http://nodes.name/)

控制节点名称的显示

- **类型**： `object`
- **默认值**： `{}`
- **用法**：

```
treeConstructor.init({
    nodes: {
        name: {
            show: false,
            mark: 'all', //leaf node all
            dx: 0,
            dy: 0,
            position: 'start', //start end 顶端还是末端
            style: {
                // 'font-size': '12px'
            }
        }
    }
})
```

#### nodes.name.show

是否显示节点名称的显示

- **类型**： `boolean`
- **默认值**： `false`

#### nodes.name.mark

控制内为节点名称的显示情况，`all`：全部显示，`leaf`：只显示叶节点，`node`：只显示内节点。

- **类型**： `number`
- **默认值**： `all`

#### nodes.name.dx

节点名称横向偏移量

- **类型**： `number`
- **默认值**： `0`

#### nodes.name.dy

节点名称纵向偏移量

- **类型**： `number`
- **默认值**： `0`

#### nodes.name.style

控制节点名称的样式（SVG CSS 样式均可），查看更多：[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **类型**： `object`
- **默认值**： `{}`

### nodes.value

控制节点支持度的显示

- **类型**： `object`
- **默认值**： `{}`
- **用法**：

```
treeConstructor.init({
    nodes: {
        value: {
            show: false,
            mark: 'all', //leaf node all
            dx: 0,
            dy: 0,
            position: 'start', //start end 顶端还是末端
            style: {
                // 'font-size': '12px'
            }
        }
    }
})
```

#### nodes.value.show

是否显示节点支持度的显示

- **类型**： `boolean`
- **默认值**： `false`

#### nodes.value.mark

控制内为节点的显示情况，`all`：全部显示，`leaf`：只显示叶节点，`node`：只显示内节点。

- **类型**： `number`
- **默认值**： `all`

#### nodes.value.dx

节点支持度横向偏移量

- **类型**： `number`
- **默认值**： `0`

#### nodes.value.dy

节点支持度纵向偏移量

- **类型**： `number`
- **默认值**： `0`

#### nodes.value.style

控制节点支持度的样式（SVG CSS 样式均可），查看更多：[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **类型**： `object`
- **默认值**： `{}`

### nodes.symbol

控制节点形状和样式，关于更多请查看：[symbol](http://www.phyloscape.cc/api/multiplex.html#symbol)

- **类型**： `object`
- **默认值**： `{}`
- **用法**：

```
treeConstructor.init({
    nodes:{
        symbol: {
            show: false, 
            type: 'circle', //circle, cross, diamond, square, star, triangle, wye, pie, bar, image, text, polygon, heart, thermograph, rect, ellipse
            xxxxx: {
                // ...symbol
            },
            ...
        }
    }
    
})
```

#### nodes.symbol.xxxxx

其中`xxxxx`代表叶节点名称，可以用做映射数据

- **类型**： `object`
- **默认值**： `{}`

## links

节点连线的相关属性

- **类型**： `object`
- **默认值**： `{}`

### links.type

控制节点连线的类型，支持 `elbow` 、 `smooth` 、 `line` 这三种。

- **类型**： `string`
- **默认值**： `elbow`

### links.style

控制节点连线的样式（SVG CSS 样式均可），查看更多：[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **类型**： `boolean`
- **默认值**： `false`

## legend

描述图例的相关属性

- **类型**： `object`
- **默认值**： `{}`
- **用法**：

```
treeConstructor.init({
    legend: {
        show: false,
        dx: 0,
        dy: 0,
        distance: 0,
        data: [
            {
                dx: 0,
                dy: 0,
                distance: 0,
                position:'right', //left  right
                label: {
                    name: '11',
                    dx: 0,
                    dy: 0,
                    style: {}
                },
                data: [
                    {
                        dx: 0,
                        dy: 0,
                        label: {},
                        symbol: {}
                    }
                ]

            }
        ]
    }
    
})
```

### legend.show

是否显示图例

- **类型**： `boolean`
- **默认值**：`true`

### legend.dx

图例横向偏移量

- **类型**：`number`
- **默认值**：`0`

### legend.dy

图例纵向偏移量

- **类型**：`number`
- **默认值**：`0`

### legend.distance

控制图例间的距离

- **类型**：`number`
- **默认值**：`0`

### legend.data

控制图例数据，里面的 `label` 属性请查看 [label](http://www.phyloscape.cc/api/multiplex.html#label)，里面的 `symbol` 属性请查看 [symbol](http://www.phyloscape.cc/api/multiplex.html#symbol)

- **类型**： `array`
- **默认值**： `[]`

## tooltip

tooltip 相关属性，鼠标移动到叶节点时显示

- **类型**： `object`
- **默认值**： `{}`
- **用法**：

```
treeConstructor.init({
    tooltip: {
        show: false,
        data: {
            // xxxxx: [
            //     {
            //         label: "",
            //         value: ''
            //     }
            // ]
        }
    }
})
```

### tooltip.show

是否显示 tooltip

- **类型**： `boolean`
- **默认值**：`false`

### tooltip.data

具体数据，里面的`xxxxx`代表叶子节点的名称

- **类型**： `object`
- **默认值**： `{}`

## sign

控制右侧的标志（元数据）的展示

- **类型**： `object`
- **默认值**： `{}`
- **用法**：

```
treeConstructor.init({
    sign: {
        show: false,
        dx: 0,
        dy: 0,
        distance: 0, // 图例间隙大小
        ringMargin: 0, // 图例到外面的间隙
        style: {},
        data: [
            {
                dx: 0,
                dy: 0,
                distance: 0, 
                label: {},
                data: {
                    "xxxxx": {
                        ...symbol
                    }
                }
            }
        ]
    }
})
```

### sign.show

是否显示右侧的标志

- **类型**： `boolean`
- **默认值**： `false`

### sign.dx

标志横向偏移量

- **类型**：`number`
- **默认值**：`0`

### sign.dy

标志纵向偏移量

- **类型**：`number`
- **默认值**：`0`

### sign.distance

图例间隙大小

- **类型**：`number`
- **默认值**：`0`

### sign.ringMargin

图例到外面的间隙

- **类型**：`number`
- **默认值**：`0`

### sign.style

整体的样式（SVG CSS 样式均可），查看更多：[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **类型**：`string`
- **默认值**：`""`

### sign.data

展示的数据

- **类型**：`array`
- **默认值**：`[]`

#### sign.data[].label

分类标签的相关的属性

- **类型**： `object`
- **默认值**： `{}`

#### sign.data[].dx

标志横向偏移量

- **类型**：`number`
- **默认值**：`0`

#### sign.data[].dy

标志纵向偏移量

- **类型**：`number`
- **默认值**：`0`

#### sign.data[].distance

间隙大小

- **类型**：`number`
- **默认值**：`0`

#### sign.data[].data

里面的 `label` 属性请查看 [label](http://www.phyloscape.cc/api/multiplex.html#label)，里面的 `symbol` 属性请查看 [symbol](http://www.phyloscape.cc/api/multiplex.html#symbol)

- **类型**：`object`
- **默认值**：`{}`
