import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const UpdateStudent = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [StudentId, setStudentId] = useState(params.studentId ?? 0);
    const [StudentName, setStudentName] = useState("");
    const [Email, setEmail] = useState("");
  
    const handleSignupForm = async (event) => {
      event.preventDefault();
  
      try {
        const headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        };
  
        const param = {
          StudentId: StudentId,
          StudentName: StudentName,
          Email: Email,
        };
  
        const URL = `https://localhost:7237/api/student/update-student`;
        const response = await axios.put(URL, param, {
          headers: headers,
        });
  
        if (response.data) {
          navigate('/studentlist');
        }
      } catch (error) {
        console.error('Error during update:', error.message);
        // Handle update errors
      }
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          };
  
          const URL = `https://localhost:7237/api/student/get-student-by-id/${StudentId}`;
          const response = await axios.get(URL, {
            headers: headers,
          });
  
          if (response && response.data) {
            setStudentName(response.data.studentName);
            setEmail(response.data.email);
          }
        } catch (error) {
          console.error('Error fetching data:', error.message);
          // Handle fetch data errors
        }
      };
  
      fetchData().catch(console.error);
    }, [StudentId]);
  
    return (
      <>
        <h2>Update Student</h2>
        <div>
          <div className='row'>
            <div className='col-lg-6'>
              <form onSubmit={handleSignupForm}>
                <div className="form-group">
                  <label htmlFor="StudentId">Student Id</label>
                  <input
                    type="text"
                    className="form-control"
                    id="StudentId"
                    name='StudentId'
                    value={StudentId}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="StudentName">Student Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="StudentName"
                    name='StudentName'
                    value={StudentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="Email"
                    name='Email'
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className='mt-2'>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default UpdateStudent;
