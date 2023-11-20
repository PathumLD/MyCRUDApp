import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateStudent = () => {
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState('');
  const [email, setEmail] = useState('');
  
  const handleSignupForm = async event => {
    event.preventDefault();
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const newStudent = {
      StudentName: studentName,
      Email: email,
    };

    try {
      const response = await axios.post('https://localhost:7237/api/student/create-student', newStudent, {
        headers: headers,
      });

      if (response && response.data) {
        // Redirect to student list page upon successful creation
        navigate('/studentlist');
      }
    } catch (error) {
      console.error('Error creating student:', error);
      // Handle error scenarios - display error messages or take necessary actions
    }
  };

  return (
    <>
      <h2>Add Student</h2>

      <div>
        <div className='row'>
          <div className='col-lg-6'>
            <form onSubmit={handleSignupForm}>
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
      </div>
    </>
  );
};

export default CreateStudent;
