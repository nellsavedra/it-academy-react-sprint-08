import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const StarshipsList = () => {
	const [starshipsData, setStarshipsData] = useState({});
	const [starships, setStarships] = useState([]);
	const [nextStarships, setNextStarships] = useState();

	useEffect(() => {
		axios.get("https://swapi.dev/api/starships/").then(response => {
			setStarshipsData(response.data);
			setStarships(response.data.results);
			setNextStarships(response.data.next);
		});
	}, []);

	const getID = url => {
		let ID = url.match(/\d+/);
		return ID[0];
	};

	const getNext = () => {
		if (starshipsData.next !== null) {
			axios.get(nextStarships).then(response => {
				setStarships(starships => [...starships, ...response.data.results]);
				setNextStarships(response.data.next);
			});
		}
	};

	return (
		<>
			<main className="starships">
				{starships.map(ship => {
					return (
						<div key={"ship-" + getID(ship.url)}>
							<Link to={"starship/" + getID(ship.url)}>
								{ship.name}
								<br />
								{ship.model}
							</Link>
						</div>
					);
				})}

				{nextStarships && <button onClick={() => getNext()}>View more</button>}
			</main>
		</>
	);
};

export default StarshipsList;

export const Starship = () => {
	let { id } = useParams();
	const [starship, setStarship] = useState([]);

	useEffect(() => {
		axios.get("https://swapi.dev/api/starships/" + id).then(response => {
			setStarship(response.data);
		});
	}, [id]);

	return (
		<>
			<h1>Name: {starship.name}</h1>
			<h3>Model: {starship.model}</h3>
			<h3>Manufacturer: {starship.manufacturer}</h3>
			<h3>Cost in credits: {starship.cost_in_credits}</h3>
			<h3>Length: {starship.length}</h3>
			<h3>Atmospheric Speed: {starship.max_atmosphering_speed}</h3>
			<h3>Crew: {starship.crew}</h3>
			<h3>Passengers: {starship.passengers}</h3>
			<h3>Cargo capacity: {starship.cargo_capacity}</h3>
			<h3>Consumables: {starship.consumables}</h3>
			<h3>Hyperdrive Rating: {starship.hyperdrive_rating}</h3>
			<h3>MGLT: {starship.MGLT}</h3>
			<h3>Starship Class: {starship.starship_class}</h3>
			<h3>Pilots: {starship.pilots}</h3>
			<h3>Films: {starship.films}</h3>
		</>
	);
};
