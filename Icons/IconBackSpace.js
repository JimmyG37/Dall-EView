import React from "react";
import { Svg, Rect, Path, Line } from "react-native-svg";

const IconBackSpace = ({ width, height, color }) => (
  <Svg width={width} height={height} viewBox="0 0 256 256">
    <Rect width="256" height="256" fill="none" />
    <Path
      d="M61.7,204.1,16,128,61.7,51.9A7.9,7.9,0,0,1,68.5,48H216a8,8,0,0,1,8,8V200a8,8,0,0,1-8,8H68.5A7.9,7.9,0,0,1,61.7,204.1Z"
      fill={color}
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="6.8"
    />
    <Line
      x1="160"
      y1="104"
      x2="112"
      y2="152"
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="8"
    />
    <Line
      x1="160"
      y1="152"
      x2="112"
      y2="104"
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="8"
    />
  </Svg>
);

export default IconBackSpace;
