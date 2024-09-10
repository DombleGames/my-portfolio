import Papa from 'papaparse';
import React, { useState } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import changeDocumentTitle from '../customHooks/changeDocumentTitle.jsx';


// Custom hook for parsing CSV files and handling data
const useCsvParser = () => {
    const [headers, setHeaders] = useState([]);
    const [rows, setRows] = useState([]);

    const parseCsvData = (csvText) => {
        Papa.parse(csvText, {
            complete: (result) => {
                setHeaders(result.meta.fields);
                const rowsWithUniqueId = result.data.map((row, index) => ({
                    ...row,
                    _uniqueId: `row-${index}-${Date.now()}`,
                }));
                setRows(rowsWithUniqueId);
            },
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => parseCsvData(reader.result);
        reader.readAsText(file);
    };

    const loadDummyData = () => {
        fetch('/Portfolio/dummy.csv')
            .then((response) => response.text())
            .then((csvText) => parseCsvData(csvText))
            .catch((error) => {
                console.error('Error loading dummy data:', error);
            });
    };

    return { headers, rows, setRows, handleFileChange, loadDummyData };
};

// Component for rendering the CSV table
const CsvTable = ({ headers, rows, editRowIndex, onEdit, onDelete, onSave, onCancel, onRowChange }) => {

    const renderRow = (row, index) => {
        return (
            <tr key={row._uniqueId}>
                {editRowIndex === index
                    ? headers.map((header) => (
                          <td key={header}>
                              <Form.Control
                                  type="text"
                                  value={row[header]}
                                  onChange={(e) => onRowChange(index, header, e.target.value)}
                              />
                          </td>
                      ))
                    : headers.map((header) => <td key={header}>{row[header]}</td>)}
                <td>
                    {editRowIndex === index ? (
                        <>
                            <Button variant="success" className="me-2" onClick={() => onSave(index)}>Save</Button>
                            <Button variant="secondary" onClick={onCancel}>Cancel</Button>
                        </>
                    ) : (
                        <>
                            <Button variant="warning" className="me-2" onClick={() => onEdit(index)}>Edit</Button>
                            <Button variant="danger" onClick={() => onDelete(index)}>Delete</Button>
                        </>
                    )}
                </td>
            </tr>
        );
    };

    return (
        <Table striped bordered hover responsive className="mt-4">
            <thead>
                <tr>
                    {headers.map((header) => (
                        <th key={header}>{header}</th>
                    ))}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => renderRow(row, index))}
            </tbody>
        </Table>
    );
};

function CsvReader() {
    changeDocumentTitle('CSV Editor');
    const { headers, rows, setRows, handleFileChange, loadDummyData } = useCsvParser();
    const [editRowIndex, setEditRowIndex] = useState(null);
    const [newEntry, setNewEntry] = useState({});

    const handleAddEntry = () => {
        setRows([...rows, newEntry]);
        setNewEntry({});
    };

    const handleInputChange = (header, value) => {
        setNewEntry({ ...newEntry, [header]: value });
    };

    const handleEdit = (index) => {
        setEditRowIndex(index);
    };

    const handleRowChange = (index, header, value) => {
        const updatedRows = [...rows];
        updatedRows[index] = { ...updatedRows[index], [header]: value };
        setRows(updatedRows);
    };

    const handleSave = () => {
        setEditRowIndex(null);
    };

    const handleCancel = () => {
        setEditRowIndex(null);
    };

    const handleDelete = (index) => {
        const updatedRows = rows.filter((_, idx) => idx !== index);
        setRows(updatedRows);
    };

    const handleExport = () => {
        const csv = Papa.unparse(rows);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'export.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <h1 className="text-center">CSV File Editor</h1>
            <p className="text-center">Here you can edit your CSV file. The file is not saved on any server.</p>
            <Container className="py-4">
                <Form.Group>
                    <Form.Label>Upload CSV</Form.Label>
                    <Form.Control type="file" onChange={handleFileChange} />
                </Form.Group>

                <Button variant="info" className="mt-4" onClick={loadDummyData}>Use Dummy CSV Data</Button>

                {headers.length > 0 && (
                    <>
                        <Form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleAddEntry();
                            }}
                        >
                            {headers.map((header) => (
                                <Form.Group key={header} className="mb-3">
                                    <Form.Label>{header}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={newEntry[header] || ''}
                                        onChange={(e) => handleInputChange(header, e.target.value)}
                                    />
                                </Form.Group>
                            ))}
                            <Button type="submit">Add Entry</Button>
                        </Form>

                        <CsvTable
                            headers={headers}
                            rows={rows}
                            editRowIndex={editRowIndex}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onSave={handleSave}
                            onCancel={handleCancel}
                            onRowChange={handleRowChange}
                        />
                        <Button variant="success" className="mt-4" onClick={handleExport}>Export CSV</Button>
                    </>
                )}
            </Container>
        </>
    );
}

export default CsvReader;
