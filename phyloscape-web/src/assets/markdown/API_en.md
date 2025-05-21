# Global API

## phyloscape.InitTreeLayoutStructure

Used to initialize a tree, this method requires the layout type `tree` or `radial`.

```
// import phyloscape.js
import { InitTreeLayoutStructure } from "phyloscape";

// new generate an object instance
const treeConstructor = InitTreeLayoutStructure( < Element:Id > , {...});

console.log(treeConstructor);
```

## phyloscape.InitTreeStructure

Used to initialize `tree` layout instance.

```
// import phyloscape.js
import { InitTreeStructure } from "phyloscape";

// new generate an object instance
const treeConstructor = new InitTreeStructure( < Element:Id > , {...});

console.log(treeConstructor);
```

## phyloscape.InitRadialStructure

Used to initialize `radial` layout instance.

```
// import phyloscape.js
import { InitRadialStructure } from "phyloscape";

// new generate an object instance
const treeConstructor = new InitRadialStructure( < Element:Id > , {...});

console.log(treeConstructor);
```

## treeConstructor.init

Initialization. Available by `treeConstructor.init`, where `treeConstructor` is an object of `phyloscape`. Generally used to load a tree view for the first time.

```
treeConstructor.init({...})
```

## treeConstructor.update

View update, available as `treeConstructor.update`, where `treeConstructor` is an object instance of `phyloscape`. Generally used to update a view after a configuration update:

```
treeConstructor.update({...})
```

## treeConstructor.d3

All properties in `d3` can be obtained directly from `treeConstructor.d3` without having to reintroduce them in a project.

```
const d3 = treeConstructor.d3;
```

## treeConstructor.setContent[#](http://www.phyloscape.cc/api/method.html#treeconstructor-setcontent)

`newick` can be re-rendered and used to reset the data.

```
treeConstructor.setContent(<content>);
```

## treeConstructor.setHighlightLeaf[#](http://www.phyloscape.cc/api/method.html#treeconstructor-sethighlightleaf)

Highlight leaf node.

```
treeConstructor.setHighlightLeaf(<data>);
```

## treeConstructor.onClick[#](http://www.phyloscape.cc/api/method.html#treeconstructor-onclick)

Internal node click event.

```
treeConstructor.onClick = (data) => {
    console.log(data);
};
```

# Reuse parameters

## style

Styles (SVG and CSS styles are available).

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

Label configuration.

- **type**: `object`
- **default**: `{}`

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

Label display.

- **type**: `boolean`
- **default**: `true`

#### [label.name](http://label.name/)

Label Name.

- **type**: `string`
- **default**: `""`

#### label.dx

Horizontal offset added to the label.

- **type**: `number`
- **default**: `0`

#### label.dy

Vertical offset added to the label.

- **type**: `number`
- **default**: `0`

#### label.spacing

Space between label text.

- **type**: `number`
- **default**: `0`

#### label.rotate

Angle of label text.

- **type**: `number`
- **default**: `0`

#### label.style

