function delay(ms: number) {
	return new Promise((resolve) => setTimeout(() => resolve(true), ms));
}

function getRetryLoop<F extends (...args: Args[]) => Promise<R>, Args, R>(
	task: F,
	args: Args[],
) {
	return async function retryLoop(max: number) {
		if (max === 0) {
			throw new Error("Max retry reached. Giving up.");
		}
		try {
			return await task(...args);
		} catch (error) {
			if (error.message === "retry") {
				await delay(100);
				return await retryLoop(max - 1);
			}
			throw error;
		}
	};
}

export function retry<F extends (...args: Args[]) => Promise<R>, Args, R>(
	task: F,
	max: number,
) {
	return async (...args: Args[]) => {
		const retryLoop = getRetryLoop(task, args);
		return retryLoop(max);
	};
}
