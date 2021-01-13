import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';

import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { Button } from '@material-ui/core';

function TrainingList() {
    const [Trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getTrainings();
    }, [])

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))
    }

    const deleteTraining = (params) => {
        if (window.confirm("Are you sure?")){
            fetch(params.data.links[1].href, {
                method: 'DELETE'
            })
            .then(_ => getTrainings())
            .then(_ => handleOpen())
            .catch(err => console.error(err))
        }
    }

    const updateTraining = (link, training) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(response => getTrainings())
        .catch(err => console.error(err))
    }

    const columns = [
        {  
            headerName: '',
            field: 'links.href',
            width: 90,
            cellRendererFramework: params =>
            <IconButton color="secondary" onClick={() => deleteTraining(params)}>
                <DeleteIcon fontSize="small" />
            </IconButton>
        },
        {field: 'activity', sortable: true, filter: true},
        {field: 'date', sortable: true, filter: true},        
        {field: 'duration', sortable: true, filter: true},
        {field: 'customer', sortable: true, filter: true}
    ]

    return(        
        <div>      
            <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto' }}>
            <AgGridReact
                rowData={Trainings}
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
                message="Training deleted successfully"
            />          
        </div>
    )

}

export default TrainingList;