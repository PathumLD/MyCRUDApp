import axios from 'axios';
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

const CreateStudent = () => {

    const navigate = useNavigate();
    const [StudentName, setStudentName] = useState("");
    const [Email, setEmail] = useState("");

    const handleSignupForm = async event => {

        event.preventDefault();
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }

        let param ={
            StudentName : StudentName,
            Email : Email
        }
        debugger

        let URL ="https://localhost:7237/api/student/create-student";
        const response = await axios.post(URL, param, {
            headers: headers,
        });
        debugger

        let dummy2 = "";

        if(response!=undefined && response.data.length >0 ) {
            navigate('/studentlist')
    }

}


  return (
    <>
      <h2>Add Student</h2>

      <div>

        <div className='row'>
            <div className='col-lg-6'>
                <form onSubmit={handleSignupForm}>
                    
                    <div className="form-group">
                        <label for="exampleInputPassword1">Student Name</label>

                        <input type="text" className="form-control" id= "StudentName" name='StudentName' placeholder="Enter Satudent Name"
                            required ={true}
                            value={StudentName}
                            onChange={(e) => setStudentName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id= "Email" name='Email' placeholder="Enter Email"
                            required ={true}
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
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
}

export default CreateStudent
