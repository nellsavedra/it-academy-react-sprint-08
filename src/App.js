import "./App.css";
import StarshipsList, { Starship } from "./components/StarshipsList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<StarshipsList />} />
					<Route path="starship/:id" element={<Starship />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
