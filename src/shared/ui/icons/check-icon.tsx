import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export function CheckIcon(props: SvgProps) {
  return (
    <Svg
      viewBox="0 0 11 10"
      {...props}
    >
      <Path
        d="M9.414 1.875l-5.25 6.25-2.25-2.5"
      />
    </Svg>
  )
}
