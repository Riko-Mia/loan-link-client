import React from 'react';
import { useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';


const AllLoansAdmin = () => {
  
  const axiosInstance = useAxios()
  // const axiosSecure = useAxiosSecure()

  const {data: loans = [], refetch} = useQuery({
    queryKey : ['all-loans'],
    queryFn: async () => {
      const res = await axiosInstance.get("all-loans-admin")
      return res.data
    }
  })
  
  const handleDeleteLoan = (id)=>{

    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    

    
  axiosInstance.delete(`loan-delete/${id}`)
      .then(res => {
        console.log(res.data)
        if(res.data.deletedCount){
          refetch()
          Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
        }
       
      })
      .catch(error =>{
        console.log(error)
      })
  }
});


  

  }




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
        <th>Photo</th>
        <th>Interest</th>
        <th>Created By</th>
        <th>Show on Home</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>

        {loans.map((loan, index) => (

      <tr>
        <th>
          {index + 1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={loan.photo}
                  alt={loan.name} />
              </div>
            </div>
            <div>
              <div className="font-bold">Title: {loan.loanTitle}</div>
              <div className="text-sm opacity-50">Category: {loan.category}</div>
            </div>
          </div>
        </td>
        <td>
              <div className="text-sm opacity-50">{loan.interestRate}%</div>
          {/* Zemlak, Daniel and Leannon
          <br />
          <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
        </td>

        <td>
          {loan.createdName? loan.createdName : `Can't find Name`}
          <br />
          {loan.createdEmail? <span className="badge badge-ghost badge-sm">{loan.createdEmail}</span>: `Can't find Email`}
          
        </td>

        <td>
          <input type="checkbox" className="toggle toggle-sm" />
          {/* <input type="checkbox" defaultChecked {...loan.showOnHome} className="toggle toggle-sm" /> */}
        </td>


        <th>
          <button className="mr-3 btn btn-xs  btn-success">Update Loan</button>
          <button className="btn btn-xs  btn-warning" onClick={() => handleDeleteLoan(loan._id)}>Delete</button>
        </th>
      </tr>))}

    </tbody>

  </table>
</div>
        </div>
    );
};

export default AllLoansAdmin;


