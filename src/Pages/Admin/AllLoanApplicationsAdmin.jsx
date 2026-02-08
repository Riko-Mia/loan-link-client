import React from 'react';
import { useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import { useEffect } from 'react';

const AllLoanApplicationsAdmin = () => {
  const [loanApplication, setLoanApplication ] = useState([])
  const axiosInstance = useAxios()
  
  useEffect(() =>{
    axiosInstance.get("all-loans-application-admin")
      .then( data => {
        
        setLoanApplication(data.data)
      })
      .catch(error => {
        console.log('can not find user', error)
    })
}, [axiosInstance])

console.log(loanApplication)


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
        <th>Loan Id</th>
        <th>User</th>
        <th>Loan Category</th>
        <th>Amount</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>

        {loanApplication.map((loan, index) => (

      <tr>
        <th>
          {index + 1}
        </th>
        <td>
            {loan.loanId}
        </td>
        <td>
          <div className="flex items-center gap-3">
            {/* <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={loan.photo}
                  alt={loan.name} />
              </div>
            </div> */}
            <div>
              <div className="font-bold">Name: {`${loan.first_name} ${loan.last_name}`}</div>
              <div className="text-sm opacity-50">email: {loan.email}</div>
            </div>
          </div>
        </td>

        <td>
              <div className="text-sm opacity-50">{loan.category}</div>
        </td>
        <td>
              <div className="text-sm opacity-50">{loan.loan_amount}</div>
        </td>

        {/* <td>
          {loan.createdName? loan.createdName : `Can't find Name`}
          <br />
          {loan.createdEmail? <span className="badge badge-ghost badge-sm">{loan.loan_amount}</span>: `Can't find Email`}
          
        </td> */}

        {/* <td>
          <input type="checkbox" className="toggle toggle-sm" />

        </td> */}

        <td>
            {loan.status}
        </td>

        <th>
          <button className="mr-3 btn btn-xs  btn-success">View More</button>
          <button className="btn btn-xs  btn-warning">Rejected</button>
        </th>
      </tr>))}

    </tbody>

  </table>
</div>
        </div>
    );
};

export default AllLoanApplicationsAdmin;


