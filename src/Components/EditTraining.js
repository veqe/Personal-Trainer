import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function EditTraining(props) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = useState({
        activity: '', 
        date: '', 
        duration: '',
        customer: ''
    });

    const handleClickOpen = () => {
        setTraining({
            activity: props.params.data.activity,
            date: props.params.data.date,
            duration: props.params.data.duration,
            customer: props.params.data.customer
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {   
        props.updateTraining(props.params.data.links[1].href , training);     
        handleClose();
    }

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value});
    }

    return(
        <div>
            <Button size="small" color="primary" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Training</DialogTitle>
                <DialogContent>            
                    <TextField
                        margin="dense"
                        label="Activity"
                        name="activity"
                        value={training.activity}
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Date"
                        name="date"
                        value={training.date}
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Duration (Min)"
                        name="duration"
                        value={training.duration}
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Customer"
                        name="customer"
                        value={training.customer}
                        onChange={inputChanged}
                        fullWidth
                    />                              
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditTraining;