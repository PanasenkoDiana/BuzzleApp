import Svg, { Path, SvgProps } from "react-native-svg";

export function PlusIcon(props: SvgProps) {
	return (
		<Svg viewBox="0 0 16 17" {...props}>
			<Path
				d="M14.786 9.58H9.377v5.409a1.082 1.082 0 11-2.163 0V9.58H1.805a1.082 1.082 0 010-2.163h5.409V2.008a1.082 1.082 0 112.163 0v5.409h5.41a1.082 1.082 0 010 2.163z"
				// fill="color(display-p3 .3294 .2353 .3216)"
			/>
		</Svg>
	);
}
