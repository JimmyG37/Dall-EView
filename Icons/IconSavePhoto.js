import React from "react";
import {
  Svg,
  Defs,
  ClipPath,
  Rect,
  Symbol,
  Path,
  G,
  Use,
} from "react-native-svg";

const IconSavePhoto = (props) => (
  <Svg width={45} height={50} fill="none">
    <Defs>
      <ClipPath id="island">
        <Rect x={10} y={0} width={15} height={2.6} rx={0.5} ry={0.5} />
      </ClipPath>
      <Symbol id="download-icon" viewBox="0 0 24 24">
        <Path
          fill="black"
          d="M12 19c-.276 0-.552-.106-.765-.319l-5.833-5.833c-.419-.419-.419-1.095 0-1.514.419-.419 1.095-.419 1.514 0L11 14.686V3c0-.552.448-1 1-1s1 .448 1 1v11.686l3.084-3.084c.419-.419 1.095-.419 1.514 0 .419.419.419 1.095 0 1.514l-5.833 5.833c-.213.213-.489.319-.765.319z"
        />
      </Symbol>
      <Symbol id="image-icon" viewBox="0 0 16 16">
        <Path
          d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
          fill="#050505"
        />
        <Path
          d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"
          fill="#050505"
        />
      </Symbol>
    </Defs>
    <G>
      <Rect
        x={1}
        y={0.5}
        width={28.3}
        height={48.8}
        rx={4}
        fill="rgba(52, 52, 52, 0.8)"
        stroke="black"
        strokeWidth="1.3"
      />
    </G>
    <G>
      <Rect
        x={9}
        y={0.8}
        width={12}
        height={2.6}
        fill="black"
        clipPath="url(#island)"
      />
      <Use href="#download-icon" x={6.8} y={8.1} width={18} height={18} />
      <Use href="#image-icon" x={9.1} y={19} width={12} height={12} />
    </G>
  </Svg>
);

export default IconSavePhoto;
