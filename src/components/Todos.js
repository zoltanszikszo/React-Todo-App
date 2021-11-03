import React, { useState, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';


import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Todos() {

    const [todo, setTodo] = useState({desc: '', date: '', priority: ''});
    const [todos, setTodos] = useState([]);
    const [menuvalue, menusetValue] = useState('one');

    const gridRef = useRef();

    const addTodo = () => {
        setTodos([todo, ...todos]);
    }

    const inputChanged = (event) => {
        setTodo({...todo, [event.target.name]: event.target.value});
    }

    const deleteTodo = () => {
        if(gridRef.current.getSelectedNodes().length > 0)
            setTodos(todos.filter((todo, index) => index !== gridRef.current.getSelectedNodes()[0].childIndex));
        else
            alert('Select row first!');
    }

    const columns = [
        {field: 'desc', sortable: true, filter: true, floatingFilter: true},
        {field: 'date', sortable: true, filter: true, floatingFilter: true},
        {field: 'priority', sortable: true, filter: true, floatingFilter: true,
            cellStyle: params => params.value === "High" ? {color: 'red' } : {color: 'green'}
        }
    ];

    const handleChange = (event, menuvalue) => {
        menusetValue(menuvalue);
    }

    function Home(){
        return "Hello";
    }

    function MyTodos(){
        return ( 
        <div>
            <TextField label="Description" variant="outlined" size="small" name="desc" value={todo.desc} onChange={inputChanged} />
            <TextField type="date" size="small" onChange={inputChanged} />
            <TextField label="Priority" variant="outlined" size="small" name="priority" value={todo.priority} onChange={inputChanged} />
            <Button onClick={addTodo} variant="contained" size="small" startIcon={<AddIcon />}>Add</Button>
            <Button onClick={() => deleteTodo()} variant="contained" color="error" size="small" startIcon={<DeleteIcon />}>Delete</Button>
            <div className="ag-theme-material" style={{height: 800, width: 600, margin: 'auto'}}>
                <AgGridReact
                ref={gridRef}
                onGridReady={params => gridRef.current = params.api}
                rowData={todos}
                columnDefs={columns}
                animateRows={true}
                rowSelection = "single"
                />
            </div>
        </div>
        );
    }

    return (
        <div>
            <AppBar position="static" sx={{ p: 1 }}>
                <Tabs value={menuvalue} onChange={handleChange}>
                    <Tab value="one" label="Home" />
                    <Tab value="two" label="My Todos"/>
                </Tabs>
            </AppBar>

            {menuvalue === 'one' && Home()}
            {menuvalue === 'two' && MyTodos()}
        </div>
    );
}

export default Todos;
