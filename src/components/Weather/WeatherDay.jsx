import PropTypes from 'prop-types';
import React from 'react';

function WeatherDay({ day }) {
	if (!day) {
		return <div>Loading...</div>;
	}

	const date = day.dt_txt.split(' ')[0];

	return (
		<div
			className="d-flex flex-column align-items-center m-3 p-2 border rounded shadow-sm"
			style={{
				flexGrow: 1,
				flexBasis: '150px', // Minimalgröße der Karten
				flexShrink: 1, // Die Karten schrumpfen, wenn der Platz knapp ist
				minWidth: '150px', // Mindestbreite für kleine Bildschirme
				maxWidth: '300px', // Maximalgröße, falls genügend Platz vorhanden ist
			}}
		>
			<img
				src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
				alt={day.weather[0].description}
				className="img-fluid mb-2"
				style={{ maxWidth: '50px', maxHeight: '50px' }}
			/>
			<h5>{date}</h5>
			<ul className="list-unstyled">
				<li>{day.weather[0].description}</li>
				<li>Temp: {day.main.temp}°C</li>
				<li>Max: {day.main.temp_max}°C</li>
				<li>Min: {day.main.temp_min}°C</li>
			</ul>
		</div>
	);
}

WeatherDay.propTypes = {
	day: PropTypes.object.isRequired,
};

export default WeatherDay;
