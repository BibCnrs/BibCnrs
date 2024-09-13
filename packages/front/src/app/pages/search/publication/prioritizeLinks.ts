import { getPrioritizedLink_v1 } from "./prioritizeLinksV1";
import { getPrioritizedLink_v2 } from "./prioritizeLinksV2";

export const getPrioritizedLink =
	import.meta.env.ENABLE_V1_LINK_PRIORIZATION === "y"
		? getPrioritizedLink_v1
		: getPrioritizedLink_v2;
