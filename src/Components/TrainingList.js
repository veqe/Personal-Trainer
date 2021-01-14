import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

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

    const columns = [
        {  
            headerName: 'Actions',
            field: 'links.href',
            width: 120,
            cellRendererFramework: params =>
            <IconButton color="secondary" onClick={() => deleteTraining(params)}>
                <DeleteIcon fontSize="small" />
            </IconButton>
        },
        {field: 'activity', sortable: true, filter: true},
        {field: 'date', sortable: true, filter: true},        
        {field: 'duration', sortable: true, filter: true},
        {
            headerName: 'Customer', field: 'links.2.href', sortable: true, filter: true, width: 600
        }
    ]

    return(        
        <div>   
            <div style={{ height: 80, width: '90%', margin: 'auto' }}>
                </div>    
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