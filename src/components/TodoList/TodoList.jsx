import React, { useEffect, useState } from 'react';
import {
	Button,
	Col,
	Container,
	FormControl,
	InputGroup,
	ListGroup,
	Row,
} from 'react-bootstrap';
import changeDocumentTitle from '../customHooks/changeDocumentTitle.jsx';

const TodoList = () => {
	changeDocumentTitle('Todo List');
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState('');

	// Load tasks from local storage when component mounts
	useEffect(() => {
		const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
		setTasks(storedTasks);
	}, []);

	// Save tasks to local storage whenever tasks change
	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}, [tasks]);

	// Add a new task
	const addTask = () => {
		if (newTask.trim() !== '') {
			setTasks([...tasks, { id: Date.now(), text: newTask, done: false }]);
			setNewTask('');
		}
	};

	// Remove a task by index
	const removeTask = (index) => {
		const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
		setTasks(updatedTasks);
	};

	// Toggle the "done" status of a task
	const toggleDone = (index) => {
		const updatedTasks = tasks.map((task, taskIndex) =>
			taskIndex === index ? { ...task, done: !task.done } : task
		);
		setTasks(updatedTasks);
	};

	return (
		<Container className="mt-5">
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<h1 className="mb-4 text-center">Simple Todo List</h1>

					{/* List of tasks */}
					<ListGroup>
						{tasks.length > 0 ? (
							tasks.map((task, index) => (
								<ListGroup.Item
									key={task.id}
									className="d-flex justify-content-between align-items-center"
								>
									{/* Checkbox to mark task as done */}
									<InputGroup.Checkbox
										checked={task.done}
										onChange={() => toggleDone(index)}
									/>
									{/* Task text with strikethrough if done */}
									<span
										className={`flex-grow-1 ${
											task.done
												? 'text-decoration-line-through text-muted'
												: ''
										}`}
										style={{ marginLeft: '10px' }}
									>
										{task.text}
									</span>
									{/* Remove task button */}
									<Button
										variant="danger"
										size="sm"
										onClick={() => removeTask(index)}
									>
										Remove
									</Button>
								</ListGroup.Item>
							))
						) : (
							<p className="text-center text-muted">No tasks available</p>
						)}
					</ListGroup>

					{/* Input for adding new task */}
					<InputGroup className="mt-3">
						<FormControl
							placeholder="Add a new task"
							value={newTask}
							onChange={(e) => setNewTask(e.target.value)}
							onKeyPress={(e) => e.key === 'Enter' && addTask()}
						/>
						<Button variant="primary" onClick={addTask}>
							Add Task
						</Button>
					</InputGroup>
				</Col>
			</Row>
		</Container>
	);
};

export default TodoList;
