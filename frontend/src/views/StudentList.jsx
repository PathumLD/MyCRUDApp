import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const StudentList = () => {

    const [StudentList, setStudentList] = useState([]);

    useEffect(() => {

        //declare the data fetching function
        const dataOperationInUseEffect = async () => {

            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }

            debugger
            let URL ="https://localhost:7237/api/student/get-student-list";
            const response = await axios.get(URL, {
                headers: headers,
            });

            if(response!=null && response!=undefined && response.data.length >0 ) {
                setStudentList(response.data);
            }
        }

        //call the data fetching function
        dataOperationInUseEffect().catch(console.error);


    }, [])

  return (
    <>
      <h2 className='mx-auto'>Student List</h2>

        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Student Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                
                <tbody>


                    {StudentList?.map((item, idx) => {
                        
                        return(
                                <>
                                    <tr>
                                        <th scope="row">{item.studentId}</th>
                                        <td>{item.studentName}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            <Link to={"/update/" + item.studentId} className="btn btn-primary ">Edit</Link>
                                            {/* <Link className="btn btn-danger ">Delete</Link> */}
                                        </td>
                                    </tr>
                                </>
                               );

                    })}


                </tbody>
            </table>
        </div>
    </>
  )
}

export default StudentList
