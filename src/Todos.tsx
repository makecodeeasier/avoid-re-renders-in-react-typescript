import React, { useEffect, useState, useRef, memo } from "react";
import getRandomInt from "./helpers/getRandomInt";

type dataProps = {
	completed: boolean;
	id: number;
	title: string;
	userId: number;
};

const Todos = () => {
	console.log("Todos rendered ");

	// startowo true, bo od razu fetchujemy
	const [preloader, setPreloader] = useState<boolean>(true);
	const data = useRef<dataProps | null>(null);

	useEffect(() => {
		console.log("useEffect Todos executed");

		const todo: number = getRandomInt(1, 10);

		fetch("https://jsonplaceholder.typicode.com/todos/" + todo)
			.then((response) => response.json())
			.then((json) => (data.current = json))
			.catch((error: any) => console.error(error.message))
			.finally(() => {
				setPreloader(false); // ukryj loader po zakończeniu
			});
	}, []); // tylko raz przy montażu

	return <>{preloader ? <h2>loading...</h2> : data.current && <h3>{data.current.title}</h3>}</>;
};

export default memo(Todos);
