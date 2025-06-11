import Svg, { Path, SvgProps } from "react-native-svg";

export function EyeIcon(props: SvgProps) {
  return (
    <Svg
      width={props.width || 19}
      height={props.height || 19}
      viewBox="0 0 20 19"
      fill="none"
      {...props}
    >
      <Path
        d="M1.07715 6.99996C1.07715 6.99996 3.57715 1.16663 9.41048 1.16663C15.2438 1.16663 17.7438 6.99996 17.7438 6.99996C17.7438 6.99996 15.2438 12.8333 9.41048 12.8333C3.57715 12.8333 1.07715 6.99996 1.07715 6.99996Z"
        stroke={props.stroke || "#000"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.41048 9.49996C10.7912 9.49996 11.9105 8.38067 11.9105 6.99996C11.9105 5.61925 10.7912 4.49996 9.41048 4.49996C8.02977 4.49996 6.91048 5.61925 6.91048 6.99996C6.91048 8.38067 8.02977 9.49996 9.41048 9.49996Z"
        stroke={props.stroke || "#000"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
