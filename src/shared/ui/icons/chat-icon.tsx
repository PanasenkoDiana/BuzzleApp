import Svg, { SvgProps, Path } from "react-native-svg";

export function ChatIcon(props: SvgProps) {
  return (
    <Svg
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <Path
        d="M1.36572 9.00004C1.36572 7.00689 2.1575 5.09538 3.56687 3.68601C4.97624 2.27664 6.88775 1.48486 8.8809 1.48486C10.874 1.48486 12.7856 2.27664 14.1949 3.68601C15.6043 5.09538 16.3961 7.00689 16.3961 9.00004V13.7816C16.3961 14.5782 16.3961 14.9746 16.2777 15.2931C16.1836 15.5454 16.0363 15.7746 15.8459 15.965C15.6554 16.1555 15.4263 16.3027 15.1739 16.3969C14.8555 16.5152 14.4581 16.5152 13.6624 16.5152H8.8809C6.88775 16.5152 4.97624 15.7234 3.56687 14.3141C2.1575 12.9047 1.36572 10.9932 1.36572 9.00004Z"
        stroke={props.stroke ?? "#070A1C"}
        strokeWidth={props.strokeWidth ?? 1.66667}
      />
      <Path
        d="M6.0625 8.06055H11.6989M8.88069 11.8181H11.6989"
        stroke={props.stroke ?? "#070A1C"}
        strokeWidth={props.strokeWidth ?? 1.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}