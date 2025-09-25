import { render, screen, waitFor } from "@testing-library/react";
import Todos from "./Todos";

// mock fetch
beforeAll(() => {
	global.fetch = jest.fn();
});

afterEach(() => {
	jest.clearAllMocks();
});

test("renderuje loader i potem dane z API", async () => {
	// symulujemy odpowiedź z API
	(fetch as jest.Mock).mockResolvedValueOnce({
		json: async () => ({
			id: 1,
			title: "Testowy TODO",
			completed: false,
			userId: 1,
		}),
	});

	render(<Todos />);

	// na początku loader
	expect(screen.getByText(/loading/i)).toBeInTheDocument();

	// czekamy aż pojawi się tytuł
	await waitFor(() => {
		expect(screen.getByText("Testowy TODO")).toBeInTheDocument();
	});
});
