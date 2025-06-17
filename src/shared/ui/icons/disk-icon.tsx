import React from "react";
import { Svg, Path, SvgProps } from "react-native-svg";

export function FloppyDiskIcon(props: SvgProps) {
	return (
		<Svg
			viewBox="0 -960 960 960"
			width={props.width || 24}
			height={props.height || 24}
			{...props}
		>
			<Path
				d="M788-658v426q0 26-17 43t-43 17H232q-26 0-43-17t-17-43v-496q0-26 17-43t43-17h426l130 130Zm-28 12L646-760H232q-14 0-23 9t-9 23v496q0 14 9 23t23 9h496q14 0 23-9t9-23v-414ZM480-316q28 0 48-20t20-48q0-28-20-48t-48-20q-28 0-48 20t-20 48q0 28 20 48t48 20ZM280-572h278v-108H280v108Zm-80-74v446-560 114Z"
				fill={props.fill || "#000000"}
			/>
		</Svg>
	);
}
