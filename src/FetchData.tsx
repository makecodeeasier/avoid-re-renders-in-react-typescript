import React, { useEffect, useState, memo, useCallback } from "react";
import getRandomInt from "./helpers/getRandomInt";

type dataProps = {
	completed: boolean;
	id: number;
	title: string;
	userId: number;
};

const FetchData = () => {
	console.log("FetchData rendered ");
	const [preloader, setPreloader] = useState<boolean>(false);
	const [shouldFetch, setShouldFetch] = useState(false);
	const [data, setData] = useState<dataProps | null>(null);

	const onClick = () => {
		setPreloader(true);
		setShouldFetch(true);
	};

	const fetchDataPerfomance = useCallback(async () => {
		const todo: number = getRandomInt(1, 10);
		const res = await fetch("https://jsonplaceholder.typicode.com/todos/" + todo)
			.then((response) => response.json())
			.then((json) => setData(json))
			.catch((error: any) => console.error(error.message))
			.finally(() => {
				setPreloader(false);
				setShouldFetch(false);
			});
	}, []);

	useEffect(() => {
		if (!shouldFetch) return; //guard
		console.log("useEffect FetchData executed");
		const todo: number = getRandomInt(1, 10);

		fetch("https://jsonplaceholder.typicode.com/todos/" + todo)
			.then((response) => response.json())
			.then((json) => setData(json))
			.catch((error: any) => console.error(error.message))
			.finally(() => {
				setPreloader(false);
				setShouldFetch(false);
			});
	}, [shouldFetch]);

	return (
		<>
			{preloader ? <h2>loading...</h2> : <button onClick={onClick}>Fetch data</button>}

			{data && <h3>{data.title}</h3>}
		</>
	);
};

export default memo(FetchData);
