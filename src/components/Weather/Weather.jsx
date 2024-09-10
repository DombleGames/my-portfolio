import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import changeDocumentTitle from '../customHooks/changeDocumentTitle.jsx';
import WeatherDay from './WeatherDay';

export default function Weather() {
	changeDocumentTitle('Weather Forecast');
	const [city, setCity] = useState('Leverkusen');
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	const handleChange = (event) => {
		setCity(event.target.value);
	};

	const fetchData = () => {
		const apiUrl = ``;

		fetch(apiUrl)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then((data) => {
				setData(data);
				setError(null);
			})
			.catch((error) => {
				console.error('Error:', error);
				setError('Failed to fetch weather data. Please try again.');
			});
	};

	// Fetch weather data on component mount
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Container className="weather mt-5 p-4">
			<Row>
				<Col md={12} className="text-center mb-4">
					<h1>Weather Forecast</h1>
					<Form.Control
						type="text"
						onChange={handleChange}
						value={city}
						className="mb-2"
						placeholder="Enter city name"
					/>
					<Button onClick={fetchData} variant="primary">
						Show Weather Forecast
					</Button>
					{error && <p className="text-danger mt-3">{error}</p>}
				</Col>
				<Col md={12}>
					<div className="d-flex flex-wrap justify-content-center">
						{data?.list
							?.filter((_, index) => index % 8 === 0) // Show only one forecast per day
							.map((day, index) => (
								<WeatherDay key={index} day={day} />
							))}
					</div>
				</Col>
			</Row>
		</Container>
	);
}
