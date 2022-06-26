import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const StarshipsList = () => {
	const [starshipsData, setStarshipsData] = useState({});
	const [starships, setStarships] = useState([]);
	
	useEffect(() => {
		axios.get("https://swapi.dev/api/starships/").then(response => {
			setStarshipsData(response.data);
			setStarships(response.data.results)});
	}, []);
	
	const getID = (url) => {
		let ID = url.match(/\d+/);
		console.log(ID);
		return ID[0]
	}
	
	return (
		<>
		{starships.map((ship, index) => {
			return <div key={"ship-"+getID(ship.url)}><Link  to={"starship/"+getID(ship.url)}>{ship.name}<br/>{ship.model}</Link></div>
		})}
		</>
	);
};

export default StarshipsList;

export const Starship = () => {
	let {id} = useParams();
	const [starship, setStarship] = useState([]);
	
	
	useEffect(() => {
		axios.get("https://swapi.dev/api/starships/"+id).then(response => {
			setStarship(response.data);
		});
	}, [id]);
	
	
	return (
		<>
		{<h1>{starship.name}</h1>}
		</>
	);
	
};


