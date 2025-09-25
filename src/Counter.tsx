import { memo } from "react";
import CounterProps from "./models/CounterProps";

const Counter = ({ counter, increaseCounter }: CounterProps) => {
	console.log("Counter component render");
	let start = performance.now();
	while (performance.now() - start < 500) {}

	return (
		<div>
			<h2>Counter: {counter}</h2>
			<button onClick={increaseCounter}>Increase counter</button>
		</div>
	);
};

export default memo(Counter);
