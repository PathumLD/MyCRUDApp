import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UsersList = () => {
    const [userList, setUserList] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [counter, setCounter] = useState(1); // Counter for displaying incremental numbers

    useEffect(() => {
        fetchData();
      }, []);

      const fetchData = async () => {
        try {
          const response = await axios.get('https://localhost:7237/api/users/get-users-list');
          if (response && response.data && response.data.length > 0) {
            setUserList(response.data);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      const handleDelete = (userId) => {
        const userToDelete = userList.find((user) => user.userId === userId);
        setSelectedUser(userToDelete);
        setShowConfirmation(true);
      };

      const confirmDelete = async () => {
        try {
          if (selectedUser) {
            const response = await axios.delete(`https://localhost:7237/api/users/delete-user/${selectedUser.userId}`);
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
        setSelectedUser(null);
      };

  return (
    <>
      <h2 className='mx-auto'>User List</h2>
      <div>
        {showConfirmation && (
          <div className="delete-confirmation border rounded p-3 border-danger ">
            <p className='font-bold'>Are you sure you want to delete <span className='fw-bold text-dark'> {selectedUser && selectedUser.userName}</span>?</p>
            <button className="btn btn-danger" onClick={confirmDelete}>Delete</button>
            <span className='mx-1'> | </span>
            <button className="btn btn-secondary" onClick={cancelDelete}>Cancel</button>
          </div>
        )}
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>User Name</th>
              <th scope='col'>Email</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((item, idx) => (
              <tr key={item.userId}>
                <th scope='row'>{counter + idx}</th>
                <td>{item.userName}</td>
                <td>{item.email}</td>
                <td>
                  <Link to={`/update/${item.userId}`} className='btn btn-primary'>
                    Edit
                  </Link>
                  <span className='mx-1'> | </span>
                  <button className="btn btn-danger" onClick={() => handleDelete(item.userId)}>
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

export default UsersList
