import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function AddStudent(props) {
    const [open, setOpen] = useState(false);
    const [student, setStudent] = useState({
        studentName: '',
        email: '',
        statusCode: 0,
        status: '',

    });

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setStudent({
            ...student,
            [name]: value,
        });
    };


    const handleAdd = () => {
        props.addStudent(student);
        handleClose();
    }

    return (
        <div>
            <button id="addStudent" style={{margin: 10}} onClick={handleOpen}> Add New Student</button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Student</DialogTitle>
                <DialogContent style={{paddingTop: 20}}>
                    <TextField id="name" fullWidth label="Name" name="studentName" value={student.studentName}
                               onChange={handleChange}/>
                    <TextField id="email" fullWidth label="Email" name="email" value={student.email}
                               onChange={handleChange}/>
                    <TextField id="status" fullWidth label="Status" name="status" value={student.status}
                               onChange={handleChange}/>
                    <TextField id="statusCode" fullWidth label="StatusCode" name="statusCode" value={student.statusCode}
                               onChange={handleChange}/>

                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button id="submit" onClick={handleAdd}>Add</button>
                </DialogActions>
            </Dialog>
        </div>
    )

}

AddStudent.propTypes = {
    addStudent: PropTypes.func.isRequired
}

export default AddStudent;