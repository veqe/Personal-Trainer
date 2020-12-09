import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';

import AddCar from './AddCar';
import EditCar from './EditCar';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { Button } from '@material-ui/core';

function Carlist() {
    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getCars();
    }, [])

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const getCars = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.error(err))
    }

    const deleteCar = (params) => {
        if (window.confirm("Are you sure?")){
            fetch(params.value, {
                method: 'DELETE'
            })
            .then(_ => getCars())
            .then(_ => handleOpen())
            .catch(err => console.error(err))
        }
    }

    const addCar = (newCar) => {
        fetch('https://carstockrest.herokuapp.com/cars', {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(newCar)
        })
        .then(response => getCars())
        .catch(err => console.error(err))
    }

    const updateCar = (link, car) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(response => getCars())
        .catch(err => console.error(err))
    }    

    const columns = [
        {field: 'brand', sortable: true, filter: true},
        {field: 'model', sortable: true, filter: true},
        {field: 'color', sortable: true, filter: true},
        {field: 'fuel', sortable: true, filter: true},
        {field: 'year', sortable: true, filter: true, width: 100},
        {field: 'price', sortable: true, filter: true, width: 100},
        {
            headerName: '',
            field: '_links.self.href',
            width: 90,
            cellRendererFramework: params => <EditCar updateCar={updateCar} params={params} />
        },
        {
            headerName: '',
            field: '_links.self.href',
            width:90,
            cellRendererFramework: params =>             
            <IconButton color="secondary" onClick={() => deleteCar(params)}>
                <DeleteIcon fontSize="small" />
            </IconButton>
        }
    ]

    return(        
        <div>
            <AddCar addCar={addCar} />
            <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto' }}>
            <AgGridReact
                rowData={cars}
                columnDefs={columns}
                pagination="true"
                paginationPageSize="10"
                >
            </AgGridReact>            
            </div>
            <Snackbar    
                open={open}
                onClose={handleClose}
                autoHideDuration={2500}
                message="Car deleted successfuly"        
            />
        </div>
    )
}

export default Carlist;