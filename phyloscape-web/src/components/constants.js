/**
 * An enumeration of certain pre-defined angles to enable faster drawing of
 * trees. There are FORTYFIVE, QUARTER, HALF and FULL. Values are all radians.
 *
 * @enum
 * @memberof Phylocanvas
 * @constant
 */
export const Angles = {
  /**
   * @constant
   * @type double
   * @description The equivalent of 0 degrees in Radians
   */
  Degrees0: 0,

  /**
   * @constant
   * @type double
   * @description The equivalent of 45 degrees in Radians
   */
  Degrees45: Math.PI * 0.25,

  /**
   * @constant
   * @type double
   * @description The equivalent of 90 degrees in Radians
   */
  Degrees90: Math.PI * 0.5,

  /**
   * @constant
   * @type double
   * @description The equivalent of 180 degrees in Radians
   */
  Degrees180: Math.PI,

  /**
   * @constant
   * @type double
   * @description The equivalent of 270 degrees in Radians
   */
  Degrees270: Math.PI * 1.5,

  /**
   * @constant
   * @type double
   * @description The equivalent of 360 degrees in Radians
   */
  Degrees360: Math.PI * 2,
};

export const EmptyArray = [];

export const EmptyObject = {};

export const FontFamily = [
  "PingFang SC",
  "Arial",
  "Georgia",
  "Verdana",
  "Courier",
  "Courier New",
  "Times New Roman",
  "Impact",
  "Monotype Corsiva",
  "Helvetica Neue",
  "Hiragino Sans GB",
  "Microsoft YaHei",
  "sans-serif",
];

export const ControlTypes = {
  GlobalZoom: "gz",
  VerticalZoom: "vz",
  HorizontallyZoom: "hz",
};

export const TreeTypes = {
  Circular: "cr",
  Diagonal: "dg",
  Hierarchical: "hr",
  Radial: "rd",
  Rectangular: "rc",
};

export const Shapes = {
  Chevron: "chevron",
  ChevronInverted: "chevron-inverted",
  ChevronLeft: "chevron-left",
  ChevronRight: "chevron-right",
  Circle: "circle",
  Cross: "cross",
  Diamond: "diamond",
  Dot: "dot",
  DoubleChevron: "double-chevron",
  DoubleChevronInverted: "double-chevron-inverted",
  DoubleChevronLeft: "double-chevron-left",
  DoubleChevronRight: "double-chevron-right",
  Heptagon: "heptagon",
  HeptagonInverted: "heptagon-inverted",
  Heptagram: "heptagram",
  HeptagramInverted: "heptagram-inverted",
  Hexagon: "hexagon",
  Hexagram: "hexagram",
  Octagon: "octagon",
  Octagram: "octagram",
  Pentagon: "pentagon",
  PentagonInverted: "pentagon-inverted",
  Pentagram: "pentagram",
  PentagramInverted: "pentagram-inverted",
  Plus: "plus",
  Square: "square",
  Star: "pentagram",
  StarInverted: "pentagram-inverted",
  Tetragram: "tetragram",
  Triangle: "triangle",
  TriangleInverted: "triangle-inverted",
  TriangleLeft: "triangle-left",
  TriangleRight: "triangle-right",
  Wye: "wye",
  WyeInverted: "wye-inverted",
  Picture: "picture",
};

export const Layout = ["tree", "radial"];
export const Sort = [
  "nameDes",
  "nameAsc",
  "lengthDes",
  "lengthAsc",
  "defaultDes",
  "defaultAsc",
];
export const Mark = {
  All: "all",
  "Only leafs": "leaf",
  "Only nodes": "node",
};

export const textAnchor = ["start", "middle", "end"]

export const symbolTypeObj = {
  circle: 0,
  cross: 1,
  diamond: 2,
  square: 3,
  star: 4,
  triangle: 5,
  wye: 6,
  pie: 7,
  bar: 8,
  // image: 9,
  // text: 10,
  polygon: 11,
  heart: 12,
  thermograph: 13,
  rect: 14,
  ellipse: 15,
  gradient: 16,
};

export const Type = ["line","time"]
export const Position = ["top","bottom"]