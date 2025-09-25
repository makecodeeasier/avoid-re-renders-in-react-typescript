import { useCallback, useState } from "react";
import Counter from "./Counter";
import "./App.css";
import FetchData from "./FetchData";
import Todos from "./Todos";
import TodosFilter from "./TodosFilter";

function App() {
	const [counter, setCounter] = useState<number>(1);
	const [theme, setTheme] = useState<string>("light");

	const toggleTheme = () => {
		theme == "light" ? setTheme("dark") : setTheme("light");
	};

	const increaseCounter = useCallback(() => {
		setCounter(counter + 1);
	}, [counter]);

	console.log("render component");

	return (
		<div className="App">
			<Counter counter={counter} increaseCounter={increaseCounter}></Counter>
			<h2>Theme: {theme}</h2>
			<button onClick={toggleTheme}>Toggle Theme</button>
			<h2>Fetching data on click</h2>
			<FetchData />
			<h2>Fetching data on load</h2>
			<Todos />
			<h2>Fetching data with filter</h2>
			<TodosFilter />
		</div>
	);
}

export default App;
