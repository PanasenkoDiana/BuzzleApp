import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export function CheckIcon(props: SvgProps) {
  return (
    <Svg
      width={37}
      height={27}
      viewBox="0 0 37 27"
      fill="none"
      {...props}
    >
      <Path
        d="M2.6781 13.8114L13.2846 24.4178L34.4956 3.20465"
        stroke="gray"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
