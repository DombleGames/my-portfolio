import React, { useState } from 'react';
import { Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap';
import changeDocumentTitle from '../customHooks/changeDocumentTitle.jsx';

const Movies = () => {
	const [query, setQuery] = useState('');
	const [movies, setMovies] = useState([]);
	const [error, setError] = useState(null);
	const baseImageUrl = 'https://image.tmdb.org/t/p/w500';

	// Set the document title
	changeDocumentTitle('Movie Search');

	// Fetch options for the API call
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWMxNGE4YzBmNTViMzEwYWIzZTU5OTllNzYxNWNjYiIsIm5iZiI6MTcyNTk5MzA1MS44ODk2MjUsInN1YiI6IjY1NTI0ZjQ1ZWE4NGM3MTA5NmRiODI1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CiG7Q1inz86mKaFUSFSDD6f8e658gO1L8K0eRF4Ykv0',
		},
	};

	// Function to handle movie search
	const handleSearch = async () => {
		try {
			const response = await fetch(
				`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
				options
			);

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			setMovies(data.results);
			setError(null);
		} catch (error) {
			setMovies([]);
			setError('Error fetching data. Please try again.');
		}
	};

	return (
		<Container className="mt-4">
			<h1 className="text-center">Movie Search</h1>
			<p className="text-center">Search for movies using The Movie Database API</p>

			{/* Search Form */}
			<Row>
				<Col md={12}>
					<Form.Control
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						className="mb-3"
						placeholder="Enter movie title"
					/>
					<Button onClick={handleSearch} variant="primary" className="mb-3">
						Search
					</Button>
					{error && <p className="text-danger mt-3">{error}</p>}
				</Col>
			</Row>

			{/* Movie List */}
			<Row>
				<Col md={12}>
					<ListGroup className="mt-3">
						{movies.length > 0 ? (
							movies.map((movie) => (
								<ListGroup.Item key={movie.id} className="mb-3">
									<Row>
										<Col md={2}>
											<img
												src={`${baseImageUrl}${movie.poster_path}`}
												alt={`${movie.title} Poster`}
												className="img-fluid"
											/>
										</Col>
										<Col md={10}>
											<h3>{movie.title}</h3>
											<p>{movie.overview}</p>
										</Col>
									</Row>
								</ListGroup.Item>
							))
						) : (
							<p className="text-center">No movies found. Please try another search.</p>
						)}
					</ListGroup>
				</Col>
			</Row>
		</Container>
	);
};

export default Movies;
