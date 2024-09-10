import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { HashRouter, NavLink, Route, Routes } from 'react-router-dom';

import CsvReader from './components/CsvReader/CsvReader';
import MemeCreator from './components/MemeCreator/MemeCreator';
import Movies from './components/MovieSearch/Movies';
import Paint from './components/Paint/Paint';
import TodoList from './components/TodoList/TodoList';
import Weather from './components/Weather/Weather';

// Styles for active navigation links
const activeStyle = {
    color: '#4CAF50',
};

function App() {
    return (
        <HashRouter>
            {/* Navbar */}
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Container>
                    <Navbar.Brand href="/Portfolio/">My little portfolio</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link
                                as={NavLink}
                                to="/CsvReader"
                                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                            >
                                CSV Editor
                            </Nav.Link>
                            <Nav.Link
                                as={NavLink}
                                to="/MemeCreator"
                                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                            >
                                Meme Creator
                            </Nav.Link>
                            <Nav.Link
                                as={NavLink}
                                to="/Movies"
                                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                            >
                                Movie Search
                            </Nav.Link>
                            <Nav.Link
                                as={NavLink}
                                to="/Paint"
                                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                            >
                                Paint
                            </Nav.Link>
                            <Nav.Link
                                as={NavLink}
                                to="/TodoList"
                                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                            >
                                To-Do List
                            </Nav.Link>
                            <Nav.Link
                                as={NavLink}
                                to="/Weather"
                                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                            >
                                Weather
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Routes */}
            <Container className="mt-3">
                <Routes>
                    <Route exact path="/" element={<Paint />} />
                    <Route path="/CsvReader" element={<CsvReader />} />
                    <Route path="/MemeCreator" element={<MemeCreator />} />
                    <Route path="/Movies" element={<Movies />} />
                    <Route path="/Paint" element={<Paint />} />
                    <Route path="/TodoList" element={<TodoList />} />
                    <Route path="/Weather" element={<Weather />} />
                </Routes>
            </Container>
        </HashRouter>
    );
}

export default App;
