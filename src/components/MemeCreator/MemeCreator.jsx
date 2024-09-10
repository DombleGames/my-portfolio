import html2canvas from 'html2canvas';
import React, { useState } from 'react';
import { Button, Col, Form, Row, Container } from 'react-bootstrap';

const MemeCreator = () => {
	const [image, setImage] = useState(null);
	const [topText, setTopText] = useState('');
	const [bottomText, setBottomText] = useState('');
	const [textStyle, setTextStyle] = useState({
		fontSize: '22px',
		color: '#000000',
		fontFamily: 'Arial',
	});

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.onloadend = () => {
			setImage(reader.result);
		};
		reader.readAsDataURL(file);
	};

	const saveImage = () => {
		const gridElement = document.querySelector('.meme-preview');
		html2canvas(gridElement).then((canvas) => {
			const image = canvas.toDataURL('image/png');
			const link = document.createElement('a');
			link.download = 'meme.png';
			link.href = image;
			link.click();
		});
	};

	return (
		<Container className="mt-4">
			<h1 className="text-center">Meme Creator</h1>
			<p className="text-center">Create your own meme by uploading an image and adding text.</p>

			<Form.Group className="mb-3">
				<Form.Label>Upload an image</Form.Label>
				<Form.Control type="file" onChange={handleImageChange} />
			</Form.Group>

			<Form.Group className="mb-3">
				<Form.Label>Top Text</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter top text"
					value={topText}
					onChange={(e) => setTopText(e.target.value)}
				/>
			</Form.Group>

			<Form.Group className="mb-3">
				<Form.Label>Bottom Text</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter bottom text"
					value={bottomText}
					onChange={(e) => setBottomText(e.target.value)}
				/>
			</Form.Group>

			<Row className="mb-3">
				<Col>
					<Form.Label>Font Size</Form.Label>
					<Form.Control
						type="number"
						value={textStyle.fontSize.replace('px', '')}
						onChange={(e) =>
							setTextStyle({ ...textStyle, fontSize: `${e.target.value}px` })
						}
					/>
				</Col>

				<Col>
					<Form.Label>Font Family</Form.Label>
					<Form.Select
						value={textStyle.fontFamily}
						onChange={(e) =>
							setTextStyle({ ...textStyle, fontFamily: e.target.value })
						}
					>
						<option value="Arial">Arial</option>
						<option value="Comic Sans MS">Comic Sans</option>
						<option value="Pacifico">Pacifico</option>
					</Form.Select>
				</Col>

				<Col>
					<Form.Label>Text Color</Form.Label>
					<Form.Control
						type="color"
						value={textStyle.color}
						onChange={(e) =>
							setTextStyle({ ...textStyle, color: e.target.value })
						}
					/>
				</Col>
			</Row>

			{image && (
				<div
					className="meme-preview my-4"
					style={{
						backgroundImage: `url(${image})`,
						backgroundSize: 'cover',
						position: 'relative',
						width: '100%',
						height: '400px',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<div
						style={{
							...textStyle,
							position: 'absolute',
							top: '10px',
						}}
						className="meme-text top-text"
					>
						{topText}
					</div>
					<div
						style={{
							...textStyle,
							position: 'absolute',
							bottom: '10px',
						}}
						className="meme-text bottom-text"
					>
						{bottomText}
					</div>
				</div>
			)}

			<Button variant="primary" onClick={saveImage}>
				Save Meme
			</Button>
		</Container>
	);
};

export default MemeCreator;
