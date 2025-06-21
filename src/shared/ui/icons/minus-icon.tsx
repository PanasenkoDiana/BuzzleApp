import Svg, { Path, SvgProps } from "react-native-svg";

export function MinusIcon(props: SvgProps) {
  return (
    <Svg viewBox="0 -960 960 960" {...props}>
      <Path
        d="M280-440q-17 0-28.5-11.5T240-480q0-17 11.5-28.5T280-520h400q17 0 28.5 11.5T720-480q0 17-11.5 28.5T680-440H280Z"
        fill={props.fill ?? "#e3e3e3"}
      />
    </Svg>
  );
}
