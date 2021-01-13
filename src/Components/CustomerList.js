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

function CustomerList() {
    const [Customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getCustomers();
    }, [])

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
            headerName: '',
            field: 'links.href',
            width: 90,
            cellRendererFramework: params => <EditCustomer updateCustomer={updateCustomer} params={params} />
        },
        {  
            headerName: '',
            field: 'links.href',
            width: 90,
            cellRendererFramework: params =>
            <IconButton color="secondary" onClick={() => deleteCustomer(params)}>
                <DeleteIcon fontSize="small" />
            </IconButton>
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
            <AddCustomer addCustomer={addCustomer} />                
            <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto' }}>
            <AgGridReact
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