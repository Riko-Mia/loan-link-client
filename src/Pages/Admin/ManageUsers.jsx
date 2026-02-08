import React from 'react';
import { useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import { useEffect } from 'react';

const ManageUsers = () => {
  const [users, setUsers ] = useState([])
  const axiosInstance = useAxios()
  
  useEffect(() =>{
    axiosInstance.get("users")
      .then( data => {
        
        setUsers(data.data)
      })
      .catch(error => {
        console.log('can not find user', error)
    })
}, [axiosInstance])
console.log('can not find user', users)


    return (
        <div>
            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>
          No
        </th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>

        {users.map((user, index) => (

      <tr>
        <th>
          {index + 1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={user.photoURL}
                  alt={user.name} />
              </div>
            </div>
            <div>
              <div className="font-bold">{user.name}</div>
              {/* <div className="text-sm opacity-50">{user.email}</div> */}
            </div>
          </div>
        </td>
        <td>
              <div className="text-sm opacity-50">{user.email}</div>
          {/* Zemlak, Daniel and Leannon
          <br />
          <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
        </td>
        <td>{user.role}</td>
        <th>
          {/* <button className="btn btn-ghost btn-xs">details</button> */}
          <button className="mr-3 btn btn-xs  btn-success">Updata Role</button>
          <button className="btn btn-xs  btn-warning">Delete</button>
        </th>
      </tr>))}

    </tbody>
    {/* foot */}
    {/* <tfoot>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th></th>
      </tr>
    </tfoot> */}
  </table>
</div>
        </div>
    );
};

export default ManageUsers;


