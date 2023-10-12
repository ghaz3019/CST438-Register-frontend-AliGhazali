import React, { useState, useEffect } from 'react';
import AddStudent from "./AddStudent";
import EditStudent from "./EditStudent";

const AdminHome = ()  => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [statusCode, setStatusCode] = useState(0);
    const [message, setMessage] = useState(' ');
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
        }, [] )


    const fetchStudents = () => {
        fetch('http://localhost:8080/student')
            .then(response => response.json())
            .then(data => {
                setStudents(data);
            })
            .catch(e => console.log(e));
    }

    const deleteStudent = (id) => {
        setMessage('');
        fetch(`http://localhost:8080/student/${id}?force=true`,{
            method: 'DELETE',
        })
            .then(response => {
                if(response.ok){
                    setMessage("Student successfully deleted");
                    fetchStudents();
                }else{
                    setMessage("Error deleting student: " + response.status);
                }
            }).catch(e => {
                setMessage("Error deleting student: " + e);
        })

    }

    const addStudent = (s) => {
        setMessage('');

        fetch('http://localhost:8080/student', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json',},
            body: JSON.stringify(s)
        })
            .then(response => {
                if(response.ok){
                    setMessage('Student Added Successfully');
                    fetchStudents();
                }else{
                    setMessage("There was an error adding student " + response.status);
                }
            })
            .catch(e => {
                setMessage("There was an error adding student " + e);
                console.log("Exception in addStudent: " + e);
            })
    }


    const editStudent = (newFields) => {
        setMessage('');
        fetch(`http://localhost:8080/student/${newFields.id}`,{
            method: 'PUT',
            headers: {'Content-Type' : 'application/json',},
            body: JSON.stringify(newFields)
        })
            .then(response => {
                if(response.ok){
                    setMessage("Student Successfully Updated");
                    fetchStudents();
                }else{
                    setMessage("There was an error updating student: " + response.status);

                }
            })
            .catch(exception => {
                setMessage("Error updating student: " + exception);
            })
    }

    const headers = ['Student ID', 'Name', 'Email', 'Status Code', 'Status'];

    return (
        <div> 
        <div margin="auto" >
          <h3>Student List</h3>
            <h4>{message}</h4>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <table>
                    <thead>
                    <tr>
                        {headers.map((title, idx) => (<th key={idx}>{title}</th>))}
                    </tr>
                    </thead>
                    <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.studentName}</td>
                            <td>{student.email}</td>
                            <td>{student.statusCode}</td>
                            <td>{student.status}</td>
                            <td><EditStudent student={student} editStudent={editStudent} /></td>
                            <td><button type="button" margin="auto" onClick={() => deleteStudent(student.id)}>Delete</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <AddStudent addStudent={addStudent}/>
        </div>
      </div>
    )
}

export default AdminHome;