Style of the label (SVG and CSS), see more: [style](http://www.phyloscape.cc/api/multiplex.html#style)

- **type**: `object`
- **default**: `{}`

## symbol

Graphic symbol type and style, including `circle`, `cross`, `diamond`, `square`, `star`, `triangle`, `wye`, `pie`, `bar`, `image`, `text`, `polygon`, `heart`, `thermograph`, `rect` and `ellipse`。

- **type**: `object`
- **default**: `{}`

### symbol【circle】

`circle` parameters:

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

Graphic symbol display.

- **type**: `boolean`
- **default**: `true`

#### [symbol.name](http://symbol.name/)

Graphical symbol name, displayed when mouseover.

- **type**: `string`
- **default**: `""`

#### symbol.dx

Horizontal offset added to the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.dy

Vertical offset added to the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.size

Symbol size.

- **type**: `number`
- **default**: `5`

#### symbol.rotate

Angle of graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.style

Ovarall style of the graphic symbol (SVG and CSS), see more:[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **type**: `object`
- **default**: `{}`

### symbol【cross】

`cross` parameters:

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

Graphic symbol display.

- **type**: `boolean`
- **default**: `true`

#### [symbol.name](http://symbol.name/)

Graphical symbol name, displayed when mouseover.

- **type**: `string`
- **default**: `""`

#### symbol.dx

Horizontal offset added to the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.dy

Vertical offset added to the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.size

Symbol size.

- **type**: `number`
- **default**: `5`

#### symbol.rotate

Angle of graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.style

Overall style of graphic symbols (SVG and CSS), see more:[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **type**: `object`
- **default**: `{}`

### symbol【diamond】

`diamond` parameters:

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

Graphic symbol display.

- **type**: `boolean`
- **default**: `true`

#### [symbol.name](http://symbol.name/)

Graphical symbol name, displayed when mouseover.

- **type**: `string`
- **default**: `""`

#### symbol.dx

Horizontal offset added to the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.dy

Vertical offset added to the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.size

Symbol size.

- **type**: `number`
- **default**: `5`

#### symbol.rotate

Angle of graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.style

Ovarall style of the graphic symbol (SVG and CSS), see more:[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **type**: `object`
- **default**: `{}`

### symbol【square】

`square` parameters:

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

Graphic symbol display.

- **type**: `boolean`
- **default**: `true`

#### [symbol.name](http://symbol.name/)

Graphical symbol name, displayed when mouseover.

- **type**: `string`
- **default**: `""`

#### symbol.dx

Horizontal offset added to the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.dy

Vertical offset added to the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.size

Symbol size.

- **type**: `number`
- **default**: `5`

#### symbol.rotate

Angle of graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.style

Ovarall style of the graphic symbol (SVG and CSS), see more:[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **type**: `object`
- **default**: `{}`

### symbol【star】

`star` parameters:

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

Graphic symbol display.

- **type**: `boolean`
- **default**: `true`

#### [symbol.name](http://symbol.name/)

Graphical symbol name, displayed when mouseover.

- **type**: `string`
- **default**: `""`

#### symbol.dx

Horizontal offset added to the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.dy

Vertical offset added to the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.size

Symbol size.

- **type**: `number`
- **default**: `5`

#### symbol.rotate

Angle of graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.style

Ovarall style of the graphic symbol (SVG and CSS), see more:[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **type**: `object`
- **default**: `{}`

### symbol【triangle】

`triangle` parameters:

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

Graphic symbol display.

- **type**: `boolean`
- **default**: `true`

#### [symbol.name](http://symbol.name/)

Graphical symbol name, displayed when mouseover.

- **type**: `string`
- **default**: `""`

#### symbol.dx

Horizontal offset added to the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.dy

Vertical offset added to the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.size

Symbol size.

- **type**: `number`
- **default**: `5`

#### symbol.rotate

Angle of graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.style

Ovarall style of the graphic symbol (SVG and CSS), see more:[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **type**: `object`
- **default**: `{}`

### symbol【wye】

`wye` parameters:

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

Graphic symbol display.

- **type**: `boolean`
- **default**: `true`

#### [symbol.name](http://symbol.name/)

Graphical symbol name, displayed when mouseover.

- **type**: `string`
- **default**: `""`

#### symbol.dx

Horizontal offset added to the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.dy

Vertical offset added to the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.size

Symbol size.

- **type**: `number`
- **default**: `5`

#### symbol.rotate

Angle of graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.style

Overall style of the graphic symbol (SVG and CSS), see more:[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **type**: `object`
- **default**: `{}`

### symbol【pie】

`pie` parameters:

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

Graphic symbol display.

- **type**: `boolean`
- **default**: `true`

#### symbol.dx

Horizontal offset added to the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.dy

Vertical offset added to the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.innerRadius

Inner radius of symbol.

- **type**: `number`
- **default**: `0`

#### symbol.outerRadius

Outer radius of symbol.

- **type**: `number`
- **default**: `5`

#### symbol.rotate

Angle of graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.size

Symbol size.

- **type**: `number`
- **default**: `5`

#### symbol.style

Overall style of the graphic symbol (SVG and CSS), see more:[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **type**: `object`
- **default**: `{}`

#### symbol.data[].name

Graphical symbol name, displayed when mouseover.

- **type**: `string`
- **default**: `""`

#### symbol.data[].value

The size of the sector of the graphic symbol.

- **type**: `number`
- **default**: `5`

#### symbol.data[].style

Fan styles (SVG and CSS), see more:[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **type**: `object`
- **default**: `{}`

### symbol【bar】

`bar` parameters:

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

Graphic symbol display.

- **type**: `boolean`
- **default**: `true`

#### symbol.dx

Horizontal offset added to the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.dy

Vertical offset added to the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.min

Minimum value of symbol.

- **type**: `number`
- **default**: `0`

#### symbol.max

Maximum value of symbol.

- **type**: `number`
- **default**: `5`

#### symbol.rotate

Angle of graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.style

Overall style of the graphic symbol (SVG and CSS), see more:[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **type**: `object`
- **default**: `{}`

#### symbol.data[].name

Graphical symbol name, displayed when mouseover.

- **type**: `string`
- **default**: `""`

#### symbol.data[].value

The size of the sector of the graphic symbol.

- **type**: `number`
- **default**: `5`

#### symbol.data[].style

Fan styles (SVG and CSS), see more::[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **type**: `object`
- **default**: `{}`

### symbol【image】

`image` parameters:

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

Graphic symbol display.

- **type**: `boolean`
- **default**: `true`

#### [symbol.name](http://symbol.name/)

Symbol name, displayed when mouseover.

- **type**: `string`
- **default**: `""`

#### symbol.dx

Horizontal offset added to the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.dy

Vertical offset added to the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.width

Width of symbol.

- **type**: `number`
- **default**: `15`

#### symbol.height

Height of symbol.

- **type**: `number`
- **default**: `15`

#### symbol.href

Address or base64 of graphic symbol.

- **type**: `string`
- **default**: `""`

#### symbol.rotate

Angle of graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.style

Overall style of the graphic symbol (SVG and CSS), see more:[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **type**: `object`
- **default**: `{}`

### symbol【text】

`text` parameters:

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

Graphic symbol display.

- **type**: `boolean`
- **default**: `true`

#### [symbol.name](http://symbol.name/)

Graphical symbol name, displayed when mouseover.

- **type**: `string`
- **default**: `""`

#### symbol.dx

Horizontal offset added to the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.dy

Vertical offset added to the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.position

Location of symbol, i.e. `start`, `center` and `end`.

- **type**: `string`
- **default**: `start`

#### symbol.rotate

Angle of graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.style

Overall style of the graphic symbol (SVG and CSS), see more:[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **type**: `object`
- **default**: `{}`

### symbol【polygon】

`polygon` parameters:

```
{
    "type": "polygon",
    "show": true,
    "name": "",
    "rotate": 0,
    "dx": 0,
    "dy": 0,
    "size": 5, 
    "side": 5, //number of edges
    "style": {}
}
```

#### symbol.show

Graphic symbol display.

- **type**: `boolean`
- **default**: `true`

#### [symbol.name](http://symbol.name/)

Graphical symbol name, displayed when mouseover.

- **type**: `string`
- **default**: `""`

#### symbol.dx

Horizontal offset added to the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.dy

Vertical offset added to the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.side

Number of polygon edges.

- **type**: `number`
- **default**: `5`

#### symbol.rotate

Angle of the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.style

Overall style of the graphic symbol (SVG and CSS), see more:[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **type**: `object`
- **default**: `{}`

### symbol【heart】

`heart` parameters:

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

Graphic symbol display.

- **type**: `boolean`
- **default**: `true`

#### [symbol.name](http://symbol.name/)

Graphical symbol name, displayed when mouseover.

- **type**: `string`
- **default**: `""`

#### symbol.dx

Horizontal offset added to the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.dy

Vertical offset added to the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.size

Symbol size.

- **type**: `number`
- **default**: `5`

#### symbol.rotate

Angle of graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.style

Overall style of the graphic symbol (SVG and CSS), see more:[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **type**: `object`
- **default**: `{}`

### symbol【thermograph】

`thermograph` parameters:

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

Graphic symbol display.

- **type**: `boolean`
- **default**: `true`

#### [symbol.name](http://symbol.name/)

Graphical symbol name, displayed when mouseover.

- **type**: `string`
- **default**: `""`

#### symbol.dx

Horizontal offset added to the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.dy

Vertical offset added to the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.size

Inner size of the symbol.

- **type**: `number`
- **default**: `10`

#### symbol.thickness

Inner thickness of the symbol.

- **type**: `number`
- **default**: `5`

#### symbol.bgcHeight

Height of the graphic symbol background.

- **type**: `number`
- **default**: `5`

#### symbol.bgcDis

Distance of the graphic symbol background.

- **type**: `number`
- **default**: `5`

#### symbol.rotate

Angle of the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.style

Overall style of the graphic symbol (SVG and CSS), see more:[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **type**: `object`
- **default**: `{}`

#### symbol.bgcStyle

Style of the background of the graphic symbols (SVG and CSS style), see more:[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **type**: `object`
- **default**: `{}`

#### symbol.barStyle

Internal bar styles of the graphic symbols (SVG and CSS), see more:[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **type**: `object`
- **default**: `{}`

#### symbol.rulerStyle

Scale of the graphic symbols (SVG and CSS), see more: [style](http://www.phyloscape.cc/api/multiplex.html#style)

- **type**: `object`
- **default**: `{}`

#### symbol.rulerDx

Horizontal offset added to the scale.

- **type**: `object`
- **default**: `{}`

#### symbol.rulerDy

Vertical offset added to the scale.

- **type**: `object`
- **default**: `{}`

#### symbol.label

Label text of scale, see more:[label](http://www.phyloscape.cc/api/multiplex.html#label)

- **type**: `array`
- **default**: `[]`

### symbol【rect】

`rect` parameters:

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

Graphic symbol display.

- **type**: `boolean`
- **default**: `true`

#### [symbol.name](http://symbol.name/)

Graphical symbol name, displayed when mouseover.

- **type**: `string`
- **default**: `""`

#### symbol.dx

Horizontal offset added to the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.dy

Vertical offset added to the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.width

Width of the symbol.

- **type**: `number`
- **default**: `15`

#### symbol.height

Hight of the symbol.

- **type**: `number`
- **default**: `15`

#### symbol.rotate

Angle of the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.style

Overall style of the graphic symbol (SVG and CSS), see more:[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **type**: `object`
- **default**: `{}`

### symbol【ellipse】

`ellipse` parameters:

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

Graphic symbol display.

- **type**: `boolean`
- **default**: `true`

#### [symbol.name](http://symbol.name/)

Graphical symbol name, displayed when mouseover.

- **type**: `string`
- **default**: `""`

#### symbol.dx

Horizontal offset added to the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.dy

Vertical offset added to the graphic symbol.

- **type**: `number`
- **default**: `0`

#### [symbol.cx](http://symbol.cx/)

X-axis position of the centre of the graphic symbol.

- **type**: `number`
- **default**: `5`

#### [symbol.cy](http://symbol.cy/)

Y-axis position of the centre of the graphic symbol.

- **type**: `number`
- **default**: `3`

#### symbol.rx

X-axis radius position of the graphic symbol.

- **type**: `number`
- **default**: `10`

#### symbol.ry

Y-axis radius position of the graphic symbol.

- **type**: `number`
- **default**: `6`

#### symbol.rotate

Angle of the graphic symbol.

- **type**: `number`
- **default**: `0`

#### symbol.style

Overall style of the graphic symbol (SVG and CSS), see more:[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **type**: `object`
- **default**: `{}`

# Global configuration

The `config` in `phyloscape` is an object containing the global configuration of `phyloscape`. The following `property` can be modified before use:

```
import phyloscape from "phyloscape";

let config = {
    content: ""
    layout: "" // radial, tree
}
const treeConstructor = new phyloscape.InitTreeStructure("#dendrogram", config)

// or
const treeConstructor = new phyloscape.InitRadialStructure("#dendrogram", config)

// or
const treeConstructor = phyloscape.InitTreeLayoutStructure("#dendrogram", config)
```

Note the `treeConstructor` in this article are all objects instance of `phyloscape`.

## content

The content of the tree, currently only supported in the `Newick` format. More file formats will be supported later (`Newick`, `Extended Newick`, `Nexus` ,  `PhyloXML` , `NeXML` ).

- **type**:`string`
- **default**:`""`
- **usage**:

```
treeConstructor.init({
    content: "(A:0.1,(B:0.3,C:0.4)D:0.5)E;"
})
```

## layout

Layout type, including `tree` and `radial`. Only valid in `InitTreeLayoutStructure`.

- **type**: `string`
- **default**: `tree`
- **usage**:

```
treeConstructor.init({
    layout: "tree"
})
```

## language

Set the current language type, zh: simplified Chinese en: English.

- **type**: `string`
- **default**: `zh`
- **usage**:

```
treeConstructor.init({
    language: "zh"
})
```

## width

Set the width of the canvas, default is `0`, if the value is too small, it will cause the tree structure to be incomplete. But if it is `0`, it will follow the parent element to resize automatically.

- **type**:`number`
- **default**:`0`
- **usage**:

```
treeConstructor.init({
    width: 0
})
```

## height

Set the height of the canvas, similar to width.

- **type**:`number`
- **default**:`0`
- **usage**:

```
treeConstructor.init({
    height: 0
})
```

## sort

Set how the tree structure is sorted, there are `6` optional sorting methods, `defaultAsc` , `defaultDes` , `nameDes` , `nameAsc` , `lengthDes` and `lengthAsc` , where `defaultDes` will sort the nodes according to the hierarchy in which they are located. The following code show the results that the nodes are sorted in descending order by their names.

- **type**:`string`
- **default**:`defaultDes`
- **usage**:

```
treeConstructor.init({
    sort: "defaultDes"
})
```

## size

Two values are allowed, size[0] controls the value of the horizontal stretch of the canvas, size[1] controls the width of the canvas and is optional.

- **type**:`array`
- **default**:`[700, 900]`
- **usage**:

```
treeConstructor.init({
    // horizontal stretch value 800, canvas width 400
    size: [800, 400]
    // horizontal stretch value 400, the canvas width is the value of config.width
    // size: [400]
})
```

## position

The left and top margins of the initial position of the evolution tree after the page has been rendered, as shown in the following example.

- **type**:`array`
- **default**:`[20, 20]`
- **usage**:

```
treeConstructor.init({
    // left margin 20, top margin 20
    position: [20, 20]
})
```

## separation

Space between leaf node, the larger the value, the longer the vertical length of the tree. 

- **type**:`number`
- **default**:`10`
- **usage**:

```
treeConstructor.init({
    separation: 10
})
```

## scale

Canvas zoom, the larger the value, the larger the horizontal width and vertical height of the tree.

- **type**:`number`
- **default**:`1`
- **usage**:

```
treeConstructor.init({
    scale: 1
})
```

## rotationAngle

Rotate the expansion angle. Only valid when `layout = radial`.

- **type**:`number`
- **default**:`0`
- **usage**:

```
treeConstructor.init({
    rotationAngle: 0
})
```

## isPhylogram

Show branch length by length, if `false`, all leaf branches are aligned to the right; if `true`, then show branches by branch length.

- **type**:`boolean`
- **default**:`true`
- **usage**:

```
treeConstructor.init({
    isPhylogram: true
})
```

## isWheelZoom

Enable wheel zoom, allow tree dragging if `true`.

- **type**:`boolean`
- **default**:`false`
- **usage**:

```
treeConstructor.init({
    isWheelZoom: false
})
```

## minimap

View zoom function.

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

Show view zoom.

- **type**:`boolean`
- **default**:`false`

### minimap.scaleInit

Initial zoom ratio.

- **type**:`number`
- **default**:`0.1`

### minimap.scaleRange

The range for scaling.

- **type**:`array`
- **default**:`[0.5,1.5]`

## stretch

Optimization of long branches for unbalanced tree, rendering lines with different colors according to different scaling ratios, and giving corresponding scales (the same color as the lines).

```
// increase the length of branches in the range of [0.001,0.003),[0.003,0.005),[0.005,0.008) by 1, 2, 3 folds respectively.
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

Branch optimization.

- **type**:`boolean`
- **default**:`false`

### stretch.data[].range

The range interval for the branch to be scales.

- **type**:`array`
- **default**:`[]`

### stretch.data[].multiple

The multiplier to scale the branch.

- **type**:`number`
- **default**:`1`

### stretch.data[].color

Color of the branch to be scaled.

- **type**:`string`
- **default**:`""`

## style

Global canvas style that can be overridden by other styles (both SVG and CSS styles).

- **type**: `object`
- **default**: `{}`
- **usage**:

```
treeConstructor.init({
    // set the font to Arial and fill it with red color, font size 10px
    style: {
        'font-family': "Arial",
        'fill': 'red',
        'font-size': "10px",
    }
})
```

## leafs

Display of the leaf areas.

- **type**: `object`
- **default**: `{}`
- **usage**:

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

Show leafs.

- **type**: `boolean`
- **default**:`true`

### leafs.dx

Horizontal offset added to the leaf area.

- **type**:`number`
- **default**:`0`

### leafs.dy

Vertical offset added to the leaf area.

- **type**:`number`
- **default**:`0`

### leafs.style

The text style of the leaf area (SVG and CSS), see more:[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **type**:`object`
- **default**:`{}`

## extension

Dashed line property before leaf node.

- **type**: `object`
- **default**: `{}`
- **usage**:

```
treeConstructor.init({
    extension: { //dashed line before leaf
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

Show deshed line.

- **type**:`boolean`
- **default**:`true`

### extension.style

The style of dashed line before leaf node, see more: [style](http://www.phyloscape.cc/api/multiplex.html#style)

- **type**:`object`
- **default**:`{}`

## mask

Background attributes of leaf nodes `leafs`.

- **type**: `object`
- **default**: `{}`
- **usage**:

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

Show leaf node mask.

- **type**: `boolean`
- **default**: `false`

### mask.dx

Horizontal offset added to the leaf mask.

- **type**: `number`
- **default**: `0`

### mask.dy

Vertical offset added to the leaf mask.

- **type**: `number`
- **default**: `0`

### mask.padding

Inner margin of leaf node mask.

- **type**: `array`
- **default**: `[10, 10]`

### mask.style

The style of the leaf node mask (SVG and CSS), see more:[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **type**: `object`
- **default**: `{}`

## collapse

Display the triangle folding symbol.

- **type**: `object`
- **default**: `{}`
- **usage**:

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

Horizontal offset added to the triangle folding symbol.

- **type**: `number`
- **default**: `0`

### collapse.dy

Vertical offset added to the triangle folding symbol.

- **type**: `number`
- **default**: `0`

### collapse.rotate

Rotation of the triangle folding symbol.

- **type**: `number`
- **default**: `0`

### collapse.size

Triangle folding symbol size, width:`size[1]`, height:`size[2]`。

- **type**: `array`
- **default**: `[30, 15]`

### collapse.style

Global styles for triangle folding symbol (SVG and CSS styles), see more: [style](http://www.phyloscape.cc/api/multiplex.html#style)

- **type**: `object`
- **default**: `{}`

### collapse.textStyle

Text styles for triangle folding symbol (SVG and CSS styles), see more: [style](http://www.phyloscape.cc/api/multiplex.html#style)

- **type**: `object`
- **default**: `{}`

### collapse.symbolStyle

Symbol styles for triangle folding symbol (SVG and CSS styles), see more: [style](http://www.phyloscape.cc/api/multiplex.html#style)

- **type**: `object`
- **default**: `{}`

## nodes

Node attribute, including name, value and symbol.

- **type**: `object`
- **default**: `{}`

### [nodes.name](http://nodes.name/)

Node name.

- **type**: `object`
- **default**: `{}`
- **usage**:

```
treeConstructor.init({
    nodes: {
        name: {
            show: false,
            mark: 'all', //leaf node all
            dx: 0,
            dy: 0,
            position: 'start', //start end
            style: {
                // 'font-size': '12px'
            }
        }
    }
})
```

#### nodes.name.show

Show node name.

- **type**: `boolean`
- **default**: `false`

#### nodes.name.mark

Display internal node names, `all`: all, `leaf`: leaf nodes only, `node`: internal nodes only.

- **type**: `number`
- **default**: `all`

#### nodes.name.dx

Horizontal offset added to the node name.

- **type**: `number`
- **default**: `0`

#### nodes.name.dy

Vertical offset added to the node name.

- **type**: `number`
- **default**: `0`

#### nodes.name.style

Node name stype (SVG and CSS), see more: [style](http://www.phyloscape.cc/api/multiplex.html#style)

- **type**: `object`
- **default**: `{}`

### nodes.value

Node value.

- **type**: `object`
- **default**: `{}`
- **usage**:

```
treeConstructor.init({
    nodes: {
        value: {
            show: false,
            mark: 'all', //leaf node all
            dx: 0,
            dy: 0,
            position: 'start', //start end
            style: {
                // 'font-size': '12px'
            }
        }
    }
})
```

#### nodes.value.show

Show node value.

- **type**: `boolean`
- **default**: `false`

#### nodes.value.mark

Display inner nodes, `all`: all, `leaf`: leaf nodes only, `node`: inner nodes only.

- **type**: `number`
- **default**: `all`

#### nodes.value.dx

Horizontal offset added to the node value.

- **type**: `number`
- **default**: `0`

#### nodes.value.dy

Vertical offset added to the node value.

- **type**: `number`
- **default**: `0`

#### nodes.value.style

Style of node value (SVG and CSS), see more: [style](http://www.phyloscape.cc/api/multiplex.html#style)

- **type**: `object`
- **default**: `{}`

### nodes.symbol

Node shapes and styles, [symbol](http://www.phyloscape.cc/api/multiplex.html#symbol)

- **type**: `object`
- **default**: `{}`
- **usage**:

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

`xxxxx` is the name of the leaf node that can be used as mapping data.

- **type**: `object`
- **default**: `{}`

## links

Node connectivity attribute.

- **type**: `object`
- **default**: `{}`

### links.type

Type of node line, supports `elbow` , `smooth` , and `line`.

- **type**: `string`
- **default**: `elbow`

### links.style

Node connectivity style (SVG and CSS), see more: [style](http://www.phyloscape.cc/api/multiplex.html#style)

- **type**: `boolean`
- **default**: `false`

## legend

Legend property.

- **type**: `object`
- **default**: `{}`
- **usage**:

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

Show legend.

- **type**: `boolean`
- **default**:`true`

### legend.dx

Horizontal offset added to the legend.

- **type**:`number`
- **default**:`0`

### legend.dy

Vertical offset added to the legend.

- **type**:`number`
- **default**:`0`

### legend.distance

Legend distance.

- **type**:`number`
- **default**:`0`

### legend.data

Legend data, `label` attribute [label](http://www.phyloscape.cc/api/multiplex.html#label), `symbol` attribute [symbol](http://www.phyloscape.cc/api/multiplex.html#symbol)

- **type**: `array`
- **default**: `[]`

## tooltip

Tooltip property, show when mouseover leaf node.

- **type**: `object`
- **default**: `{}`
- **usage**:

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

Show tooltip.

- **type**: `boolean`
- **default**:`false`

### tooltip.data

Specific data, where `xxxxx` represents the name of the leaf node.

- **type**: `object`
- **default**: `{}`

## sign

Sign (metadata) in the right side.

- **type**: `object`
- **default**: `{}`
- **usage**:

```
treeConstructor.init({
    sign: {
        show: false,
        dx: 0,
        dy: 0,
        distance: 0, // legend distance
        ringMargin: 0, // legend margin
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

Show the sign.

- **type**: `boolean`
- **default**: `false`

### sign.dx

Horizontal offset added to the sign.

- **type**:`number`
- **default**:`0`

### sign.dy

Vertical offset added to the sign.

- **type**:`number`
- **default**:`0`

### sign.distance

Distance of the sign.

- **type**:`number`
- **default**:`0`

### sign.ringMargin

Margin of the sign.

- **type**:`number`
- **default**:`0`

### sign.style

Global style (SVG and CSS), see more:[style](http://www.phyloscape.cc/api/multiplex.html#style)

- **type**:`string`
- **default**:`""`

### sign.data

Sign data.

- **type**:`array`
- **default**:`[]`

#### sign.data[].label

Label of the sign data.

- **type**: `object`
- **default**: `{}`

#### sign.data[].dx

Horizontal offset added to the sign data.

- **type**:`number`
- **default**:`0`

#### sign.data[].dy

Vertical offset added to the sign data.

- **type**:`number`
- **default**:`0`

#### sign.data[].distance

Distance of the sign data.

- **type**:`number`
- **default**:`0`

#### sign.data[].data

`label` attribute [label](http://www.phyloscape.cc/api/multiplex.html#label), `symbol` attribute [symbol](http://www.phyloscape.cc/api/multiplex.html#symbol)

- **type**:`object`
- **default**:`{}`
