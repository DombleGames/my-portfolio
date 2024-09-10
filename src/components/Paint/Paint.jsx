import html2canvas from 'html2canvas';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import changeDocumentTitle from '../customHooks/changeDocumentTitle.jsx';

const Paint = () => {
	changeDocumentTitle('Paint');

	const [gridSize, setGridSize] = useState(8);
	const [canvasSize, setCanvasSize] = useState(400); // Dynamische Canvas-Größe
	const initialGrid = Array(gridSize)
		.fill()
		.map(() => Array(gridSize).fill('white'));
	const [grid, setGrid] = useState(initialGrid);
	const [selectedColor, setSelectedColor] = useState('black');
	const [fillBucketActive, setFillBucketActive] = useState(false);
	const [isMouseDown, setIsMouseDown] = useState(false); // Tracken des Maustasten-Status
	const colors = [
		'black',
		'red',
		'blue',
		'green',
		'yellow',
		'white',
		'brown',
		'PapayaWhip',
	];

	// Update grid and canvas size when grid size changes
	useEffect(() => {
		const size = Number(gridSize);
		const newGrid = Array(size)
			.fill()
			.map(() => Array(size).fill('white'));
		setGrid(newGrid);

		// Dynamisch die Canvas-Größe anpassen
		const newCanvasSize = size <= 8 ? 400 : size <= 16 ? 600 : 800;
		setCanvasSize(newCanvasSize);
	}, [gridSize]);

	const saveImage = () => {
		const gridElement = document.querySelector('.grid-container');
		html2canvas(gridElement).then((canvas) => {
			const image = canvas.toDataURL('image/png');
			const link = document.createElement('a');
			link.download = 'Pixel-Painting.png';
			link.href = image;
			link.click();
		});
	};

	// Flood Fill Algorithmus
	const floodFill = (x, y, prevColor, newColor) => {
		if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length) return;
		if (grid[x][y] !== prevColor) return;

		const newGrid = [...grid];
		newGrid[x][y] = newColor;

		floodFill(x - 1, y, prevColor, newColor);
		floodFill(x + 1, y, prevColor, newColor);
		floodFill(x, y - 1, prevColor, newColor);
		floodFill(x, y + 1, prevColor, newColor);

		setGrid(newGrid);
	};

	const handleCellClick = (x, y) => {
		if (fillBucketActive) {
			floodFill(x, y, grid[x][y], selectedColor);
		} else {
			const newGrid = [...grid];
			newGrid[x][y] = selectedColor;
			setGrid(newGrid);
		}
	};

	const handleMouseEnter = (x, y) => {
		if (isMouseDown && !fillBucketActive) {
			const newGrid = [...grid];
			newGrid[x][y] = selectedColor;
			setGrid(newGrid);
		}
	};

	return (
		<Container className="mt-4 text-center">
			<h1 className="text-center text-primary mb-4">Paint Your Masterpiece</h1>
			<p className="text-muted">
				Choose your colors and start painting! Use the Fill Bucket to fill large areas.
			</p>

			<Row className="justify-content-center mb-4">
				<Col md={4}>
					<Form.Label className="text-info">Grid Size</Form.Label>
					<Form.Select
						className="my-2"
						value={gridSize}
						onChange={(e) => setGridSize(e.target.value)}
					>
						<option value="8">8 x 8</option>
						<option value="12">12 x 12</option>
						<option value="16">16 x 16</option>
						<option value="32">32 x 32</option>
					</Form.Select>
				</Col>
			</Row>

			<Row className="justify-content-center mb-4">
				<Col md={6}>
					<h5 className="text-secondary">Choose a Color</h5>
					<div className="color-selector my-2 d-flex justify-content-center flex-wrap">
						{colors.map((color) => (
							<Button
								key={color}
								onClick={() => setSelectedColor(color)}
								style={{
									backgroundColor: color,
									width: '30px',
									height: '30px',
									marginRight: '5px',
									border: '2px solid #333',
									borderRadius: '50%',
								}}
							/>
						))}
					</div>
					<Button
						variant={fillBucketActive ? 'secondary' : 'outline-secondary'}
						onClick={() => setFillBucketActive(!fillBucketActive)}
						style={{ width: '120px', height: '40px', marginBottom: '10px' }}
					>
						{fillBucketActive ? 'Fill Mode On' : 'Fill Bucket'}
					</Button>
				</Col>
			</Row>

			{/* Zentriertes Canvas mit dynamischer Größe */}
			<div
				className="grid-container mx-auto mb-4"
				style={{
					display: 'flex',
					flexDirection: 'column',
					width: `${canvasSize}px`,
					height: `${canvasSize}px`,
					cursor: 'pointer',
				}}
				onMouseDown={() => setIsMouseDown(true)}
				onMouseUp={() => setIsMouseDown(false)}
				onMouseLeave={() => setIsMouseDown(false)}
			>
				{grid.map((row, rowIndex) => (
					<div key={`row-${rowIndex}`} style={{ display: 'flex' }}>
						{row.map((color, colIndex) => (
							<div
								key={`cell-${rowIndex}-${colIndex}`}
								onClick={() => handleCellClick(rowIndex, colIndex)}
								onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
								style={{
									width: `${canvasSize / gridSize}px`,
									height: `${canvasSize / gridSize}px`,
									backgroundColor: color,
									border: '1px solid black',
								}}
							/>
						))}
					</div>
				))}
			</div>

			<Button variant="success" onClick={saveImage} className="mb-4">
				Save Painting
			</Button>
		</Container>
	);
};

export default Paint;
