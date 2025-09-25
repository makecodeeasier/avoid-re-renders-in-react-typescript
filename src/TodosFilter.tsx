import React, { useEffect, useState, memo, useMemo } from "react";

type dataProps = {
	completed: boolean;
	id: number;
	title: string;
	userId: number;
};

const TodosFilter = () => {
	console.log("TodosFilter rendered ");

	const [preloader, setPreloader] = useState<boolean>(true);
	const [todos, setTodos] = useState<dataProps[]>([]);
	const [filter, setFilter] = useState<string>("");

	useEffect(() => {
		console.log("useEffect TodosFilter executed");

		fetch("https://jsonplaceholder.typicode.com/todos")
			.then((response) => response.json())
			.then((json) => setTodos(json))
			.catch((error: any) => console.error(error.message))
			.finally(() => {
				setPreloader(false);
			});
	}, []);

	// 👇 useMemo – obliczamy filtrowaną listę tylko, gdy zmienia się filter albo todos
	// const filteredTodos = useMemo(() => {
	// 	if (!filter) return todos;
	// 	return todos.filter((t) => t.title.toLowerCase().includes(filter.toLowerCase()));
	// }, [filter, todos]);

	const filteredTodos = () => {
		if (!filter) return todos;
		return todos.filter((t) => t.title.toLowerCase().includes(filter.toLowerCase()));
	};

	return (
		<>
			{preloader ? (
				<h2>loading...</h2>
			) : (
				<>
					<input type="text" placeholder="Filtruj po tytule..." value={filter} onChange={(e) => setFilter(e.target.value)} />

					{filteredTodos().length > 0 ? (
						<ul>
							{filteredTodos().map((todo) => (
								<li key={todo.id}>
									<strong>{todo.id}.</strong> {todo.title}
								</li>
							))}
						</ul>
					) : (
						<p>Brak wyników</p>
					)}
				</>
			)}
		</>
	);
};

export default memo(TodosFilter);
