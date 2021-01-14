import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';

import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { TextField } from '@material-ui/core';

function CustomerList() {
    const [Customers, setCustomers] = useState([]);
    const [Trainings2, setTrainings2] = useState([]);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getCustomers();
    }, [])

    const etsi = (event) => {
        setSearch(event.target.value);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const deleteCustomer = (params) => {
        if (window.confirm("Are you sure?")){
            fetch(params.data.links[1].href, {
                method: 'DELETE'
            })
            .then(_ => getCustomers())
            .then(_ => handleOpen())
            .catch(err => console.error(err))
        }
    }

    const getTrainingss = (getTrainings) => {
        fetch("https://customerrest.herokuapp.com/gettrainings", {      
        method: "GET",      
        headers: {        
            "Content-type": "application/json",      
        },      
        body: JSON.stringify(getTrainings),
    })    
    .then(response => response.json())        
    .then(data => setTrainings2(data.content))       
    .catch(err => console.error(err))    
}

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(newCustomer)
        })
        .then(response => getCustomers())
        .catch(err => console.error(err))
    }

    const addTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },            
            body: JSON.stringify(newTraining)
        })
        .then(response => getTrainingss())
        .catch(err => console.error(err))
    }

    const updateCustomer = (link, customer) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(response => getCustomers())
        .catch(err => console.error(err))
    }

    const columns = [
        {
            headerName: 'Actions',
            field: 'links.href',
            width: 100,
            cellRendererFramework: params => <EditCustomer updateCustomer={updateCustomer} params={params} />
        },
        {  
            headerName: '',
            field: 'links.href',
            width: 70,
            cellRendererFramework: params =>
            <IconButton color="secondary" onClick={() => deleteCustomer(params)}>
                <DeleteIcon fontSize="small" />
            </IconButton>
        },
        {
            headerName: '',
            field: 'links.2.href',
            width: 180,
            cellRendererFramework: params => <AddTraining addTraining={addTraining} params={params} />
        },
        {field: 'firstname', sortable: true, filter: true},
        {field: 'lastname', sortable: true, filter: true},        
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true},
        {field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true},
        {field: 'city', sortable: true, filter: true}
    ]

    return(               
        <div> 
            <div style={{ height: 80, width: '90%', margin: 'auto' }}>
                </div>                 
            <AddCustomer addCustomer={addCustomer} /> 
            <TextField placeholder={"search"} type="text" onInput={etsi}> 
                </TextField>               
            <div className="ag-theme-material" style={{ height: 600, width: '95%', margin: 'auto' }}>
            <AgGridReact
                quickFilterText={search}
                rowData={Customers}
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
                message="Customer deleted successfully"
            />            
        </div>
    )

}

export default CustomerList;