import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateStudent = () => {
  const navigate = useNavigate();
  const { studentId } = useParams();

  const [studentName, setStudentName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchStudentById = async () => {
      try {
        const response = await axios.get(`https://localhost:7237/api/student/get-student-by-id/${studentId}`);

        if (response && response.data) {
          setStudentName(response.data.studentName);
          setEmail(response.data.email);
        }
      } catch (error) {
        console.error('Error fetching student:', error);
      }
    };

    fetchStudentById();
  }, [studentId]);

  const handleUpdateForm = async event => {
    event.preventDefault();
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const updatedStudent = {
      StudentId: parseInt(studentId),
      StudentName: studentName,
      Email: email,
    };

    try {
      const response = await axios.put(`https://localhost:7237/api/student/update-student`, updatedStudent, {
        headers: headers,
      });

      if (response && response.data) {
        navigate('/studentlist');
      }
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <>
      <h2>Update Student</h2>
      <div className='row'>
        <div className='col-lg-6'>
          <form onSubmit={handleUpdateForm}>
            <div className='form-group'>
              <label htmlFor='StudentId'>Student Id</label>
              <input
                type='text'
                className='form-control'
                id='StudentId'
                name='StudentId'
                disabled
                placeholder='Student ID'
                value={studentId}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='StudentName'>Student Name</label>
              <input
                type='text'
                className='form-control'
                id='StudentName'
                name='StudentName'
                placeholder='Enter Student Name'
                required={true}
                value={studentName}
                onChange={e => setStudentName(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='Email'>Email address</label>
              <input
                type='email'
                className='form-control'
                id='Email'
                name='Email'
                placeholder='Enter Email'
                required={true}
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className='mt-2'>
              <button type='submit' className='btn btn-primary'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateStudent;
