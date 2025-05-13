import Svg, { SvgProps, Path } from "react-native-svg"

export function HomeIcon(props: SvgProps) {
  return (
    <Svg
      viewBox="0 0 16 17"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M15.429 7.125L9.367 1.064a1.515 1.515 0 00-2.142 0L1.163 7.125A1.505 1.505 0 00.72 8.197v7.274a.91.91 0 00.91.91h13.335a.91.91 0 00.909-.91V8.197a1.504 1.504 0 00-.444-1.072zm-1.375 7.437H2.538v-6.24l5.758-5.758 5.758 5.758v6.24z"
        // fill="color(display-p3 .0275 .0392 .1098)"
      />
    </Svg>
  )
}