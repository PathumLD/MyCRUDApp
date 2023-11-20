import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StudentList = () => {
  const [studentList, setStudentList] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [counter, setCounter] = useState(1); // Counter for displaying incremental numbers

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:7237/api/student/get-student-list');
      if (response && response.data && response.data.length > 0) {
        setStudentList(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = (studentId) => {
    const studentToDelete = studentList.find((student) => student.studentId === studentId);
    setSelectedStudent(studentToDelete);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      if (selectedStudent) {
        const response = await axios.delete(`https://localhost:7237/api/student/delete-student/${selectedStudent.studentId}`);
        if (response && response.status === 200) {
          setShowConfirmation(false);
          setSelectedStudent(null);
          fetchData();
        }
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setSelectedStudent(null);
  };

  return (
    <>
      <h2 className='mx-auto'>Student List</h2>
      <div>
        {showConfirmation && (
          <div className="delete-confirmation border rounded p-3 border-danger ">
            <p className='font-bold'>Are you sure you want to delete <span className='fw-bold text-dark'> {selectedStudent && selectedStudent.studentName}</span>?</p>
            <button className="btn btn-danger" onClick={confirmDelete}>Delete</button>
            <span className='mx-1'> | </span>
            <button className="btn btn-secondary" onClick={cancelDelete}>Cancel</button>
          </div>
        )}
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Student Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {studentList.map((item, idx) => (
              <tr key={item.studentId}>
                <th scope='row'>{counter + idx}</th>
                <td>{item.studentName}</td>
                <td>{item.email}</td>
                <td>
                  <Link to={`/update/${item.studentId}`} className='btn btn-primary'>
                    Edit
                  </Link>
                  <span className='mx-1'> | </span>
                  <button className="btn btn-danger" onClick={() => handleDelete(item.studentId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StudentList;
