import {
	type DependencyList,
	type EffectCallback,
	useEffect,
	useState,
} from "react";

export function useEffectOnce(
	effect: EffectCallback,
	deps: DependencyList = [],
) {
	const [once, setOnce] = useState(false);

	useEffect(() => {
		if (once) {
			return;
		}

		setOnce(true);
		effect();
	}, [once, effect, ...deps]);
}
